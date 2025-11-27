import Cookies from 'js-cookie'
import Storage from "./storage"

const TokenKey = 'ZhengBang-Token'


export function getToken() {
  let token = Cookies.get(TokenKey);
  if(!token ||token ==='' || token===undefined){
    token= Storage.get(TokenKey);
  }
  return  token;
}

export function setToken(token) {
  Storage.set(TokenKey,token);
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  Storage.remove(TokenKey)
  return Cookies.remove(TokenKey)
}
