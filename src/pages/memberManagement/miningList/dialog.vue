<template>
  <el-dialog
    v-model="show"
    @close="closeDialog(formRef)"
    draggable
    :title="dialogTitle"
  >
    <el-form label-width="130px" ref="formRef" :model="form">
      <el-form-item
        label="用户id:"
        prop="user_id"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
      >
        <el-input v-model.number="form.user_id" placeholder="" type="number" />
      </el-form-item>

      <el-form-item label="类型:">
        <el-radio-group v-model.number="form.activity_type">
          <el-radio :label="1">质押</el-radio>
          <el-radio :label="2">挖矿奖池</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="账户余额:" v-if="dialogTitle !== '添加'">
        <el-input
          v-model.number="form.account_balance"
          placeholder=""
          type="number"
          readonly
        />
      </el-form-item>

      <el-form-item
        label="USDT质押标准:"
        prop="standard_pledge_amount"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
      >
        <el-input
          v-model.number="form.standard_pledge_amount"
          placeholder=""
          type="number"
        />
      </el-form-item>

      <el-form-item
        label="质押金额:"
        prop="pledge_amount"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
      >
        <el-input
          v-model.number="form.pledge_amount"
          placeholder=""
          type="number"
        />
      </el-form-item>

      <el-form-item
        label="收益:"
        prop="money_earnings"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
      >
        <el-input
          v-model.number="form.money_earnings"
          placeholder=""
          type="number"
        />
      </el-form-item>

      <el-form-item label="状态:" v-if="dialogTitle !== '添加'">
        <el-radio-group v-model.number="form.status">
          <el-radio :label="1">未参与</el-radio>
          <el-radio :label="2">参与中</el-radio>
          <el-radio :label="3">已完成</el-radio>
          <el-radio :label="4">取消</el-radio>
          <el-radio :label="5">逾期</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="开始时间:"
        prop="start_time"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
      >
        <!-- <el-input
          v-model.number="form.start_time"
          placeholder=""
          type="number"
        /> -->
        <el-date-picker
          v-model="form.start_time"
          type="datetime"
          placeholder="Pick a Date"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>

      <el-form-item
        label="结束时间:"
        prop="end_time"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
      >
        <!-- <el-input v-model.number="form.end_time" placeholder="" type="number" /> -->
        <el-date-picker
          v-model="form.end_time"
          type="datetime"
          placeholder="Pick a Date"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>

      <el-form-item
        label="逾期锁定天数:"
        prop="overdue_lock_days"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
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
import moment from "moment";

export default {
  name: "Dialog",
  props: ["show", "title", "data"],
  setup(props, context) {
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
      groupOptions: [
        {
          value: 0,
          label: "默认组",
        },
      ],
      accountTypeOptions: [
        {
          value: 1,
          label: "会员",
        },

        {
          value: 2,
          label: "内部",
        },
        {
          value: 3,
          label: "代理",
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

          if (state.dialogTitle == "添加") {
            http.memberManagement.addPledge(state.form).then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {};
                ElMessage.success(res.data.err_msg);

                formRef.resetFields();
                context.emit("created");
              } else {
                ElMessage.error(res.data.err_msg);
              }
            });
          } else {
            http.memberManagement.editPledge(state.form).then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {};
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
        state.form.account_balance = props.data.account_balance;
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
