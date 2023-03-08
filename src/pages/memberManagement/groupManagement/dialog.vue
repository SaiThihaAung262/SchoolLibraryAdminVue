<template>
  <el-dialog
    v-model="show"
    @close="closeDialog(formRef)"
    draggable
    :title="dialogTitle"
  >
    <el-form label-width="120px" ref="formRef" :model="form">
      <el-form-item
        :label="t('table.groupName') + ':'"
        prop="name"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.name" placeholder="" />
      </el-form-item>

      <el-form-item
        :label="t('table.domainName') + ':'"
        prop="url"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.url" placeholder="" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog(formRef)">{{
          t("common.cancle")
        }}</el-button>
        <el-button class="app-button" @click="submitDialog(formRef)">{{
          t("common.sure")
        }}</el-button>
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
import { prop } from "dom7";
import { useI18n } from "vue-i18n";
export default {
  name: "Dialog",
  props: ["show", "title", "data"],
  setup(props, context) {
    const { t } = useI18n();
    const state = reactive({
      dialogTitle: "",
      uploadPercent: 0,

      form: {
        name: "",
        url: "",
      },

      percentage: 0,
    });

    const formRef = ref();

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
          if (state.dialogTitle == t("common.addto")) {
            http.memberManagement.addGroups(state.form).then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {};
                ElMessage.success(res.data.err_msg);
                formRef.resetFields();
                context.emit("created");
              } else {
                if (res.data.err_msg == "Group URL Duplicate ") {
                  ElMessage.error(t("table.domainNameExit"));
                } else if (res.data.err_msg == "Group Name Duplicate ") {
                  ElMessage.error(t("table.gpNameAlreadyExit"));
                }
              }
            });
          } else {
            http.memberManagement.editGroups(state.form).then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {
                  name: "",
                  url: "",
                };
                ElMessage.success(res.data.err_msg);

                formRef.resetFields();
                context.emit("created");
              } else {

                if (res.data.err_msg == "Group URL Duplicate ") {
                  ElMessage.error(t("table.domainNameExit"));
                } else if (res.data.err_msg == "Group Name Duplicate ") {
                  ElMessage.error(t("table.gpNameAlreadyExit"));
                }
              }
            });
          }
        }
      });
    };

    onUpdated(() => {
      state.dialogTitle = props.title;
      if (props.data.hasOwnProperty("id")) {
        state.form = {
          id: props.data.id,
          name: props.data.name,
          url: props.data.url,
        };
      } else {
        state.form = {
          name: "",
          url: "",
        };
      }
    });
    onMounted(() => {});

    return {
      ...toRefs(state),
      closeDialog,
      submitDialog,
      formRef,
      auth,
      t,
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
