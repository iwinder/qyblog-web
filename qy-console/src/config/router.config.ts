import UserLayout from "@/layouts/UserLayout.vue";

export const constantRouterMap= [
    {
        path: '/',
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