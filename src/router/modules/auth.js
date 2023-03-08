export const auth = [
  {
    name: "管理员管理",
    path: "/auth/admin",
    component: () => import("@/pages/auth/admin/index.vue"),
    meta: {
      title: "adminManagement",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "管理员日志",
    path: "/auth/adminLog",
    component: () => import("@/pages/auth/adminlog/index.vue"),
    meta: {
      title: "adminLog",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "RoleManagement",
    path: "/general/roleManagement",
    component: () => import("@/pages/general/roleManagement/index.vue"),
    meta: {
      title: "roleManagement",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
];
