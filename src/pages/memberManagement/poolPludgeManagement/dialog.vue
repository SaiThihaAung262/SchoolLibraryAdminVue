<template>
  <el-dialog
    v-model="show"
    @close="closeDialog(formRef)"
    draggable
    :title="dialogTitle"
  >
    <el-form label-width="190px" ref="formRef" :model="form">
      <el-form-item
        :label="t('common.userID') + ':'"
        prop="user_id"
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
        <el-input v-model.number="form.user_id" placeholder="" type="number" />
      </el-form-item>

      <el-form-item :label="t('table.type') + ':'">
        <el-radio-group v-model.number="form.activity_type">
          <el-radio :label="1"> {{ t("table.pledge") }} </el-radio>
          <el-radio :label="2"> {{ t("table.miningPrizePool") }} </el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- <el-form-item label="账户余额:" v-if="dialogTitle !== t('common.addto')">
        <el-input
          v-model.number="form.account_balance"
          placeholder=""
          type="number"
          readonly
        />
      </el-form-item> -->

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
          v-model.number="form.standard_pledge_amount"
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
        <el-input
          v-model.number="form.pledge_amount"
          placeholder=""
          type="number"
        />
      </el-form-item>

      <el-form-item
        :label="t('table.income') + ':'"
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
        <el-input
          v-model.number="form.money_earnings"
          placeholder=""
          type="number"
        />
      </el-form-item>

      <el-form-item
        :label="t('table.status') + ':'"
        v-if="dialogTitle !== t('common.addto')"
      >
        <el-radio-group v-model.number="form.status">
          <el-radio :label="1" :disabled="form.status === 5">{{
            t("table.notInvolved")
          }}</el-radio>
          <el-radio :label="2" :disabled="form.status === 5">{{
            t("table.participating")
          }}</el-radio>
          <el-radio :label="3" :disabled="form.status === 5">{{
            t("table.completed")
          }}</el-radio>
          <el-radio :label="4" :disabled="form.status === 5">{{
            t("table.cancel")
          }}</el-radio>
          <el-radio :label="5">{{ t("table.overdue") }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        :label="t('common.startTime') + ':'"
        prop="start_time"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <!-- <el-input
          v-model.number="form.start_time"
          placeholder=""
          type="number"
        /> -->
        <el-date-picker
          v-model="form.start_time"
          type="datetime"
          :placeholder="t('common.startTime') + ':'"
          format="YYYY-MM-DD HH:mm:ss"
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
        <!-- <el-input v-model.number="form.end_time" placeholder="" type="number" /> -->
        <el-date-picker
          v-model="form.end_time"
          type="datetime"
          :placeholder="t('common.endTime') + ':'"
          format="YYYY-MM-DD HH:mm:ss"
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
          v-model.number="form.overdue_lock_days"
          placeholder=""
          type="number"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog(formRef)">
          {{ t("common.cancle") }}
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
  name: "Dialog",
  props: ["show", "title", "data"],
  setup(props, context) {
    const { t } = useI18n();
    const state = reactive({
      dialogTitle: "",
      uploadPercent: 0,

      form: {
        user_id: 0,
        remark: "",
        activity_type: 1,
        standard_pledge_amount: 0,
        pledge_amount: 0,
        money_earnings: 0,
        start_time: "",
        end_time: "",
        overdue_lock_days: 0,
        status: 1,
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
          // let todayDate = moment(today).format("YYYY-MM-DD HH:mm:ss");
          // let endDateLessThanToday = state.form.end_time < todayDate;
          // console.log(endDateLessThanToday);
          // if (endDateLessThanToday && state.form.status !== 5) {
          //   ElMessage.error(t("common.endTimeLessThanToday"));
          //   state.isClickConfirm = false;
          //   return;
          // }
          state.form.user_id = parseInt(state.form.user_id);
          state.form.activity_type = parseInt(state.form.activity_type);
          state.form.standard_pledge_amount = parseFloat(
            state.form.standard_pledge_amount
          );
          state.form.pledge_amount = parseFloat(state.form.pledge_amount);
          state.form.money_earnings = parseFloat(state.form.money_earnings);
          // state.form.start_time = "2022-10-08T11:15:39.491+06:30";
          // state.form.end_time = "2022-10-10T11:15:39.491+06:30";
          state.form.overdue_lock_days = parseInt(state.form.overdue_lock_days);

          if (state.dialogTitle == t("common.addto")) {
            http.memberManagement
              .addPledge(state.form)
              .then((res) => {
                if (res.data.err_code == 0) {
                  closeDialog(formRef);
                  state.form = {};
                  ElMessage.success(res.data.err_msg);

                  formRef.resetFields();
                  context.emit("created");
                  state.isClickConfirm = false;
                } else {
                  state.isClickConfirm = false;
                  ElMessage.error(res.data.err_msg);
                }
              })
              .catch((err) => {
                state.isClickConfirm = false;
              });
          } else {
            http.memberManagement
              .editPledge(state.form)
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
          }
        }
      });
    };

    onUpdated(() => {
      state.dialogTitle = props.title;
      if (props.data.hasOwnProperty("user_id")) {
        state.form.id = props.data.id;
        state.form.user_id = props.data.user_id;
        state.form.remark = props.data.remark;
        state.form.activity_type = props.data.activity_type;
        state.form.standard_pledge_amount = props.data.standard_pledge_amount;
        state.form.pledge_amount = props.data.pledge_amount;
        state.form.money_earnings = props.data.money_earnings;
        state.form.start_time = moment(props.data.start_time).format(
          "YYYY-MM-DD HH:mm:ss"
        ); //
        state.form.end_time = moment(props.data.end_time).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        state.form.overdue_lock_days = props.data.overdue_lock_days;
        // state.form.account_balance = props.data.account_balance;
        state.form.status = props.data.status;
      } else {
        state.form = {
          user_id: 0,
          remark: "",
          activity_type: 1,
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
