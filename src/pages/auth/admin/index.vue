<template>
  <div v-loading="isLoading">
    <div class="form" v-show="isShowSearch">
      <!-- v-permission="3" -->
      <div class="form-content">
        <el-form label-position="top" label-width="300px" v-permission="3">
          <el-form-item label="Id">
            <el-input placeholder="id" v-model="filterForm.id" />
          </el-form-item>

          <el-form-item :label="t('table.userName')">
            <el-input
              :placeholder="t('table.userName')"
              v-model="filterForm.username"
            />
          </el-form-item>

          <el-form-item :label="t('table.logo')">
            <el-input
              :placeholder="t('table.logo')"
              v-model="filterForm.logo"
            />
          </el-form-item>

          <el-form-item label="Email">
            <el-input placeholder="Email" v-model="filterForm.email" />
          </el-form-item>

          <el-form-item :label="t('table.nickName')">
            <el-input
              :placeholder="t('table.nickName')"
              v-model="filterForm.nickname"
            />
          </el-form-item>

          <el-form-item :label="t('table.state')">
            <el-select
              v-model="filterForm.state"
              :multiple="false"
              allow-create
            >
              <el-option
                v-for="(item, index) in stateOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="最后登录">
            <el-input placeholder="最后登录" v-model="filterForm.id" />
          </el-form-item> -->

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

    <div class="table" v-permission="3">
      <div class="top-panel">
        <div class="left">
          <el-button
            @click="addNew"
            class="app-button"
            style="margin-bottom: 25px"
            v-permission="1"
            ><font-awesome-icon
              icon="fa-solid fa-plus"
              style="margin-right: 5px"
            />
            {{ t("common.addto") }}</el-button
          >
        </div>
        <div class="right">
          <el-button
            @click="searchShow"
            style="margin-bottom: 25px"
            type="info"
            v-permission="3"
          >
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </el-button>
        </div>
      </div>

      <el-table
        :data="tableLists"
        :row-style="{ height: '55px' }"
        :header-row-style="{ height: '55px' }"
        :border="true"
        height="70vh"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" align="center" />
        <el-table-column
          prop="username"
          :label="t('table.userName')"
          align="center"
        />

        <el-table-column
          prop="identification"
          :label="t('table.identification')"
          align="center"
        />
        <el-table-column
          prop="nickname"
          :label="t('table.nickName')"
          align="center"
        />
        <!-- <el-table-column prop="" label="所属组别" align="center" /> -->

        <el-table-column prop="email" label="Email" align="center" />

        <el-table-column :label="t('table.state')" align="center">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="2"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeStatus(scope.row)"
              v-permission="2"
            />
          </template>
        </el-table-column>

        <el-table-column
          :label="t('common.updateTime')"
          align="center"
          width="200"
        >
          <template #default="scope">
            {{ dateFormat(scope.row.updated_at) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="t('common.operate')"
          align="center"
          width="120"
          fixed="right"
        >
          <template #default="scope">
            <el-tooltip
              class="box-item"
              :content="t('common.edit')"
              placement="top"
              effect="customized"
            >
              <el-button
                type="primary"
                style="margin-left: 10px; margin-bottom: 5px"
                circle
                @click="handleEdit(scope.row)"
                v-permission="2"
              >
                <font-awesome-icon icon="fa-solid fa-file-pen" />
              </el-button>
            </el-tooltip>

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
                v-permission="4"
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
    :roleList="roleList"
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
import { useI18n } from "vue-i18n";

export default {
  name: "Admin",
  components: {
    Dialog,
  },
  setup() {
    const { t } = useI18n();

    const state = reactive({
      isLoading: true,
      showDialog: false,
      filterForm: {
        state: "",
      },
      pageList: [10, 20, 60, 80, 100],
      param: {
        page: 1,
        page_size: 10,
      },
      dialog: {
        dialogTitle: "",
        dialogData: {},
      },
      stateOptions: [
        {
          value: "",
          label: t("common.all"),
        },
        {
          value: 1,
          label: t("common.normal"),
        },
        {
          value: 2,
          label: t("common.hide"),
        },
      ],
      isShowSearch: false,
      tableLists: [],
      roleList: [],
      total: 0,
    });

    const store = useStore();

    const getTableLists = () => {
      state.isLoading = true;
      http.auth.getAdminList(state.param).then((res) => {
        if (res.data.err_code == 0) {
          console.log(res.data.data.list);
          state.tableLists = res.data.data.list;
          state.total = res.data.data.total;
          state.roleList = res.data.data.roles;
          state.isLoading = false;
        }
      });
    };

    const addNew = () => {
      state.dialog.dialogTitle = t("common.addto");
      state.dialog.dialogData = {};
      state.showDialog = true;
    };

    const handleEdit = (row) => {
      state.dialog.dialogTitle = t("common.edit");
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
      if (state.filterForm.username) {
        state.param.username = state.filterForm.username;
      }
      if (state.filterForm.email) {
        state.param.email = state.filterForm.email;
      }
      if (state.filterForm.nickname) {
        state.param.nickname = state.filterForm.nickname;
      }
      if (state.filterForm.state) {
        state.param.state = parseInt(state.filterForm.state);
      }
    };

    const onSizeChange = (val) => {
      state.param.page_size = val;
      getTableLists();
    };
    const onCurrentChange = (val) => {
      state.param.page = val;
      getTableLists();
    };

    const deleteHandler = (id) => {
      ElMessageBox.confirm(t("common.sureDelete"), t("common.warning"), {
        confirmButtonText: t("common.sure"),
        cancelButtonText: t("common.cancle"),
        type: "warning",
        draggable: true,
      })
        .then(() => {
          http.auth.deleteAdminList({ admin_ids: [id] }).then((res) => {
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
            message: t("common.cancle"),
          });
        });
    };

    const changeStatus = (row) => {
      ElMessageBox.confirm(t("common.sureSave"), t("common.warning"), {
        confirmButtonText: t("common.sure"),
        cancelButtonText: t("common.cancle"),
        type: "warning",
        draggable: true,
      })
        .then(() => {
          let param = {
            id: row.id,
            username: row.username,
            email: row.email,
            identification: row.identification,
            nickname: row.nickname,
            password: row.password,
            status: row.status,
          };

          http.auth.editAdminList(param).then((res) => {
            if (res.data.err_code == 0) {
              ElMessage.success(res.data.err_msg);
              search();
            } else {
              ElMessage.error(res.data.err_msg);
            }
          });
        })
        .catch(() => {
          search();
          ElMessage({
            type: "info",
            message: t("common.cancle"),
          });
        });
    };

    const search = () => {
      filter();
      state.param.page_size = 10;
      getTableLists();
    };

    const searchShow = () => {
      if (state.isShowSearch) {
        state.isShowSearch = false;
      } else {
        state.isShowSearch = true;
      }
    };

    onMounted(() => {
      getTableLists();
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
      changeStatus,
      searchShow,
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
