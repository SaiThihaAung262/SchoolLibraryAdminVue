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
      remark,
      address_type,
      wallet_address,
      exchange_amount,
      usdt_balance,
      state,
      created_at,
    }) => {
      exportData.push({
        id,
        user_id,
        remark,
        address_type,
        wallet_address,
        exchange_amount,
        usdt_balance,
        state: state == 1 ? "已完成" : "--",
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
      "用户ID",
      "备注",
      "类型",
      "钱包地址",
      "金额",
      "USDT金额",
      "状态",
      "创建时间",
    ];
    const filterVal = [
      "id",
      "user_id",
      "remark",
      "address_type",
      "wallet_address",
      "exchange_amount",
      "usdt_balance",
      "state",
      "created_at",
    ];

    const data = formatJson(filterVal, exportData);
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: "兑换列表VIP管理" + date,
      autoWidth: true,
      bookType: "xlsx",
    });
    ElMessage.success("Export Success");
  });
};

export default ExportData2Excel;
