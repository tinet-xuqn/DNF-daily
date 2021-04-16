import http from "./http";

export default {
  getLoginQrcodeStr() {
    return http.getImage("/login");
  },
  checkLoginRes(qrsig: string) {
    return http.get(`/login/code/${qrsig}`);
  },
  getRoles(area: string) {
    return http.get(`/dnf/roles`, { area });
  },
  setRoles(roleData: any) {
    return http.post(`/dnf/bind`, roleData);
  },
  getNowRole() {
    return http.get(`/dnf/bind`);
  },
};
