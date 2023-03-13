import http from "../axios";

/**
 * @Report
 */

export const getPopularBookLists = (data) =>
  http({ url: "/admin-users/popular-books", method: "GET", params: data });
