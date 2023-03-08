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
    ({
      id,
      remark,
      state,
      authorized_wallet_address,
      user_wallet_address,
      receiving_wallet_address,
      scan_record,
      money,
      ip,
      area,
      created_at,
    }) => {
      exportData.push({
        id,
        remark,
        state: stateFilter(state),
        authorized_wallet_address,
        user_wallet_address,
        receiving_wallet_address,
        scan_record,
        money,
        ip,
        area,
        created_at: dateFormat(created_at),
      });
    }
  );
  excelExport();
};
const stateFilter = (val) => {
  switch (val) {
    case 1:
      return "成功";
    case 2:
      return "划转中";
    case 3:
      return "失败";
    default:
      return "--";
  }
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
      "备注",
      "状态",
      "授权地址",
      "客户地址",
      "收款地址",
      "查看归集记录",
      "金额",
      "IP",
      "地区",
      "创建时间",
    ];
    const filterVal = [
      "id",
      "remark",
      "state",
      "authorized_wallet_address",
      "user_wallet_address",
      "receiving_wallet_address",
      "scan_record",
      "money",
      "ip",
      "area",
      "created_at",
    ];

    const data = formatJson(filterVal, exportData);
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: "划转列表" + date,
      autoWidth: true,
      bookType: "xlsx",
    });
    ElMessage.success("Export Success");
  });
};

export default ExportData2Excel;
