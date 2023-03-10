export const bookManagement = [
  {
    name: "categories",
    path: "/book/categories",
    component: () => import("@/pages/bookManagement/category/index.vue"),
    meta: {
      title: "Categories",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
  {
    name: "books",
    path: "/book/books",
    component: () => import("@/pages/bookManagement/book/index.vue"),
    meta: {
      title: "Books",
      auth: true,
      layout: "admin",
      tagsView: true,
    },
  },
];
