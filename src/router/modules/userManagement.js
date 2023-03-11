export const userManagement = [
  {
    name: "teacher",
    path: "/user/teacher",
    component: () => import("@/pages/userManagement/teacher/index.vue"),
    meta: {
      title: "Teacher",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "student",
    path: "/user/student",
    component: () => import("@/pages/userManagement/student/index.vue"),
    meta: {
      title: "Student",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
];
