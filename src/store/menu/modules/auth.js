import { checkPermissions } from "@/utils/permissions";

export const auth = [
  {
    id: 94,
    name: "autorizeManagement",
    icon: "fa-solid fa-users",
    url: "/auth",
    type: "group",
    permission: checkPermissions(94),
    perName: "auth",
    children: [
      {
        id: 95,
        name: "adminManagement",
        icon: "fa-solid fa-user",
        type: "page",
        permission: checkPermissions(95),
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
      {
        id: 96,
        name: "adminLog",
        icon: "fa-solid fa-newspaper",
        type: "page",
        permission: checkPermissions(96),
        perName: "adminLog",
        url: "/auth/adminLog",
        children: [
          {
            id: 6,
            name: "list",
            perName: "",
          },
          {
            id: 7,
            name: "delete",
            perName: "",
          },
        ],
      },
      {
        id: 93,
        name: "roleManagement",
        icon: "fa-solid fa-list-check",
        type: "page",
        permission: checkPermissions(93),
        perName: "roleManagement",
        url: "/general/roleManagement",
        children: [
          {
            id: 49,
            name: "list",
            perName: "",
          },
          {
            id: 47,
            name: "addto",
            perName: "",
          },
          {
            id: 48,
            name: "edit",
            perName: "",
          },
          {
            id: 50,
            name: "delete",
            perName: "",
          },
        ],
      },
    ],
  },
];
