import http from "../axios";

/**
 * @Admin
 */

export const getAdminList = (data) =>
  http({ url: "admin-users/get-users", method: "GET", params: data });

export const addAdminList = (data) =>
  http({
    url: "/admin-users/create",
    method: "POST",
    data,
  });

export const editAdminList = (data) =>
  http({
    url: "/admin-users/update",
    method: "POST",
    data,
  });

export const deleteAdminList = (data) =>
  http({
    url: "/admin-users/delete",
    method: "POST",
    data,
  });
