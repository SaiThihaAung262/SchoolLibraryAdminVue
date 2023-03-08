<template>
  <el-dialog
    v-model="show"
    @close="closeDialog(formRef)"
    draggable
    :title="dialogTitle"
  >
    <el-form label-width="100px" ref="formRef" :model="form">
      <el-form-item
        label="支付别名"
        prop="alias_name"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
      >
        <el-input v-model="form.alias_name" placeholder="" />
      </el-form-item>
      <el-form-item
        label="支付名称"
        prop="bank_name"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
      >
        <el-input v-model="form.bank_name" placeholder="" />
      </el-form-item>
      <el-form-item label="轮播图:">
        <!-- <el-upload
          :auto-upload="false"
          list-type="picture-card"
          :multiple="false"
          :show-file-list="true"
          :on-success="handleImageUploadSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleImageRemove"
          :file-list="fileList"
          :limit="2"
          :on-change="startUpload"
          :on-progress="onProgress"
        >
          <el-icon>+</el-icon>
        </el-upload> -->

        <el-upload
          :auto-upload="true"
          list-type="picture-card"
          :multiple="false"
          :show-file-list="true"
          :on-success="handleImageUploadSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleImageRemove"
          :file-list="fileList"
          :limit="2"
          :http-request="handleHttp"
          :on-progress="handleProgress"
        >
          <el-icon>+</el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model.number="form.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog(formRef)">关闭</el-button>
        <el-button class="app-button" @click="submitDialog(formRef)"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { onMounted, reactive, toRefs, ref, watch, onUpdated } from "vue";
import http from "@/http";
import { ElMessage } from "element-plus";
import { getToken } from "@/utils/cookie";
import axios from "axios";

export default {
  name: "Dialog",
  props: ["show", "title", "data"],
  setup(props, context) {
    const state = reactive({
      dialogTitle: "",
      uploadPercent: 0,

      form: {
        alias_name: "",
        bank_name: "",
        status: 1,
        icon_url: "",
        id: "",
        percentage: 0,
      },
      percentage: 0,
    });

    const formRef = ref();
    const fileList = ref([]);

    const auth = {
      Authorization: getToken(),
    };

    const closeDialog = (formRef) => {
      formRef.resetFields();

      context.emit("closed");
    };

    const submitDialog = (formRef) => {
      formRef.validate((valid) => {
        if (valid) {
          if (state.dialogTitle == "添加用户") {
            http.moneyManagement.createBankList(state.form).then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {
                  alias_name: "",
                  bank_name: "",
                  status: 1,
                  icon_url: "",
                };
                ElMessage.success(res.data.err_msg);

                formRef.resetFields();
                context.emit("created");
              } else {
                ElMessage.error(res.data.err_msg);
              }
            });
          } else {
            http.moneyManagement.updateBankList(state.form).then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {
                  alias_name: "",
                  bank_name: "",
                  status: 1,
                  icon_url: "",
                };
                ElMessage.success(res.data.err_msg);

                formRef.resetFields();
                context.emit("created");
              } else {
                ElMessage.error(res.data.err_msg);
              }
            });
          }
        }
      });
    };

    const handleImageUploadSuccess = (response, file, fileList) => {
      if (response.data.err_code == 0) {
        if (fileList.length > 1) {
          fileList.shift();
        }
        ElMessage.success(response.data.err_msg);
        state.form.icon_url = response.data.url;
      } else {
        ElMessage.error(res.msg);
      }
    };

    const handleImageRemove = (uploadFile, uploadFiles) => {
      state.form.icon_url = "";
    };

    const andleRemove = (file) => {};
    const handlePictureCardPreview = (file) => {};
    const handleDownload = (file) => {};
    const startUpload = (file, filelist) => {
      const form = new FormData();
      form.append("file", filelist[0].raw);
    };

    const handleHttp = (fileList) => {
      const form = new FormData();
      form.append("file", fileList.file);

      http.systemManagement
        .appUpload(form, (progressEvent) => {
          fileList.onProgress({
            percent: parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            ),
          });
        })
        .then(() => {});
    };

    const handleProgress = (event, file, fileList) => {};

    const onProgress = (ev, file, fileLIst) => {
      // file.raw["status"] = "uploading";
      state.uploadPercent = parseInt(Math.round((ev.loaded * 100) / ev.total));
    };

    onMounted(() => {});

    onUpdated(() => {
      state.dialogTitle = props.title;
      if (props.data.hasOwnProperty("id")) {
        state.form.id = props.data.id;
        state.form.alias_name = props.data.alias_name;
        state.form.bank_name = props.data.bank_name;
        state.form.status = props.data.status;
      } else {
        state.form = {
          alias_name: "",
          bank_name: "",
          status: 1,
          icon_url: "",
        };
      }
    });

    return {
      ...toRefs(state),
      closeDialog,
      submitDialog,
      formRef,
      auth,
      fileList,
      handleImageUploadSuccess,
      handleImageRemove,
      handlePictureCardPreview,
      startUpload,
      handleHttp,
      handleProgress,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.el-select .el-input__inner) {
  height: 42px !important;
}

.lose {
  color: #f56c6c;
}

.win {
  color: #67c23a;
}
</style>
