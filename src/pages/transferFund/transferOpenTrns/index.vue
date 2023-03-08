<template>
  <div v-loading="tableList.tableData.isLoading">
    <div class="form" v-show="isShowSearch">
      <div class="form-content">
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

    <div style="margin-top: 100px"></div>

    <div class="table">
      <div class="top-panel">
        <div class="left"></div>
        <div class="right">
          <!-- <el-button
            @click="searchShow"
            style="margin-bottom: 25px"
            type="info"
          >
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </el-button> -->
        </div>
      </div>
      <el-table
        :data="tableList.tableData.list.list"
        :row-style="{ height: '55px' }"
        :header-row-style="{ height: '55px' }"
        :border="true"
      >
        <el-table-column
          prop="receiving_wallet_address"
          :label="t('table.recAddress')"
          align="center"
        />
        <el-table-column :label="t('table.amount')" align="center">
          <template #default="scope">
            {{
              scope.row.amount
                ? parseFloat(scope.row.amount).toFixed(6)
                : "0.000000"
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          :label="t('table.count')"
          align="center"
        />
        <el-table-column label="" align="center" width="120">
          <template #default="scope">
            <el-button
              type="primary"
              style="margin-left: 10px; margin-bottom: 5px"
              @click="seeDetails(scope.row)"
            >
              {{ t("common.details") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- <div class="table-pager">
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
      </div> -->
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
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "TransferList",
  components: {},
  setup() {
    const router = useRouter();
    const route = useRoute();

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

    const tableList = useTableData(http.transferfund.getTransferOpenTrns);

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

    const seeDetails = (row) => {
      console.log(row.receiving_wallet_address);
      router.push({
        path: "/transferOpenTrnsFilter",
        query: {
          address: row.receiving_wallet_address,
        },
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
      stateFilter,
      searchShow,
      seeDetails,
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
.table {
  padding: 30px;
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
