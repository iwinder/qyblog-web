
import {createRouter, createWebHistory} from 'vue-router'
import {constantRouterMap} from "../config/router.config.js";

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

export default router
