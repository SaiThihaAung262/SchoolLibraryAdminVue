import { checkPermissions } from "@/utils/permissions";

export const platformWallet = [
  {
    id: 105,
    name: "platformWallet",
    icon: "fa-solid fa-coins",
    url: "/platformWallet",
    type: "group",
    permission: checkPermissions(105),
    perName: "platformWallet",
    children: [
      {
        id: 106,
        name: "subConfig",
        icon: "fa-regular fa-circle",
        type: "page",
        permission: checkPermissions(106),
        perName: "subConfig",
        url: "/platformWallet/subConfiguration",
        children: [
          {
            id: 51,
            name: "list",
            perName: "",
          },
          {
            id: 52,
            name: "addto",
            perName: "",
          },
          {
            id: 53,
            name: "edit",
            perName: "",
          },
          {
            id: 54,
            name: "delete",
            perName: "",
          },
        ],
      },
      {
        id: 107,
        name: "authorizeList",
        icon: "fa-regular fa-circle",
        type: "page",
        permission: checkPermissions(107),
        perName: "authorizeList",
        url: "/platformWallet/authorizationList",
        children: [
          {
            id: 12,
            name: "list",
            perName: "",
          },
          {
            id: 13,
            name: "addto",
            perName: "",
          },
          {
            id: 14,
            name: "edit",
            perName: "",
          },
          {
            id: 15,
            name: "delete",
            perName: "",
          },
          {
            id: 16,
            name: "privateKey",
            perName: "",
          },
          {
            id: 131,
            name: "setDefaultWallet",
            perName: "",
          },
        ],
      },
    ],
  },
];
