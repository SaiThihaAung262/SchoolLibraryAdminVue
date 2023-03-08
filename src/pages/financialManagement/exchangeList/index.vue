<template>
  <div v-loading="tableList.tableData.isLoading">
    <div class="form" v-show="isShowSearch">
      <div class="form-content" v-permission="23">
        <el-form label-position="top" label-width="200px">
          <el-form-item :label="t('table.userId')">
            <el-input
              :placeholder="t('table.userId')"
              v-model="filterForm.id"
            />
          </el-form-item>
          <el-form-item :label="t('table.walletInfo')">
            <el-input
              :placeholder="t('table.walletInfo')"
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
                v-for="(item, index) in addressOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="Exchange Amount">
            <el-input
              placeholder="10-100"
              v-model="filterForm.exchange_amount"
            />
          </el-form-item> -->

          <!-- <el-form-item label="USDT Balance">
            <el-input placeholder="10-100" v-model="filterForm.usdt_balance" />
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

    <div class="table" v-permission="23">
      <div class="top-panel">
        <div class="left"></div>
        <div class="right">
          <el-button
            @click="handlerExport"
            style="margin-bottom: 25px"
            type="warning"
            v-permission="23"
          >
            <font-awesome-icon icon="fa-solid fa-download" />
          </el-button>
          <el-button
            @click="searchShow"
            style="margin-bottom: 25px"
            type="info"
            v-permission="23"
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
        <el-table-column prop="remark" :label="t('table.remak')" align="center">
          <template #default="scope">
            <span>{{ scope.row.remark || "--" }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="address_type"
          :label="t('table.type')"
          align="center"
        />
        <el-table-column
          prop="wallet_address"
          :label="t('table.walletAddress')"
          align="center"
          width="380"
        />
        <el-table-column :label="t('table.amount')" align="center" width="200">
          <template #default="scope">
            {{ parseFloat(scope.row.exchange_amount).toFixed(4) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="t('table.USDTamount')"
          align="center"
          width="200"
        >
          <template #default="scope">
            {{ parseFloat(scope.row.usdt_balance).toFixed(4) }}
          </template>
        </el-table-column>
        <el-table-column :label="t('table.status')" align="center" width="150">
          <template #default="scope">
            <span :class="`state${scope.row.state}`">
              {{ filterState(scope.row.state) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          :label="t('table.createTime')"
          align="center"
          width="200"
        >
          <template #default="scope">
            {{ dateFormat(scope.row.created_at) }}
          </template>
        </el-table-column>

        <!-- <el-table-column
          :label="t('common.operate')"
          align="center"
          width="120"
        >
          <template #default="scope">
            <el-tooltip
              class="box-item"
              content="同意"
              placement="top"
              effect="customized"
            >
              <el-button
                type="primary"
                style="margin-left: 0px; margin-bottom: 5px"
                circle
                @click="handleApprove(scope.row, 1)"
              >
                <font-awesome-icon icon="fa-solid fa-check" />
              </el-button>
            </el-tooltip>

            <el-tooltip
              class="box-item"
              content="拒绝"
              placement="top"
              effect="customized"
            >
              <el-button
                type="danger"
                circle
                style="margin-bottom: 5px"
                @click="handleApprove(scope.row.id, 2)"
              >
                <font-awesome-icon icon="fa-solid fa-rectangle-xmark" />
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
  name: "ExchangeList",
  components: {},
  setup() {
    const { t } = useI18n();
    const state = reactive({
      isLoading: true,
      showDialog: false,
      filterForm: {
        id: "",
        wallet_address: "",
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

      isShowSearch: false,
      selectedExportLists: [],
    });

    const tableList = useTableData(http.financialManagement.getExchangeList);

    const getData = () => {
      // http.user.getExchangeList(state.param).then((res) => {
      // });
    };

    const store = useStore();

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
      if (state.filterForm.exchange_amount) {
        let myArray = state.filterForm.exchange_amount.split("-");
        state.param.exchange_amount_from = parseFloat(myArray[0]);
        state.param.exchange_amount_to = parseFloat(myArray[1]);
      }
      if (state.filterForm.usdt_balance) {
        let myArray = state.filterForm.usdt_balance.split("-");
        state.param.usdt_balance_from = parseFloat(myArray[0]);
        state.param.usdt_balance_to = parseFloat(myArray[1]);
      }
    };

    const filterState = (val) => {
      switch (val) {
        // case 1:
        //   return "待处理";
        case 1:
          return t("table.complete");
        // case 3:
        //   return "已拒绝";
        default:
          break;
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
        approve = t("table.sureToPost");
      } else {
        approve = t("table.declineToPost");
      }
      ElMessageBox.confirm(approve, t("common.warning"), {
        confirmButtonText: t("table.sure"),
        cancelButtonText: t("table.cancle"),
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
          ElMessage({
            type: "info",
            message: "Canceled",
          });
        });
    };

    const search = () => {
      filter();

      if (state.param.usdt_balance_from > state.param.usdt_balance_to) {
        ElMessage.error("from value should not greather than to value");
        return;
      }
      if (state.param.exchange_amount_from > state.param.exchange_amount_to) {
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
        http.financialManagement.getExchangeList(state.param).then((res) => {
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

    onMounted(() => {
      getData();
    });

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
.state1 {
  background: $success;
  padding: 3px 7px;
  color: #fff;
  border-radius: 10px;
}
.state2 {
  background: $success;
  padding: 3px 7px;
  color: #fff;
  border-radius: 10px;
}
.state3 {
  background: $fail;
  padding: 3px 7px;
  color: #fff;
  border-radius: 10px;
}

.top-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
