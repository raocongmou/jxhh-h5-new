/**
 * Date: 12/7/20
 */
import {createRouter, createWebHistory} from "vue-router";
import routeMap from "./routeMap";

const router = createRouter({
    scrollBehavior: () => ({y: 0}),
     history: createWebHistory(),
     routes: routeMap
});



// router.beforeEach((to, from,next)=>{
   
//     if(to.meta.name){
//         document.title = 'zzzzzzzzzzz'  //this.$route.matched[0].meta.name;
//         //document.title =  to.meta.name;
//     }
    
//     next();
// });

// router.afterEach((to,from,next) =>{
//     document.title = to.meta.name;
//     next();
// })


export default router
