
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {constantRouterMap, testRouterMap} from "../config/router.config.js";
import {useUserInfo} from "@/store/userInfo";

// Vue.use(Router)

// const createRouter = () =>
//     new Router({
//         mode: 'history',
//         routes: constantRouterMap
//     })

const router =  createRouter({
    history: createWebHistory(),
    routes: constantRouterMap
});
testRouterMap.forEach((item:any)=>{
    router.addRoute("", item)
})

router.beforeEach((to, from, next) => {
    const userStore =useUserInfo();
    let token = userStore.token;
    if (token.trim().length>0) {
        if (to.path=="/noLogin/login") {
            next(from);
        } else {
            next();
        }
    }else {
        // next();
        if (to.path.indexOf("/noLogin")>=0) {
            next();
        }else {
            next({path:"/noLogin/login"});
        }
    }
})
export default router
