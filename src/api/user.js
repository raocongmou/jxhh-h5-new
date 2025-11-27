import request from '../utils/request'
import axios from 'axios'

//
export function oauthUrl(query) {
  return request({
    url: '/api/h5/oauthUrl',
    method: 'get',
    params: query 
  })
}

export function oauthUser(code,state) {
  return request({
    url: '/api/h5/oauthUser/' + code+ '/' + state,
    method: 'get'
  })
}

export function login (data) {
  data.clientId = '2DE239C109891D060606E794F195F612'
  return request({
    url: '/api/tscp-operating/login',
    method: 'post',
    data
  })
}

export function getPublicKey () {
  // return request({
  //   url: '/system/getPublicKey',
  //   method: 'post'
  // })
  return axios.get('publicKey.json').then(res => {
    const result = res.data
    return result
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: "/api/tscp-operating/optUser/getUserInfo"
  });
}






