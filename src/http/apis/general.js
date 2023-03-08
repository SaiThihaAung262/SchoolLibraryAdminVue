import http from "../axios";

/**
 *@Get_Profile
 */
export const getProfile = (data) =>
  http({
    url: "/admin/profile",
    method: "POST",
    data,
  });

export const editAdminProfile = (data) =>
  http({
    url: "/admin/profile/edit",
    method: "POST",
    data,
  });

export const getUserConfig = (data) =>
  http({
    url: "/system-configs/user",
    method: "POST",
    data,
  });

export const addUserConfig = (data) =>
  http({
    url: "/system-configs/user/add",
    method: "POST",
    data,
  });

export const editUserConfig = (data) =>
  http({
    url: "/system-configs/user/edit",
    method: "POST",
    data,
  });

export const getSystemConfig = (data) =>
  http({
    url: "/system-configs",
    method: "POST",
    data,
  });

export const editSystemConfig = (data) =>
  http({
    url: "/system-configs/edit",
    method: "POST",
    data,
  });

export const loadImage = (data) =>
  http({
    url: `/media/${data}`,
    method: "GET",
  });

export const getPermissionsList = (data) =>
  http({
    url: "/permission/list",
    method: "POST",
    data,
  });

export const getRoleList = (data) =>
  http({
    url: "/role/list",
    method: "POST",
    data,
  });

export const addRole = (data) =>
  http({
    url: "/role/add",
    method: "POST",
    data,
  });

export const editRole = (data) =>
  http({
    url: "/role/edit",
    method: "POST",
    data,
  });

export const deleteRole = (data) =>
  http({
    url: "/role/delete",
    method: "POST",
    data,
  });

export const getRoleById = (data) =>
  http({
    url: "/role/find-by",
    method: "POST",
    data,
  });
