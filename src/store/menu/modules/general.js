import { checkPermissions } from "@/utils/permissions";

export const general = [
  {
    id: 90,
    name: "generalManagement",
    icon: "fa-solid fa-gears",
    url: "/general",
    type: "group",
    permission: checkPermissions(90),
    perName: "generalManagement",
    children: [
      {
        id: 91,
        name: "systemConfig",
        icon: "fa-solid fa-gear",
        type: "page",
        permission: checkPermissions(91),
        perName: "systemConfig",
        url: "/general/config",
        children: [
          {
            id: 67,
            name: "system_config_list",
            perName: "",
          },
          {
            id: 57,
            name: "system_config_submit",
            perName: "",
          },
          // {
          //   id: 67,
          //   name: "user_config_list",
          //   perName: "",
          // },
          {
            id: 69,
            name: "user_config_submit",
            perName: "",
          },
        ],
      },
      {
        id: 92,
        name: "personalInfo",
        icon: "fa-solid fa-user",
        type: "page",
        permission: checkPermissions(92),
        perName: "personalInfo",
        url: "/general/profile",
        children: [
          {
            id: 5,
            name: "list",
            perName: "",
          },
          {
            id: 128,
            name: "edit",
            perName: "",
          },
        ],
      },
      // <i class="fa-solid fa-list-check"></i>
    ],
  },
];
