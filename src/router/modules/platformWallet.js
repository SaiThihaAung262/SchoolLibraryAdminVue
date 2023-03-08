export const platformWallet = [
  {
    name: "subConfig",
    path: "/platformWallet/subConfiguration",
    component: () =>
      import("./../../pages/platformWallet/subConfiguration/index.vue"),
    meta: {
      title: "subConfig",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "authorizeList",
    path: "/platformWallet/authorizationList",
    component: () =>
      import("./../../pages/platformWallet/authorizationList/index.vue"),
    meta: {
      title: "authorizeList",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
];
