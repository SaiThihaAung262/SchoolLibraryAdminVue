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
  data.forEach(({ id, name, lang, min, max, level, pid, pid2, pid3 }) => {
    exportData.push({
      id,
      name,
      lang,
      min,
      max,
      level,
      pid,
      pid2,
      pid3,
    });
  });
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
      "中文名称",
      "英文名称",
      "最小金额",
      "最大金额",
      "等级",
      "一级返利",
      "二级返利",
      "三级返利",
    ];
    const filterVal = [
      "id",
      "name",
      "lang",
      "min",
      "max",
      "level",
      "pid",
      "pid2",
      "pid3",
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
