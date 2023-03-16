import http from "../axios";

/**
 * @Config
 */

export const getConfigData = (data) =>
  http({ url: "system-config/get", method: "GET", params: data });

// export const addBorrow = (data) =>
//   http({
//     url: "/borrow/create",
//     method: "POST",
//     data,
//   });

export const updateConfigData = (data) =>
  http({
    url: "/system-config/update",
    method: "POST",
    data,
  });
