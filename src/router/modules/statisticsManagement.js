// 会员管理
export const statisticsManagement = [
  {
    name: "统计管理",
    path: "/statisticsManagement",
    component: () => import("@/pages/statisticsManagement/index.vue"),
    meta: {
      title: "统计管理",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
];
