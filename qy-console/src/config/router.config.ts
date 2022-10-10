import {UserLayout,BasicLayout,RouteViewLayout} from "@/layouts";

import {RouteRecordRaw} from 'vue-router'

export interface BreadcrumbRoute {
    path: string;
    breadcrumbName: string;
}

export const constantRouterMap= [
    {
        path: '/noLogin',
        component: UserLayout ,
        redirect: "/login",
        hidden: true,
        children: [
            {
                path: 'login',
                name: 'login',
                component:  () => import('@/views/login/Login.vue'),
            }
        ]

    },
    {
        path: '/404',
        component: () => import( '@/views/exception/404.vue')
    }
]

export const myRouterMap:any[]=  [

]

