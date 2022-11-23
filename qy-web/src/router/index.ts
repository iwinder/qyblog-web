
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {constantRouterMap} from "@/config/router.config";


const router =  createRouter({
    history: createWebHistory(),
    routes: constantRouterMap
});


// router.beforeEach((to, from, next) => {
//
// })
export default router
