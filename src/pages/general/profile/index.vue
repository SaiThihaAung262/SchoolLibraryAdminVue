<template>
  <div v-loading="isLoading">
    <el-row :gutter="10">
      <el-col :sm="24" :md="24" :lg="7" v-permission="5">
        <div class="left-container">
          <h2 class="title">{{ t("personalInfo.personalInfo") }}</h2>
          <el-form label-position="top" label-width="300px">
            <div class="avatar">
              <el-upload
                class="avatar-uploader"
                :headers="auth"
                :action="imgUploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-remove="handleImageRemove"
                :on-preview="handlePictureCardPreview"
                :file-list="fileList"
                :multiple="false"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"> + </el-icon>
              </el-upload>
              <br />
            </div>
            <h1 class="username">{{ adminInfo.username }}</h1>
            <h1 class="email">{{ adminInfo.email }}</h1>
            <el-form-item :label="t('personalInfo.username')">
              <el-input
                :placeholder="t('personalInfo.username')"
                v-model="adminInfo.username"
              />
            </el-form-item>
            <el-form-item label="Email">
              <el-input placeholder="Email" v-model="adminInfo.email" />
            </el-form-item>
            <el-form-item :label="t('personalInfo.nickName')">
              <el-input
                :placeholder="t('personalInfo.nickName')"
                v-model="adminInfo.nickname"
              />
            </el-form-item>
            <el-form-item :label="t('personalInfo.password')">
              <el-input
                :placeholder="t('personalInfo.password')"
                v-model="adminInfo.password"
              />
            </el-form-item>
            <el-button
              @click="handleSubmitChange"
              class="app-button"
              style="margin-bottom: 25px"
              v-permission="128"
            >
              {{ t("common.submit") }}
            </el-button>
            <el-button
              @click="resetData"
              class="app-button bg-gray"
              style="margin-bottom: 25px"
            >
              {{ t("common.reset") }}
            </el-button>
          </el-form>
        </div>
      </el-col>
      <el-col :sm="24" :md="24" :lg="17" v-permission="5">
        <div class="right-con">
          <h1 class="log-title">{{ t("personalInfo.operationLog") }}</h1>
          <el-table
            :data="tableList"
            :row-style="{ height: '55px' }"
            :header-row-style="{ height: '55px' }"
            :border="true"
            height="70vh"
            style="width: 100%"
          >
            <el-table-column prop="id" label="ID" align="center" />
            <el-table-column
              prop="title"
              :label="t('personalInfo.title')"
              align="center"
            />
            <el-table-column
              prop="url"
              :label="t('personalInfo.link')"
              align="center"
            />
            <el-table-column prop="ip" label="IP" align="center" />
            <el-table-column
              prop="apr"
              :label="t('personalInfo.operationTime')"
              align="center"
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
              :total="total"
              :small="device === 'mobile' ? true : false"
            >
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed, ref } from "vue";
import http from "@/http";
import { useStore } from "vuex";
import useTableData from "@/hooks/useTableData.js";
import { dateFormat } from "@/utils/timeFormat.js";
import { ElMessageBox, ElMessage } from "element-plus";
import { getToken, removeToken } from "@/utils/cookie";
import { useI18n } from "vue-i18n";

export default {
  name: "Profile",
  components: {},
  setup() {
    const state = reactive({
      isLoading: false,
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
      imageUrl: "",
      tableList: [],
      adminInfo: {
        id: 0,
        username: "",
        email: "",
        nickname: "",
        password: "",
        identification: "",
      },
      total: 0,
    });
    const { t } = useI18n();

    const fileList = ref([]);
    const auth = {
      Authorization: getToken(),
    };

    const imgUploadUrl = import.meta.env.VITE_SERVER_HOST + "media/upload";

    const store = useStore();

    const filter = () => {
      state.param = {
        page: 1,
      };
      if (state.filterForm.name) {
        state.param.name = state.filterForm.name;
      }
    };

    const onSizeChange = (val) => {
      state.param.page_size = val;
      getData();
    };
    const onCurrentChange = (val) => {
      state.param.page = val;
      getData();
    };

    const getData = () => {
      state.isLoading = true;
      http.general.getProfile(state.param).then((res) => {
        if (res.data.err_code == 0) {
          state.adminInfo.id = res.data.data.admin.id;
          state.adminInfo.username = res.data.data.admin.username;
          state.adminInfo.email = res.data.data.admin.email;
          state.adminInfo.nickname = res.data.data.admin.nickname;
          state.adminInfo.password = res.data.data.admin.password;
          state.adminInfo.identification = res.data.data.admin.identification;
          state.adminInfo.url = res.data.data.admin.url;
          state.imageUrl = state.adminInfo.url;
          state.imageUrl = state.imageUrl
            ? state.imageUrl
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

          state.tableList = res.data.data.list;

          state.total = res.data.data.total;
          state.isLoading = false;
        } else {
          ElMessage.error(res.data.err_msg);
        }
      });
    };

    const handleAvatarSuccess = (response, file, fileList) => {
      if (response.err_code == 0) {
        ElMessage.success(response.err_msg);
        state.imageUrl = response.data.media.url;
        state.adminInfo.url = state.imageUrl;
      } else {
        ElMessage.error(res.err_msg);
      }
    };

    const handleImageRemove = (uploadFile, uploadFiles) => {
      state.form.carousal = "";
    };
    const beforeAvatarUpload = () => {};

    const handleSubmitChange = () => {
      ElMessageBox.confirm(t("common.sureSave"), t("common.warning"), {
        confirmButtonText: t("common.sure"),
        cancelButtonText: t("common.cancle"),
        type: "warning",
        draggable: true,
      })
        .then(() => {
          http.general.editAdminProfile(state.adminInfo).then((res) => {
            if (res.data.err_code == 0) {
              ElMessage.success(res.data.err_msg);
              getData();
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

    const resetData = () => {
      getData();
    };

    onMounted(() => {
      getData();
    });

    return {
      ...toRefs(state),
      dateFormat,
      onSizeChange,
      onCurrentChange,
      windowRect: computed(() => store.state.app.windowRect),
      device: computed(() => store.state.app.device),
      handleAvatarSuccess,
      beforeAvatarUpload,
      auth,
      handleSubmitChange,
      resetData,
      imgUploadUrl,
      handleImageRemove,
      fileList,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.left-container {
  background: white;
  padding: 16px;
  box-shadow: 2px 4px 8px rgb(190 178 213 / 50%);
  margin-top: 20px;
}
.right-con {
  padding: 16px;
  margin-top: 20px;
}
.title {
  color: #111;
}
.log-title {
  margin-bottom: 10px;
}
.avatar-uploader {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  object-fit: cover;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  background: #8c939d;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
  background: #8c939d;
}

.username {
  margin-top: 10px;
  text-align: center;
}

.email {
  text-align: center;
  margin-top: 10px;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.right-con {
  box-shadow: 2px 4px 8px rgb(190 178 213 / 50%);
}
.bg-gray {
  background: #999;
}
</style>
