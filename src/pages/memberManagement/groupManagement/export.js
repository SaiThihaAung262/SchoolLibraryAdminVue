import { ElMessage } from "element-plus";
import { dateFormat } from "@/utils/timeFormat.js";

const formatJson = (filterVal, jsonData) => {
  return jsonData.map((v) => filterVal.map((j) => v[j]));
};

let exportData = [];

const ExportData2Excel = (val) => {
  return new Promise((resolve, reject) => {
    if (val) {
      resolve(export2Excel(val));
    } else {
      reject("Sometimg wrong");
    }
  });
};

const export2Excel = (val) => {
  let data = [];
  data = val;
  data.forEach(
    ({ id, name, lang, min, max, level, pid, pid2, pid3, mining_income }) => {
      exportData.push({
        id,
        username,
        title: title ? titel : "--",
        url,
        ip,
        browser: browser ? browser : "--",
        created_at: dateFormat(created_at),
      });
    }
  );
  excelExport();
};

const excelExport = () => {
  import("@/utils/Export2Excel").then((excel) => {
    const date =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
    const tHeader = [
      "ID",
      "用户名",
      "标题",
      "URL",
      "IP",
      "Browser",
      "创建时间",
    ];
    const filterVal = [
      "id",
      "username",
      "title",
      "url",
      "ip",
      "browser",
      "created_at",
    ];

    const data = formatJson(filterVal, exportData);
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: "VIP管理" + date,
      autoWidth: true,
      bookType: "xlsx",
    });
    ElMessage.success("Export Success");
  });
};

export default ExportData2Excel;
