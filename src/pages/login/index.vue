<template>
  <div class="container">
    <div class="login-container">
      <div class="login">
        <div class="login-header">
          <!-- <h3>{{ appName }}</h3> -->
        </div>
        <div class="login-wrapper">
          <div>
            <div class="login-body">
              <div class="login-title">
                <h3 class="title">{{ t("common.login") }}</h3>
              </div>
              <el-form
                class="login-form"
                label-position="top"
                :model="form"
                ref="loginFromRef"
              >
                <el-form-item
                  prop="username"
                  :label="t('table.userName')"
                  :rules="[
                    {
                      required: true,
                      message: t('common.require'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    :placeholder="t('table.userName')"
                    v-model="form.username"
                    type="text"
                  />
                </el-form-item>

                <el-form-item
                  prop="password"
                  :label="t('table.password')"
                  :rules="[
                    {
                      required: true,
                      message: t('common.require'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    :placeholder="t('table.password')"
                    v-model="form.password"
                    type="password"
                    show-password
                  ></el-input>
                </el-form-item>

                <el-form-item
                  prop="googleauthcode"
                  :label="t('common.googleVerifyCode')"
                  v-if="state.isNeedGoogleAuth"
                >
                  <el-input
                    :placeholder="t('common.googleVerifyCode')"
                    v-model="form.googleauthcode"
                  ></el-input>
                </el-form-item>

                <el-button
                  class="login-button"
                  type="primary"
                  style="width: 100%"
                  :loading="loading"
                  @click="handleLogin"
                >
                  {{ t("common.login") }}
                </el-button>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="state.googleAuthDialog"
      title="Google authenticatin"
      width="30%"
    >
      <div class="qr-con">
        <qrcode-vue :value="qr" :size="500" level="H" />
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-input
            class="google-auth-input"
            placeholder="谷歌验证码"
            v-model="form.googleauthcode"
          ></el-input>
          <div>
            <el-button @click="state.googleAuthDialog = false"
              >Cancel</el-button
            >
            <el-button type="primary" @click="confirmAuthDialog">
              Confirm
            </el-button>
          </div>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

import { ElMessage } from "element-plus";
import http from "@/http";
import { setToken, removeToken, setRefreshToken } from "@/utils/cookie";
import Cookies from "js-cookie";
import QrcodeVue from "qrcode.vue";

import { changeLang } from "@/locales/i18n";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const form = ref({
  username: "",
  password: "",
  googleauthcode: "",
});

const loading = ref(false);
const loginFromRef = ref(null);
const store = useStore();
const router = useRouter();
const route = useRoute();
const query = computed(() => route.query);
const qr = ref("");
const state = reactive({
  googleAuthDialog: false,
  language: store.state.user.lang == "en" ? "English" : "Chinese",
  configData: {},
  isNeedGoogleAuth: false,
});

const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error("Password length should have more than 5"));
    } else {
      callback();
    }
  };
};

const appName = computed(() => store.state.app.appName);

const getCongig = () => {
  http.user.getConfig().then((res) => {
    if (res.data.err_code == 0) {
      state.isNeedGoogleAuth = res.data.data.google_verfication;
    }
  });
};

const handleLogin = () => {
  loginFromRef.value.validate((valid) => {
    if (!valid) return;
    loading.value = true;
    let param = {
      username: form.value.username,
      password: form.value.password,
      otp: form.value.googleauthcode,
    };

    http.user
      .login(param)
      .then((res) => {
        if (res.data.err_code == 0) {
          if (res.data.data.secret_key) {
            qr.value = `otpauth://totp/${res.data.data.username}-pool-pledge?secret=${res.data.data.secret_key}&issuer=`;
            state.googleAuthDialog = true;
          } else {
            setToken(res.data.data.access_token);
            setRefreshToken(res.data.data.refresh_token);
            console.log("Here is refresh token", res.data.data.refresh_token);

            Cookies.set("timer_access", res.data.data.access_token, {
              expires: 2,
            });

            Cookies.set("timer_refresh", res.data.data.refresh_token, {
              expires: 0.0416667,
            });

            let permissionsList = JSON.stringify(res.data.data.permissions);

            localStorage.setItem("permissionList", permissionsList);
            store.dispatch("permissions/setPermissions");
            ElMessage.success(res.data.err_msg);
            loading.value = false;
            router.push(query.value.redirect ? query.value.redirect : "/home");
            // const jwtPayload = JSON.parse(
            //   window.atob(res.data.data.access_token.split(".")[1])
            // ); // get jwt payload
            // Cookies.set("userInfo", jwtPayload.admin.username);
            Cookies.set("userInfo", res.data.data.username);
          }
        } else {
          ElMessage.error(res.data.err_msg);
          loading.value = false;
          removeToken();
        }
      })
      .catch((err) => {
        loading.value = false;
        removeToken();
      });
  });
};

const confirmAuthDialog = () => {
  let param = {
    username: form.value.username,
    activated_2fa: true,
    otp: form.value.googleauthcode,
  };
  http.user.activate2fa(param).then((res) => {
    if (res.data.err_code == 0) {
      setToken(res.data.data.access_token);
      setRefreshToken(res.data.data.refresh_token);

      Cookies.set("timer_access", res.data.data.access_token, {
        expires: 2,
      });

      Cookies.set("timer_refresh", res.data.data.refresh_token, {
        expires: 0.0416667,
      });

      let permissionsList = JSON.stringify(res.data.data.permissions);

      localStorage.setItem("permissionList", permissionsList);
      store.dispatch("permissions/setPermissions");
      ElMessage.success(res.data.err_msg);
      loading.value = false;
      router.push(query.value.redirect ? query.value.redirect : "/home");
      // const jwtPayload = JSON.parse(
      //   window.atob(res.data.data.access_token.split(".")[1])
      // ); // get jwt payload
      Cookies.set("userInfo", res.data.data.username);
      // router.push(query.value.redirect || "/home");
    } else {
      ElMessage.error();
      loading.value = false;
      removeToken();
    }
  });
};

const goPage = (val) => {
  setTimeout(() => {
    router.push(val);
  }, 300);
};

const changeLan = (lan) => {
  if (lan == "en") {
    state.language = "English";
    changeLang("en");
  } else {
    state.language = "Chinese";
    changeLang("cn");
  }
};

onMounted(() => {
  getCongig();
});
</script>
<style lang="scss" scoped>
@import "@/styles/auth.scss";
.qr-con {
  text-align: center;
}
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .google-auth-input {
    width: 300px;
    border: 1px solid #999;
  }
}
</style>
