<template>
  <div v-loading="isLoading">
    <el-form
      label-width="270px"
      label-position="left"
      :model="systemConfigParam"
    >
      <el-form-item
        label="Teacher Can Borrow book Amount :"
        prop="teacher_can_borrow_count"
        :rules="[
          {
            required: true,
            message: 'Cannot be empty or minus',
            trigger: 'blur',
            pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
          },
        ]"
      >
        <el-input
          placeholder=""
          v-model="systemConfigParam.teacher_can_borrow_count"
        />
      </el-form-item>
      <el-form-item
        label="Student Can Borrow Book Amount :"
        prop="student_can_borrow_count"
        :rules="[
          {
            required: true,
            message: 'Cannot be empty or minus',
            trigger: 'blur',
            pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
          },
        ]"
      >
        <el-input
          placeholder=""
          v-model="systemConfigParam.student_can_borrow_count"
        />
      </el-form-item>

      <!-- <el-form-item
        label="Teacher Punishment Amount : "
        prop="teacher_punishment_amt"
        :rules="[
          {
            required: true,
            message: 'Cannot be empty or minus',
            trigger: 'blur',
            pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
          },
        ]"
      >
        <el-input
          placeholder=""
          v-model="systemConfigParam.teacher_punishment_amt"
        />
      </el-form-item>
      <el-form-item
        label="Student Punishment Amount : "
        prop="student_punishment_amt"
        :rules="[
          {
            required: true,
            message: 'Cannot be empty or minus',
            trigger: 'blur',
            pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
          },
        ]"
      >
        <el-input
          placeholder=""
          v-model="systemConfigParam.student_punishment_amt"
        />
      </el-form-item> -->

      <el-button
        @click="confirmSaveChange"
        class="app-button"
        style="margin-bottom: 25px"
        type="primary"
      >
        Save</el-button
      >
      <el-button
        @click="resetData"
        class="bg-gray"
        style="margin-bottom: 25px"
        type="info"
      >
        Reset</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed, ref } from "vue";
import http from "@/http";
import { useStore } from "vuex";
import { dateFormat } from "@/utils/timeFormat.js";
import { ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import Web3 from "web3";

export default {
  name: "Profile",
  components: {},
  setup() {
    const { t } = useI18n();
    var web3 = new Web3(Web3.givenProvider);
    const state = reactive({
      isLoading: false,
      showDialog: false,
      systemConfigParam: {
        id: 0,
        teacher_can_borrow_count: 0,
        student_can_borrow_count: 0,
        teacher_punishment_amt: 0,
        student_punishment_amt: 0,
      },
    });
    const store = useStore();

    const getSystemConfig = () => {
      state.isLoading = true;
      http.config
        .getConfigData()
        .then((res) => {
          if (res.data.err_code === 0) {
            state.systemConfigParam = {
              id: res.data.data.id,
              teacher_can_borrow_count: res.data.data.teacher_can_borrow_count,
              student_can_borrow_count: res.data.data.student_can_borrow_count,
              teacher_punishment_amt: res.data.data.teacher_punishment_amt,
              student_punishment_amt: res.data.data.student_punishment_amt,
            };
            state.isLoading = false;
          }
        })
        .catch((err) => {
          state.isLoading = false;
        });
    };

    const confirmSaveChange = () => {
      ElMessageBox.confirm(
        "Are you sure want to save this config?",
        "Warning",
        {
          confirmButtonText: "Sure",
          cancelButtonText: "Cancel",
          type: "warning",
          draggable: true,
        }
      )
        .then(() => {
          state.systemConfigParam.id = state.systemConfigParam.id;
          state.systemConfigParam.teacher_can_borrow_count = parseInt(
            state.systemConfigParam.teacher_can_borrow_count
          );
          state.systemConfigParam.student_can_borrow_count = parseInt(
            state.systemConfigParam.student_can_borrow_count
          );
          state.systemConfigParam.teacher_punishment_amt = parseInt(
            state.systemConfigParam.teacher_punishment_amt
          );
          state.systemConfigParam.student_punishment_amt = parseInt(
            state.systemConfigParam.student_punishment_amt
          );
          http.config.updateConfigData(state.systemConfigParam).then((res) => {
            if (res.data.err_code == 0) {
              ElMessage.success(res.data.err_msg);
              getSystemConfig();
            } else {
              ElMessage.error(res.data.err_msg);
            }
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Canceled",
          });
        });
    };

    const resetData = () => {
      getSystemConfig();
    };

    onMounted(() => {
      getSystemConfig();
    });

    return {
      ...toRefs(state),
      dateFormat,
      windowRect: computed(() => store.state.app.windowRect),
      device: computed(() => store.state.app.device),
      resetData,
      confirmSaveChange,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.border-card {
  box-shadow: 2px 4px 8px rgb(190 178 213 / 50%);
  margin-top: 20px;
  border: none;
}

:deep(.el-table th.el-table__cell.is-leaf) {
  border: none !important;
}
:deep(.el-table td.el-table__cell) {
  border: none !important;
}
:deep(.el-table) {
  border: none !important;
}

:deep(.el-table__inner-wrapper::before) {
  display: none !important;
}
</style>
