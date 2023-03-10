import { auth } from "./modules/auth";
import { article } from "./modules/article";

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
  ...article,
];

localStorage.setItem("menu", JSON.stringify(sidebarItem));
