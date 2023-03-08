<template>
  <div v-loading="tableList.tableData.isLoading">
    <div class="form" v-show="isShowSearch">
      <div class="form-content" v-permission="87">
        <el-form label-position="top" label-width="200px">
          <el-form-item :label="t('table.userId')">
            <el-input
              :placeholder="t('table.userId')"
              v-model="filterForm.id"
            />
          </el-form-item>
          <el-form-item :label="t('table.recieveAddress')">
            <el-input
              :placeholder="t('table.recieveAddress')"
              v-model="filterForm.wallet_address"
            />
          </el-form-item>

          <el-form-item :label="t('table.walltetType')">
            <el-select
              v-model="filterForm.address_type"
              :multiple="false"
              allow-create
            >
              <el-option
                v-for="(item, index) in addressOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('table.status')">
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

          <el-form-item :label="t('table.remark')">
            <el-input
              :placeholder="t('table.remark')"
              v-model="filterForm.wallet_address"
            />
          </el-form-item>

          <!-- <el-form-item label="提现金额">
            <el-input
              placeholder="10-100"
              v-model="filterForm.withdraw_amount"
            />
          </el-form-item> -->

          <!-- <el-form-item label="手续费">
            <el-input placeholder="10-100" v-model="filterForm.fee" />
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

    <div class="table" v-permission="87">
      <div class="top-panel">
        <div class="left"></div>
        <div class="right">
          <el-button
            @click="handlerExport"
            style="margin-bottom: 25px"
            type="warning"
            v-permission="87"
          >
            <font-awesome-icon icon="fa-solid fa-download" />
          </el-button>
          <el-button
            @click="searchShow"
            style="margin-bottom: 25px"
            type="info"
            v-permission="87"
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
          prop="wallet_address"
          :label="t('table.recieveAddress')"
          align="center"
          width="380"
        />
        <el-table-column
          prop="remark"
          :label="t('table.remark')"
          align="center"
        />
        <el-table-column
          prop="withdraw_amount"
          :label="t('table.withdrawAmount')"
          align="center"
          width="150"
        />
        <el-table-column
          prop="withdraw_amount"
          :label="t('table.actualAmount')"
          align="center"
          width="150"
        />
        <el-table-column prop="fee" :label="t('table.fee')" align="center" />
        <el-table-column :label="t('table.status')" align="center" width="130">
          <template #default="scope">
            <span :class="`state state${scope.row.state}`">
              {{ filterState(scope.row.state) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ip_address"
          label="IP"
          align="center"
          width="130"
        />
        <el-table-column
          prop="area"
          :label="t('table.area')"
          align="center"
          width="150"
        />
        <el-table-column
          :label="t('table.createTime')"
          align="center"
          width="160"
        >
          <template #default="scope">
            {{ dateFormat(scope.row.created_at) }}
          </template>
        </el-table-column>

        <el-table-column
          :label="t('common.operate')"
          align="center"
          width="120"
        >
          <template #default="scope">
            <el-tooltip
              class="box-item"
              :content="t('table.agree')"
              placement="top"
              effect="customized"
              v-if="scope.row.state == 1"
            >
              <el-button
                type="primary"
                style="margin-left: 0px; margin-bottom: 5px"
                circle
                @click="handleApprove(scope.row, 1)"
                v-permission="88"
              >
                <font-awesome-icon icon="fa-solid fa-check" />
              </el-button>
            </el-tooltip>

            <el-tooltip
              class="box-item"
              :content="t('table.reject')"
              placement="top"
              effect="customized"
              v-if="scope.row.state == 1"
            >
              <el-button
                type="danger"
                circle
                style="margin-bottom: 5px"
                @click="handleApprove(scope.row, 2)"
                v-permission="88"
              >
                <!-- <font-awesome-icon icon="fa-solid fa-rectangle-xmark" /> -->
                <font-awesome-icon icon="fa-solid fa-xmark" />
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
</template>

<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import http from "@/http";
import { useStore } from "vuex";
import useTableData from "@/hooks/useTableData.js";
import { dateFormat } from "@/utils/timeFormat.js";
import { ElMessageBox, ElMessage } from "element-plus";
import ExportData2Excel from "./export.js";
import { useI18n } from "vue-i18n";

export default {
  name: "WithdrawalList",
  components: {},
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
      addressOptions: [
        {
          value: "ETH",
          label: "ETH",
        },
        {
          value: "TRX",
          label: "TRX",
        },
      ],

      stateOptions: [
        {
          value: 1,
          label: t("table.processing"),
        },
        {
          value: 2,
          label: t("table.complete"),
        },
        {
          value: 3,
          label: t("table.rejected"),
        },
      ],

      isShowSearch: false,
      selectedExportLists: [],
    });

    const tableList = useTableData(http.financialManagement.getWithdrawalList);

    const store = useStore();

    const filterState = (val) => {
      switch (val) {
        case 1:
          return t("table.processing");
        case 2:
          return t("table.complete");
        case 3:
          return t("table.rejected");
        default:
          break;
      }
    };

    const filter = () => {
      state.param = {
        page: 1,
      };
      if (state.filterForm.id) {
        state.param.user_id = parseInt(state.filterForm.id);
      }
      if (state.filterForm.wallet_address) {
        state.param.wallet_address = state.filterForm.wallet_address;
      }
      if (state.filterForm.address_type) {
        state.param.address_type = state.filterForm.address_type;
      }
      if (state.filterForm.remark) {
        state.param.remark = state.filterForm.remark;
      }
      if (state.filterForm.withdraw_amount) {
        let myArray = state.filterForm.withdraw_amount.split("-");
        state.param.withdraw_amount_from = parseFloat(myArray[0]);
        state.param.withdraw_amount_to = parseFloat(myArray[1]);
      }
      if (state.filterForm.fee) {
        let myArray = state.filterForm.fee.split("-");
        state.param.fee_from = parseFloat(myArray[0]);
        state.param.fee_to = parseFloat(myArray[1]);
      }
      if (state.filterForm.state) {
        state.param.state = state.filterForm.state;
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

    const handleApprove = (row, val) => {
      let approve;
      if (val == 1) {
        approve = t("table.confirmTeansition");
      } else {
        approve = t("table.declineTransition");
      }
      ElMessageBox.confirm(approve, t("common.warning"), {
        confirmButtonText: t("common.sure"),
        cancelButtonText: t("common.cancle"),
        type: "warning",
        draggable: true,
      })
        .then(() => {
          let param = {
            id: row.id,
            wallet_address: row.wallet_address,
            state: val == 1 ? 2 : 3,
          };
          http.financialManagement.acceptwithDrawal(param).then((res) => {
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
            message: "Canceled",
          });
        });
    };

    const search = () => {
      filter();
      if (state.param.withdraw_amount_from > state.param.withdraw_amount_to) {
        ElMessage.error("from value should not greather than to value");
        return;
      }
      if (state.param.fee_from > state.param.fee_to) {
        ElMessage.error("from value should not greather than to value");
        return;
      }
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
        http.financialManagement.getWithdrawalList(state.param).then((res) => {
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
      dateFormat,
      tableList,
      search,
      onSizeChange,
      onCurrentChange,
      windowRect: computed(() => store.state.app.windowRect),
      device: computed(() => store.state.app.device),
      handleApprove,
      filterState,
      searchShow,
      onTableSelectionChange,
      handlerExport,
    };
  },
};
</script>

<style lang="scss" scoped>
.state {
  color: #fff;
  padding: 3px 7px;
  border-radius: 10px;
}
.state1 {
  background: $pending;
}
.state2 {
  background: $success;
}
.state3 {
  background: $fail;
}

.top-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
