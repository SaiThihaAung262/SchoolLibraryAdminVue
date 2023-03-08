<template>
  <el-dialog
    v-model="show"
    @close="closeDialog(formRef)"
    draggable
    :title="dialogTitle"
  >
    <el-form label-width="150px" ref="formRef" :model="form">
      <el-form-item :label="t('table.walletType')">
        <el-radio-group v-model.number="form.address_type">
          <el-radio label="ETH">ETH</el-radio>
          <el-radio label="TRX">TRX</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        :label="t('table.walletAddress')"
        prop="wallet_address"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
          {
            required: true,
            trigger: 'blur',
          },
        ]"
      >
        <!-- validator: validateWalletAddress(), -->

        <el-input v-model="form.wallet_address" placeholder="" />
      </el-form-item>

      <el-form-item
        :label="t('table.privateKey')"
        prop="private_key"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.private_key" placeholder="" />
      </el-form-item>

      <el-form-item
        :label="t('table.describe')"
        prop="apr"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.apr" placeholder="" />
      </el-form-item>

      <el-form-item
        label="OTP:"
        prop="otp"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.otp" placeholder="" />
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
import Web3 from "web3";

export default {
  name: "Dialog",
  props: ["show", "title", "data"],
  setup(props, context) {
    const { t } = useI18n();
    var web3 = new Web3(Web3.givenProvider);

    const state = reactive({
      dialogTitle: "",
      uploadPercent: 0,

      form: {
        address_type: "TRX",
        wallet_address: "",
        private_key: "",
        apr: "",
        otp: "",
      },

      percentage: 0,
    });

    const formRef = ref();

    const validateWalletAddress = () => {
      return (rule, value, callback) => {
        if (state.form.address_type == "ETH") {
          let isAddETH = web3.utils.isAddress(value);
          if (!isAddETH) {
            callback(new Error(t("common.notValidateETHAdd")));
          } else {
            callback();
          }
        } else {
          let isAddTRX = tronWeb.isAddress(value);
          if (!isAddTRX) {
            callback(new Error(t("common.notValidateTRXAdd")));
          } else {
            callback();
          }
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
          if (state.dialogTitle == t("common.addto")) {
            http.platformwallet.addBankList(state.form).then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {
                  address_type: "TRX",
                  wallet_address: "",
                  private_key: "",
                  apr: "",
                  otp: "",
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
                  address_type: "TRX",
                  wallet_address: "",
                  private_key: "",
                  apr: "",
                  otp: "",
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
          address_type: props.data.address_type,
          wallet_address: props.data.wallet_address,
          private_key: props.data.private_key,
          apr: props.data.apr,
        };
      } else {
        state.form = {
          address_type: "TRX",
          wallet_address: "",
          private_key: "",
          apr: "",
          otp: "",
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
      validateWalletAddress,
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
