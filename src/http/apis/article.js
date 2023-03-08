import http from "../axios";

/**
 * @Article
 */
export const getArticle = (data) =>
  http({
    url: "/articles",
    method: "POST",
    data,
  });

export const addArticle = (data) =>
  http({
    url: "/articles/add",
    method: "POST",
    data,
  });
export const editArticle = (data) =>
  http({
    url: "/articles/edit",
    method: "POST",
    data,
  });
export const deleteArticle = (data) =>
  http({
    url: "/articles/delete",
    method: "POST",
    data,
  });
