
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {constantRouterMap, testRouterMap} from "../config/router.config.js";

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

export default router
