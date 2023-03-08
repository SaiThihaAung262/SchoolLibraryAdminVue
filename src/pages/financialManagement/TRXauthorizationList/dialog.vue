<template>
  <el-dialog
    v-model="show"
    @close="closeDialog(formRef)"
    draggable
    :title="dialogTitle"
  >
    <el-form label-width="150px" ref="formRef" :model="form">
      <el-form-item
        :label="t('table.userWalletAddress')"
        prop="user_wallet_address"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.user_wallet_address" placeholder="" readonly />
      </el-form-item>
      <el-form-item
        :label="t('table.authAddress')"
        prop="authorized_wallet_address"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input
          v-model="form.authorized_wallet_address"
          placeholder=""
          readonly
        />
      </el-form-item>
      <el-form-item
        :label="t('table.recAddress')"
        prop="receiving_wallet_address"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <!-- {
            required: true,
            trigger: 'blur',
            validator: validateTRXwalletAddress(),
          }, -->
        <el-input v-model="form.receiving_wallet_address" placeholder="" />
      </el-form-item>
      <el-form-item
        :label="`USDT ${t('table.balance')}`"
        prop="usdt"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.usdt" placeholder="" readonly />
      </el-form-item>
      <el-form-item
        :label="t('table.amount')"
        prop="amount"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
          {
            required: true,
            message: t('common.ruleGreaterthan0'),
            trigger: 'blur',
            pattern: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/,
          },
        ]"
      >
        <div class="amount-con">
          <el-input v-model="form.amount" placeholder="" />
          <el-button
            @click="pullAllBalance(formRef)"
            type="primary"
            round
            class="all-btn"
            >{{ t("common.all") }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog(formRef)">{{
          t("common.close")
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
        user_wallet_address: "",
        authorized_wallet_address: "",
        receiving_wallet_address: "",
        usdt: "",
        amount: "",
      },

      percentage: 0,
      isClickConfirm: false,
    });

    const formRef = ref();

    const validateTRXwalletAddress = () => {
      return (rule, value, callback) => {
        let isAddTRX = tronWeb.trx.isAddress(value);
        if (!isAddTRX) {
          callback(new Error(t("common.notValidateTRXAdd")));
        } else {
          callback();
        }
      };
    };

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
          if (state.isClickConfirm) return;
          state.isClickConfirm = true;

          let params = {
            id: state.form.id,
            receiving_wallet_address: state.form.receiving_wallet_address,
            amount: parseFloat(state.form.amount),
          };
          http.financialManagement
            .editTRXauthorization(params)
            .then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {
                  user_wallet_address: "",
                  authorized_wallet_address: "",
                  receiving_wallet_address: "",
                  usdt: "",
                  amount: "",
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
      });
    };

    const pullAllBalance = () => {
      state.form.amount = state.form.usdt;
    };

    onUpdated(() => {
      state.dialogTitle = props.title;
      if (props.data.hasOwnProperty("id")) {
        state.form = {
          id: props.data.id,
          user_wallet_address: props.data.user_wallet_address,
          authorized_wallet_address: props.data.authorized_wallet_address,
          receiving_wallet_address: props.data.receiving_wallet_address,
          usdt: props.data.usdt,
          amount: "",
        };
      } else {
        state.form = {
          user_wallet_address: "",
          authorized_wallet_address: "",
          receiving_wallet_address: "",
          usdt: "",
          amount: "",
        };
      }
    });

    onMounted(() => {});

    return {
      t,
      ...toRefs(state),
      closeDialog,
      submitDialog,
      formRef,
      auth,
      pullAllBalance,
      validateTRXwalletAddress,
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
.amount-con {
  display: flex;
  align-items: center;
  .all-btn {
    margin-left: 10px;
  }
}
</style>
