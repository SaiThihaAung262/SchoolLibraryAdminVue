import http from "../axios";

export const getBankList = (data) =>
  http({
    url: "/banks",
    method: "POST",
    data,
  });

export const addBankList = (data) =>
  http({
    url: "/banks/add",
    method: "POST",
    data,
  });

export const editBankList = (data) =>
  http({
    url: "/banks/edit",
    method: "POST",
    data,
  });

export const deleteBankList = (data) =>
  http({
    url: "/banks/delete",
    method: "POST",
    data,
  });

export const getSubConfig = (data) =>
  http({
    url: "/subconfig",
    method: "POST",
    data,
  });

export const addSubConfig = (data) =>
  http({
    url: "/subconfig/add",
    method: "POST",
    data,
  });

export const eidtSubConfig = (data) =>
  http({
    url: "/subconfig/edit",
    method: "POST",
    data,
  });

export const deleteSubConfig = (data) =>
  http({
    url: "/subconfig/delete",
    method: "POST",
    data,
  });

export const getBankPrivateKey = (data) =>
  http({
    url: "/banks/privatekey",
    method: "POST",
    data,
  });

export const setDefaultBank = (data) =>
  http({
    url: "/banks/do",
    method: "POST",
    data,
  });
