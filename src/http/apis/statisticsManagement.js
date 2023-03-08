import http from "../axios";

/**
 *@StatisticsManagement
 */
export const getStatistics = (data) =>
  http({
    url: "/dashboard/statistics",
    method: "POST",
    data,
  });
