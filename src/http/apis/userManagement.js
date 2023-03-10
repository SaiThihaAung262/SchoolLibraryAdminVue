import http from "../axios";

/**
 * @Category
 */

export const getTeachers = (data) =>
  http({ url: "/teacher/get-teachers", method: "GET", params: data });

export const addTeacher = (data) =>
  http({
    url: "/teacher/create",
    method: "POST",
    data,
  });

export const editTeacher = (data) =>
  http({
    url: "/teacher/update",
    method: "POST",
    data,
  });

export const deleteTeacher = (data) =>
  http({
    url: "/teacher/delete",
    method: "POST",
    data,
  });

export const getStudents = (data) =>
  http({ url: "/student/get-students", method: "GET", params: data });

export const addStudent = (data) =>
  http({
    url: "/student/create",
    method: "POST",
    data,
  });

export const editStudent = (data) =>
  http({
    url: "/student/update",
    method: "POST",
    data,
  });

export const deleteStudent = (data) =>
  http({
    url: "/student/delete",
    method: "POST",
    data,
  });
