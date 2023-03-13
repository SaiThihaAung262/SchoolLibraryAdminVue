import { checkPermissions } from "@/utils/permissions";

export const report = [
  {
    id: 500,
    name: "Report",
    icon: "fa-solid fa-book",
    url: "/report",
    type: "group",
    permission: true,
    perName: "report",
    children: [
      {
        id: 101,
        name: "Popular Books",
        icon: "fa-solid fa-book",
        type: "page",
        permission: true,
        perName: "popularBooks",
        url: "/report/popularBooks",
      },
    ],
  },
];
