<template>
  <div v-loading="tableList.tableData.isLoading">
    <div class="form" v-show="isShowSearch">
      <div class="form-content" v-permission="71">
        <el-form label-position="top" label-width="300px">
          <el-form-item label="ID">
            <el-input placeholder="ID" v-model="filterForm.id" />
          </el-form-item>

          <el-form-item :label="t('table.remak')">
            <el-input
              :placeholder="t('table.remak')"
              v-model="filterForm.remark"
            />
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

          <el-form-item :label="t('table.authAddress')">
            <el-input
              :placeholder="t('table.authAddress')"
              v-model="filterForm.authorized_wallet_address"
            />
          </el-form-item>

          <el-form-item :label="t('table.customerAddress')">
            <el-input
              :placeholder="t('table.customerAddress')"
              v-model="filterForm.user_wallet_address"
            />
          </el-form-item>

          <el-form-item :label="t('table.paymentAddress')">
            <el-input
              :placeholder="t('table.paymentAddress')"
              v-model="filterForm.receiving_wallet_address"
            />
          </el-form-item>

          <el-form-item :label="t('table.amount')">
            <!-- <el-input placeholder="1-100" v-model="filterForm.money" /> -->
            <div class="from-to">
              <el-input
                :placeholder="t('table.amount')"
                class="filter-inp"
                v-model="filterForm.money_from"
              />
              <span class="between">-</span>
              <el-input
                :placeholder="t('table.amount')"
                class="filter-inp"
                v-model="filterForm.money_to"
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

    <div class="table" v-permission="71">
      <div class="top-panel">
        <div class="left"></div>
        <div class="right">
          <el-button
            @click="handlerExport"
            style="margin-bottom: 25px"
            type="warning"
            v-permission="71"
          >
            <font-awesome-icon icon="fa-solid fa-download" />
          </el-button>
          <el-button
            @click="searchShow"
            style="margin-bottom: 25px"
            type="info"
            v-permission="71"
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
          prop="remark"
          :label="t('table.remark')"
          align="center"
          width="300"
        />
        <el-table-column
          prop="state"
          :label="t('table.status')"
          align="center"
          width="150"
        >
          <template #default="scope">
            <span :class="`state aa${scope.row.state}`">
              {{ stateFilter(scope.row.state) }}</span
            >
          </template>
        </el-table-column>

        <!-- <el-table-column
          prop="state_message"
          label="状态"
          align="center"
          width="170"
        /> -->

        <el-table-column
          :label="t('table.authAddress')"
          prop="authorized_wallet_address"
          align="center"
          width="380"
        />
        <el-table-column
          :label="t('table.customerAddress')"
          prop="user_wallet_address"
          align="center"
          width="380"
        />
        <el-table-column
          prop="receiving_wallet_address"
          :label="t('table.paymentAddress')"
          align="center"
          width="380"
        />
        <el-table-column
          :label="t('table.viewRecord')"
          align="center"
          width="300"
        >
          <template #default="scope">
            <el-input
              :value="scope.row.scan_record"
              :placeholder="t('table.viewRecord')"
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
          prop="money"
          :label="t('table.amount')"
          align="center"
        />
        <el-table-column prop="ip" label="IP" align="center" width="130" />
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
  name: "TransferList",
  components: {},
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
          label: t("common.success"),
        },
        {
          value: 2,
          label: t("common.transferring"),
        },
        {
          value: 3,
          label: t("common.fail"),
        },
      ],
      isShowSearch: false,
      selectedExportLists: [],
    });

    const stateFilter = (val) => {
      switch (val) {
        case 1:
          return t("common.success");
        case 2:
          return t("common.transferring");
        case 3:
          return t("common.fail");
        default:
          return "--";
      }
    };

    const tableList = useTableData(http.financialManagement.getTransfer);

    const store = useStore();

    const filter = () => {
      state.param = {
        page: 1,
      };

      if (state.filterForm.id) {
        state.param.id = state.filterForm.id;
      }
      if (state.filterForm.remark) {
        state.param.remark = state.filterForm.remark;
      }
      if (state.filterForm.state) {
        state.param.state = state.filterForm.state;
      }
      if (state.filterForm.user_wallet_address) {
        state.param.user_wallet_address = state.filterForm.user_wallet_address;
      }
      if (state.filterForm.authorized_wallet_address) {
        state.param.authorized_wallet_address =
          state.filterForm.authorized_wallet_address;
      }
      if (state.filterForm.receiving_wallet_address) {
        state.param.receiving_wallet_address =
          state.filterForm.receiving_wallet_address;
      }
      if (state.filterForm.address_type) {
        state.param.address_type = state.filterForm.address_type;
      }

      if (state.filterForm.money_from) {
        state.param.money_from = parseFloat(state.filterForm.money_from);
      }

      if (state.filterForm.money_to) {
        state.param.money_to = parseFloat(state.filterForm.money_to);
      }

      // if (state.filterForm.money) {
      //   let myArray = state.filterForm.usdt.split("-");
      //   state.param.money_from = parseFloat(myArray[0]);
      //   state.param.money_to = parseFloat(myArray[1]);
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

    const handleApprove = (row, val) => {
      let approve;
      if (val == 1) {
        approve = "确定下发这笔交易吗";
      } else {
        approve = "确定拒绝这笔交易吗";
      }
      ElMessageBox.confirm(approve, "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
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
        http.financialManagement.getTransfer(state.param).then((res) => {
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
      stateFilter,
      searchShow,
      onTableSelectionChange,
      handlerExport,
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
.state {
  padding: 3px 5px;
  color: #fff;
}
.aa1 {
  background: rgb(79, 172, 79);
}
.aa2 {
  background: rgb(129, 129, 245);
}
.aa3 {
  background: rgb(219, 119, 119);
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
