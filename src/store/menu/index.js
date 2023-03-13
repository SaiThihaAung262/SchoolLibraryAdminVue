import { auth } from "./modules/auth";
import { bookManagement } from "./modules/bookMangement";
import { userManagement } from "./modules/userManagement";
import { borrowHistory } from "./modules/borrowHistory";
import { report } from "./modules/report";

export const sidebarItem = [
  {
    id: 89,
    name: "Dashboard",
    icon: "fa-solid fa-gauge-high",
    type: "page",
    permission: true,
    url: "/home",
    path: [],
    tagsViewAffix: true,
    children: [
      {
        id: 17,
        name: "list",
      },
    ],
  },
  ...auth,
  ...userManagement,
  ...bookManagement,
  ...borrowHistory,
  ...report,
];

localStorage.setItem("menu", JSON.stringify(sidebarItem));
