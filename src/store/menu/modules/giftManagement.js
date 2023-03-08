import { checkPermissions } from "@/utils/permissions";
export const giftManagement = [
  {
    id: 115,
    name: "giftManagement",
    icon: "fa-solid fa-hand-holding-dollar",
    url: "/giftManagement",
    type: "page",
    permission: checkPermissions(115),
    perName: "giftManagement",
    children: [
      {
        id: 25,
        name: "list",
        perName: "",
      },
    ],
  },
];
