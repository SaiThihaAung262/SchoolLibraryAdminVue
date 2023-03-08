<template>
  <header class="admin-header">
    <div class="header--left">
      <section class="logo-container">
        <!-- <img class="admin-logo" :src="appLogo" :alt="appName" v-if="appLogo" /> -->
        <h1 class="admin-title">{{ appName }}</h1>
      </section>

      <!-- <img
        v-if="store.state.app.menuCollapse == 0"
        src="/left-arrow.png"
        alt="left arrow"
        @click="collapseToggle"
        class="hamburger-toggle"
      />

      <img
        v-else
        src="/right-arrow.png"
        alt="right arrow"
        @click="collapseToggle"
        class="hamburger-toggle"
      /> -->
      <font-awesome-icon
        icon="fa-solid fa-arrow-left"
        v-if="store.state.app.menuCollapse == 0"
        @click="collapseToggle"
        class="hamburger-toggle"
      />
      <font-awesome-icon
        icon="fa-solid fa-arrow-right"
        v-else
        @click="collapseToggle"
        class="hamburger-toggle"
      />
    </div>

    <div class="header--right">
      <el-popover placement="bottom-end" :width="100" trigger="hover">
        <template #reference>
          <div class="language-change" v-if="language == 'English'">
            <img src="/us.png" alt="" />
            <!-- <span>{{ language }}</span> -->
          </div>

          <div class="language-change" v-else>
            <img src="/china.png" alt="" />
            <!-- <span>{{ language }}</span> -->
          </div>
        </template>
        <ul class="language-child">
          <li>
            <div class="language-change" @click="changeLan('en')">
              <img src="/us.png" alt="" />
              <span style="color: #111">{{ t("common.english") }}</span>
            </div>
          </li>
          <li>
            <div class="language-change" @click="changeLan('cn')">
              <img src="/china.png" alt="" />
              <span style="color: #111">{{ t("common.chinese") }}</span>
            </div>
          </li>
        </ul>
      </el-popover>

      <font-awesome-icon
        icon="fa-solid fa-arrows-rotate"
        @click="refreshScreen"
        class="refresh"
      />

      <font-awesome-icon
        icon="fa-solid fa-expand"
        @click="fullscreenToggle"
        class="fullscreen"
      />

      <section class="user-info-section">
        <!-- <el-popover
          placement="bottom"
          :width="300"
          trigger="hover"
          class="header-icon"
          style="padding: 0"
        >
          <template #reference>
            <el-badge
              :value="noticeList.length"
              :max="99"
              type="success"
              :hidden="noticeList.length === 0"
            >
              <i
                class="el-icon-message-solid header-icon"
                style="margin: 0"
              ></i>
            </el-badge>
          </template>
          <el-tabs>
            <el-tab-pane label="未读消息" name="0"></el-tab-pane>
          </el-tabs>
          <div class="notice-popover-panel" v-if="noticeList.length !== 0">
            <div v-for="item in noticeList" :key="item.id" class="notice-item">
              <i class="el-icon-message-solid message-icon"></i>
              <div class="notify-content">
                <h2>{{ item.content }}</h2>
                <p>{{ item.time }}</p>
              </div>
            </div>
          </div>
          <el-empty description="暂无消息" v-else></el-empty>
          <div class="panel-btn-group" v-if="noticeList.length !== 0">
            <el-button type="text" size="mini" @click="onClearNoticeClick"
              >清除消息</el-button
            >
          </div>
        </el-popover> -->
        <!-- <el-popover placement="bottom" :width="250" trigger="hover">
          <template #reference>
            <i class="el-icon-s-tools header-icon"></i>
          </template>
          <el-tabs>
            <el-tab-pane label="设置" name="0"></el-tab-pane>
          </el-tabs>
          <div class="setting-popover-panel">
            <div class="setting-item">
              <h2>页面指示</h2>
              <el-radio-group
                size="mini"
                :modelValue="pageIndicator"
                @change="onMenuTagSwitcherChange"
              >
                <el-radio-button label="标签切换"></el-radio-button>
                <el-radio-button label="面包屑"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="setting-item" v-if="pageIndicator == '标签切换'">
              <h2>页面状态</h2>
              <el-radio-group
                size="mini"
                :modelValue="pageKeepAlive"
                @change="onTogglePageKeepAlive"
              >
                <el-radio-button :label="1">缓存</el-radio-button>
                <el-radio-button :label="0">不缓存</el-radio-button>
              </el-radio-group>
            </div>
            <div class="setting-item">
              <h2>侧边菜单</h2>
              <el-radio-group
                size="mini"
                :modelValue="menuCollapse"
                @change="onToggleMenuCollapse"
              >
                <el-radio-button :label="1">折叠</el-radio-button>
                <el-radio-button :label="0">不折叠</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </el-popover> -->
        <el-popover
          placement="bottom-end"
          :width="150"
          trigger="hover"
          popper-class="info-popper"
        >
          <template #reference>
            <div class="avatar">
              <font-awesome-icon icon="fa-solid fa-user" class="user-icon" />
              <span class="username">{{ userInfo || "--" }}</span>

              <font-awesome-icon
                icon="fa-solid fa-caret-down"
                style="margin-left: 5px; color: #fff"
              />
            </div>
          </template>
          <div class="userInfo-popover-panel">
            <div class="panel-title" style="text-align: center">
              <el-avatar
                :size="40"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
              <div>{{ userInfo || "--" }}</div>
              <!-- <el-tag size="mini" style="margin-top: 5px">{{
                userInfo.role || "--"
              }}</el-tag> -->
            </div>
            <div class="info-item">
              <el-button
                type=""
                size="default"
                @click="showQr"
                style="color: #e6a23c"
                link
              >
                {{ t("common.googleVerification") }}
              </el-button>
            </div>
            <div class="info-item">
              <el-button type="" @click="onLogoutClick" style="color: red" link>
                <font-awesome-icon
                  icon="fa-solid fa-circle-exclamation"
                  style="margin-right: 10px"
                  class="fa-lg"
                />
                {{ t("common.signOut") }}
              </el-button>
            </div>
          </div>
        </el-popover>
      </section>
    </div>
  </header>
  <el-dialog v-model="qrDialog">
    <el-form>
      <el-form-item label="">
        <qrcode-vue
          :value="qr"
          :size="450"
          level="H"
          style="display: block; margin: 0 auto"
        />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { useStore } from "vuex";
import { resetRouter } from "@/router";
import { getType, traverseArrayTree } from "@/others/utils.js";
import {
  defineComponent,
  computed,
  ref,
  reactive,
  watch,
  onMounted,
  toRefs,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import http from "@/http";
import QrcodeVue from "qrcode.vue";
import { changeLang } from "@/locales/i18n";
import { useI18n } from "vue-i18n";
export default defineComponent({
  methods: {
    fullscreenToggle() {
      this.$fullscreen.toggle();
    },
  },
  name: "AdminHeader",
  components: {
    QrcodeVue,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();

    const store = useStore();

    let state = reactive({
      fullscreen: true,
      language:
        store.state.user.lang == "en"
          ? t("common.english")
          : t("common.chinese"),
    });

    const toggle = () => {
      state.fullscreen != state.fullscreen;
    };

    let toggler = ref(true);
    const qr = ref("");
    const qrDialog = ref(false);

    const onMenuTagSwitcherChange = (val) => {
      store.commit("app/SET_MENU_TAG_SWITCHER", val);
    };

    const onToggleMenuCollapse = (val) => {
      store.commit("app/TOGGLE_MENU_COLLAPSE", val);
    };
    const onTogglePageKeepAlive = (val) => {
      store.commit("app/SET_PAGE_KEEP_ALIVE", val);
    };

    //通知信息
    const noticeList = ref([
      {
        id: 1,
        content: "这是一条短通知。",
        time: "2021-6-10",
      },
      {
        id: 2,
        content: "这是一条短通知。",
        time: "2021-6-10",
      },
      {
        id: 3,
        content:
          "这是一条长长长长长长长长长长长长长长长长长长长长长长长长通知。",
        time: "2021-6-10",
      },
      {
        id: 4,
        content:
          "这是一条长长长长长长长长长长长长长长长长长长长长长长长长通知。",
        time: "2021-6-10",
      },
      {
        id: 5,
        content:
          "这是一条长长长长长长长长长长长长长长长长长长长长长长长长通知。",
        time: "2021-6-10",
      },
    ]);
    const onClearNoticeClick = () => {
      noticeList.value.splice(0, noticeList.value.length);
    };
    const noticeTabActive = ref("0");
    const onNoticeTabChange = (tab) => {
      noticeTabActive.value = tab.paneName;
    };

    const onLogoutClick = () => {
      http.user.logout().then((res) => {
        if (res.data.err_code == 0) {
          store.commit("tagsView/delAllVisitedRoutes");
          store.dispatch("user/logout").then(() => {
            resetRouter();
            router.push({
              path: "/login",
            });
          });
        }
      });
    };

    const keyword = ref("");
    const searchInstance = reactive({
      loading: false,
      result: [],
    });
    watch(keyword, (newVal) => {
      if (!newVal) searchInstance.result = [];
    });
    const searchVisible = ref(false);
    const onToggleSearch = () => {
      keyword.value = "";
      searchVisible.value = !searchVisible.value;
    };
    const onSearchSelect = (data) => {
      if (data.url) {
        router.push({
          path: data.url,
        });
      }
    };
    const search = (keyword) => {
      if (!keyword) {
        searchInstance.result = [];
        return;
      }

      searchInstance.loading = true;
      let menu = JSON.parse(localStorage.getItem("menu"));
      let result = [];
      let keywordReg = new RegExp(keyword, "i");
      traverseArrayTree(menu, "children", (node) => {
        if (node.type === "page" && keywordReg.test(node.name)) {
          result.push(node);
        }
      });
      searchInstance.result = result;
      searchInstance.loading = false;
    };

    //模块切换
    // const activeModule = ref(route.query.module);
    // const onModuleSelect = (index) => {
    //   router.replace({
    //     query: {
    //       module: index,
    //     },
    //   });
    //   activeModule.value = index;
    // };

    function collapseToggle() {
      toggler = !toggler;
      if (toggler == true) {
        store.commit("app/TOGGLE_MENU_COLLAPSE", 0);
      } else {
        store.commit("app/TOGGLE_MENU_COLLAPSE", 1);
      }
    }

    const showQr = () => {
      qrDialog.value = true;
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

    const refreshScreen = () => {
      router.go();
    };

    const refreshToken = () => {
      store.dispatch("user/refreshToken");
    };

    onMounted(() => {
      http.user.getPermissions().then((res) => {
        if (res.data.err_code == 0) {
          let permissionsList = JSON.stringify(res.data.data.list);
          localStorage.setItem("permissionList", permissionsList);
          console.log("Here is secret ke;y", res.data.data.secret);
          qr.value = `otpauth://totp/${
            store.getters["app/userInfo"] ? store.getters["app/userInfo"] : "--"
          }-pool-pledge?secret=${res.data.data.secret}&issuer=`;
        }
      });

      // setInterval(refreshToken, 180000); //automatic update access token in 3minutes if don't have action
      setInterval(refreshToken, 300000); //automatic update access token in 5minutes if don't have action
    });

    return {
      ...toRefs(state),
      toggle,
      noticeList,
      onClearNoticeClick,
      onLogoutClick,
      onMenuTagSwitcherChange,
      onToggleMenuCollapse,
      onTogglePageKeepAlive,
      appName: computed(() => store.state.app.appName),
      appLogo: computed(() => store.state.app.appLogo),
      menuCollapse: computed(() => store.state.app.menuCollapse),
      pageIndicator: computed(() => store.state.app.pageIndicator),
      pageKeepAlive: computed(() => store.state.app.pageKeepAlive),
      userInfo: computed(() => store.getters["app/userInfo"]),
      getType,
      keyword,
      onSearchSelect,
      search,
      onToggleSearch,
      searchVisible,
      searchInstance,
      noticeTabActive,
      onNoticeTabChange,
      collapseToggle,
      qr,
      qrDialog,
      showQr,
      store,
      changeLan,
      refreshScreen,
      t,
    };
  },
});
</script>

<style lang="scss">
.admin-header {
  width: 100%;
  height: $appHeaderHeight;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  position: relative;
  z-index: 999;
  transition: all 0.5s;
  background: $header;
  background: $sidebarBgColor;
  color: $header_text;
  font-weight: bold;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  //border-bottom: 2px solid #777;

  .header--left {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .logo-container {
      width: 220px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px 0 0;
      flex-shrink: 0;
      .admin-logo {
        width: auto;
        height: 22px;
      }

      .admin-title {
        font-weight: bold;
        font-size: 18px;
        vertical-align: middle;
        color: $title;
        // margin-left: 10px;
      }
    }
  }

  .header--right {
    display: flex;
    align-items: center;
    .icon-notice {
      margin-right: 30px;
    }

    .search-btn {
      cursor: pointer;
      margin-right: 10px;
      font-weight: bold;
      font-size: 20px;
      padding: 10px;
      box-sizing: border-box;
      &:hover {
        transition: background-color 0.5s;
        background: rgba(#000, 0.05);
        padding: 10px;
        box-sizing: border-box;
        border-radius: 100px;
        color: $primaryColor;
      }
    }

    .user-info-section {
      display: flex;
      align-items: center;
      margin-right: 20px;
      cursor: pointer;
      .user-icon {
        color: $title;
      }
      .username {
        margin-left: 5px;
        font-weight: normal;
        font-size: 13px;
        color: $title;
      }
      .user-info {
        margin-left: 10px;
        text-align: left;

        > p {
          margin-bottom: 4px;
          font-size: 14px;
        }
        .tags-section {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}

.notice-popover-panel {
  height: 300px;
  overflow: auto;
  z-index: 99999999999;
  position: relative;

  .notice-item {
    padding: 10px;
    box-sizing: border-box;
    border-top: 1px solid rgba(0, 0, 0, 0.01);
    transition: all 0.5s;
    display: flex;
    &:hover {
      background: rgba(#000, 0.05);
    }
    .message-icon {
      color: $primaryColor;
      padding-top: 3px;
      flex-shrink: 0;
    }

    .notify-content {
      margin-left: 10px;
      > h2 {
        color: rgba(0, 0, 0, 0.6);
        white-space: pre-wrap;
      }
      > p {
        margin-top: 5px;
        font-size: 12px;
        color: rgba(8, 2, 2, 0.2);
      }
    }
  }
}

.userInfo-popover-panel {
  overflow: auto;
  z-index: 99999999999;
  position: relative;
  .info-item {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.5s;
    box-sizing: border-box;
    width: 100%;
    padding: 5px 0;
    &:hover {
      background: rgba(#000, 0.05);
    }
  }

  .panel-title {
    padding: 15px 10px;
    box-sizing: border-box;

    &:hover {
      background: #fff;
    }
  }
}

.setting-popover-panel {
  overflow: auto;
  z-index: 99999999999;
  position: relative;
  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
    > h2 {
      color: rgba(0, 0, 0, 0.6);
    }
  }
}

.info-popper {
  padding: 0 !important;
}

.avatar {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  > img {
    width: 16px;
  }
}

.panel-btn-group {
  text-align: center;
  padding-top: 10px;
}

.header-icon {
  font-weight: bold !important;
  font-size: 22px;
  margin: 0 20px;
  > i {
    font-weight: bold !important;
  }
}

.el-tabs__nav-wrap::after {
  height: 0.5px;
}

.hamburger-toggle {
  cursor: pointer;
  color: $white;
  font-size: 20px;
}
.el-button.is-link {
  padding: 7px 15px;
  i {
    font-size: 16px;
  }
}
.fullscreen {
  cursor: pointer;
  margin-right: 30px;
  padding: 10px;
  background: $sidbarActiveBg;
  border-radius: 50%;
  color: $title;
}

.refresh {
  cursor: pointer;
  margin-right: 30px;
  padding: 10px;
  background: $sidbarActiveBg;
  border-radius: 50%;
  color: $title;
}

.language-change {
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    min-width: 32px;
    margin-right: 8px;
  }
  span {
    font-size: 13px;
    color: $title;
  }
}
.language-child {
  li {
    padding: 8px;
    cursor: pointer;
  }
  li:hover {
    background: #f5f7fa;
    color: $sidbarActiveBg;
  }
  color: $sidbarActiveBg;
}
</style>
