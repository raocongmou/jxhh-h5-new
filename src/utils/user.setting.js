import Cookies from 'js-cookie'
//  用户的一些默认的配置项目
const orgCoNoKey = 'ZhengBang-Default-orgCoNo'
const orgCoNameKey = 'ZhengBang-Default-orgCoName'
export function getDefaultOrgCoNo() {
  return Cookies.get(orgCoNoKey)
}

export function setDefaultOrgCoNo(token) {
  return Cookies.set(orgCoNoKey, token)
}

export function removeDefaultOrgCoNo() {
  return Cookies.remove(orgCoNoKey)
}


export function getDefaultOrgCoName() {
  return Cookies.get(orgCoNameKey)
}

export function setDefaultOrgCoName(name) {
  return Cookies.set(orgCoNameKey, name)
}

export function removeDefaultOrgCoName() {
  return Cookies.remove(orgCoNameKey)
}

export function setCookie(key, value, { maxAge, domain, path, secure } = {}) {
  let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
  if(typeof maxAge === "number") {
    cookie += `;max-age=${maxAge}`;
  }
  if(domain) {
    cookie += `;domain=${domain}`;
  }
  if(path) {
    cookie += `;path=${path}`;
  }
  if(secure) {
    cookie += `;secure=${secure}`;
  }
  document.cookie = cookie;
}

export function getCookie(key) {
  key = `${encodeURIComponent(key)}`;
  const cookie = document.cookie.split(";");
  for(let item of cookie) {
    let [cookieKey, cookieValue] = item.split("=");
    cookieKey = cookieKey.trim();
    if(key == cookieKey) {
      return JSON.parse(decodeURIComponent(cookieValue));
    }
  }
  return;
}
