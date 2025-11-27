/**
 * Date:2020/12/23
 * Desc:
 */
import router from '../router';
import store from "@/store";
import { getToken } from '@/utils/auth' // get token from cookie
router.beforeEach(async (to, from, next) => {
  
    //TODO  判断当前本地是否存在 token  如果存在，可以跳转。如果不存在，则需要 定位到/login 界面上
/// 应该判断，当前当前是否有token ，如果不存在，则需要 跳转到 登录页面 。如果存在，则过 
/// 由于当前的系统中，并不需要除了login 以外的 其他的页面，需要无权限访问的。 
    
    let hasToken = getToken();
    if(hasToken){
      if(to.path==='/login' || to.path==='/' ){
        next({path:'/index'})
      }else{
          next()
      }
    }else{
      if(to.path==='/login'){
        next() 
      }else {
        next({path:'/login'})
      }
    }
  })


// update title
router.afterEach((to) => {

    document.title = (to.meta && to.meta.title) || '';
});
