export const general = [
  {
    name: "systemConfig",
    path: "/general/config",
    component: () => import("@/pages/general/config/index.vue"),
    meta: {
      title: "systemConfig",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "个人资料",
    path: "/general/profile",
    component: () => import("@/pages/general/profile/index.vue"),
    meta: {
      title: "personalInfo",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
];
