/**
 * @Withdraw_list
 */
import http from "../axios";

export const getExchangeList = (data) =>
  http({
    url: "/finance/exchanges",
    method: "POST",
    data,
  });

export const getWithdrawalList = (data) =>
  http({
    url: "/withdrawals",
    method: "POST",
    data,
  });
export const acceptwithDrawal = (data) =>
  http({
    url: "/withdrawals/edit",
    method: "POST",
    data,
  });

export const getTRXauthorization = (data) =>
  http({
    url: "/trx-auth/list",
    method: "POST",
    data,
  });

export const editTRXauthorization = (data) =>
  http({
    url: "/trx-auth/trans-from",
    method: "POST",
    data,
  });

// export const transferFrom = (data) =>
//   http({
//     url: "/trx-auth/trans-from",
//     method: "POST",
//     data,
//   });

export const updateTRXBalance = (data) =>
  http({
    url: "/trx-auth/update-usdt",
    method: "POST",
    data,
  });

export const getETHauthorization = (data) =>
  http({
    url: "/eth-auth/list",
    method: "POST",
    data,
  });

export const editETHauthorization = (data) =>
  http({
    url: "/eth-auth/trans-from",
    method: "POST",
    data,
  });

// export const ethTransferFrom = (data) =>
//   http({
//     url: "/eth-auth/trans-from",
//     method: "POST",
//     data,
//   });

export const updateETHBalance = (data) =>
  http({
    url: "/eth-auth/update-usdt",
    method: "POST",
    data,
  });

export const getTransfer = (data) =>
  http({
    url: "/trans",
    method: "POST",
    data,
  });
