<template>
  <div v-loading="isLoading">
    <div class="form" v-show="isShowSearch">
      <!-- <div class="form-title">搜索</div> -->
      <div class="form-content" v-permission="43">
        <el-form label-position="top" label-width="300px">
          <el-form-item :label="t('common.userID')">
            <el-input
              :placeholder="t('common.userID')"
              v-model="filterForm.user_id"
            />
          </el-form-item>

          <el-form-item :label="t('table.state')">
            <el-select
              v-model="filterForm.status"
              :multiple="false"
              allow-create
            >
              <el-option
                v-for="(item, index) in statusOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('table.remark')">
            <el-input
              :placeholder="t('table.remark')"
              v-model="filterForm.remark"
            />
          </el-form-item>

          <el-form-item :label="t('table.pledgeStandard')">
            <!-- <el-input
              placeholder="1-100"
              v-model="filterForm.standard_pledge"
            /> -->
            <div class="from-to">
              <el-input
                :placeholder="t('table.pledgeStandard')"
                class="filter-inp"
                v-model="filterForm.standard_pledge_amount_from"
              />
              <span class="between">-</span>
              <el-input
                :placeholder="t('table.pledgeStandard')"
                class="filter-inp"
                v-model="filterForm.standard_pledge_amount_to"
              />
            </div>
          </el-form-item>

          <el-form-item :label="t('table.pledgeAmt')">
            <!-- <el-input placeholder="1-100" v-model="filterForm.pledge" /> -->
            <div class="from-to">
              <el-input
                :placeholder="t('table.pledgeAmt')"
                class="filter-inp"
                v-model="filterForm.pledge_amount_from"
              />
              <span class="between">-</span>
              <el-input
                :placeholder="t('table.pledgeAmt')"
                class="filter-inp"
                v-model="filterForm.pledge_amount_to"
              />
            </div>
          </el-form-item>

          <el-form-item :label="t('table.income')">
            <!-- <el-input placeholder="1-100" v-model="filterForm.money_earning" /> -->
            <div class="from-to">
              <el-input
                :placeholder="t('table.income')"
                class="filter-inp"
                v-model="filterForm.money_earnings_from"
              />
              <span class="between">-</span>
              <el-input
                :placeholder="t('table.income')"
                class="filter-inp"
                v-model="filterForm.money_earnings_to"
              />
            </div>
          </el-form-item>

          <el-form-item :label="t('table.overdueLock')">
            <!-- <el-input placeholder="1-100" v-model="filterForm.overdue_lock" /> -->
            <div class="from-to">
              <el-input
                :placeholder="t('table.overdueLock')"
                class="filter-inp"
                v-model="filterForm.overdue_lock_days_from"
              />
              <span class="between">-</span>
              <el-input
                :placeholder="t('table.overdueLock')"
                class="filter-inp"
                v-model="filterForm.overdue_lock_days_to"
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

    <div class="table" v-permission="43">
      <div class="top-panel">
        <div class="left">
          <el-button
            @click="addNew"
            class="app-button"
            style="margin-bottom: 25px"
            v-permission="42"
            ><font-awesome-icon
              icon="fa-solid fa-plus"
              style="margin-right: 5px"
            />

            {{ t("common.addto") }}
          </el-button>
          <el-button
            @click="bulkDelete"
            type="danger"
            style="margin-bottom: 25px"
            :disabled="selectedLists.length == 0"
            v-permission="46"
            ><font-awesome-icon
              icon="fa-solid fa-trash"
              style="margin-right: 5px"
            />

            {{ t("common.delete") }}
          </el-button>
        </div>
        <div class="right">
          <el-button
            @click="searchShow"
            style="margin-bottom: 25px"
            type="info"
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
          width="200"
        />
        <el-table-column
          prop="wallet_balance"
          :label="t('table.walletBal')"
          align="center"
          width="200"
        >
          <template #default="scope">
            {{
              scope.row.wallet_balance
                ? parseFloat(scope.row.wallet_balance).toFixed(4)
                : "0.0000"
            }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="账户余额" align="center" width="200">
          <template #default="scope">
            {{
              scope.row.account_balance
                ? parseFloat(scope.row.account_balance).toFixed(4)
                : "0.0000"
            }}
          </template>
        </el-table-column> -->
        <el-table-column
          :label="t('table.activityType')"
          align="center"
          width="120"
        >
          <template #default="scope">
            {{
              scope.row.activity_type == 1
                ? t("table.pledge")
                : t("table.miningPrizePool")
            }}
          </template>
        </el-table-column>
        <el-table-column
          :label="t('table.pledgeStandard')"
          align="center"
          width="200"
        >
          <template #default="scope">
            {{ scope.row.standard_pledge_amount }}
          </template>
        </el-table-column>
        <el-table-column
          prop="pledge_amount"
          :label="t('table.pledgeAmt')"
          align="center"
          width="150"
        >
          <template #default="scope">
            {{
              scope.row.pledge_amount
                ? parseFloat(scope.row.pledge_amount).toFixed(4)
                : "0.0000"
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="money_earnings"
          :label="t('table.income')"
          align="center"
          width="150"
        >
          <template #default="scope">
            {{
              scope.row.address_type == "TRX"
                ? parseFloat(scope.row.money_earnings).toFixed(6)
                : parseFloat(scope.row.money_earnings).toFixed(8)
            }}
            {{ scope.row.address_type }}
          </template>
        </el-table-column>
        <el-table-column
          prop="overdue_lock_days"
          :label="t('table.overdueLock')"
          align="center"
          width="200"
        />
        <el-table-column
          prop="status"
          :label="t('table.status')"
          align="center"
          width="150"
        >
          <template #default="scope">
            {{ filterStatus(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="t('common.startTime')"
          align="center"
          width="160"
        >
          <template #default="scope">
            {{ dateFormat(scope.row.start_time) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="t('common.endTime')"
          align="center"
          width="160"
        >
          <template #default="scope">
            {{ dateFormat(scope.row.end_time) }}
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
              v-if="editPledgeFilter(scope.row.status)"
            >
              <el-button
                type="primary"
                style="margin-left: 10px; margin-bottom: 5px"
                circle
                @click="handleEdit(scope.row)"
                v-permission="45"
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
                v-permission="46"
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
  />
</template>

<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import Dialog from "./dialog.vue";
import http from "@/http";
import { useStore } from "vuex";
import { dateFormat } from "@/utils/timeFormat.js";
import { ElMessageBox, ElMessage } from "element-plus";
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
      statusOptions: [
        {
          value: 1,
          label: t("table.notInvolved"),
        },
        {
          value: 2,
          label: t("table.participating"),
        },
        {
          value: 3,
          label: t("table.completed"),
        },
        {
          value: 4,
          label: t("table.cancel"),
        },
        {
          value: 5,
          label: t("table.overdue"),
        },
      ],
      selectedLists: [],
      isShowSearch: false,
    });

    /**
     * @filterStatus
     */

    //notInvolved
    // participating
    // completed
    // Cancel
    // overdue
    const filterStatus = (val) => {
      switch (val) {
        case 1:
          return t("table.notInvolved");
        case 2:
          return t("table.participating");
        case 3:
          return t("table.completed");
        case 4:
          return t("table.cancel");
        case 5:
          return t("table.overdue");
        default:
          return "--";
      }
    };

    const getTableList = () => {
      state.isLoading = true;
      http.memberManagement.getPledgeList(state.param).then((res) => {
        if (res.data.err_code == 0) {
          state.tableList = res.data.data.list;
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
      state.isLoading = true;
      state.dialog.dialogTitle = t("common.edit");
      http.memberManagement
        .checkPoolPledge({ id: row.id })
        .then((res) => {
          if (res.data.err_code === 0) {
            state.dialog.dialogData = res.data.data.pledge;
            state.isLoading = false;
            state.showDialog = true;
          }
        })
        .catch((err) => {});
    };

    const closeDialog = () => {
      state.showDialog = false;
    };

    const filter = () => {
      // state.param = {
      //   page: 1,
      // };
      if (state.filterForm.user_id) {
        state.param.user_id = parseInt(state.filterForm.user_id);
      }
      if (state.filterForm.remark) {
        state.param.remark = state.filterForm.remark;
      }
      if (state.filterForm.status) {
        state.param.status = state.filterForm.status;
      }
      if (state.filterForm.standard_pledge_amount_from) {
        state.param.standard_pledge_amount_from = parseFloat(
          state.filterForm.standard_pledge_amount_from
        );
      }
      if (state.filterForm.standard_pledge_amount_to) {
        state.param.standard_pledge_amount_to = parseFloat(
          state.filterForm.standard_pledge_amount_to
        );
      }
      if (state.filterForm.pledge_amount_from) {
        state.param.pledge_amount_from = parseFloat(
          state.filterForm.pledge_amount_from
        );
      }
      if (state.filterForm.pledge_amount_to) {
        state.param.pledge_amount_to = parseFloat(
          state.filterForm.pledge_amount_to
        );
      }
      if (state.filterForm.money_earnings_from) {
        state.param.money_earnings_from = parseFloat(
          state.filterForm.money_earnings_from
        );
      }
      if (state.filterForm.money_earnings_to) {
        state.param.money_earnings_to = parseFloat(
          state.filterForm.money_earnings_to
        );
      }
      if (state.filterForm.overdue_lock_days_from) {
        state.param.overdue_lock_days_from = parseFloat(
          state.filterForm.overdue_lock_days_from
        );
      }
      if (state.filterForm.overdue_lock_days_to) {
        state.param.overdue_lock_days_to = parseFloat(
          state.filterForm.overdue_lock_days_to
        );
      }

      // if (state.filterForm.standard_pledge) {
      //   let myArray = state.filterForm.standard_pledge.split("-");
      //   state.param.standard_pledge_amount_from = parseFloat(myArray[0]);
      //   state.param.standard_pledge_amount_to = parseFloat(myArray[1]);
      // }

      // if (state.filterForm.pledge) {
      //   let myArray = state.filterForm.pledge.split("-");
      //   state.param.pledge_amount_from = parseFloat(myArray[0]);
      //   state.param.pledge_amount_to = parseFloat(myArray[1]);
      // }

      // if (state.filterForm.money_earning) {
      //   let myArray = state.filterForm.money_earning.split("-");
      //   state.param.money_earnings_from = parseFloat(myArray[0]);
      //   state.param.money_earnings_to = parseFloat(myArray[1]);
      // }

      // if (state.filterForm.overdue_lock) {
      //   let myArray = state.filterForm.overdue_lock.split("-");
      //   state.param.overdue_lock_days_from = parseFloat(myArray[0]);
      //   state.param.overdue_lock_days_to = parseFloat(myArray[1]);
      // }
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
      ElMessageBox.confirm(t("common.sureToGiveETH"), t("common.warning"), {
        confirmButtonText: t("common.sure"),
        cancelButtonText: t("common.cancle"),
        type: "warning",
        draggable: true,
      })
        .then(() => {
          deletePledge(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: t("common.delCancle"),
          });
        });
    };

    const deletePledge = (id) => {
      http.memberManagement
        .dePle({ pledge_ids: [id] })
        .then((res) => {
          if (res.data.err_code == 0) {
            ElMessage.success(res.data.err_msg);
            search();
          }
        })
        .catch((err) => {
          ElMessage.error(res.data.err_msg);
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

    const editPledgeFilter = (val) => {
      switch (val) {
        case 1:
          return true;
        case 2:
          return true;
        case 3:
          return false;
        case 4:
          return false;
        case 5:
          return true;

        default:
          break;
      }
    };

    const onTableSelectionChange = (val) => {
      state.selectedLists = val.map((item) => item.id);
    };

    const bulkDelete = () => {
      ElMessageBox.confirm(t("common.sureToGiveETH"), t("common.warning"), {
        confirmButtonText: t("common.sure"),
        cancelButtonText: t("common.cancle"),
        type: "warning",
        draggable: true,
      })
        .then(() => {
          http.memberManagement
            .dePle({ pledge_ids: state.selectedLists })
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
      editPledgeFilter,
      onTableSelectionChange,
      bulkDelete,
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
