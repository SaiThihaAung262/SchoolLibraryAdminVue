import http from "../axios";

/**
 * @Category
 */

export const getCategoryList = (data) =>
  http({ url: "/book-category/get-categories", method: "GET", params: data });

export const addCategoryList = (data) =>
  http({
    url: "/book-category/create",
    method: "POST",
    data,
  });

export const editCategoryList = (data) =>
  http({
    url: "/book-category/update",
    method: "POST",
    data,
  });

export const deleteCategoryList = (data) =>
  http({
    url: "/book-category/delete",
    method: "POST",
    data,
  });
