<template>
  <div style="padding: 30px">
    <div v-loading="isLoading">
      <div class="form" v-show="isShowSearch">
        <div class="form-content">
          <el-form label-position="top" label-width="300px">
            <el-form-item label="Request Date">
              <el-date-picker
                v-model="filterForm.date"
                type="date"
                placeholder="Request date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>

            <el-button class="app-button" @click="search()">
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
                style="margin-right: 5px"
              />{{ t("common.search") }}</el-button
            >
          </el-form>
        </div>
      </div>

      <div class="table">
        <div class="top-panel">
          <div class="left">
            <el-button
              @click="backToPage"
              style="margin-bottom: 25px"
              type="info"
            >
              <font-awesome-icon icon="fa-solid fa-caret-left" />
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
        <p>Total API call : {{ total.Int64 }}</p>
        <br />
        <el-table
          :data="tableLists"
          :row-style="{ height: '55px' }"
          :header-row-style="{ height: '55px' }"
          :border="true"
        >
          <el-table-column label="ID" align="center">
            <template #default="scope"> {{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="api_key" label="API key" align="center" />
          <el-table-column
            prop="total_request"
            label="Call request"
            align="center"
          />

          <el-table-column a label="Date" align="center">
            <template #default="scope">
              {{ scope.row.date }}
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
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import http from "@/http";
import { useStore } from "vuex";
import { dateFormat } from "@/utils/timeFormat.js";
import { ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";

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
      filterForm: {},
      pageList: [10, 20, 60, 80, 100],
      param: {
        // page: 1,
        // page_size: 10,
        // receiving_wallet_address: "",
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
      tableLists: [],
      isLoading: false,
      total: {},
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

    const getTableList = () => {
      state.isLoading = true;
      http.transferfund.getApiCall(state.param).then((res) => {
        if (res.data.err_code == 0) {
          state.isLoading = false;
          state.tableLists = res.data.data.list;
          state.total = res.data.data.total;
        }
      });
    };

    const store = useStore();

    const filter = () => {
      state.param = {};

      if (state.filterForm.date) {
        state.param.date = state.filterForm.date;
      }
    };

    const onSizeChange = (val) => {
      getTableList();
    };
    const onCurrentChange = (val) => {
      getTableList();
    };

    const search = () => {
      filter();
      getTableList();
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
    };

    const backToPage = () => {
      window.history.go(-1);
    };

    onMounted(() => {
      console.log(route.query.address);
      let address = route.query.address ? route.query.address : "";
      state.param.receiving_wallet_address = address;
      getTableList();
    });

    return {
      t,
      ...toRefs(state),
      dateFormat,
      search,
      onSizeChange,
      onCurrentChange,
      windowRect: computed(() => store.state.app.windowRect),
      device: computed(() => store.state.app.device),
      stateFilter,
      searchShow,
      seeDetails,
      backToPage,
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
