<template>
  <el-dialog
    v-model="show"
    @close="closePledgeDialog(formRef)"
    draggable
    :title="dialogTitle"
  >
    <el-form label-width="180px" ref="formRef" :model="form">
      <el-form-item
        :label="t('common.userID') + ':'"
        prop="user_id"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.user_id" placeholder="" readonly />
      </el-form-item>

      <el-form-item :label="t('table.walletType') + ':'">
        <el-radio-group v-model="form.address_type">
          <el-radio label="ETH" :disabled="form.address_type == 'TRX'"
            >ETH</el-radio
          >
          <el-radio label="TRX" :disabled="form.address_type == 'ETH'">
            TRX
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="t('table.type') + ':'">
        <el-radio-group v-model.number="form.activity_type">
          <el-radio :label="1"> {{ t("table.pledge") }} </el-radio>
          <el-radio :label="2"> {{ t("table.miningPrizePool") }} </el-radio>
        </el-radio-group>
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
          readonly
        />
      </el-form-item>

      <el-form-item
        :label="t('table.usdtStandardPledge') + ':'"
        prop="standard_pledge_amount"
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
          v-model="form.standard_pledge_amount"
          placeholder=""
          type="number"
        />
      </el-form-item>

      <el-form-item
        :label="t('table.pledgeAmt') + ':'"
        prop="pledge_amount"
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
        <el-input v-model="form.pledge_amount" placeholder="" type="number" />
      </el-form-item>

      <el-form-item
        :label="form.address_type + ' ' + t('table.income') + ':'"
        prop="money_earnings"
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
        <el-input v-model="form.money_earnings" placeholder="" type="number" />
      </el-form-item>

      <el-form-item
        :label="t('common.startTime') + ':'"
        prop="start_time"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-date-picker
          v-model="form.start_time"
          type="datetime"
          placeholder="Pick a Date"
          format="YYYY/MM/DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <!-- :disabled="form.status == 5" -->

      <el-form-item
        :label="t('common.endTime') + ':'"
        prop="end_time"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-date-picker
          v-model="form.end_time"
          type="datetime"
          placeholder="Pick a Date"
          format="YYYY/MM/DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item
        :label="t('table.overdueLock') + ':'"
        prop="overdue_lock_days"
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
          v-model="form.overdue_lock_days"
          placeholder=""
          type="number"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closePledgeDialog(formRef)">
          {{ t("common.close") }}
        </el-button>
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
import moment from "moment";
import { useI18n } from "vue-i18n";

export default {
  name: "PledgeDialog",
  props: ["show", "title", "data", "flag"],
  setup(props, context) {
    const { t } = useI18n();
    const state = reactive({
      dialogTitle: "",
      uploadPercent: 0,

      form: {
        user_id: 0,
        address_type: "",
        remark: "",
        activity_type: 1,
        account_balance: 0,
        standard_pledge_amount: 0,
        wallet_balance: 0,
        pledge_amount: 0,
        money_earnings: 0,
        start_time: "",
        end_time: "",
        overdue_lock_days: 0,
        status: 1,
      },

      percentage: 0,
      flag: 0,
      isClickConfirm: false,
    });

    const formRef = ref();

    const auth = {
      Authorization: getToken(),
    };

    const closePledgeDialog = (formRef) => {
      formRef.resetFields();
      context.emit("closed");
    };

    const submitDialog = (formRef) => {
      formRef.validate((valid) => {
        if (valid) {
          if (state.isClickConfirm) return;
          state.isClickConfirm = true;

          // let startDateIsGrate = state.form.start_time > state.form.end_time;
          // if (startDateIsGrate && state.form.status !== 5) {
          //   ElMessage.error(t("common.startGreatEndTime"));
          //   state.isClickConfirm = false;
          //   return;
          // }
          // if (
          //   state.form.start_time == state.form.end_time &&
          //   state.form.status !== 5
          // ) {
          //   ElMessage.error(t("common.startAndEndShouldNotSame"));
          //   state.isClickConfirm = false;
          //   return;
          // }
          // const today = new Date();
          // let nowToday = moment(today).format("YYYY-MM-DD HH:mm:ss");
          // console.log(nowToday);
          // let endDateLessThanToday = state.form.end_time < nowToday;
          // if (endDateLessThanToday && state.form.status !== 5) {
          //   ElMessage.error(t("common.endTimeLessThanToday"));
          //   state.isClickConfirm = false;
          //   console.log("blablabla");

          //   return;
          // }
          state.form.user_id = parseInt(state.form.user_id);
          state.form.activity_type = parseInt(state.form.activity_type);
          state.form.standard_pledge_amount = parseFloat(
            state.form.standard_pledge_amount
          );
          state.form.pledge_amount = parseFloat(state.form.pledge_amount);
          state.form.money_earnings = parseFloat(state.form.money_earnings);
          state.form.overdue_lock_days = parseInt(state.form.overdue_lock_days);

          if (state.flag == 0) {
            http.memberManagement
              .addMemberPledge(state.form)
              .then((res) => {
                if (res.data.err_code == 0) {
                  closePledgeDialog(formRef);
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
                console.log(err);
                state.isClickConfirm = false;
              });
          } else {
            console.log("Her is update");
            http.memberManagement
              .editMemberUserPledge(state.form)
              .then((res) => {
                if (res.data.err_code == 0) {
                  closePledgeDialog(formRef);
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
                console.log(err);
                state.isClickConfirm = false;
              });
          }
        }
      });
    };

    onUpdated(() => {
      state.dialogTitle = props.title;
      state.flag = props.flag;
      if (props.flag !== 0) {
        state.form.user_id = props.data.user_id;
        state.form.address_type = props.data.address_type;
        state.form.remark = props.data.remark;
        state.form.activity_type = props.data.activity_type;
        state.form.wallet_balance = props.data.wallet_balance;
        state.form.account_balance = props.data.account_balance;
        state.form.standard_pledge_amount = props.data.standard_pledge_amount;
        state.form.pledge_amount = props.data.pledge_amount;
        state.form.money_earnings = props.data.money_earnings;
        state.form.start_time = moment(props.data.start_time).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        state.form.end_time = moment(props.data.end_time).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        state.form.overdue_lock_days = props.data.overdue_lock_days;
        state.form.id = props.data.id;
        state.form.status = props.data.status;
      } else {
        state.form = {
          user_id: props.data.user_id,
          address_type: props.data.address_type,
          remark: "",
          activity_type: props.data.address_type == "TRX" ? 1 : 2,
          account_balance: 0,
          wallet_balance: props.data.wallet_balance,
          standard_pledge_amount: 0,
          pledge_amount: 0,
          money_earnings: 0,
          start_time: "",
          end_time: "",
          overdue_lock_days: 0,
          status: 1,
        };
      }
    });
    onMounted(() => {});

    return {
      ...toRefs(state),
      closePledgeDialog,
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
