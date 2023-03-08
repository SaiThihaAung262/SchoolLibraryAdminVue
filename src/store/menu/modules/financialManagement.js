import { checkPermissions } from "@/utils/permissions";

export const financialManagement = [
  {
    id: 108,
    name: "financialManagement",
    icon: "fa-solid fa-building-columns",
    url: "/financialManagement",
    type: "group",
    permission: checkPermissions(108),
    perName: "financialManagement",
    children: [
      {
        id: 109,
        name: "exchangeList",
        icon: "fa-solid fa-arrow-right-arrow-left",
        type: "page",
        permission: checkPermissions(109),
        url: "/financialManagement/exchangeList",
        perName: "exchangeList",
        children: [
          {
            id: 23,
            name: "list",
            perName: "",
          },
        ],
      },
      {
        id: 110,
        name: "withdrawList",
        icon: "fa-solid fa-comment-dollar",
        type: "page",
        permission: checkPermissions(110),
        url: "/financialManagement/withdrawalList",
        perName: "withdrawList",
        children: [
          {
            id: 87,
            name: "list",
            perName: "",
          },
          {
            id: 88,
            name: "edit",
            perName: "",
          },
        ],
      },
      {
        id: 111,
        name: "transferList",
        icon: "fa-solid fa-money-bill-transfer",
        type: "page",
        permission: checkPermissions(111),
        url: "/financialManagement/transferList",
        perName: "transferList",
        children: [
          {
            id: 71,
            name: "list",
            perName: "",
          },
        ],
      },
      {
        id: 112,
        name: "ETHauthList",
        icon: "fa-solid fa-bitcoin-sign",
        type: "page",
        permission: checkPermissions(112),
        url: "/financialManagement/ethAuthorizationList",
        perName: "ETHauthList",
        children: [
          {
            id: 21,
            name: "list",
            perName: "",
          },
          {
            id: 22,
            name: "transfer",
            perName: "",
          },
          {
            id: 19,
            name: "updateUSDT",
            perName: "",
          },
        ],
      },
      {
        id: 113,
        name: "TRXauthList",
        icon: "fa-solid fa-circle",
        type: "page",
        permission: checkPermissions(113),
        url: "/financialManagement/trxAuthorizationList",
        perName: "TRXauthList",
        children: [
          {
            id: 74,
            name: "list",
            perName: "",
          },
          {
            id: 75,
            name: "transfer",
            perName: "",
          },
          {
            id: 72,
            name: "updateUSDT",
            perName: "",
          },
        ],
      },
    ],
  },
];
