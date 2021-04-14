import http from "./http";

export default {
  getLoginQrcodeStr() {
    return http.getImage("/login");
  },
  checkLoginRes(qrsig: string) {
    return http.getImage(`/login/code/${qrsig}`);
  }
}