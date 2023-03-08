<template>
  <div v-loading="isLoading">
    <div class="form" v-show="isShowSearch">
      <div class="form-content" v-permission="12">
        <el-form label-position="top" label-width="300px">
          <el-form-item label="ID">
            <el-input placeholder="ID" v-model="filterForm.id" />
          </el-form-item>

          <el-form-item :label="t('table.walletAddress')">
            <el-input
              :placeholder="t('table.walletAddress')"
              v-model="filterForm.wallet_address"
            />
          </el-form-item>

          <el-form-item :label="t('table.walletType')">
            <el-select
              v-model="filterForm.address_type"
              :multiple="false"
              allow-create
            >
              <el-option
                v-for="(item, index) in addressTypeOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('table.describe')">
            <el-input
              :placeholder="t('table.describe')"
              v-model="filterForm.apr"
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

    <div class="table" v-permission="12">
      <div class="top-panel">
        <div class="left">
          <el-button
            @click="addNew"
            class="app-button"
            style="margin-bottom: 25px"
            v-permission="13"
            ><font-awesome-icon
              icon="fa-solid fa-plus"
              style="margin-right: 5px"
            />

            {{ t("common.addto") }}
          </el-button>
          <!-- :disabled="selectedLists.length == 0" -->

          <!-- <el-button
            @click="bulkDelete"
            type="danger"
            style="margin-bottom: 25px"
            disabled
            v-permission="15"
          >
            <font-awesome-icon
              icon="fa-solid fa-trash"
              style="margin-right: 5px"
            />
            删除
          </el-button> -->
        </div>
        <div class="right">
          <el-button
            @click="searchShow"
            style="margin-bottom: 25px"
            type="info"
            v-permission="12"
          >
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </el-button>
        </div>
      </div>

      <el-table
        :data="bankLists"
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
          prop="wallet_address"
          :label="t('table.walletAddress')"
          align="center"
          width="350"
        />

        <el-table-column :label="t('table.state')" align="center">
          <template #default="scope">
            <el-switch
              v-model="scope.row.is_default"
              :active-value="1"
              :inactive-value="2"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeStatus(scope.row)"
              v-permission="131"
              :disabled="scope.row.is_default == 1"
            />
          </template>
        </el-table-column>

        <el-table-column :label="t('table.record')" align="center" width="300">
          <template #default="scope">
            <el-input
              :value="scope.row.scan_record"
              placeholder="Please input"
              readonly
              class="styel-inp record"
            >
              <template #append>
                <a :href="scope.row.scan_record" target="_blank" class="link">
                  <font-awesome-icon icon="fa-solid fa-link" />
                </a>
              </template>
            </el-input>
          </template>
        </el-table-column>

        <el-table-column
          :label="t('table.privateKey')"
          align="center"
          width="300"
        >
          <template #default="scope">
            <!-- {{ scope.row.private_key }} -->
            <el-input
              :value="scope.row.private_key"
              placeholder="Please input"
              readonly
              class="styel-inp"
              v-permission="16"
            >
              <template #append>
                <el-button
                  type="primary"
                  circle
                  @click="showAuthDialog(scope.row)"
                >
                  <span style="color: rgb(18, 102, 199)">{{
                    t("table.show")
                  }}</span>
                </el-button>
              </template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address_type"
          :label="t('table.walletType')"
          align="center"
          width="150"
        />
        <el-table-column
          prop="apr"
          :label="t('table.describe')"
          align="center"
          width="150"
        />

        <el-table-column label="操作" align="center" width="120">
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
                v-permission="14"
              >
                <font-awesome-icon icon="fa-solid fa-file-pen" />
              </el-button>
            </el-tooltip>

            <!-- <el-tooltip
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
                disabled
                v-permission="15"
              >
                <font-awesome-icon icon="fa-solid fa-trash" />
              </el-button>
            </el-tooltip> -->
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

  <el-dialog
    v-model="googleAuthDialog"
    title="Google authenticatin"
    width="30%"
  >
    <el-form label-width="100px" ref="authDialogRef" :model="googleAuthForm">
      <el-form-item
        label="OTP:"
        prop="otp"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="googleAuthForm.otp" placeholder="" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <div>
          <el-button @click="googleAuthDialog = false">Cancel</el-button>
          <el-button type="primary" @click="confirmAuthDialog(authDialogRef)">
            Confirm
          </el-button>
        </div>
      </span>
    </template>
  </el-dialog>

  <Dialog
    :show="showDialog"
    @closed="closeDialog"
    @created="search"
    :title="dialog.dialogTitle"
    :data="dialog.dialogData"
  />
</template>

<script>
import { onMounted, reactive, toRefs, computed, ref } from "vue";
import Dialog from "./dialog.vue";
import http from "@/http";
import { useStore } from "vuex";
import { dateFormat } from "@/utils/timeFormat.js";
import { ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";

export default {
  name: "AuthorizationList",
  components: {
    Dialog,
  },
  setup() {
    const { t } = useI18n();
    const state = reactive({
      isLoading: true,
      showDialog: false,
      googleAuthDialog: false,
      filterForm: {
        address_type: "",
      },
      googleAuthForm: {
        id: 0,
        otp: "",
      },
      pageList: [10, 20, 60, 80, 100],
      param: {
        page: 1,
        page_size: 10,
      },
      bankLists: [],
      total: 0,
      dialog: {
        dialogTitle: "",
        dialogData: {},
      },

      addressTypeOptions: [
        {
          value: "",
          label: t("common.all"),
        },
        {
          value: "ETH",
          label: "ETH",
        },
        {
          value: "TRX",
          label: "TRX",
        },
      ],
      selectedLists: [],
      isShowSearch: false,
    });

    const authDialogRef = ref();

    // const tableList = useTableData(http.platformwallet.getBankList);

    const getAuthorizationList = () => {
      state.isLoading = true;
      http.platformwallet.getBankList(state.param).then((res) => {
        if (res.data.err_code == 0) {
          state.bankLists = res.data.data.banks;
          state.total = res.data.data.total;
          state.isLoading = false;
        }
      });
    };

    const store = useStore();

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
      if (state.filterForm.wallet_address) {
        state.param.wallet_address = state.filterForm.wallet_address;
      }
      if (state.filterForm.address_type) {
        state.param.address_type = state.filterForm.address_type;
      }
      if (state.filterForm.apr) {
        state.param.apr = state.filterForm.apr;
      }
    };

    const onSizeChange = (val) => {
      state.param.page_size = val;
      getAuthorizationList();
      // tableList.setParams(state.param);
    };
    const onCurrentChange = (val) => {
      state.param.page = val;
      getAuthorizationList();
      // tableList.setParams(state.param);
    };

    const deleteHandler = (id) => {
      ElMessageBox.confirm(t("common.sureDelete"), t("common.warning"), {
        confirmButtonText: t("common.sure"),
        cancelButtonText: t("common.cancle"),
        type: "warning",
        draggable: true,
      })
        .then(() => {
          http.platformwallet.deleteBankList({ ids: [id] }).then((res) => {
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
      getAuthorizationList();
      // tableList.setParams(state.param);
    };

    const showAuthDialog = (row) => {
      state.googleAuthDialog = true;
      state.googleAuthForm.id = row.id;
    };

    const confirmAuthDialog = (formRef) => {
      formRef.validate((valid) => {
        if (valid) {
          http.platformwallet
            .getBankPrivateKey(state.googleAuthForm)
            .then((res) => {
              if (res.data.err_code == 0) {
                let modifyId = res.data.data.id;
                let indexOfBank = state.bankLists.findIndex(
                  (item) => item.id == modifyId
                );
                state.bankLists[indexOfBank] = res.data.data;
                state.googleAuthDialog = false;
                state.googleAuthForm = {
                  id: 0,
                  otp: "",
                };
              } else {
                ElMessage.error(res.data.err_msg);
              }
            });
          // .catch((err) => {
          //   ElMessage.error(err.err_msg);
          // });
        }
      });
    };
    const onTableSelectionChange = (val) => {
      state.selectedLists = val.map((item) => item.id);
    };

    const bulkDelete = () => {
      ElMessageBox.confirm(t("common.sureDelete"), t("common.warning"), {
        confirmButtonText: t("common.sure"),
        cancelButtonText: t("common.cancle"),
        type: "warning",
        draggable: true,
      })
        .then(() => {
          http.platformwallet
            .deleteBankList({ ids: state.selectedLists })
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

    const changeStatus = (row) => {
      console.log("state change ", row.is_default);

      ElMessageBox.confirm(t("common.sureSave"), t("common.warning"), {
        confirmButtonText: t("common.sure"),
        cancelButtonText: t("common.cancle"),
        type: "warning",
        draggable: true,
      })
        .then(() => {
          console.log("Change status");
          let param = {
            wallet_address: row.wallet_address,
          };
          http.platformwallet.setDefaultBank(param).then((res) => {
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

    onMounted(() => {
      getAuthorizationList();
    });

    return {
      t,
      ...toRefs(state),
      addNew,
      handleEdit,
      closeDialog,
      dateFormat,
      // tableList,
      search,
      onSizeChange,
      onCurrentChange,
      deleteHandler,
      windowRect: computed(() => store.state.app.windowRect),
      device: computed(() => store.state.app.device),
      showAuthDialog,
      confirmAuthDialog,
      authDialogRef,
      onTableSelectionChange,
      bulkDelete,
      searchShow,
      changeStatus,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.styel-inp .el-input__wrapper) {
  border: 1px solid #999;
}
:deep(.el-input-group__append) {
  border: 1px solid #999;
  border-left: none;
}
:deep(.el-input-group__append) {
  color: rgb(255, 255, 255);
}
.top-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
