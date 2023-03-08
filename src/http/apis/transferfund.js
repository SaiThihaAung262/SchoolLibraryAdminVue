import http from "../axios";

export const getTransferOpenTrns = (data) =>
  http({
    url: "/trans/open-trns",
    method: "POST",
    data,
  });

export const getTransferOpenTrnsFilter = (data) =>
  http({
    url: "/trans/open-trns-filter",
    method: "POST",
    data,
  });

export const getApiCall = (data) =>
  http({
    url: "/trans/open-api-key",
    method: "POST",
    data,
  });
