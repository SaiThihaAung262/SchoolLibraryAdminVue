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
      user_id,
      name,
      type,
      is_authorized,
      income,
      withdraw,
      remark,

      wallet_address,
      authorized_wallet,
      authorized_ip,
      authorized_date,

      address_type,
      level,

      wallet_balance,

      usdt_total,
      usdt_balance,
      usdt_freeze,

      eth_balance,
      eth_total_balance,

      trx_total_revenue,
      trx_balance,

      ip_address,
      area,

      created_at,
      updated_at,
    }) => {
      exportData.push({
        user_id,
        name,
        type: type == 2 ? "内部" : "会员",
        is_authorized: is_authorized == 2 ? "不" : "是",
        income: income == 2 ? "关闭" : "开启",
        withdraw: withdraw == 2 ? "关闭" : "开启",
        remark,
        wallet_information: `钱包地址: ${wallet_address}, 授权地址: ${authorized_wallet}, 授权: ${authorized_ip}, 授权时间: ${dateFormat(
          authorized_date
        )}`,
        address_type,
        level,
        wallet_balance: `钱包余额： ${wallet_balance}`,
        usdt: `总额: ${usdt_total}, 余额: ${usdt_balance}, 锁定: ${usdt_freeze}`,
        eth: `总额: ${eth_total_balance}, 余额: ${eth_balance}`,
        trx: `总额: ${trx_total_revenue}, 余额: ${trx_balance}`,
        iparea: `IP: ${ip_address}, 地区: ${area}`,
        created_at: dateFormat(created_at),
        updated_at: dateFormat(updated_at),
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
      "分组名称",
      "账号类型",
      "是否授权",
      "收益",
      "提现",
      "备注",
      "钱包信息",
      "类型",
      "等级",
      "用户钱包",
      "USDT",
      "ETH",
      "TRX",
      "ip地区",
      "加入时间",
      "最近登录时间",
    ];
    const filterVal = [
      "user_id",
      "name",
      "type",
      "is_authorized",
      "income",
      "withdraw",
      "remark",
      "wallet_information",
      "address_type",
      "level",
      "wallet_balance",
      "usdt",
      "eth",
      "trx",
      "iparea",
      "created_at",
      "updated_at",
    ];

    const data = formatJson(filterVal, exportData);
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: "内部列表" + date,
      autoWidth: true,
      bookType: "xlsx",
    });
    ElMessage.success("Export Success");
  });
};

export default ExportData2Excel;
