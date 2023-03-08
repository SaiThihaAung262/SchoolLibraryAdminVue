import { checkPermissions } from "@/utils/permissions";

export const memberManagement = [
  {
    id: 97,
    name: "memberManagement",
    icon: "fa-solid fa-circle-user",
    url: "/general",
    type: "group",
    permission: checkPermissions(97),
    perName: "memberManagement",
    children: [
      {
        id: 98,
        name: "groupManagement",
        icon: "fa-solid fa-people-group",
        type: "page",
        permission: checkPermissions(98),
        perName: "groupManagement",
        url: "/memberManagement/groupManagement",
        children: [
          {
            id: 26,
            name: "list",
            perName: "",
          },
          {
            id: 27,
            name: "addto",
            perName: "",
          },
          {
            id: 28,
            name: "edit",
            perName: "",
          },
          {
            id: 29,
            name: "delete",
            perName: "",
          },
        ],
      },
      {
        id: 99,
        name: "internalList",
        icon: "fa-regular fa-circle",
        type: "page",
        permission: checkPermissions(99),
        perName: "internalList",
        url: "/memberManagement/internalList",
        children: [
          {
            id: 117,
            name: "list",
            perName: "",
          },
          {
            id: 119,
            name: "addto",
            perName: "",
          },
          {
            id: 121,
            name: "edit",
            perName: "",
          },
          {
            id: 130,
            name: "transfer",
            perName: "",
          },
          {
            id: 125,
            name: "pledge",
            perName: "",
          },
        ],
      },
      {
        id: 100,
        name: "memberManagement",
        icon: "fa-solid fa-users-gear",
        type: "page",
        permission: checkPermissions(100),
        perName: "memberManagement",
        url: "/memberManagement/memberManagement",
        children: [
          {
            id: 116,
            name: "list",
            perName: "",
          },
          {
            id: 118,
            name: "addto",
            perName: "",
          },
          {
            id: 120,
            name: "edit",
            perName: "",
          },
          {
            id: 129,
            name: "transfer",
            perName: "",
          },
          {
            id: 124,
            name: "pledge",
            perName: "",
          },
        ],
      },
      {
        id: 101,
        name: "ManageLog",
        icon: "fa-solid fa-list",
        type: "page",
        permission: checkPermissions(101),
        perName: "ManageLog",
        url: "/memberManagement/managementLog",
        children: [
          {
            id: 76,
            name: "list",
            perName: "",
          },
        ],
      },
      {
        id: 102,
        name: "vipManagement",
        icon: "fa-solid fa-gem",
        type: "page",
        permission: checkPermissions(102),
        perName: "vipManagement",
        url: "/memberManagement/vipManagement",
        children: [
          {
            id: 83,
            name: "list",
            perName: "",
          },
          {
            id: 84,
            name: "addto",
            perName: "",
          },
          {
            id: 85,
            name: "edit",
            perName: "",
          },
          {
            id: 86,
            name: "delete",
            perName: "",
          },
        ],
      },
      {
        id: 103,
        name: "miningList",
        icon: "fa-regular fa-circle",
        type: "page",
        permission: checkPermissions(103),
        perName: "miningList",
        url: "/memberManagement/miningList",
        children: [
          {
            id: 35,
            name: "list",
            perName: "",
          },
        ],
      },

      {
        id: 104,
        name: "poolPledgeManagement",
        icon: "fa-regular fa-circle",
        type: "page",
        permission: checkPermissions(104),
        perName: "poolPledgeManagement",
        url: "/memberManagement/poolPludgeManagement",
        children: [
          {
            id: 43,
            name: "list",
            perName: "",
          },
          {
            id: 42,
            name: "addto",
            perName: "",
          },
          {
            id: 45,
            name: "edit",
            perName: "",
          },
          {
            id: 46,
            name: "delete",
            perName: "",
          },
        ],
      },
    ],
  },
];
