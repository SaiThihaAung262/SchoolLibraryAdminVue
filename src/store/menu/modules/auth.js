import { checkPermissions } from "@/utils/permissions";

export const auth = [
  {
    id: 94,
    name: "Admin",
    icon: "fa-solid fa-users",
    url: "/auth",
    type: "group",
    permission: true,
    perName: "auth",
    children: [
      {
        id: 95,
        name: "Admin User",
        icon: "fa-solid fa-user",
        type: "page",
        permission: true,
        perName: "adminManagement",
        url: "/auth/admin",
        children: [
          {
            id: 3,
            name: "list",
            perName: "",
          },
          {
            id: 1,
            name: "addto",
            perName: "",
          },
          {
            id: 2,
            name: "edit",
            perName: "",
          },
          {
            id: 4,
            name: "delete",
            perName: "",
          },
        ],
      },
    ],
  },
];
