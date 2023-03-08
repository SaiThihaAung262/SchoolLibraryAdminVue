import http from "../axios";

/**
 *@InternalUser
 */
export const getInternalUser = (data) =>
  http({
    url: "/users/internal",
    method: "POST",
    data,
  });

export const addInternalUser = (data) =>
  http({
    url: "/users/internal/add",
    method: "POST",
    data,
  });

export const editInternalUser = (data) =>
  http({
    url: "/users/internal/edit",
    method: "POST",
    data,
  });

export const addInternalUserPledge = (data) =>
  http({
    url: "/pledge/user-internal",
    method: "POST",
    data,
  });

export const editInternalUserPledge = (data) =>
  http({
    url: "/pledge/internal/edit",
    method: "POST",
    data,
  });

export const sendGatewayEthInternal = (data) =>
  http({
    url: "/users/internal/send-gateway-eth",
    method: "POST",
    data,
  });

export const sendGatewayTrxInternal = (data) =>
  http({
    url: "/users/internal/send-gateway-trx",
    method: "POST",
    data,
  });

/**
 *@MemberUser
 */
export const getMember = (data) =>
  http({
    url: "/users/member",
    method: "POST",
    data,
  });

export const addMember = (data) =>
  http({
    url: "/users/member/add",
    method: "POST",
    data,
  });

export const editMember = (data) =>
  http({
    url: "/users/member/edit",
    method: "POST",
    data,
  });

export const addMemberPledge = (data) =>
  http({
    url: "/pledge/user-member",
    method: "POST",
    data,
  });

export const editMemberUserPledge = (data) =>
  http({
    url: "/pledge/member/edit",
    method: "POST",
    data,
  });

export const sendGatewayEthMember = (data) =>
  http({
    url: "/users/member/send-gateway-eth",
    method: "POST",
    data,
  });

export const sendGatewayTrxMember = (data) =>
  http({
    url: "/users/member/send-gateway-trx",
    method: "POST",
    data,
  });

/**
 * @VipList
 */
export const getVipList = (data) =>
  http({
    url: "/vips",
    method: "POST",
    data,
  });

export const addVip = (data) =>
  http({
    url: "/vips/add",
    method: "POST",
    data,
  });

export const editVip = (data) =>
  http({
    url: "/vips/edit",
    method: "POST",
    data,
  });

export const deleteVip = (data) =>
  http({
    url: "/vips/delete",
    method: "POST",
    data,
  });

/**
 * @GetManagementLog
 */
export const getManagementLog = (data) =>
  http({
    url: "/users/logs",
    method: "POST",
    data,
  });

/**
 * @Pludge
 */
export const getPledgeList = (data) =>
  http({
    url: "/pledge/list",
    method: "POST",
    data,
  });

export const addPledge = (data) =>
  http({
    url: "/pledge/plg",
    method: "POST",
    data,
  });

export const editPledge = (data) =>
  http({
    url: "/pledge/edit",
    method: "POST",
    data,
  });

export const dePle = (data) =>
  http({
    url: "/pledge/delete",
    method: "POST",
    data,
  });
export const getCheckPledge = (data) =>
  http({
    url: "/pledge/check",
    method: "POST",
    data,
  });

export const sendGatewayEth = (data) =>
  http({
    url: "/users/send-gateway-eth",
    method: "POST",
    data,
  });
export const sendGatewayTrx = (data) =>
  http({
    url: "/users/send-gateway-trx",
    method: "POST",
    data,
  });

export const getMining = (data) =>
  http({
    url: "/minings/logs",
    method: "POST",
    data,
  });

export const checkPoolPledge = (data) =>
  http({
    url: "/pledge/by-id",
    method: "POST",
    data,
  });

export const addUserPledge = (data) =>
  http({
    url: "pledge/user",
    method: "POST",
    data,
  });

export const getGroups = (data) =>
  http({
    url: "groups",
    method: "POST",
    data,
  });

export const addGroups = (data) =>
  http({
    url: "groups/add",
    method: "POST",
    data,
  });

export const editGroups = (data) =>
  http({
    url: "groups/edit",
    method: "POST",
    data,
  });

export const deleteGroups = (data) =>
  http({
    url: "groups/delete",
    method: "POST",
    data,
  });
