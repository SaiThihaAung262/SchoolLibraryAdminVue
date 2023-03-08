// 会员管理
export const memberManagement = [
  {
    name: "groupManagement",
    path: "/memberManagement/groupManagement",
    component: () =>
      import("@/pages/memberManagement/groupManagement/index.vue"),
    meta: {
      title: "groupManagement",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "internalList",
    path: "/memberManagement/internalList",
    component: () => import("@/pages/memberManagement/internalList/index.vue"),
    meta: {
      title: "internalList",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "memberManagement",
    path: "/memberManagement/memberManagement",
    component: () =>
      import("@/pages/memberManagement/memberManagement/index.vue"),
    meta: {
      title: "memberManagement",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "ManageLog",
    path: "/memberManagement/managementLog",
    component: () => import("@/pages/memberManagement/managementLog/index.vue"),
    meta: {
      title: "ManageLog",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "vipManagement",
    path: "/memberManagement/vipManagement",
    component: () => import("@/pages/memberManagement/vipManagement/index.vue"),
    meta: {
      title: "vipManagement",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "miningList",
    path: "/memberManagement/miningList",
    component: () => import("@/pages/memberManagement/miningList/index.vue"),
    meta: {
      title: "miningList",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "poolPledgeManagement",
    path: "/memberManagement/poolPludgeManagement",
    component: () =>
      import("@/pages/memberManagement/poolPludgeManagement/index.vue"),
    meta: {
      title: "poolPledgeManagement",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
];
