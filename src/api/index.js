import axios from "axios";
import { message } from 'ant-design-vue';

const request = axios.create({
  baseURL: "http://api.cpengx.cn/metashop/api",
});

// 响应拦截
request.interceptors.response.use(res => {
  if (res.status === 200) {
    return res.data;
  } else {
    message.error("请求接口出错");
    return res;
  }
}, error => {
  message.error("请求出错");
  return Promise.reject(error);
})

export const getHomePage = (params) => {
  return request({
    method: "GET",
    url: "/homepage",
    params
  })
}

export const getProducts = (params) => {
  return request({
    method: "GET",
    url: "/products",
    params
  })
}
