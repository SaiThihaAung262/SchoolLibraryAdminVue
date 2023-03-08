import http from "../axios";

/**
 * @Article
 */
export const getGiftManagement = (data) =>
  http({
    url: "/gifts",
    method: "POST",
    data,
  });
