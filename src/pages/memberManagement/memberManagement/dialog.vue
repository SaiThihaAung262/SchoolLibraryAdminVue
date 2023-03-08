<template>
  <el-dialog
    v-model="show"
    @close="closeDialog(formRef)"
    draggable
    :title="dialogTitle"
  >
    <el-form label-width="130px" ref="formRef" :model="form">
      <el-form-item
        :label="t('table.roleGroup') + ':'"
        v-if="dialogTitle == t('common.addto')"
      >
        <el-select v-model="form.group_id" :multiple="false" allow-create>
          <el-option
            v-for="(item, index) in groupOptions"
            :key="index"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('table.selectAcc') + ':'">
        <el-select v-model="form.type" :multiple="false" allow-create>
          <el-option
            v-for="(item, index) in accountTypeOptions"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        :label="t('table.walletCategory') + ':'"
        v-if="dialogTitle == t('common.addto')"
      >
        <el-select v-model="form.address_type" :multiple="false" allow-create>
          <el-option
            v-for="(item, index) in typeOptions"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        :label="t('table.walletAddress') + ':'"
        prop="wallet_address"
        :rules="[
          {
            required: true,
            trigger: 'blur',
          },
        ]"
      >
        <!-- validator: validateWalletAddress(), -->

        <el-input
          v-model="form.wallet_address"
          placeholder=""
          :disabled="dialogTitle !== t('common.addto')"
        />
      </el-form-item>
      <el-form-item
        :label="t('table.remark') + ':'"
        prop="remark"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.remark" placeholder="" />
      </el-form-item>

      <el-form-item
        v-if="dialogTitle !== t('common.addto')"
        :label="t('table.vipLevel') + ':'"
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
        v-if="dialogTitle !== t('common.addto')"
        :label="t('table.walletBalance') + ':'"
        prop="wallet_balance"
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
        <el-input
          v-model="form.wallet_balance"
          placeholder=""
          type="number"
          disabled
        />
      </el-form-item>
      <el-form-item
        v-if="dialogTitle !== t('common.addto') && form.address_type == 'ETH'"
        :label="t('table.ethBal') + ':'"
        prop="eth_balance"
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
        <el-input
          v-model="form.eth_balance"
          placeholder=""
          type="number"
          disabled
        />
      </el-form-item>

      <el-form-item
        v-if="dialogTitle !== t('common.addto') && form.address_type == 'TRX'"
        :label="t('table.trxBal') + ':'"
        prop="trx_balance"
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
        <el-input
          v-model="form.trx_balance"
          placeholder=""
          type="number"
          disabled
        />
      </el-form-item>

      <el-form-item
        :label="t('table.changeETH') + ':'"
        v-if="dialogTitle !== t('common.addto') && form.address_type == 'ETH'"
      >
        <div class="change-bal">
          <el-select
            v-model="form.coin_flag"
            :multiple="false"
            allow-create
            style="width: 140px; border: none"
            placeholder="-"
          >
            <el-option
              v-for="(item, index) in changeBalanceOpts"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </el-select>

          <el-form-item
            v-if="dialogTitle !== t('common.addto')"
            label=""
            prop="eth_amount"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              v-model="form.eth_amount"
              placeholder="Amount"
              style="margin-left: 20px"
              :disabled="!form.coin_flag"
            >
            </el-input>
          </el-form-item>
        </div>
      </el-form-item>

      <el-form-item
        :label="t('table.changeTRX') + ':'"
        v-if="dialogTitle !== t('common.addto') && form.address_type == 'TRX'"
      >
        <div class="change-bal">
          <el-select
            v-model="form.coin_flag"
            :multiple="false"
            allow-create
            style="width: 140px; border: none"
            placeholder="-"
          >
            <el-option
              v-for="(item, index) in changeBalanceOpts"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </el-select>

          <el-form-item
            v-if="dialogTitle !== t('common.addto')"
            label=""
            prop="trx_amount"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              v-model="form.trx_amount"
              placeholder="Amount"
              style="margin-left: 20px"
              :disabled="!form.coin_flag"
            >
            </el-input>
          </el-form-item>
        </div>
      </el-form-item>

      <el-form-item
        v-if="dialogTitle !== t('common.addto')"
        :label="t('table.usdtBal') + ':'"
        prop="usdt_balance"
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
        <el-input
          v-model="form.usdt_balance"
          placeholder=""
          type="number"
          disabled
        />
      </el-form-item>

      <el-form-item
        :label="t('table.changeUSDT') + ':'"
        v-if="dialogTitle !== t('common.addto')"
      >
        <div class="change-bal">
          <el-select
            v-model="form.usdt_flag"
            :multiple="false"
            allow-create
            style="width: 140px; border: none"
            placeholder="-"
          >
            <el-option
              v-for="(item, index) in changeBalanceOpts"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </el-select>

          <el-form-item
            v-if="dialogTitle !== t('common.addto')"
            label=""
            prop="usdt_amount"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              v-model="form.usdt_amount"
              placeholder="Amount"
              style="margin-left: 20px"
              :disabled="!form.usdt_flag"
            >
            </el-input>
          </el-form-item>
        </div>
      </el-form-item>

      <!-- <el-form-item label="是否授权:">
        <el-radio-group v-model.number="form.is_authorized">
          <el-radio :label="2">未授权</el-radio>
          <el-radio :label="1">已授权</el-radio>
        </el-radio-group>
      </el-form-item> -->

      <el-form-item
        :label="t('table.openWithdraw') + ':'"
        v-if="dialogTitle !== t('common.addto')"
      >
        <el-radio-group v-model.number="form.withdraw">
          <el-radio :label="2">{{ t("common.turnOff") }}</el-radio>
          <el-radio :label="1">{{ t("common.turnOn") }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        :label="t('table.turnOnEarn') + ':'"
        v-if="dialogTitle !== t('common.addto')"
      >
        <el-radio-group v-model.number="form.income">
          <el-radio :label="2">{{ t("common.turnOff") }}</el-radio>
          <el-radio :label="1">{{ t("common.turnOn") }}</el-radio>
        </el-radio-group>
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
import axios from "axios";
import Web3 from "web3";
import { useI18n } from "vue-i18n";
export default {
  name: "Dialog",
  props: ["show", "title", "data", "groupData"],
  setup(props, context) {
    const { t } = useI18n();
    const state = reactive({
      dialogTitle: "",
      uploadPercent: 0,

      form: {
        group_id: 0,
        type: 1,
        wallet_address: "",
        // is_authorized: 2,
        income: 2,
        withdraw: 2,
        remark: "",
        address_type: "ETH",
        level: 0,
        wallet_balance: 0.0,
        usdt_balance: 0.0,
        eth_balance: 0.0,
        trx_balance: 0.0,
        usdt_flag: "",
        usdt_amount: 0,
        coin_flag: "",
        eth_amount: 0,
        trx_amount: 0,
      },
      groupOptions: [],

      accountTypeOptions: [
        {
          value: 1,
          label: t("table.member"),
        },
        {
          value: 2,
          label: t("table.internal"),
        },
      ],
      typeOptions: [
        {
          value: "ETH",
          label: "ETH",
        },
        {
          value: "TRX",
          label: "TRX",
        },
      ],
      changeBalanceOpts: [
        {
          value: 1,
          label: t("common.increase"),
        },
        {
          value: 2,
          label: t("common.freeze"),
        },
      ],
      percentage: 0,
      isClickConfirm: false,
    });
    var web3 = new Web3(Web3.givenProvider);

    const formRef = ref();

    const auth = {
      Authorization: getToken(),
    };

    const closeDialog = (formRef) => {
      formRef.resetFields();
      context.emit("closed");
    };

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

    const submitDialog = (formRef) => {
      formRef.validate((valid) => {
        if (valid) {
          if (state.isClickConfirm) return;
          state.isClickConfirm = true;
          state.form.type = parseInt(state.form.type);
          // state.form.is_authorized = parseInt(state.form.is_authorized);
          state.form.income = parseInt(state.form.income);
          state.form.withdraw = parseInt(state.form.withdraw);
          state.form.level = parseInt(state.form.level);
          state.form.wallet_balance = parseFloat(state.form.wallet_balance);
          state.form.usdt_balance = parseFloat(state.form.usdt_balance);
          state.form.eth_balance = parseFloat(state.form.eth_balance);
          state.form.trx_balance = parseFloat(state.form.trx_balance);
          state.form.usdt_amount = parseFloat(state.form.usdt_amount);
          state.form.eth_amount = parseFloat(state.form.eth_amount);
          state.form.trx_amount = parseFloat(state.form.trx_amount);

          if (!state.form.usdt_flag) {
            state.form.usdt_flag = 0;
          } else if (state.form.usdt_flag == 2) {
            if (state.form.usdt_amount > state.form.usdt_balance) {
              ElMessage.error(t("common.freezeAmtGrather"));
              return;
            }
          }

          if (!state.form.coin_flag) {
            state.form.coin_flag = 0;
          } else if (state.form.coin_flag == 2) {
            if (state.form.eth_amount > state.form.eth_balance) {
              ElMessage.error(t("common.freezeETHGrather"));
              return;
            }
            if (state.form.trx_amount > state.form.trx_balance) {
              ElMessage.error(t("common.freezeTRXGrather"));
              return;
            }
          }

          if (state.dialogTitle == t("common.addto")) {
            http.memberManagement
              .addMember(state.form)
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
              .editMember(state.form)
              .then((res) => {
                if (res.data.err_code == 0) {
                  closeDialog(formRef);
                  state.form = {
                    usdt_amount: 0,
                    usdt_flag: "",
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
      // state.groupOptions = props.groupData;
      state.groupOptions = [...props.groupData];
      if (props.data.hasOwnProperty("user_id")) {
        state.form.user_id = props.data.user_id;
        state.form.group_id = props.data.group_id;
        state.form.type = props.data.type;
        state.form.wallet_address = props.data.wallet_address;
        // state.form.is_authorized = props.data.is_authorized;
        state.form.income = props.data.income;
        state.form.withdraw = props.data.withdraw;
        state.form.remark = props.data.remark;
        state.form.address_type = props.data.address_type;
        state.form.level = props.data.level;
        state.form.wallet_balance = props.data.wallet_balance;
        state.form.usdt_balance = props.data.usdt_balance;
        state.form.eth_balance = props.data.eth_balance;
        state.form.trx_balance = props.data.trx_balance;
        state.form.usdt_flag = "";
        state.form.coin_flag = "";
        state.form.usdt_amount = 0.0;
        state.form.eth_amount = 0.0;
        state.form.trx_amount = 0.0;
      } else {
        state.form = {
          group_id: 1,
          type: 1,
          wallet_address: "",
          // is_authorized: 2,
          income: 2,
          withdraw: 2,
          remark: "",
          address_type: "ETH",
          level: 0,
          wallet_balance: 0.0,
          usdt_balance: 0.0,
          eth_balance: 0.0,
          trx_balance: 0.0,
          usdt_amount: 0.0,
          coin_flag: "",
          eth_amount: 0,
          trx_amount: 0,
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
      validateWalletAddress,
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

:deep(.el-input-group__append .el-select, .el-input-group__append
    .el-button, .el-input-group__prepend .el-select, .el-input-group__prepend
    .el-button) {
  border: none;
}

.change-bal {
  display: flex;
}
</style>
