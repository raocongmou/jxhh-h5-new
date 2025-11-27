/**
 * 动态加载js文件
 */
 const CDNS = [] // 已经加载的js

 /**
  * 按顺序加载js
  * @param  {string}    url      js地址
  * @param  {...string} urls     js地址
  * @return {Promise<boolean>}
  */
 export default async function (url, ...urls) {
   const sList = [url, ...urls]
   for (let i = 0; i < sList.length; i++) {
     const el = sList[i]
     if (!CDNS.includes(el)) {
       CDNS.push(el)
       await loadScript(el)
     }
   }
   return true
 }
 
 export function cdnRemove (url, ...urls) {
   const sList = [url, ...urls]
   sList.forEach(el => {
     const i = CDNS.indexOf(el)
     if (i >= 0) {
       CDNS.splice(i, 1)
     }
   })
 }
 
 /**
  * 加载js
  * @param  {string}        url  js地址
  * @returns {Promise<any>}
  */
 function loadScript (url) {
   return new Promise((resolve, reject) => {
     const s = document.createElement('script')
     s.type = 'text/javascript'
     s.src = url
     if (s.readyState) { // IE
       s.onreadystatechange = function () {
         if (s.readyState === 'loaded' || s.readyState === 'complete') {
           s.onreadystatechange = null
           document.head.removeChild(s)
           resolve()
         }
       }
     } else { // Others
       s.onload = function () {
         document.head.removeChild(s)
         resolve()
       }
     }
     document.head.appendChild(s)
   })
 }
 