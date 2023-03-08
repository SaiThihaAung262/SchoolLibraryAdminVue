export const financialManagement = [
  {
    name: "exchangeList",
    path: "/financialManagement/exchangeList",
    component: () =>
      import("@/pages/financialManagement/exchangeList/index.vue"),
    meta: {
      title: "exchangeList",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "withdrawList",
    path: "/financialManagement/withdrawalList",
    component: () =>
      import("@/pages/financialManagement/withdrawalList/index.vue"),
    meta: {
      title: "withdrawList",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "transferList",
    path: "/financialManagement/transferList",
    component: () =>
      import("@/pages/financialManagement/transferList/index.vue"),
    meta: {
      title: "transferList",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "ETHauthList",
    path: "/financialManagement/ethAuthorizationList",
    component: () =>
      import("@/pages/financialManagement/ETHauthorizationList/index.vue"),
    meta: {
      title: "ETHauthList",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "trxAuthorizationList",
    path: "/financialManagement/trxAuthorizationList",
    component: () =>
      import("@/pages/financialManagement/TRXauthorizationList/index.vue"),
    meta: {
      title: "TRXauthList",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
];
