<template>
  <el-dialog
    v-model="show"
    @close="closeDialog(formRef)"
    draggable
    :title="dialogTitle"
  >
    <el-form label-width="100px" ref="formRef" :model="form">
      <!-- <el-form-item
        label="Alias Name"
        prop="alias_name"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
      >
        <el-input v-model="form.alias_name" placeholder="" />
      </el-form-item> -->
      <el-form-item
        label="所属银行"
        prop="bank_name"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
      >
        <el-input v-model="form.bank_name" placeholder="" />
      </el-form-item>

      <el-form-item
        label="所属支行"
        prop="bank_branch"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
      >
        <el-input v-model="form.bank_branch" placeholder="" />
      </el-form-item>

      <el-form-item
        label="银行卡号"
        prop="bank_account"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
      >
        <el-input v-model="form.bank_account" placeholder="" />
      </el-form-item>

      <el-form-item
        label="开户名"
        prop="real_name"
        :rules="[{ required: true, message: '必填！', trigger: 'blur' }]"
      >
        <el-input v-model="form.real_name" placeholder="" />
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

export default {
  name: "Dialog",
  props: ["show", "title", "data"],
  setup(props, context) {
    const state = reactive({
      dialogTitle: "",
      form: {
        id: "",
        bank_name: "",
        bank_branch: "",
        bank_account: "",
        real_name: "",
      },
    });

    const formRef = ref();

    const closeDialog = (formRef) => {
      formRef.resetFields();

      context.emit("closed");
    };

    const submitDialog = (formRef) => {
      formRef.validate((valid) => {
        if (valid) {
          if (state.dialogTitle == "添加用户") {
          } else {
            http.moneyManagement
              .updateUserBankList(state.form.id, state.form)
              .then((res) => {
                if (res.data.err_code == 0) {
                  closeDialog(formRef);
                  state.form = {
                    id: "",
                    bank_name: "",
                    bank_branch: "",
                    bank_account: "",
                    real_name: "",
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

    onMounted(() => {});

    onUpdated(() => {
      state.dialogTitle = props.title;
      if (props.data.hasOwnProperty("id")) {
        state.form.id = props.data.id;
        state.form.bank_name = props.data.bank_name;
        state.form.bank_branch = props.data.bank_branch;
        state.form.bank_account = props.data.bank_account;
        state.form.real_name = props.data.real_name;
      } else {
        state.form = {
          id: "",
          bank_name: "",
          bank_branch: "",
          bank_account: "",
          real_name: "",
        };
      }
    });

    return {
      ...toRefs(state),
      closeDialog,
      submitDialog,
      formRef,
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
