import { ElMessage } from "element-plus";
import { dateFormat } from "@/utils/timeFormat.js";
import { create } from "js-md5";

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
      wallet_address,
      remark,
      withdraw_amount,
      fee,
      state,
      ip_address,
      area,
      created_at,
    }) => {
      exportData.push({
        id,
        user_id,
        wallet_address,
        remark,
        withdraw_amount: withdraw_amount,
        actual_amount: withdraw_amount,
        fee,
        state: filterState(state),
        ip_address,
        area,
        created_at: dateFormat(created_at),
      });
    }
  );
  excelExport();
};

const filterState = (val) => {
  switch (val) {
    case 1:
      return "待处理";
    case 2:
      return "已完成";
    case 3:
      return "已拒绝";
    default:
      break;
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
      "下发地址",
      "备注",
      "提现金额",
      "实际下发金额",
      "手续费",
      "状态",
      "IP",
      "地区",
      "创建时间",
    ];
    const filterVal = [
      "id",
      "user_id",
      "wallet_address",
      "remark",
      "withdraw_amount",
      "actual_amount",
      "fee",
      "state",
      "ip_address",
      "area",
      "created_at",
    ];

    const data = formatJson(filterVal, exportData);
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: "提现列表" + date,
      autoWidth: true,
      bookType: "xlsx",
    });
    ElMessage.success("Export Success");
  });
};

export default ExportData2Excel;
