import axios from 'axios'
//import store from '../store'
import router from '../router'
import qs from 'qs'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
const service = axios.create({
    timeout: 10000, // 请求超时时间
    emulateJSON: true
  })
  // http request 拦截器
service.interceptors.request.use(
  config => {
    if (config.method === 'post_urlencoded') {
      config.method = 'post';
      config.headers = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        config.data = qs.stringify(config.data);
    }
    /*
    if (store.state.token) {
      config.headers.token = `${store.state.token}`;
    }
    */
    return config;
  },
  err => {
    return promise.reject(err);
  }
);
// http response 拦截器
service.interceptors.response.use(
  response => {
    if (response.data.flag) {
      switch (response.data.flag) {
        case 99:
          // 返回 99 清除token信息并跳转到登录页面
          store.commit('clearToken');
          localStorage.removeItem('user');
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          location.reload() // 为了重新实例化vue-router对象 避免bug
            // window.location.href = '/admin';
          break;

      }
    }
    return response;
  },
  error => {
    iView.Message.warning('请求超时！')
    if (error.response) {
      switch (error.response.data.flag) {
        case 99:
          // 返回 99 清除token信息并跳转到登录页面
          store.commit('clearToken');
          localStorage.removeItem('user');
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error.response.data);
  }
)

export default service
