import { auth } from "./auth";
import { article } from "./aritcle";
import { bookManagement } from "./bookManagement";

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
  ...auth,
  ...article,
  ...bookManagement,
];
