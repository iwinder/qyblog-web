import {BasicLayout} from "@/layouts";

export const constantRouterMap= [
    {
        path: '/',
        name: '/',
        component:  BasicLayout,
        children: [
            {
                path: '',
                name: 'home',
                component:  () => import('@/views/home/index.vue'),
                children:[{
                    path: 'page/:id',
                    name: 'home-page-id',
                    component:  () => import('@/views/home/index.vue'),
                }],
            },
            {
                path: 'tag/:name',
                name: 'tag-name',
                component:  () => import('@/views/tag/_name.vue'),
                children:[{
                    path: 'page/:id',
                    name: 'tag-page-id',
                    component:  () => import('@/views/tag/_name.vue'),
                }],
            },
            {
                path: 'category/:name',
                name: 'category-name',
                component:  () => import('@/views/category/_name.vue'),
                children:[{
                    path: 'page/:id',
                    name: 'category-page-id',
                    component:  () => import('@/views/category/_name.vue'),
                }],
            },
            {
                path: 'go/:name',
                name: 'go-name',
                component:  () => import('@/views/go/_name.vue'),
            },
            {
                path: ':name',
                name: 'home-name',
                component:  () => import('@/views/home/_name.vue'),
            }
        ]

    },
    {
        path: '/404',
        name: '404',
        component: () => import( '@/views/exception/404.vue')
    },

]