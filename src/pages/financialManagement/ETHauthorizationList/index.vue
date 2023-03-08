<template>
  <div v-loading="tableList.tableData.isLoading">
    <div class="form" v-show="isShowSearch">
      <div class="form-content" v-permission="21">
        <el-form label-position="top" label-width="300px">
          <el-form-item label="ID">
            <el-input placeholder="ID" v-model="filterForm.id" />
          </el-form-item>

          <el-form-item :label="t('table.remark')">
            <el-input
              :placeholder="t('table.remark')"
              v-model="filterForm.remark"
            />
          </el-form-item>

          <el-form-item :label="t('table.userWalletAddress')">
            <el-input
              :placeholder="t('table.userWalletAddress')"
              v-model="filterForm.user_wallet_address"
            />
          </el-form-item>

          <el-form-item :label="t('table.type')">
            <el-select
              v-model="filterForm.address_type"
              :multiple="false"
              allow-create
            >
              <el-option
                v-for="(item, index) in walletTypeOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('table.authTime')">
            <!-- <el-input
              placeholder="1-100"
              v-model="filterForm.authorization_times"
            /> -->
            <div class="from-to">
              <el-input
                :placeholder="t('table.authTime')"
                class="filter-inp"
                v-model="filterForm.authorization_times_from"
              />
              <span class="between">-</span>
              <el-input
                :placeholder="t('table.authTime')"
                class="filter-inp"
                v-model="filterForm.authorization_times_to"
              />
            </div>
          </el-form-item>

          <el-form-item label="USDT">
            <!-- <el-input placeholder="1-100" v-model="filterForm.usdt" />
             -->
            <div class="from-to">
              <el-input
                placeholder="USDT"
                class="filter-inp"
                v-model="filterForm.usdt_from"
              />
              <span class="between">-</span>
              <el-input
                placeholder="USDT"
                class="filter-inp"
                v-model="filterForm.usdt_to"
              />
            </div>
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

    <div class="table" v-permission="21">
      <div class="top-panel">
        <div class="left"></div>
        <div class="right">
          <el-button
            @click="handlerExport"
            style="margin-bottom: 25px"
            type="warning"
            v-permission="21"
          >
            <font-awesome-icon icon="fa-solid fa-download" />
          </el-button>
          <el-button
            @click="searchShow"
            style="margin-bottom: 25px"
            type="info"
            v-permission="21"
          >
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </el-button>
        </div>
      </div>
      <el-table
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
          show-overflow-tooltip
          header-align="center"
          align="center"
        />
        <el-table-column prop="id" label="ID" align="center" />
        <el-table-column
          prop="user_id"
          :label="t('table.userId')"
          align="center"
        />

        <el-table-column
          prop="bank_id"
          :label="t('table.authorizedWalletID')"
          align="center"
          width="165"
        />

        <el-table-column
          prop="usdt"
          :label="t('table.walletBalance') + ' (USDT)'"
          align="center"
          width="200"
        />

        <el-table-column
          prop="user_wallet_address"
          :label="t('table.userWalletAddress')"
          align="center"
          width="350"
        />

        <el-table-column
          prop="address_type"
          :label="t('table.type')"
          align="center"
        ></el-table-column>

        <el-table-column
          :label="t('table.authorizedCount')"
          align="center"
          width="100"
        >
          <template #default="scope">
            {{ scope.row.authorized_count ? scope.row.authorized_count : "0" }}
          </template>
        </el-table-column>

        <el-table-column
          :label="t('table.viewAuth')"
          align="center"
          width="300"
        >
          <template #default="scope">
            <el-input
              :value="scope.row.scan_address"
              placeholder="Please input"
              readonly
              class="styel-inp"
            >
              <template #append>
                <a :href="scope.row.scan_address" target="_blank" class="link">
                  <font-awesome-icon icon="fa-solid fa-link" />
                </a>
              </template>
            </el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="amount"
          :label="t('dashboard.fundsCollections')"
          align="center"
          width="200"
        />
        <el-table-column
          prop="authorization_times"
          :label="t('table.transactionCount')"
          align="center"
          width="110"
        />
        <el-table-column
          prop="id"
          :label="t('table.viewAuthRec')"
          align="center"
          width="300"
        >
          <template #default="scope">
            <!-- <a :href="scope.row.scan_record" target="_blank">{{
              scope.row.scan_record
            }}</a> -->

            <el-input
              :value="scope.row.scan_record"
              placeholder="Please input"
              readonly
              class="styel-inp"
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
          prop="remark"
          :label="t('table.remark')"
          align="center"
        />
        <el-table-column prop="ip" label="IP" align="center" width="200" />
        <el-table-column
          prop="area"
          :label="t('table.area')"
          align="center"
          width="200"
        />
        <el-table-column
          :label="t('table.createTime')"
          align="center"
          width="200"
        >
          <template #default="scope">
            {{ dateFormat(scope.row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="t('table.updateTime')"
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
          width="200"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              type="primary"
              style="margin-left: 10px; margin-bottom: 5px"
              @click="handleTransferFrom(scope.row)"
              size="small"
              v-permission="19"
            >
              {{ t("table.updateWalletBalance") }}
            </el-button>

            <el-button
              type="primary"
              style="margin-left: 10px; margin-bottom: 5px"
              @click="handleEdit(scope.row)"
              size="small"
              v-permission="22"
            >
              {{ t("table.transfer") }}
            </el-button>
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
  name: "Admin",
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

    const tableList = useTableData(
      http.financialManagement.getETHauthorization
    );

    const store = useStore();

    const addNew = () => {
      state.dialog.dialogTitle = t("common.addto");
      state.dialog.dialogData = {};
      state.showDialog = true;
    };

    const handleEdit = (row) => {
      state.dialog.dialogTitle = t("table.transfer");
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

      if (state.filterForm.remark) {
        state.param.remark = state.filterForm.remark;
      }

      if (state.filterForm.user_wallet_address) {
        state.param.user_wallet_address = state.filterForm.user_wallet_address;
      }

      if (state.filterForm.address_type) {
        state.param.address_type = state.filterForm.address_type;
      }

      if (state.filterForm.authorization_times_from) {
        state.param.authorization_times_from = parseFloat(
          state.filterForm.authorization_times_from
        );
      }

      if (state.filterForm.authorization_times_to) {
        state.param.authorization_times_to = parseFloat(
          state.filterForm.authorization_times_to
        );
      }

      if (state.filterForm.usdt_from) {
        state.param.usdt_from = parseFloat(state.filterForm.usdt_from);
      }

      if (state.filterForm.usdt_to) {
        state.param.usdt_to = parseFloat(state.filterForm.usdt_to);
      }

      // if (state.filterForm.authorization_times) {
      //   let myArray = state.filterForm.authorization_times.split("-");
      //   state.param.authorization_times_from = parseFloat(myArray[0]);
      //   state.param.authorization_times_to = parseFloat(myArray[1]);
      // }

      // if (state.filterForm.usdt) {
      //   let myArray = state.filterForm.usdt.split("-");
      //   state.param.usdt_from = parseFloat(myArray[0]);
      //   state.param.usdt_to = parseFloat(myArray[1]);
      // }
    };

    const onSizeChange = (val) => {
      state.param.page_size = val;
      tableList.setParams(state.param);
    };
    const onCurrentChange = (val) => {
      state.param.page = val;
      tableList.setParams(state.param);
    };

    const handleTransferFrom = (row) => {
      // ElMessageBox.confirm("确定更新用户钱包余额吗?", "信息", {
      //   confirmButtonText: "OK",
      //   cancelButtonText: "Cancel",
      //   type: "warning",
      //   draggable: true,
      // })
      //   .then(() => {
      http.financialManagement
        .updateETHBalance({ id: parseInt(row.id) })
        .then((res) => {
          if (res.data.err_code == 0) {
            ElMessage.success(res.data.err_msg);
            search();
          } else {
            ElMessage.error(res.data.err_msg);
          }
        });
      // })
      // .catch(() => {
      //   ElMessage({
      //     type: "info",
      //     message: "Canceled",
      //   });
      // });
    };

    const search = () => {
      filter();
      state.param.page_size = 10;
      tableList.setParams(state.param);
    };

    const searchShow = () => {
      if (state.isShowSearch) {
        state.isShowSearch = false;
      } else {
        state.isShowSearch = true;
      }
    };

    const onTableSelectionChange = (val) => {
      state.selectedLists = val.map((item) => item.id);
      state.selectedExportLists = val;
    };

    const handlerExport = () => {
      tableList.tableData.isLoading = true;
      let data = [];
      if (state.selectedExportLists.length != 0) {
        data = state.selectedExportLists;
        exporttttt(data);
      } else {
        state.param.page_size = tableList.tableData.total;
        http.financialManagement
          .getETHauthorization(state.param)
          .then((res) => {
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
      t,
      ...toRefs(state),
      addNew,
      handleEdit,
      closeDialog,
      dateFormat,
      tableList,
      search,
      onSizeChange,
      onCurrentChange,
      windowRect: computed(() => store.state.app.windowRect),
      device: computed(() => store.state.app.device),
      handleTransferFrom,
      searchShow,
      handlerExport,
      onTableSelectionChange,
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

.top-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.from-to {
  display: flex;
  align-items: center;
  .filter-inp {
    width: 150px;
  }
  .between {
    margin: 0 10px;
  }
}
</style>
