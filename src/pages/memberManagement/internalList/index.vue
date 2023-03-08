<template>
  <div v-loading="isLoading">
    <div class="form" v-show="isShowSearch">
      <!-- <div class="form-title">搜索</div> -->
      <div class="form-content">
        <el-form label-position="top" label-width="300px" v-permission="117">
          <el-form-item :label="t('common.userID')">
            <el-input
              :placeholder="t('common.userID')"
              v-model="filterForm.user_id"
            />
          </el-form-item>

          <el-form-item :label="t('table.groupName')">
            <el-select
              v-model="filterForm.group_id"
              :multiple="false"
              allow-create
              :placeholder="t('table.groupName')"
            >
              <el-option
                v-for="(item, index) in groupLists"
                :key="index"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('table.isAuth')">
            <el-select
              v-model="filterForm.is_authorized"
              :multiple="false"
              allow-create
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

          <el-form-item :label="t('table.walletInfo')">
            <el-input
              :placeholder="t('table.walletInfo')"
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

          <el-form-item :label="t('table.superiorID')">
            <el-input
              :placeholder="t('table.superiorID')"
              v-model="filterForm.invited_by"
            />
          </el-form-item>

          <!-- <el-form-item label="Group:">
            <el-select v-model="filterForm.type" :multiple="false" allow-create>
              <el-option
                v-for="(item, index) in accountTypeOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
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

    <div class="table" v-permission="117">
      <div class="top-panel">
        <div class="left">
          <el-button
            @click="addNew"
            class="app-button"
            style="margin-bottom: 25px"
            v-permission="119"
            ><font-awesome-icon
              icon="fa-solid fa-plus"
              style="margin-right: 5px"
            />
            {{ t("common.addto") }}
          </el-button>
        </div>
        <div class="right">
          <el-button
            v-permission="117"
            @click="handlerExport"
            style="margin-bottom: 25px"
            type="warning"
          >
            <font-awesome-icon icon="fa-solid fa-download" />
          </el-button>
          <el-button
            v-permission="117"
            @click="searchShow"
            style="margin-bottom: 25px"
            type="info"
          >
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </el-button>
        </div>
      </div>

      <!-- <div class="show-total">
        <p class="text">
          {{ t("common.totalWalletBalance") }} :
          <span class="value">
            {{
              totalWalletBalance
                ? parseFloat(totalWalletBalance).toFixed(4)
                : "0.00"
            }}
            USDT
          </span>
        </p>
      </div> -->

      <el-table
        :data="tableList"
        :row-style="{ height: '55px' }"
        :header-row-style="{ height: '55px' }"
        :border="true"
        @selection-change="onTableSelectionChange"
        height="70vh"
        style="width: 100%"
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column
          type="selection"
          width="50"
          show-overflow-tooltip
          header-align="center"
          align="center"
        />
        <el-table-column prop="user_id" label="ID" align="center" />
        <el-table-column
          prop="name"
          :label="t('table.groupName')"
          align="center"
          width="150"
        />
        <!-- <el-table-column prop="url" label="域名" align="center" width="200" /> -->

        <el-table-column
          :label="t('table.superiorID')"
          align="center"
          width="130"
        >
          <template #default="scope">
            {{ scope.row.invited_by ? scope.row.invited_by : "--" }}
          </template>
        </el-table-column>
        <el-table-column
          :label="t('table.accountType')"
          align="center"
          width="130"
        >
          <template #default="scope">
            {{ filterUserType(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          :label="t('table.isAuth')"
          align="center"
          width="130"
        >
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
          :label="t('table.withdraw')"
          align="center"
          width="158"
        >
          <template #default="scope">
            {{
              scope.row.withdraw == 2 ? t("common.turnOff") : t("common.turnOn")
            }}
          </template>
        </el-table-column>
        <el-table-column
          :label="t('table.userWallet')"
          align="center"
          width="220"
        >
          <template #default="scope">
            {{ t("table.walletBalance") }}：
            {{ parseFloat(scope.row.wallet_balance).toFixed(4) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          :label="t('table.walletInfo')"
          align="center"
          width="400"
        >
          <template #default="scope">
            {{ t("table.walletAddress") }} : {{ scope.row.wallet_address
            }}<br />
            <span v-if="scope.row.is_authorized == 1">
              {{ t("table.authAddress") }}： {{ scope.row.authorized_wallet
              }}<br />
              {{ t("table.authIP") }}：{{ scope.row.authorized_ip }}<br />
              {{ t("table.authTime") }}：
              {{ dateFormat(scope.row.authorized_date) }}<br />
            </span>
          </template>
        </el-table-column>

        <el-table-column
          :label="t('table.authorizedCount')"
          align="center"
          width="150"
        >
          <template #default="scope">
            {{ scope.row.authorized_count ? scope.row.authorized_count : "0" }}
          </template>
        </el-table-column>

        <el-table-column
          prop="address_type"
          :label="t('table.type')"
          align="center"
        />

        <el-table-column label="USDT" align="center" width="230">
          <template #default="scope">
            <!-- 总额：{{ parseFloat(scope.row.usdt_total).toFixed(4) }} <br /> -->
            {{ t("common.total") }}：{{
              parseFloat(
                scope.row.usdt_balance + scope.row.usdt_freeze
              ).toFixed(4)
            }}
            <br />
            {{ t("common.balance") }}：{{
              parseFloat(scope.row.usdt_balance).toFixed(4)
            }}<br />
            {{ t("common.freeze") }}：{{
              parseFloat(scope.row.usdt_freeze).toFixed(4)
            }}
          </template>
        </el-table-column>
        <el-table-column label="ETH" align="center" width="230">
          <template #default="scope">
            {{ t("common.total") }}:
            {{
              scope.row.address_type == "ETH"
                ? parseFloat(scope.row.eth_total_balance).toFixed(8)
                : "0"
            }}
            <br />
            {{ t("common.balance")
            }}{{
              scope.row.address_type == "ETH"
                ? parseFloat(scope.row.eth_balance).toFixed(8)
                : "0"
            }}
          </template>
        </el-table-column>
        <el-table-column label="TRX" align="center" width="200">
          <template #default="scope">
            {{ t("common.total") }}:
            {{
              scope.row.address_type == "TRX"
                ? parseFloat(scope.row.trx_total_revenue).toFixed(6)
                : "0.00"
            }}
            <br />
            {{ t("common.balance") }}：{{
              scope.row.address_type == "TRX"
                ? parseFloat(scope.row.trx_balance).toFixed(6)
                : "0.00"
            }}
          </template>
        </el-table-column>

        <el-table-column
          prop="level"
          :label="t('table.level')"
          align="center"
        />

        <el-table-column
          prop="remark"
          :label="t('common.remark')"
          align="center"
          width="200"
        />

        <el-table-column :label="t('table.ipArea')" align="center" width="150">
          <template #default="scope">
            IP: {{ scope.row.ip_address }}
            <br />
            {{ t("table.area") }}: {{ scope.row.area }}
          </template>
        </el-table-column>
        <el-table-column
          :label="t('table.joinTime')"
          align="center"
          width="160"
        >
          <template #default="scope">
            {{ dateFormat(scope.row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="t('table.lastLoginTime')"
          align="center"
          width="160"
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
              style="margin-bottom: 5px"
              size="small"
              round
              @click="handlePledge(scope.row)"
              v-permission="125"
            >
              {{ t("table.pledge") }}
            </el-button>
            <el-button
              type="primary"
              style="margin-bottom: 5px"
              size="small"
              v-show="
                scope.row.gate_way_state === 2 &&
                scope.row.address_type == 'TRX'
              "
              round
              @click="sendTRXhandler(scope.row.user_id)"
              v-permission="81"
            >
              TRX
            </el-button>

            <el-button
              type="primary"
              style="margin-bottom: 5px"
              size="small"
              v-show="
                scope.row.gate_way_state === 2 &&
                scope.row.address_type == 'ETH'
              "
              round
              @click="sendETHhandler(scope.row.user_id)"
              v-permission="130"
            >
              ETH
            </el-button>

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
                v-permission="121"
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

  <Dialog
    :show="showDialog"
    @closed="closeDialog"
    @created="search"
    :title="dialog.dialogTitle"
    :data="dialog.dialogData"
    :groupData="groupLists"
  />

  <PledgeDialog
    :show="showPledgeDialog"
    @closed="closePledgeDialog"
    @created="search"
    :title="pledgeDialog.dialogTitle"
    :data="pledgeDialog.dialogData"
    :flag="pledgeDialog.flag"
  />
</template>

<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import Dialog from "./dialog.vue";
import PledgeDialog from "./pledgeDialog.vue";
import http from "@/http";
import { useStore } from "vuex";
import useTableData from "@/hooks/useTableData.js";
import { dateFormat } from "@/utils/timeFormat.js";
import { ElMessageBox, ElMessage } from "element-plus";
import ExportData2Excel from "./export.js";
import { useI18n } from "vue-i18n";
export default {
  name: "MemberManagement",
  components: {
    Dialog,
    PledgeDialog,
  },
  setup() {
    const { t } = useI18n();
    const state = reactive({
      isLoading: true,
      showDialog: false,
      showPledgeDialog: false,
      filterForm: {},
      pageList: [10, 20, 60, 80, 100],
      param: {
        page: 1,
        page_size: 10,
        type: 2,
      },
      dialog: {
        dialogTitle: "",
        dialogData: {},
      },
      pledgeDialog: {
        dialogTitle: "",
        dialogData: {},
        flag: 0,
      },
      tableList: [],
      total: 0,

      accountTypeOptions: [
        // {
        //   value: 1,
        //   label: "会员",
        // },

        {
          value: 2,
          label: "内部",
        },
        // {
        //   value: 3,
        //   label: "代理",
        // },
      ],

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
      groupLists: [],
      totalWalletBalance: 0,
    });

    /**
     * @FilterUserType
     */
    const filterUserType = (val) => {
      switch (val) {
        case 1:
          return t("table.member");
        case 2:
          return t("table.internal");
        case 3:
          return "代理";
        default:
          return "--";
      }
    };

    const getTableList = () => {
      state.isLoading = true;
      http.memberManagement.getInternalUser(state.param).then((res) => {
        if (res.data.err_code == 0) {
          state.tableList = res.data.data.list;
          state.total = res.data.data.total;
          state.groupLists = res.data.data.groups;
          state.isLoading = false;
          state.totalWalletBalance = res.data.data.total_wallet_balance;
        }
      });
    };

    // const getGroupList = () => {
    //   let param = {
    //     page: 1,
    //     page_size: 100,
    //   };
    //   http.memberManagement.getGroups(param).then((res) => {
    //     state.isLoading = true;
    //     if (res.data.err_code == 0) {
    //       let defaultGP = {
    //         admin: null,
    //         admin_id: 1,
    //         created_at: "2022-10-31T14:56:55.872+08:00",
    //         id: 0,
    //         name: "默认组",
    //         updated_at: "2022-10-31T17:50:17.003+08:00",
    //         url: "douyou.cici02.com",
    //       };
    //       // state.groupLists = [defaultGP, ...res.data.data.groups];
    //       state.groupLists = res.data.data.groups;

    //       state.isLoading = false;
    //     }
    //   });
    // };

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

    const handlePledge = (row) => {
      state.isLoading = true;
      http.memberManagement
        .getCheckPledge({
          user_id: row.user_id,
          address_type: row.address_type,
        })
        .then((res) => {
          if (res.data.err_code === 0) {
            state.pledgeDialog.flag = res.data.data.flag;

            if (state.pledgeDialog.flag == 0) {
              state.pledgeDialog.dialogTitle = t("table.setUpPledge");
              state.pledgeDialog.dialogData = {
                user_id: row.user_id,
                address_type: row.address_type,
                wallet_balance: row.wallet_balance,
              };
            } else {
              state.pledgeDialog.dialogTitle = t("table.setUpPledge");
              state.pledgeDialog.dialogData = res.data.data.data;
            }
            state.isLoading = false;
            state.showPledgeDialog = true;
          }
        });
    };

    const closePledgeDialog = () => {
      state.showPledgeDialog = false;
    };

    const filter = () => {
      // state.param = {
      //   page: 1,
      //   type: 2,
      // };
      if (state.filterForm.user_id) {
        state.param.user_id = parseInt(state.filterForm.user_id);
      }
      if (state.filterForm.group_id) {
        state.param.group_id = parseInt(state.filterForm.group_id);
      }
      if (state.filterForm.type) {
        state.param.type = parseInt(state.filterForm.type);
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
      if (state.filterForm.invited_by) {
        state.param.invited_by = parseInt(state.filterForm.invited_by);
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

    const sendETHhandler = (id) => {
      ElMessageBox.confirm(t("common.sureToGiveETH"), t("common.warning"), {
        confirmButtonText: t("common.sure"),
        cancelButtonText: t("common.cancle"),
        type: "warning",
        draggable: true,
      })
        .then(() => {
          http.memberManagement
            .sendGatewayEthInternal({ user_id: id })
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
            message: t("common.cancle"),
          });
        });
    };

    const sendTRXhandler = (id) => {
      ElMessageBox.confirm(t("common.sureToGiveTRX"), t("common.warning"), {
        confirmButtonText: t("common.sure"),
        cancelButtonText: t("common.cancle"),
        type: "warning",
        draggable: true,
      })
        .then(() => {
          http.memberManagement
            .sendGatewayTrxInternal({ user_id: id })
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
            message: t("common.cancle"),
          });
        });
    };

    const deleteHandler = (id) => {
      ElMessageBox.confirm("Are you sure to delete this?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
        draggable: true,
      })
        .then(() => {
          http.moneyManagement.deleteBankList({ id: id }).then((res) => {
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
        http.memberManagement.getInternalUser(state.param).then((res) => {
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
          state.isLoading = false;
        })
        .catch((err) => {
          state.param.page_size = 10;
          search();
          state.isLoading = false;
        });
    };
    const getSummaries = (param) => {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 7) {
          sums[index] = t("common.totalWalletBalance");
          return;
        }
        if (index === 8) {
          sums[index] = ` ${
            state.totalWalletBalance
              ? parseFloat(state.totalWalletBalance).toFixed(4)
              : "0.00"
          }`;
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => Number.isNaN(value))) {
          // sums[index] = `$ ${values.reduce((prev, curr) => {
          //   const value = Number(curr);
          //   if (!Number.isNaN(value)) {
          //     return prev + curr;
          //   } else {
          //     return prev;
          //   }
          // }, 0)}`;
        } else {
          sums[index] = "";
        }
      });

      return sums;
    };

    onMounted(() => {
      // getGroupList();
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
      filterUserType,
      handlePledge,
      closePledgeDialog,
      sendTRXhandler,
      sendETHhandler,
      searchShow,
      onTableSelectionChange,
      handlerExport,
      t,
      getSummaries,
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
.show-total {
  margin-bottom: 30px;
  padding: 0 30px;
  .text {
    color: rgb(51, 51, 51);
  }
  .value {
    color: rgb(82, 35, 35);
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
