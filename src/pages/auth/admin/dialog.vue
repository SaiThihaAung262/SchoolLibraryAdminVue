<template>
  <el-dialog
    v-model="show"
    @close="closeDialog(formRef)"
    draggable
    :title="dialogTitle"
  >
    <el-form label-width="120px" ref="formRef" :model="form">
      <el-form-item
        :label="t('table.userName')"
        prop="username"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.username" placeholder="" />
      </el-form-item>

      <el-form-item
        label="Email:"
        prop="email"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.email" placeholder="" />
      </el-form-item>

      <el-form-item
        :label="t('table.identification')"
        prop="identification"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.identification" placeholder="" />
      </el-form-item>

      <el-form-item
        :label="t('table.nickName')"
        prop="nickname"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.nickname" placeholder="" />
      </el-form-item>

      <el-form-item
        v-if="dialogTitle == t('common.addto')"
        :label="t('table.password')"
        prop="password"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.password" placeholder="" />
      </el-form-item>

      <el-form-item :label="t('table.password')" v-else>
        <el-input v-model="form.password" placeholder="" />
      </el-form-item>

      <el-form-item :label="t('table.state')">
        <el-radio-group v-model.number="form.status">
          <el-radio :label="1">{{ t("common.normal") }}</el-radio>
          <el-radio :label="2">{{ t("common.hide") }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        :label="t('table.role') + ':'"
        prop="role_id"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-select
          v-model="form.role_id"
          :multiple="false"
          allow-create
          style="width: 100%"
        >
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
        <!-- <el-radio-group v-model="form.role_id">
          <el-radio
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.id"
            >{{ item.name }}</el-radio
          >
        </el-radio-group> -->
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog(formRef)">
          {{ t("common.close") }}
        </el-button>
        <el-button class="app-button" @click="submitDialog(formRef)">
          {{ t("common.sure") }}
        </el-button>
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
  props: ["show", "title", "data", "roleList"],
  setup(props, context) {
    const { t } = useI18n();
    const state = reactive({
      dialogTitle: "",
      uploadPercent: 0,

      form: {
        username: "",
        email: "",
        identification: "",
        nickname: "",
        password: "",
        status: 1,
        role_id: 1,
      },
      roleList: [],
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
            http.auth.addAdminList(state.form).then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {
                  username: "",
                  email: "",
                  identification: "",
                  nickname: "",
                  password: "",
                  status: 1,
                  role_id: 1,
                };
                ElMessage.success(res.data.err_msg);

                formRef.resetFields();
                context.emit("created");
              } else {
                ElMessage.error(res.data.err_msg);
              }
            });
          } else {
            http.auth.editAdminList(state.form).then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {
                  username: "",
                  email: "",
                  identification: "",
                  nickname: "",
                  password: "",
                  status: 1,
                  role_id: 1,
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
      state.roleList = props.roleList;
      if (props.data.hasOwnProperty("id")) {
        state.form = {
          id: props.data.id,
          username: props.data.username,
          email: props.data.email,
          identification: props.data.identification,
          nickname: props.data.nickname,
          password: props.data.password,
          status: props.data.status,
          role_id: parseInt(props.data.role_id),
        };
      } else {
        state.form = {
          username: "",
          email: "",
          identification: "",
          nickname: "",
          password: "",
          status: 1,
          role_id: 1,
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
