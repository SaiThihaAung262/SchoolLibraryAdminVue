<template>
  <el-dialog
    v-model="show"
    @close="closeDialog(formRef)"
    draggable
    :title="dialogTitle"
  >
    <el-form label-width="130px" ref="formRef" :model="form">
      <el-form-item label="Id:">
        <el-input v-model="form.id" placeholder="" readonly />
      </el-form-item>
      <el-form-item :label="t('common.userID') + ':'">
        <el-input v-model="form.admin_id" placeholder="" readonly />
      </el-form-item>
      <el-form-item :label="t('common.userName') + ':'">
        <el-input v-model="form.username" placeholder="" readonly />
      </el-form-item>
      <el-form-item label="URL:">
        <el-input v-model="form.url" placeholder="" readonly />
      </el-form-item>
      <el-form-item :label="t('common.title') + ':'">
        <el-input v-model="form.title" placeholder="" readonly />
      </el-form-item>
      <el-form-item label="IP:">
        <el-input v-model="form.ip" placeholder="" readonly />
      </el-form-item>
      <el-form-item label="useragent:">
        <el-input v-model="form.browser" placeholder="" readonly />
      </el-form-item>
      <el-form-item :label="t('common.createTime') + ':'">
        <el-date-picker
          readonly
          v-model="form.created_at"
          type="datetime"
          placeholder="Pick a Date"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog(formRef)">{{
          t("common.close")
        }}</el-button>
        <!-- <el-button class="app-button" @click="submitDialog(formRef)"
          >确定</el-button
        > -->
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
    const state = reactive({
      dialogTitle: "",
      uploadPercent: 0,

      form: {},

      percentage: 0,
    });
    const { t } = useI18n();

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
            http.platformwallet.addBankList(state.form).then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {
                  type: "ETH",
                  wallet_address: "",
                  private_key: "",
                  apr: "",
                };
                ElMessage.success(res.data.err_msg);

                formRef.resetFields();
                context.emit("created");
              } else {
                ElMessage.error(res.data.err_msg);
              }
            });
          } else {
            http.platformwallet.editBankList(state.form).then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {
                  type: "ETH",
                  wallet_address: "",
                  private_key: "",
                  apr: "",
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

    onUpdated(() => {
      state.dialogTitle = props.title;
      if (props.data.hasOwnProperty("id")) {
        state.form = {
          id: props.data.id,
          admin_id: props.data.admin_id,
          username: props.data.username,
          url: props.data.url,
          title: props.data.title,
          ip: props.data.ip,
          browser: props.data.browser,
          created_at: props.data.created_at,
        };
      } else {
        state.form = {};
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
