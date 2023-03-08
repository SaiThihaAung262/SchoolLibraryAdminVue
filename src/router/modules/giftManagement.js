// 会员管理
export const giftManagement = [
  {
    name: "giftManagement",
    path: "/giftManagement",
    component: () => import("@/pages/giftManagement/index.vue"),
    meta: {
      title: "giftManagement",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
];
