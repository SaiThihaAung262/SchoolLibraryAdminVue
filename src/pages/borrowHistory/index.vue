<template>
  <div v-loading="isLoading">
    <div class="form" v-show="isShowSearch">
      <div class="form-content">
        <el-form label-position="top" label-width="300px">
          <el-form-item label="User ID">
            <el-input placeholder="User ID" v-model="filterForm.user_uuid" />
          </el-form-item>

          <el-form-item label="Book ID">
            <el-input placeholder="Book ID" v-model="filterForm.book_uuid" />
          </el-form-item>

          <el-form-item label="Borrow Status">
            <el-select
              :multiple="false"
              placeholder="Please select borrow status"
              style="width: 100%"
              v-model="filterForm.status"
              default-first-option
            >
              <el-option
                v-for="item in borrowStatusOptions"
                :key="item"
                :value="item.id"
                :label="item.title"
              />
            </el-select>
          </el-form-item>

          <div style="margin-top: 34px" class="buttonBox">
            <el-button class="app-button" @click="search()">
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
                style="margin-right: 5px"
              />Search</el-button
            >
          </div>
        </el-form>
      </div>
    </div>

    <div class="table">
      <div class="top-panel">
        <div class="left">
          <el-button
            @click="addNew"
            class="app-button"
            style="margin-bottom: 25px"
            ><font-awesome-icon
              icon="fa-solid fa-plus"
              style="margin-right: 5px"
            />
            Add</el-button
          >
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
        :data="tableLists"
        :row-style="{ height: '55px' }"
        :header-row-style="{ height: '55px' }"
        :border="true"
        height="65vh"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" align="center" />

        <el-table-column label="Borrow Status" align="center" width="150">
          <template #default="scope">
            <el-tag
              type="warning"
              class="mx-1"
              effect="dark"
              v-if="scope.row.status == 1"
              round
            >
              Borrowing
            </el-tag>

            <el-tag
              type="success"
              class="mx-1"
              effect="dark"
              v-if="scope.row.status == 2"
              round
            >
              Returned
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Borrower Type" align="center" width="150">
          <template #default="scope">
            <el-tag
              type=""
              class="mx-1"
              effect="dark"
              v-if="scope.row.type == 1"
              round
            >
              Teacher
            </el-tag>

            <el-tag
              type=""
              class="mx-1"
              effect="dark"
              v-if="scope.row.type == 2"
              round
            >
              Student
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="User ID" align="center" width="100">
          <template #default="scope">
            {{ scope.row.user_data.uuid }}
          </template>
        </el-table-column>

        <el-table-column label="Username" align="center" width="200">
          <template #default="scope">
            {{ scope.row.user_data.name }}
          </template>
        </el-table-column>

        <el-table-column label="Email" align="center" width="250">
          <template #default="scope">
            {{ scope.row.user_data.email }}
          </template>
        </el-table-column>

        <el-table-column label="Book ID" align="center" width="130">
          <template #default="scope">
            {{ scope.row.book_data.uuid }}
          </template>
        </el-table-column>

        <el-table-column label="Book Title" align="center" width="250">
          <template #default="scope">
            {{ scope.row.book_data.title }}
          </template>
        </el-table-column>

        <el-table-column label="Department" align="center" width="300">
          <template #default="scope">
            {{
              scope.row.user_data.department
                ? filterDepartment(scope.row.user_data.department)
                : "--"
            }}
          </template>
        </el-table-column>

        <el-table-column label="Year" align="center" width="180">
          <template #default="scope">
            {{
              scope.row.user_data.year
                ? filterYear(scope.row.user_data.year)
                : "--"
            }}
          </template>
        </el-table-column>

        <el-table-column label="Role no" align="center" width="150">
          <template #default="scope">
            {{ scope.row.user_data.year ? scope.row.user_data.role_no : "--" }}
          </template>
        </el-table-column>

        <el-table-column label="Borrow Time" align="center" width="170">
          <template #default="scope">
            {{ dateFormat(scope.row.created_at) }}
          </template>
        </el-table-column>

        <!-- <el-table-column label="Expire Time" align="center" width="170">
          <template #default="scope">
            {{ originalDate(scope.row.expired_at) }}
          </template>
        </el-table-column> -->

        <el-table-column
          label="Operate"
          align="center"
          width="120"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              type="warning"
              size="small"
              style="margin-bottom: 5px"
              @click="changeStatus(scope.row)"
              v-if="scope.row.status == 1"
            >
              Return
            </el-button>
            <!-- <el-tooltip
              class="box-item"
              content="Edit"
              placement="top"
              effect="customized"
            >
              <el-button
                type="primary"
                style="margin-left: 10px; margin-bottom: 5px"
                circle
                @click="handleEdit(scope.row)"
              >
                <font-awesome-icon icon="fa-solid fa-file-pen" />
              </el-button>
            </el-tooltip>

            <el-tooltip
              class="box-item"
              content="Delete"
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
    :roleList="roleList"
  />
</template>
k
<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import Dialog from "./dialog.vue";
import http from "@/http";
import { useStore } from "vuex";
import useTableData from "@/hooks/useTableData.js";
import { dateFormat, originalDate } from "@/utils/timeFormat.js";
import { ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";

export default {
  name: "Category",
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
      isShowSearch: false,
      tableLists: [],
      roleList: [],
      total: 0,
      borrowStatusOptions: [
        {
          id: 1,
          title: "Borrowing",
        },
        {
          id: 2,
          title: "Returned",
        },
      ],
    });

    const store = useStore();

    const getTableLists = () => {
      state.isLoading = true;
      http.borrowHistory.getBorrowHistory(state.param).then((res) => {
        if (res.data.err_code == 0) {
          console.log(res.data.data.list);
          state.tableLists = res.data.data.list;
          state.total = res.data.data.total;
          state.isLoading = false;
        }
      });
    };

    const addNew = () => {
      state.dialog.dialogTitle = "Add";
      state.dialog.dialogData = {};
      state.showDialog = true;
    };

    const handleEdit = (row) => {
      state.dialog.dialogTitle = "Edit";
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

      if (state.filterForm.status) {
        state.param.status = parseInt(state.filterForm.status);
      }

      if (state.filterForm.user_uuid) {
        state.param.user_uuid = state.filterForm.user_uuid;
      }
      if (state.filterForm.book_uuid) {
        state.param.book_uuid = state.filterForm.book_uuid;
      }
    };

    const onSizeChange = (val) => {
      state.param.page_size = val;
      getTableLists();
    };
    const onCurrentChange = (val) => {
      state.param.page = val;
      getTableLists();
    };

    const deleteHandler = (id) => {
      ElMessageBox.confirm("Are sure want to delete?", "Warning", {
        confirmButtonText: "Sure",
        cancelButtonText: "cancel",
        type: "warning",
        draggable: true,
      })
        .then(() => {
          http.bookManagement.deleteCategoryList({ id: id }).then((res) => {
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
            message: "You have canceled",
          });
        });
    };

    const search = () => {
      filter();
      state.param.page_size = 10;
      getTableLists();
    };

    const searchShow = () => {
      if (state.isShowSearch) {
        state.isShowSearch = false;
      } else {
        state.isShowSearch = true;
      }
    };

    const filterDepartment = (val) => {
      switch (val) {
        case 1:
          return "Faculty of Computer Systems & Technologies";
        case 2:
          return "Faculty of Computer Science";
        case 3:
          return "Faculty of Information Science";
        case 4:
          return "Department of Information Technology Supporting and Maintenance";
        case 5:
          return "Department of Physics";
        case 6:
          return "Department of Admistration and Finance";

        default:
          return "--";
      }
    };

    const filterYear = (val) => {
      switch (val) {
        case 1:
          return "First Year";
        case 2:
          return "Second Year";
        case 3:
          return "Third Year";
        case 4:
          return "Fourth Year";
        case 5:
          return "Final Year";

        default:
          return "--";
      }
    };

    const changeStatus = (row) => {
      ElMessageBox.confirm(
        "Are you sure this user is return book?",
        "Warning",
        {
          confirmButtonText: "Sure",
          cancelButtonText: "Cancel",
          type: "warning",
          draggable: true,
        }
      )
        .then(() => {
          let param = {
            id: row.id,
            type: row.type,
            status: 2,
            user_uuid: row.user_data.uuid,
            book_uuid: row.book_data.uuid,
          };
          http.borrowHistory.changeStatus(param).then((res) => {
            if (res.data.err_code == 0) {
              ElMessage.success(res.data.err_msg);
              search();
            } else {
              ElMessage.error(res.data.err_msg);
            }
          });
        })
        .catch(() => {
          search();
          ElMessage({
            type: "info",
            message: "Canceled",
          });
        });
    };

    onMounted(() => {
      getTableLists();
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
      searchShow,
      t,
      filterDepartment,
      filterYear,
      originalDate,
      changeStatus,
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
