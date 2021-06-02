import http from './http';

export default {
  getRoles(area: string) {
    return http.get(`/api/dnf/roles`, { area });
  },
  setRoles(roleData: any) {
    return http.post(`/api/dnf/bind`, roleData);
  },
  getNowRole() {
    return http.get(`/api/dnf/bind`);
  },
  getActivity() {
    return http.get(`/api/activity/`);
  },
  handleReceive() {
    return http.post(`/api/activity/receive`, {});
  },
};
