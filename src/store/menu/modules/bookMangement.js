import { checkPermissions } from "@/utils/permissions";

export const bookManagement = [
  {
    id: 100,
    name: "Book Mangement",
    icon: "fa-solid fa-book",
    url: "/book",
    type: "group",
    permission: true,
    perName: "book",
    children: [
      {
        id: 101,
        name: "Categories",
        icon: "fa-solid fa-user",
        type: "page",
        permission: true,
        perName: "categories",
        url: "/book/categories",
      },
      {
        id: 102,
        name: "Books",
        icon: "fa-solid fa-book",
        type: "page",
        permission: true,
        perName: "books",
        url: "/book/books",
      },
    ],
  },
];
