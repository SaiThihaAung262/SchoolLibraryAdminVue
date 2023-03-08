<template>
  <div v-loading="tableList.tableData.isLoading">
    <div class="form" v-show="isShowSearch">
      <div class="form-content" v-permission="6">
        <el-form label-position="top" label-width="300px">
          <el-form-item :label="t('table.userName')">
            <el-input
              :placeholder="t('table.userName')"
              v-model="filterForm.username"
            />
          </el-form-item>

          <el-form-item :label="t('table.title')">
            <el-input
              :placeholder="t('table.title')"
              v-model="filterForm.title"
            />
          </el-form-item>

          <el-form-item label="URL">
            <el-input placeholder="URL" v-model="filterForm.url" />
          </el-form-item>

          <el-form-item label="IP">
            <el-input placeholder="IP" v-model="filterForm.ip" />
          </el-form-item>

          <el-form-item :label="t('table.createTime')">
            <el-date-picker
              v-model="filterForm.created_at"
              type="date"
              :placeholder="t('table.createTime')"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            />
            <!-- value-format="YYYY-MM-DD HH:mm:ss" -->
          </el-form-item>

          <div style="margin-top: 34px" class="buttonBox">
            <el-button class="app-button" @click="search()">
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
                style="margin-right: 5px"
              />搜索</el-button
            >
          </div>
        </el-form>
      </div>
    </div>

    <div class="table" v-permission="6">
      <div class="top-panel">
        <div class="left">
          <el-button
            @click="bulkDelete"
            type="danger"
            style="margin-bottom: 25px"
            :disabled="selectedLists.length == 0"
            v-permission="7"
            ><font-awesome-icon
              icon="fa-solid fa-trash"
              style="margin-right: 5px"
            />
            {{ t("common.delete") }}
          </el-button>
        </div>
        <div class="right">
          <!-- <el-button
            @click="handlerExport"
            style="margin-bottom: 25px"
            type="warning"
          >
            <font-awesome-icon icon="fa-solid fa-download" />
          </el-button> -->
          <el-button
            @click="searchShow"
            style="margin-bottom: 25px"
            type="info"
            v-permission="6"
          >
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </el-button>
        </div>
      </div>
      <el-table
        v-permission="6"
        :data="tableList.tableData.list.list"
        :row-style="{ height: '55px' }"
        :header-row-style="{ height: '55px' }"
        :border="true"
        @selection-change="onTableSelectionChange"
        height="70vh"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="50"
          show-overflow-tooltip
          header-align="center"
          align="center"
        />
        <el-table-column prop="id" label="ID" align="center" />
        <el-table-column
          prop="username"
          :label="t('table.userName')"
          align="center"
        />
        <el-table-column
          prop="title"
          :label="t('table.title')"
          align="center"
        />
        <el-table-column prop="url" label="URL" align="center" />
        <el-table-column prop="ip" label="IP" align="center" />
        <el-table-column prop="browser" label="Browser" align="center" />
        <el-table-column
          :label="t('common.createTime')"
          align="center"
          width="200"
        >
          <template #default="scope">
            {{ dateFormat(scope.row.created_at) }}
          </template>
        </el-table-column>

        <el-table-column
          :label="t('common.operate')"
          align="center"
          width="150"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              type="primary"
              style="margin-left: 10px; margin-bottom: 5px"
              @click="handleEdit(scope.row)"
              size="small"
            >
              {{ t("common.details") }}
            </el-button>

            <el-tooltip
              class="box-item"
              :content="t('common.delete')"
              placement="top"
              effect="customized"
            >
              <el-button
                type="danger"
                circle
                style="margin-bottom: 5px"
                @click="deleteHandler(scope.row.id)"
                v-permission="7"
              >
                <font-awesome-icon icon="fa-solid fa-trash" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <div class="table-pager">
        <el-pagination
          @size-change="onSizeChange"
          @current-change="onCurrentChange"
          :page-size="param.page_size"
          :page-sizes="pageList"
          :current-page="param.page"
          :layout="`total,prev,pager,next,jumper,${
            device === 'mobile' ? '' : 'sizes'
          }`"
          :total="tableList.tableData.total"
          :small="device === 'mobile' ? true : false"
        >
        </el-pagination>
      </div>
    </div>
  </div>

  <Dialog
    :show="showDialog"
    @closed="closeDialog"
    @created="search"
    :title="dialog.dialogTitle"
    :data="dialog.dialogData"
  />
</template>

<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import Dialog from "./dialog.vue";
import http from "@/http";
import { useStore } from "vuex";
import useTableData from "@/hooks/useTableData.js";
import { dateFormat } from "@/utils/timeFormat.js";
import { ElMessageBox, ElMessage } from "element-plus";
import ExportData2Excel from "./export.js";
import { useI18n } from "vue-i18n";

export default {
  name: "AdminLog",
  components: {
    Dialog,
  },
  setup() {
    const { t } = useI18n();
    const state = reactive({
      isLoading: true,
      showDialog: false,
      filterForm: {},
      pageList: [10, 20, 60, 80, 100],
      param: {
        page: 1,
        page_size: 10,
      },
      dialog: {
        dialogTitle: "",
        dialogData: {},
      },
      selectedLists: [],
      selectedExportLists: [],
      isShowSearch: false,
    });

    const tableList = useTableData(http.auth.getAdminLog);

    const store = useStore();

    const addNew = () => {
      state.dialog.dialogTitle = "添加";
      state.dialog.dialogData = {};
      state.showDialog = true;
    };

    const handleEdit = (row) => {
      state.dialog.dialogTitle = t("common.details");
      state.dialog.dialogData = row;
      state.showDialog = true;
    };

    const closeDialog = () => {
      state.showDialog = false;
    };

    const filter = () => {
      state.param = {
        page: 1,
      };
      if (state.filterForm.username) {
        state.param.username = state.filterForm.username;
      }
      if (state.filterForm.title) {
        state.param.title = state.filterForm.title;
      }
      if (state.filterForm.url) {
        state.param.url = state.filterForm.url;
      }
      if (state.filterForm.ip) {
        state.param.ip = state.filterForm.ip;
      }
      if (state.filterForm.created_at) {
        state.param.created_at = state.filterForm.created_at;
      }
    };

    const onSizeChange = (val) => {
      state.param.page_size = val;
      tableList.setParams(state.param);
    };
    const onCurrentChange = (val) => {
      state.param.page = val;
      tableList.setParams(state.param);
    };

    const deleteHandler = (id) => {
      ElMessageBox.confirm(t("common.sureDelete"), t("common.warning"), {
        confirmButtonText: t("common.sure"),
        cancelButtonText: t("common.cancle"),
        type: "warning",
        draggable: true,
      })
        .then(() => {
          http.auth.deleteAdminLog({ admin_lod_ids: [id] }).then((res) => {
            if (res.data.err_code == 0) {
              ElMessage.success(res.data.err_msg);
              search();
            } else {
              ElMessage.error(res.data.err_msg);
            }
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: t("common.delCancle"),
          });
        });
    };

    const search = () => {
      filter();
      state.param.page_size = 10;
      tableList.setParams(state.param);
    };

    const onTableSelectionChange = (val) => {
      state.selectedLists = val.map((item) => item.id);
      state.selectedExportLists = val;
    };

    const bulkDelete = () => {
      ElMessageBox.confirm(t("common.sureDelete"), t("common.warning"), {
        confirmButtonText: t("common.sure"),
        cancelButtonText: t("common.cancle"),
        type: "warning",
        draggable: true,
      })
        .then(() => {
          http.auth
            .deleteAdminLog({ admin_lod_ids: state.selectedLists })
            .then((res) => {
              if (res.data.err_code == 0) {
                ElMessage.success(res.data.err_msg);
                search();
              } else {
                ElMessage.error(res.data.err_msg);
              }
            });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: t("common.delCancle"),
          });
        });
    };

    const searchShow = () => {
      if (state.isShowSearch) {
        state.isShowSearch = false;
      } else {
        state.isShowSearch = true;
      }
    };

    const handlerExport = () => {
      tableList.tableData.isLoading = true;
      let data = [];
      if (state.selectedExportLists.length != 0) {
        data = state.selectedExportLists;
        exporttttt(data);
      } else {
        state.param.page_size = tableList.tableData.total;
        http.auth.getAdminLog(state.param).then((res) => {
          if (res.data.err_code === 0) {
            // log
            data = res.data.data.list;
            exporttttt(data);
          }
        });
      }
    };

    const exporttttt = (data) => {
      ExportData2Excel(data)
        .then((res) => {
          state.param.page_size = 10;
          search();
          tableList.tableData.isLoading = false;
        })
        .catch((err) => {
          state.param.page_size = 10;
          search();
          tableList.tableData.isLoading = false;
        });
    };

    onMounted(() => {});

    return {
      ...toRefs(state),
      addNew,
      handleEdit,
      closeDialog,
      dateFormat,
      tableList,
      search,
      onSizeChange,
      onCurrentChange,
      deleteHandler,
      windowRect: computed(() => store.state.app.windowRect),
      device: computed(() => store.state.app.device),
      onTableSelectionChange,
      bulkDelete,
      searchShow,
      handlerExport,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.top-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
