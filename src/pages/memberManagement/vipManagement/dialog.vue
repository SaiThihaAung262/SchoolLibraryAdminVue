<template>
  <el-dialog
    v-model="show"
    @close="closeDialog(formRef)"
    draggable
    :title="dialogTitle"
  >
    <el-form label-width="150px" ref="formRef" :model="form">
      <el-form-item
        :label="t('table.chineseName') + ':'"
        prop="name"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.name" placeholder="" />
      </el-form-item>

      <el-form-item
        :label="t('table.engName') + ':'"
        prop="lang"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.lang" placeholder="" />
      </el-form-item>

      <el-form-item
        :label="t('table.minAmt') + ':'"
        prop="min"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
          {
            required: true,
            message: t('common.ruleGreaterthan0'),
            trigger: 'blur',
            pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
          },
        ]"
      >
        <el-input v-model="form.min" placeholder="" type="number" />
      </el-form-item>

      <el-form-item
        :label="t('table.maxAmt') + ':'"
        prop="max"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
          {
            required: true,
            message: t('common.ruleGreaterthan0'),
            trigger: 'blur',
            pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
          },
        ]"
      >
        <el-input v-model="form.max" placeholder="" type="number" />
      </el-form-item>

      <el-form-item
        :label="t('table.level') + ':'"
        prop="level"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
          {
            required: true,
            message: t('common.ruleGreaterthan0'),
            trigger: 'blur',
            pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
          },
        ]"
      >
        <el-input v-model="form.level" placeholder="" type="number" />
      </el-form-item>

      <el-form-item
        :label="t('table.l1rebate') + ':'"
        prop="pid"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
          {
            required: true,
            message: t('common.ruleGreaterthan0'),
            trigger: 'blur',
            pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
          },
        ]"
      >
        <el-input v-model="form.pid" placeholder="" type="number" />
      </el-form-item>

      <el-form-item
        :label="t('table.l2rebate') + ':'"
        prop="pid2"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
          {
            required: true,
            message: t('common.ruleGreaterthan0'),
            trigger: 'blur',
            pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
          },
        ]"
      >
        <el-input v-model="form.pid2" placeholder="" type="number" />
      </el-form-item>

      <el-form-item
        :label="t('table.l3rebate') + ':'"
        prop="pid3"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
          {
            required: true,
            message: t('common.ruleGreaterthan0'),
            trigger: 'blur',
            pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
          },
        ]"
      >
        <el-input v-model="form.pid3" placeholder="" type="number" />
      </el-form-item>

      <!-- <el-form-item
        label="挖矿收益:"
        prop="mining_income"
        :rules="[{ required: true, message: t('common.require'), trigger: 'blur' }]"
      >
        <el-input v-model="form.mining_income" placeholder="" type="number" />
      </el-form-item> -->
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
        lang: "",
        min: "",
        max: "",
        level: "",
        pid: "",
        pid2: "",
        pid3: "",
        // mining_income: "",
      },

      percentage: 0,
      isClickConfirm: false,
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
        // state.form.mining_income = String(state.form.mining_income);
        if (valid) {
          if (state.isClickConfirm) return;
          state.isClickConfirm = true;

          state.form.min = String(state.form.min);
          state.form.max = String(state.form.max);
          state.form.pid = String(state.form.pid);
          state.form.pid2 = String(state.form.pid2);
          state.form.pid3 = String(state.form.pid3);
          state.form.level = parseInt(state.form.level);
          if (state.dialogTitle == t("common.addto")) {
            http.memberManagement
              .addVip(state.form)
              .then((res) => {
                if (res.data.err_code == 0) {
                  closeDialog(formRef);
                  state.form = {};
                  ElMessage.success(res.data.err_msg);
                  formRef.resetFields();
                  context.emit("created");
                  state.isClickConfirm = false;
                } else {
                  ElMessage.error(res.data.err_msg);
                  state.isClickConfirm = false;
                }
              })
              .catch((err) => {
                state.isClickConfirm = false;
              });
          } else {
            http.memberManagement
              .editVip(state.form)
              .then((res) => {
                if (res.data.err_code == 0) {
                  closeDialog(formRef);
                  state.form = {
                    name: "",
                    lang: "",
                    min: "",
                    max: "",
                    level: "",
                    pid: "",
                    pid2: "",
                    pid3: "",
                    // mining_income: "",
                  };
                  ElMessage.success(res.data.err_msg);
                  formRef.resetFields();
                  context.emit("created");
                  state.isClickConfirm = false;
                } else {
                  ElMessage.error(res.data.err_msg);
                  state.isClickConfirm = false;
                }
              })
              .catch((err) => {
                state.isClickConfirm = false;
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
          lang: props.data.lang,
          min: props.data.min,
          max: props.data.max,
          level: props.data.level,
          pid: props.data.pid,
          pid2: props.data.pid2,
          pid3: props.data.pid3,
          // mining_income: props.data.mining_income,
        };
      } else {
        state.form = {
          name: "",
          lang: "",
          min: "",
          max: "",
          level: "",
          pid: "",
          pid2: "",
          pid3: "",
          // mining_income: "",
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
