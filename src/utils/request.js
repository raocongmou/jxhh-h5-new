/**
 * Date: 12/7/20
 */

import axios from "axios";
import { Toast, Notify } from "vant";
import { getToken, removeToken } from "@/utils/auth";
import Router from "@/router";

const baseUrl = process.env.VUE_APP_BASE_URL || "";
const apiPath = process.env.VUE_APP_BASE_API || ""; // 本地代理才能使用到的

const service = axios.create({
  baseURL: baseUrl + apiPath, // api的base_url
  timeout: 60 * 1000 // request timeout 60s
});

// request interceptor
service.interceptors.request.use(
  config => {
    startLoading();
    if (getToken()) {
      config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    // Do something with request error
    console.error(error); // for debug
    Promise.reject(error);
  }
);

let loading;

function startLoading() {
  loading = Toast.loading({
    message: "加载中...",
    forbidClick: true
  });
}

function endLoading() {
  loading.clear();
}

service.interceptors.response.use(
  response => {
    if (response.config.url.includes("api/ccp-system/file/down")) {
      return response;
    }

    if (response.config.url.includes("/order2pdf/ExportToPdf")) {
      return response;
    }

    const res = response.data || {};
    endLoading();
    if (res.code === 1) {
      //console.log('request 代理 返回值-',response)
      return res;
    } else {
      console.log("res", res);
      ///      应该有弹窗
      //Notify({ type: 'danger', message: res.message, duration: 2500});
      if (res.data) {
        Notify({ type: "danger", message: res.message + "：" + res.data });
      } else {
        Notify({ type: "danger", message: res.message });
      }
      return Promise.reject(res.message || "error");
    }
  },
  error => {
    let response = error.response || {};
    let message = "网络异常";
    // 断网情况，会没有statusText
    let data = response.data;
    console.log(error);
    if (response.status === 401) {
      removeToken();
      Router.push("/index");
      return;
    }
    if (response.statusText) {
      message = response.statusText + ":" + response.status;
    }
    if (data) {
      message = data.data;
    }

    Notify({ type: "danger", message: message });
    return Promise.reject(error);
  }
);

export default service;
