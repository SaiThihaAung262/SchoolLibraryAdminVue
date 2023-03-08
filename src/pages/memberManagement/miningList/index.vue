<template>
  <div v-loading="isLoading">
    <div class="form" v-show="isShowSearch">
      <!-- <div class="form-title">搜索</div> -->
      <div class="form-content" v-permission="35">
        <el-form label-position="top" label-width="300px">
          <el-form-item label="ID">
            <el-input placeholder="id" v-model="filterForm.id" />
          </el-form-item>
          <el-form-item :label="t('common.userID')">
            <el-input
              :placeholder="t('common.userID')"
              v-model="filterForm.user_id"
            />
          </el-form-item>

          <el-form-item :label="t('common.remark')">
            <el-input
              :placeholder="t('common.remark')"
              v-model="filterForm.remark"
            />
          </el-form-item>

          <el-form-item :label="t('table.income')">
            <el-input
              :placeholder="t('table.income')"
              v-model="filterForm.reward_amount"
            />
          </el-form-item>

          <el-form-item :label="t('table.walletAddress')">
            <el-input
              :placeholder="t('table.walletAddress')"
              v-model="filterForm.wallet_address"
            />
          </el-form-item>

          <el-form-item :label="t('table.type')">
            <el-select
              v-model="filterForm.address_type"
              :multiple="false"
              allow-create
              :placeholder="t('table.type')"
            >
              <el-option
                v-for="(item, index) in walletTypeOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('table.createTime')">
            <el-date-picker
              v-model="filterForm.created_at"
              type="date"
              :placeholder="t('table.createTime')"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>

          <div style="margin-top: 34px" class="buttonBox">
            <el-button class="app-button" @click="search()">
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
                style="margin-right: 5px"
              />{{ t("common.search") }}</el-button
            >
          </div>
        </el-form>
      </div>
    </div>

    <div class="table" v-permission="35">
      <!-- <el-button @click="addNew" class="app-button" style="margin-bottom: 25px"
        ><font-awesome-icon icon="fa-solid fa-plus" style="margin-right: 5px" />
        添加</el-button
      > -->

      <div class="top-panel">
        <div class="left"></div>
        <div class="right">
          <el-button
            @click="handlerExport"
            style="margin-bottom: 25px"
            type="warning"
            v-permission="35"
          >
            <font-awesome-icon icon="fa-solid fa-download" />
          </el-button>
          <el-button
            @click="searchShow"
            style="margin-bottom: 25px"
            type="info"
            v-permission="35"
          >
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </el-button>
        </div>
      </div>

      <el-table
        :data="tableList"
        :row-style="{ height: '55px' }"
        :header-row-style="{ height: '55px' }"
        :border="true"
        @selection-change="onTableSelectionChange"
        height="70vh"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          show-overflow-tooltip
          header-align="center"
          align="center"
        />
        <el-table-column prop="id" label="ID" align="center" />
        <el-table-column
          prop="user_id"
          :label="t('common.userID')"
          align="center"
        />
        <el-table-column
          prop="remark"
          :label="t('common.remark')"
          align="center"
          width="160"
        />
        <el-table-column
          prop="address_type"
          :label="t('table.type')"
          align="center"
        />
        <el-table-column
          prop="wallet_address"
          :label="t('table.walletAddress')"
          align="center"
          width="400"
        />
        <el-table-column :label="t('table.income')" align="center" width="200">
          <template #default="scope">
            {{
              scope.row.address_type == "TRX"
                ? parseFloat(scope.row.reward_amount).toFixed(6)
                : parseFloat(scope.row.reward_amount).toFixed(8)
            }}
          </template>
        </el-table-column>

        <el-table-column
          :label="t('table.createTime')"
          align="center"
          width="160"
        >
          <template #default="scope">
            {{ dateFormat(scope.row.created_at) }}
          </template>
        </el-table-column>

        <!-- <el-table-column label="操作" align="center" width="120">
          <template #default="scope">
            <el-tooltip
              class="box-item"
              content="编辑"
              placement="top"
              effect="customized"
            >
              <el-button
                type="primary"
                style="margin-left: 10px; margin-bottom: 5px"
                circle
                @click="handleEdit(scope.row)"
              >
                <font-awesome-icon icon="fa-solid fa-file-pen" />
              </el-button>
            </el-tooltip>

            <el-tooltip
              class="box-item"
              content="删除"
              placement="top"
              effect="customized"
            >
              <el-button
                type="danger"
                circle
                style="margin-bottom: 5px"
                @click="deleteHandler(scope.row.id)"
              >
                <font-awesome-icon icon="fa-solid fa-trash" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column> -->
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
          :total="total"
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
  name: "poolPlugeManagement",
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
      tableList: [],
      total: 0,

      walletTypeOptions: [
        {
          value: "TRX",
          label: "TRX",
        },
        {
          value: "ETH",
          label: "ETH",
        },
      ],
      isShowSearch: false,
      selectedExportLists: [],
    });

    /**
     * @filterStatus
     */
    const filterStatus = (val) => {
      switch (val) {
        case 1:
          return "未参与";
        case 2:
          return "参与中";
        case 3:
          return "已完成";
        case 4:
          return "取消";
        case 5:
          return "逾期";
        default:
          return "--";
      }
    };

    const getTableList = () => {
      state.isLoading = true;
      http.memberManagement.getMining(state.param).then((res) => {
        if (res.data.err_code == 0) {
          state.tableList = res.data.data.list;
          state.total = res.data.data.total;
          state.isLoading = false;
        }
      });
    };

    const store = useStore();

    const addNew = () => {
      state.dialog.dialogTitle = "添加";
      state.dialog.dialogData = {};
      state.showDialog = true;
    };

    const handleEdit = (row) => {
      state.dialog.dialogTitle = "编辑";
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
      if (state.filterForm.id) {
        state.param.id = parseInt(state.filterForm.id);
      }
      if (state.filterForm.user_id) {
        state.param.user_id = parseInt(state.filterForm.user_id);
      }
      if (state.filterForm.remark) {
        state.param.remark = state.filterForm.remark;
      }
      if (state.filterForm.reward_amount) {
        state.param.reward_amount = parseInt(state.filterForm.reward_amount);
      }
      if (state.filterForm.wallet_address) {
        state.param.wallet_address = state.filterForm.wallet_address;
      }
      if (state.filterForm.created_at) {
        state.param.created_at = state.filterForm.created_at;
      }
      if (state.filterForm.address_type) {
        state.param.address_type = state.filterForm.address_type;
      }
    };

    const onSizeChange = (val) => {
      state.param.page_size = val;
      getTableList();
    };
    const onCurrentChange = (val) => {
      state.param.page = val;
      getTableList();
    };

    const deleteHandler = (id) => {
      ElMessageBox.confirm("确定删除此项？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        draggable: true,
      })
        .then(() => {
          http.memberManagement
            .deletePledge({ pledge_ids: [id] })
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
            message: "删除取消",
          });
        });
    };

    const search = () => {
      filter();

      if (
        state.param.standard_pledge_amount_from >
        state.param.standard_pledge_amount_to
      ) {
        ElMessage.error("from value should not greather than to value");
        return;
      }
      if (state.param.pledge_amount_from > state.param.pledge_amount_to) {
        ElMessage.error("from value should not greather than to value");
        return;
      }
      if (state.param.money_earnings_from > state.param.money_earnings_to) {
        ElMessage.error("from value should not greather than to value");
        return;
      }
      if (
        state.param.overdue_lock_days_from > state.param.overdue_lock_days_to
      ) {
        ElMessage.error("from value should not greather than to value");
        return;
      }
      state.param.page_size = 10;
      getTableList();
    };

    const searchShow = () => {
      if (state.isShowSearch) {
        state.isShowSearch = false;
      } else {
        state.isShowSearch = true;
      }
    };

    const onTableSelectionChange = (val) => {
      state.selectedExportLists = val;
    };

    const handlerExport = () => {
      state.isLoading = true;
      let data = [];
      if (state.selectedExportLists.length != 0) {
        data = state.selectedExportLists;
        exporttttt(data);
      } else {
        state.param.page_size = state.total;
        http.memberManagement.getMining(state.param).then((res) => {
          if (res.data.err_code === 0) {
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
          state.isLoading = false;
        })
        .catch((err) => {
          state.param.page_size = 10;
          search();
          state.isLoading = false;
        });
    };

    onMounted(() => {
      getTableList();
    });

    return {
      ...toRefs(state),
      addNew,
      handleEdit,
      closeDialog,
      dateFormat,
      search,
      onSizeChange,
      onCurrentChange,
      deleteHandler,
      windowRect: computed(() => store.state.app.windowRect),
      device: computed(() => store.state.app.device),
      filterStatus,
      searchShow,
      onTableSelectionChange,
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
