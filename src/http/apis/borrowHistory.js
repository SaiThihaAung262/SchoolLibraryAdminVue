import http from "../axios";

/**
 * @Borrow_History
 */

export const getBorrowHistory = (data) =>
  http({ url: "/borrow/get-history", method: "GET", params: data });

export const addBorrow = (data) =>
  http({
    url: "/borrow/create",
    method: "POST",
    data,
  });
