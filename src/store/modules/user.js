// initial state
import {  setToken } from '@/utils/auth'
import { setStorage, removeStorage } from "@/utils/storage";
import {login, oauthUser, getUserInfo} from '@/api/user'
import { setCookie } from "@/utils/user.setting";

const state = () => ({
  userToken: null,
  userInfo:null,
  loginInfo: null 
})

// getters
const getters = {
    userInfo: (state, getters) => {
        return state.userInfo
    },
    userToken: (state, getters) => {
        return state.userToken
   }
}

// actions
const actions = {
  async saveUser ({ commit, state }, userInfo) {
    commit('setUserToken', userInfo.token)
    commit('setUserInfo', userInfo)
  },

  login({ commit }, userInfo) {
    
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
    
      login({ username: username.trim(), password: password}).then(response => {

            let token =response.data.access_token
            console.log('token=',token)
            commit('setUserToken', token)
            setToken(token)
            // setTimeout((_) => {
              
            // }, 3000);
            resolve()

        }).catch(error => {
          console.log('store-login方法中,错误')
          reject(error)
        })
    })
  },

  // 获取用户信息
  getUserInfos({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(async res => {
          // removeStorage("loginInfo");
          // setStorage("loginInfo", res.data);
          setCookie("loginInfo", res.data);
          // Storage.set("orgName", res.data.enterpriseName);
          // Storage.set("orgCoNo", res.data.orgCoNo);
          // let res = { 'code': 1, 'message': '获得用户信息成功', 'data': { 'userId': '5df0d033999711e99de0000c29126022', 'email': null, 'phone': '13926925274', 'loginName': 'PB_13926925274', 'nickName': 'xuerui', 'realName': 'xuerui', 'gender': null, 'profilePicture': null, 'enterpriseName': '宁波朝云物流有限公司' }, 'total': 0 }
          // commit('SET_NAME', res.data.realName)
          commit("SET_USER", res.data);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  loginByOauth({ commit }, userInfo) {
    const { code, state } = userInfo
    return new Promise((resolve, reject) => {
      oauthUser({ code: code.trim(), state: state}).then(response => {
            const { data } = response
            console.log(data)
            commit('setUserToken', data)
             setToken(data)
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
  },



}

// mutations
const mutations = {

  setUserToken (state, userToken) {
    state.userToken = userToken
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  SET_USER: (state, userInfo) => {
    state.loginInfo = userInfo;
  },
  
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}