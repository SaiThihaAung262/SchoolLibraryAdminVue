<template>
  <div v-loading="tableList.tableData.isLoading">
    <div class="form" v-show="isShowSearch">
      <div class="form-content" v-permission="76">
        <el-form label-position="top" label-width="200px">
          <el-form-item :label="t('common.userID')">
            <el-input
              :placeholder="t('common.userID')"
              v-model="filterForm.user_id"
            />
          </el-form-item>
          <el-form-item :label="t('table.walletInfo')">
            <el-input
              :placeholder="t('table.walletInfo')"
              v-model="filterForm.wallet_address"
            />
          </el-form-item>

          <el-form-item :label="t('table.isAuth')">
            <el-select
              v-model="filterForm.is_authorized"
              :multiple="false"
              allow-create
              :placeholder="t('table.isAuth')"
            >
              <el-option
                v-for="(item, index) in authorizedOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('table.income')">
            <el-select
              v-model="filterForm.income"
              :multiple="false"
              allow-create
              :placeholder="t('table.income')"
            >
              <el-option
                v-for="(item, index) in incomeOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('table.withdraw')">
            <el-select
              v-model="filterForm.withdraw"
              :multiple="false"
              allow-create
              :placeholder="t('table.withdraw')"
            >
              <el-option
                v-for="(item, index) in incomeOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
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

          <!-- <el-form-item label="USDT before">
            <el-input placeholder="10-100" v-model="filterForm.before_usdt" />
          </el-form-item>

          <el-form-item label="USDT after">
            <el-input placeholder="10-100" v-model="filterForm.after_usdt" />
          </el-form-item> -->

          <div style="margin-top: 34px" class="buttonBox">
            <el-button class="app-button" @click="search()">
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
                style="margin-right: 5px"
              />

              {{ t("common.search") }}</el-button
            >
          </div>
        </el-form>
      </div>
    </div>

    <div class="table" v-permission="76">
      <div class="top-panel">
        <div class="left"></div>
        <div class="right">
          <el-button
            @click="handlerExport"
            style="margin-bottom: 25px"
            type="warning"
            v-permission="76"
          >
            <font-awesome-icon icon="fa-solid fa-download" />
          </el-button>
          <el-button
            @click="searchShow"
            style="margin-bottom: 25px"
            type="info"
            v-permission="76"
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
          width="50"
          show-overflow-tooltip
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="admin_id"
          :label="t('table.operator')"
          align="center"
          width="190"
        >
          <template #default="scope">
            {{ t("table.operator") }}ID : {{ scope.row.admin_id }} <br />
            {{ t("common.userName") }} : {{ scope.row.admin_username }}
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          :label="t('table.remark')"
          align="center"
          width="160"
        />
        <el-table-column
          prop="user_id"
          :label="t('common.userID')"
          align="center"
        />
        <el-table-column
          prop="address_type"
          :label="t('table.type')"
          align="center"
          width="100"
        />

        <el-table-column
          :label="t('table.accountType')"
          align="center"
          width="130"
        >
          <template #default="scope">
            {{ scope.row.type == 1 ? t("table.member") : t("table.internal") }}
          </template>
        </el-table-column>

        <el-table-column :label="t('table.isAuth')" align="center" width="150">
          <template #default="scope">
            {{
              scope.row.is_authorized == 2 ? t("common.no") : t("common.yes")
            }}
          </template>
        </el-table-column>

        <el-table-column :label="t('table.income')" align="center">
          <template #default="scope">
            {{
              scope.row.income == 2 ? t("common.turnOff") : t("common.turnOn")
            }}
          </template>
        </el-table-column>

        <el-table-column
          width="120"
          :label="t('table.withdraw')"
          align="center"
        >
          <template #default="scope">
            {{
              scope.row.withdraw == 2 ? t("common.turnOff") : t("common.turnOn")
            }}
          </template>
        </el-table-column>

        <el-table-column
          prop="before_wallet_balance"
          :label="t('table.beforeWalletBal')"
          align="center"
          width="130"
        />

        <el-table-column
          prop="after_wallet_balance"
          :label="t('table.afterWalletBal')"
          align="center"
          width="130"
        />

        <!-- <el-table-column
          prop="before_level"
          label="Before Level"
          align="center"
          width="130"
        />
        <el-table-column
          prop="after_level"
          label="After Level"
          align="center"
          width="130"
        /> -->
        <el-table-column
          :label="t('table.beforeFreeze')"
          align="center"
          width="200"
        >
          <template #default="scope">
            {{ parseFloat(scope.row.before_freeze).toFixed(4) }}
          </template>
        </el-table-column>

        <el-table-column
          :label="t('table.afterFreeze')"
          align="center"
          width="200"
        >
          <template #default="scope">
            {{ parseFloat(scope.row.after_freeze).toFixed(4) }}
          </template>
        </el-table-column>

        <el-table-column
          prop="before_usdt_balance"
          :label="t('table.beforeAccChange') + '（USDT）'"
          align="center"
          width="200"
        />

        <el-table-column
          prop="after_usdt_balance"
          :label="t('table.afterAccChange') + '（USDT）'"
          align="center"
          width="200"
        />

        <el-table-column
          prop="before_eth_balance"
          :label="t('table.beforeAccChange') + '（ETH）'"
          align="center"
          width="200"
        />
        <el-table-column
          prop="after_eth_balance"
          :label="t('table.afterAccChange') + '（ETH）'"
          align="center"
          width="200"
        />

        <el-table-column
          prop="before_trx_balance"
          :label="t('table.beforeAccChange') + '（TRX）'"
          align="center"
          width="200"
        />
        <el-table-column
          prop="after_trx_balance"
          :label="t('table.afterAccChange') + '（TRX）'"
          align="center"
          width="200"
        />

        <el-table-column
          prop="wallet_address"
          :label="t('table.walletInfo')"
          align="center"
          width="400"
        />

        <el-table-column
          prop="ip_address"
          label="IP"
          align="center"
          width="130"
        />

        <el-table-column
          :label="t('table.createTime')"
          align="center"
          width="160"
        >
          <template #default="scope">
            {{ dateFormat(scope.row.updated_at) }}
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
  name: "ManagementLog",
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

      authorizedOptions: [
        // {
        //   value: 0,
        //   label: "会员",
        // },
        {
          value: 1,
          label: t("common.yes"),
        },
        {
          value: 2,
          label: t("common.no"),
        },
      ],
      incomeOptions: [
        {
          value: 1,
          label: t("common.turnOn"),
        },
        {
          value: 2,
          label: t("common.turnOff"),
        },
      ],
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

    const tableList = useTableData(http.memberManagement.getManagementLog);

    const store = useStore();

    const filter = () => {
      state.param = {
        page: 1,
      };
      if (state.filterForm.user_id) {
        state.param.user_id = parseInt(state.filterForm.user_id);
      }
      if (state.filterForm.wallet_address) {
        state.param.wallet_address = state.filterForm.wallet_address;
      }
      if (state.filterForm.is_authorized) {
        state.param.is_authorized = parseInt(state.filterForm.is_authorized);
      }
      if (state.filterForm.income) {
        state.param.income = parseInt(state.filterForm.income);
      }
      if (state.filterForm.withdraw) {
        state.param.withdraw = parseInt(state.filterForm.withdraw);
      }
      if (state.filterForm.address_type) {
        state.param.address_type = state.filterForm.address_type;
      }
      if (state.filterForm.before_usdt) {
        let myArray = state.filterForm.before_usdt.split("-");
        state.param.before_usdt_balance_from = parseFloat(myArray[0]);
        state.param.before_usdt_balance_to = parseFloat(myArray[1]);
      }
      if (state.filterForm.after_usdt) {
        let myArray = state.filterForm.after_usdt.split("-");
        state.param.after_usdt_balance_from = parseFloat(myArray[0]);
        state.param.after_usdt_balance_to = parseFloat(myArray[1]);
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

    const search = () => {
      filter();
      if (
        state.param.before_usdt_balance_from >
        state.param.before_usdt_balance_to
      ) {
        ElMessage.error("from value should not greather than to value");
        return;
      }

      if (
        state.param.after_usdt_balance_from > state.param.after_usdt_balance_to
      ) {
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
        http.memberManagement.getManagementLog(state.param).then((res) => {
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

      dateFormat,
      tableList,
      search,
      onSizeChange,
      onCurrentChange,
      windowRect: computed(() => store.state.app.windowRect),
      device: computed(() => store.state.app.device),
      searchShow,
      handlerExport,
      onTableSelectionChange,
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
