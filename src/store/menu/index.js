import { general } from "./modules/general";
import { memberManagement } from "./modules/memberManagement";
import { auth } from "./modules/auth";
import { platformWallet } from "./modules/platformwallet";
import { article } from "./modules/article";
import { financialManagement } from "./modules/financialManagement";
import { statisticsManagement } from "./modules/statisticsManagement";
import { giftManagement } from "./modules/giftManagement";

export const sidebarItem = [
  {
    id: 89,
    name: "dashboard",
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
  ...general,
  // ...statisticsManagement,
  ...auth,
  ...memberManagement,
  ...platformWallet,
  ...financialManagement,
  ...article,
  ...giftManagement,
];

localStorage.setItem("menu", JSON.stringify(sidebarItem));
