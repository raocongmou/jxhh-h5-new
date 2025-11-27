const storage = window.localStorage

export function getStorage (key) {
  const data = storage.getItem(key)
  return data && JSON.parse(data)
}

export function setStorage (key, value) {
  const val = JSON.stringify(value)
  storage.setItem(key, val)
}

export function removeStorage (key) {
  storage.removeItem(key)
}

export function clear(){
  storage.clear();
}

export default {
  clear:clear,
  get: getStorage,
  set: setStorage,
  remove: removeStorage
}

