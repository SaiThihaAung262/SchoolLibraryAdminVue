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
      admin_username,
      remark,
      user_id,
      type,
      address_type,
      is_authorized,
      income,
      withdraw,
      before_wallet_balance,
      after_wallet_balance,
      before_freeze,
      after_freeze,
      before_usdt_balance,
      after_usdt_balance,
      before_eth_balance,
      after_eth_balance,
      before_trx_balance,
      after_trx_balance,
      wallet_address,
      ip_address,
      created_at,
    }) => {
      exportData.push({
        admin_username,
        remark,
        user_id,
        type: type == 1 ? "会员" : "内部",
        address_type,
        is_authorized: is_authorized == 2 ? "不" : "是",
        income: income == 2 ? "关闭" : "开启",
        withdraw: withdraw == 2 ? "关闭" : "开启",
        before_wallet_balance,
        after_wallet_balance,
        before_freeze,
        after_freeze,
        before_usdt_balance,
        after_usdt_balance,
        before_eth_balance,
        after_eth_balance,
        before_trx_balance,
        after_trx_balance,
        wallet_address,
        ip_address,
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
      "操作者",
      "备注",
      "用户ID",
      "类型",
      "账号类型",
      "是否授权",
      "收益",
      "提现",
      "账变前钱包余额",
      "账变后钱包余额",
      "冻结前余额（USDT）",
      "冻结后余额（USDT）",
      "账变前余额（USDT）",
      "账变后余额（USDT）",
      "账变前余额（ETH）",
      "账变后余额（ETH）",
      "账变前余额（TRX）",
      "账变后余额（TRX）",
      "钱包信息",
      "IP",
      "创建时间",
    ];
    const filterVal = [
      "admin_username",
      "remark",
      "user_id",
      "type",
      "address_type",
      "is_authorized",
      "income",
      "withdraw",
      "before_wallet_balance",
      "after_wallet_balance",
      "before_freeze",
      "after_freeze",
      "before_usdt_balance",
      "after_usdt_balance",
      "before_eth_balance",
      "after_eth_balance",
      "before_trx_balance",
      "after_trx_balance",
      "wallet_address",
      "ip_address",
      "created_at",
    ];

    const data = formatJson(filterVal, exportData);
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: "管理日志" + date,
      autoWidth: true,
      bookType: "xlsx",
    });
    ElMessage.success("Export Success");
  });
};

export default ExportData2Excel;
