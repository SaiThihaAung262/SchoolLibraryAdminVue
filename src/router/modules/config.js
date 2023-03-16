export const config = [
  {
    name: "systemConfigs",
    path: "/config/systemConfigs",
    component: () => import("@/pages/config/systemConfig/index.vue"),
    meta: {
      title: "System Configs",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  //   {
  //     name: "books",
  //     path: "/book/books",
  //     component: () => import("@/pages/bookManagement/book/index.vue"),
  //     meta: {
  //       title: "Books",
  //       auth: true,
  //       layout: "admin",
  //       tagsView: true,
  //     },
  //   },
];
