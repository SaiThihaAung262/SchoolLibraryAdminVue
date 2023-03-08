<template>
  <div v-loading="tableList.tableData.isLoading">
    <div class="form" v-show="isShowSearch">
      <div class="form-content" v-permission="25">
        <el-form label-position="top" label-width="300px">
          <el-form-item label="Id">
            <el-input placeholder="Id" v-model="filterForm.id" />
          </el-form-item>

          <el-form-item :label="t('table.userId')">
            <el-input
              :placeholder="t('table.userId')"
              v-model="filterForm.uid"
            />
          </el-form-item>

          <el-form-item :label="t('table.credit')">
            <el-input
              :placeholder="t('table.credit')"
              v-model="filterForm.amount"
            />
          </el-form-item>

          <el-form-item :label="t('table.operator')">
            <el-input
              :placeholder="t('table.operator')"
              v-model="filterForm.operator"
            />
          </el-form-item>

          <el-form-item :label="t('table.createTime')">
            <el-date-picker
              v-model="filterForm.created_at"
              type="date"
              :placeholder="t('table.createTime')"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
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

    <div class="table" v-permission="25">
      <div class="top-panel">
        <div class="left"></div>
        <div class="right">
          <el-button
            @click="handlerExport"
            style="margin-bottom: 25px"
            type="warning"
            v-permission="25"
          >
            <font-awesome-icon icon="fa-solid fa-download" />
          </el-button>
          <el-button
            @click="searchShow"
            style="margin-bottom: 25px"
            type="info"
            v-permission="25"
          >
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </el-button>
        </div>
      </div>
      <el-table
        :data="tableList.tableData.list.gifts"
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
          prop="amount"
          :label="t('table.credit')"
          align="center"
        />
        <el-table-column
          prop="amount"
          :label="t('table.record')"
          align="center"
          width="300"
        >
          <template #default="scope">
            <el-input
              :value="scope.row.scan_record"
              :placeholder="t('table.record')"
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
          prop="operator"
          :label="t('table.operator')"
          align="center"
        />
        <el-table-column
          :label="t('table.createTime')"
          align="center"
          width="150"
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
  name: "Article",
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
      isShowSearch: false,
      selectedExportLists: [],
    });

    const tableList = useTableData(http.giftManagement.getGiftManagement);

    const store = useStore();

    const filter = () => {
      state.param = {
        page: 1,
      };
      if (state.filterForm.id) {
        state.param.id = parseInt(state.filterForm.id);
      }

      if (state.filterForm.uid) {
        state.param.uid = parseInt(state.filterForm.uid);
      }

      if (state.filterForm.amount) {
        state.param.amount = parseFloat(state.filterForm.amount);
      }

      if (state.filterForm.operator) {
        state.param.operator = state.filterForm.operator;
      }

      if (state.filterForm.created_at) {
        state.param.created_at = state.filterForm.created_at;
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
        http.giftManagement.getGiftManagement(state.param).then((res) => {
          if (res.data.err_code === 0) {
            // log
            data = res.data.data.gifts;
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
      searchShow,
      handlerExport,
      onTableSelectionChange,
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
:deep(.styel-inp .el-input__wrapper) {
  border: 1px solid #999;
}
:deep(.el-input-group__append) {
  border: 1px solid #999;
  border-left: none;
}
</style>
