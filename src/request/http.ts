import axios from 'axios';

axios.defaults.timeout = 60 * 1000;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default {
  get(url: string, param: any = '') {
    if (param !== undefined) {
      Object.assign(param, {
        _t: new Date().getTime(),
      });
    } else {
      param = {
        _t: new Date().getTime(),
      };
    }
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
      }).then((res) => {
        resolve(res);
      });
    });
  },
  getImage(url: string) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        headers: {
          "Accept": "image/png",
        },
        responseType: 'blob',
      }).then((res) => {
        resolve(res);
      });
    });
  },

  post(url: string, param: any, config?: any) {
    return new Promise((resolve, reject) => {
      axios.post(url, param, config).then((res) => {
        resolve(res);
      });
    });
  },
};
