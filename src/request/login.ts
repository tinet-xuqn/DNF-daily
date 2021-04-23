import http from "./http";

export default {
  getLoginQrcodeStr() {
    return http.getImage("/api/login");
  },
  getLoginStatus() {
    return http.get("/api/login/user");
  },
  checkLoginRes(qrsig: string) {
    return http.get(`/api/login/code/${qrsig}`);
  }
};
