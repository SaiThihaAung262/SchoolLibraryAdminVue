export const transferFund = [
  {
    name: "transferOpenTrns",
    path: "/transferOpenTrns",
    component: () => import("@/pages/transferFund/transferOpenTrns/index.vue"),
    meta: {
      title: "transferOpenTrns",
    },
  },
  {
    name: "transferOpenTrnsFilter",
    path: "/transferOpenTrnsFilter",
    component: () =>
      import("@/pages/transferFund/transferOpenTrnsFilter/index.vue"),
    meta: {
      title: "transferOpenTrnsFilter",
    },
  },
  {
    name: "apiCallLists",
    path: "/apiCallLists",
    component: () => import("@/pages/transferFund/apiCallLists/index.vue"),
    meta: {
      title: "apiCallLists",
    },
  },
];
