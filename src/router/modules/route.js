import { general } from "./general";
import { memberManagement } from "./memberManagement";
import { auth } from "./auth";
import { platformWallet } from "./platformWallet";
import { article } from "./aritcle";
import { financialManagement } from "./financialManagement";
import { statisticsManagement } from "./statisticsManagement";
import { giftManagement } from "./giftManagement";
import { transferFund } from "./transferFund";
export const routes = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/pages/login/index.vue"),
    meta: {
      title: "login",
      auth: false,
    },
  },

  {
    name: "Home",
    redirect: "/home",
    path: "/",
    meta: {
      title: "Home",
      auth: true,
      layout: "admin",
      tagsView: false,
    },
  },
  {
    name: "dashboard",
    path: "/home",
    component: () => import("@/pages/home/index.vue"),
    meta: {
      title: "dashboard",
      auth: false,
      layout: "admin",
      tagsView: true,
    },
  },
  ...statisticsManagement,
  ...general,
  ...memberManagement,
  ...auth,
  ...platformWallet,
  ...article,
  ...financialManagement,
  ...giftManagement,
  ...transferFund,
];
