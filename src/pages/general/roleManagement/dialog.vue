<template>
  <el-dialog
    v-model="show"
    @close="closeDialog(formRef)"
    draggable
    :title="dialogTitle"
  >
    <el-form label-width="120px" ref="formRef" :model="form">
      <el-form-item
        :label="t('common.name') + ':'"
        prop="name"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.name" placeholder="" />
      </el-form-item>

      <el-form-item
        :label="t('common.description') + ':'"
        prop="description"
        :rules="[
          { required: true, message: t('common.require'), trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.description" placeholder="" />
      </el-form-item>

      <el-form-item :label="t('table.permission') + ':'">
        <div class="tree-con">
          <el-tree
            :show-checkbox="true"
            ref="checkedDataRef"
            :data="menuLists"
            node-key="id"
            highlight-current
            :props="defaultProps"
            :default-expand-all="false"
            @check="checkList"
            :default-checked-keys="form.full_select"
          />
        </div>
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
import {
  onMounted,
  reactive,
  toRefs,
  ref,
  watch,
  onUpdated,
  computed,
} from "vue";
import http from "@/http";
import { ElMessage } from "element-plus";
import { getToken } from "@/utils/cookie";
import axios from "axios";
import { prop } from "dom7";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

export default {
  name: "Dialog",
  props: ["show", "title", "data"],
  setup(props, context) {
    const { t } = useI18n();
    const store = useStore();
    const langNodeName = (name) => {
      return t(`menu.${name}`);
    };
    const state = reactive({
      dialogTitle: "",
      uploadPercent: 0,

      form: {
        name: "",
        description: "",
        permissions: [],
        full_select: [],
        half_select: [],
      },

      percentage: 0,
      // menuLists: JSON.parse(localStorage.getItem("menu")),
      menuLists: [],

      defaultProps: {
        children: "children",
        // label: "name",
        label: "name",
      },
    });

    const checkedDataRef = ref();
    const formRef = ref();

    const auth = {
      Authorization: getToken(),
    };

    const closeDialog = (formRef) => {
      formRef.resetFields();
      // checkedDataRef.value.setCheckedKeys([]);
      // state.form.full_select = [];
      // state.form.half_select = [];
      console.log("Here is closed dialog");
      context.emit("closed");
    };

    const submitDialog = (formRef) => {
      formRef.validate((valid) => {
        if (valid) {
          if (state.dialogTitle == t("common.addto")) {
            http.general.addRole(state.form).then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {
                  name: "",
                  description: "",
                  permissions: [],
                  full_select: [],
                  half_select: [],
                };
                ElMessage.success(res.data.err_msg);

                formRef.resetFields();
                context.emit("created");
              } else {
                ElMessage.error(res.data.err_msg);
              }
            });
          } else {
            http.general.editRole(state.form).then((res) => {
              if (res.data.err_code == 0) {
                closeDialog(formRef);
                state.form = {
                  name: "",
                  description: "",
                  permissions: [],
                  full_select: [],
                  half_select: [],
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

    const checkList = () => {
      state.form.full_select = checkedDataRef.value.getCheckedKeys();
      state.form.half_select = checkedDataRef.value.getHalfCheckedKeys();

      state.form.permissions = state.form.full_select.concat(
        state.form.half_select
      );
      console.log(state.form.permissions);
    };

    onUpdated(() => {
      state.dialogTitle = props.title;
      if (props.data.hasOwnProperty("id")) {
        console.log(props.data.permission);
        let permissionIds = props.data.permission.map((item) => {
          return item.id;
        });
        // state.form.full_select = [];
        // state.form.half_select = [];
        // checkedDataRef.value.setCheckedKeys([]);
        state.form = {
          id: props.data.id,
          name: props.data.name,
          description: props.data.description,
          permissions: permissionIds,
          full_select: props.data.full_data.full_select,
          half_select: props.data.half_data.half_select,
        };
      } else {
        state.form = {
          name: "",
          description: "",
          permissions: [],
          full_select: [],
          half_select: [],
        };
      }
    });
    onMounted(() => {
      let menusFromLocal = JSON.parse(localStorage.getItem("menu"));
      let langMenu = menusFromLocal.map((item) => {
        item.name = t(`menu.${item.name}`);
        if (item.children !== null) {
          item.children.map((item) => {
            item.name = t(`menu.${item.name}`);
            if (item.children) {
              item.children.map((item) => {
                item.name = t(`menu.${item.name}`);
                return item;
              });
            }
            return item;
          });
        }
        return item;
      });
      state.menuLists = langMenu;
    });

    return {
      ...toRefs(state),
      closeDialog,
      submitDialog,
      formRef,
      auth,
      t,
      checkedDataRef,
      checkList,
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
.tree-con {
  border: 1px solid rgb(192, 191, 191);
  padding: 10px;
  width: 100%;
}
</style>
