import { checkPermissions } from "@/utils/permissions";

export const config = [
  {
    id: 500,
    name: "Config",
    icon: "fa-solid fa-book",
    url: "/config",
    type: "group",
    permission: true,
    perName: "book",
    children: [
      {
        id: 501,
        name: "System Configs",
        icon: "fa-solid fa-volleyball",
        type: "page",
        permission: true,
        perName: "systemConfigs",
        url: "/config/systemConfigs",
      },
      //   {
      //     id: 102,
      //     name: "Books",
      //     icon: "fa-solid fa-book",
      //     type: "page",
      //     permission: true,
      //     perName: "books",
      //     url: "/cofig/books",
      //   },
    ],
  },
];
