import { checkPermissions } from "@/utils/permissions";
// import { useI18n } from "vue-i18n";

// const { t } = useI18n();

export const article = [
  {
    id: 114,
    name: "articleManagement",
    icon: "fa-solid fa-newspaper",
    url: "/article",
    type: "page",
    permission: checkPermissions(114),
    perName: "article",
    children: [
      {
        id: 8,
        name: "list",
        perName: "",
      },
      {
        id: 9,
        name: "addto",
        perName: "",
      },
      {
        id: 10,
        name: "edit",
        perName: "",
      },
      {
        id: 11,
        name: "delete",
        perName: "",
      },
    ],
  },
];
