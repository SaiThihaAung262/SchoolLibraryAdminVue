import http from "../axios";

/**
 * @Admin
 */

export const getAdminList = (data) =>
  http({ url: "admin-users/get-users", method: "GET", params: data });

export const addAdminList = (data) =>
  http({
    url: "/admin/add",
    method: "POST",
    data,
  });
export const editAdminList = (data) =>
  http({
    url: "/admin/edit",
    method: "POST",
    data,
  });
export const deleteAdminList = (data) =>
  http({
    url: "/admin/delete",
    method: "POST",
    data,
  });

/**
 * @Admin_log
 */
export const getAdminLog = (data) =>
  http({
    url: "/admin/log/list",
    method: "POST",
    data,
  });

export const deleteAdminLog = (data) =>
  http({
    url: "/admin/log/delete",
    method: "POST",
    data,
  });
