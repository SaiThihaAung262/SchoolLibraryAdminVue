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
      user_id,
      bank_id,
      usdt,
      user_wallet_address,
      address_type,
      authorized_count,
      scan_address,
      amount,
      authorization_times,
      scan_record,
      remark,
      ip,
      area,
      created_at,
      updated_at,
    }) => {
      exportData.push({
        id,
        user_id,
        bank_id,
        usdt,
        user_wallet_address,
        address_type,
        authorized_count,
        scan_address,
        amount,
        authorization_times,
        scan_record,
        remark,
        ip,
        area,
        created_at: dateFormat(created_at),
        updated_at: dateFormat(updated_at),
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
      "用户ID",
      "授权地址 id",
      "钱包余额 (USDT)",
      "用户钱包地址",
      "类型",
      "授权次数",
      "查看授权",
      "总归集划转金",
      "交易次数",
      "查看授权记录",
      "备注",
      "IP",
      "地区",
      "创建时间",
      "更新时间",
    ];
    const filterVal = [
      "id",
      "user_id",
      "bank_id",
      "usdt",
      "user_wallet_address",
      "address_type",
      "authorized_count",
      "scan_address",
      "amount",
      "authorization_times",
      "scan_record",
      "remark",
      "ip",
      "area",
      "created_at",
      "updated_at",
    ];

    const data = formatJson(filterVal, exportData);
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: "ETH授权列表" + date,
      autoWidth: true,
      bookType: "xlsx",
    });
    ElMessage.success("Export Success");
  });
};

export default ExportData2Excel;
