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

export const testRouterMap=  [
    {
        path: '/',
        name: '/',
        component: BasicLayout ,
        redirect: "/dashboard",
        breadcrumbName:'首页',
        meta: { title: '仪表盘', icon: 'DashboardOutlined'},
        hidden: true,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                breadcrumbName:'仪表盘',
                meta: { title: '仪表盘', icon: 'DashboardOutlined',type:1},
                component:  () => import('@/views/dashboard/Workplace.vue'),
            },
            {
                path: '/system',
                name: 'system',
                redirect: "/system/user/list",
                component: RouteViewLayout,
                breadcrumbName:'系统管理',
                meta: { title: '系统管理', icon: 'SettingOutlined',type:1 },
                children: [
                    {
                        path: '/system/user',
                        name: 'user',
                        redirect: "/system/user/list",
                        breadcrumbName:'用户管理',
                        meta: { title: '用户管理', icon: 'UserOutlined',type:1  },
                        component: RouteViewLayout,
                        children:[
                            {
                                path: '/system/user/list',
                                name: 'user-list',
                                meta: { title: '用户列表', type:2  },
                                component:  () => import('@/views/user/index.vue'),
                            },
                            {
                                path: '/system/user/add',
                                name: 'user-add',
                                meta: { title: '新增用户', type:2  },
                                component:  () => import('@/views/user/add.vue'),
                            },
                            {
                                path: '/system/user/:id',
                                name: 'user-update',
                                meta: { title: '编辑用户', type:2  },
                                component:  () => import('@/views/user/_id.vue'),
                            },
                        ]
                    },
                    {
                        path: '/system/role/',
                        name: 'role',
                        redirect: "/system/role/list",
                        breadcrumbName:'角色管理',
                        meta: { title: '角色管理', icon: 'TeamOutlined',type:1  },
                        component: RouteViewLayout,
                        children:[
                            {
                                path: '/system/role/list',
                                name: 'role-list',
                                meta: { title: '角色列表', type:2  },
                                component:  () => import('@/views/role/index.vue'),
                            },
                            {
                                path: '/system/role/add',
                                name: 'role-add',
                                meta: { title: '新增角色', type:2  },
                                component:  () => import('@/views/role/add.vue'),
                            },
                            {
                                path: '/system/role/:id',
                                name: 'role-update',
                                meta: { title: '编辑角色', type:2  },
                                component:  () => import('@/views/role/_id.vue'),
                            },
                        ]
                    },
                    {
                        path: '/system/menusAdmin/',
                        name: 'menusAdmin',
                        redirect: "/system/menusAdmin/list",
                        breadcrumbName:'菜单管理',
                        meta: { title: '菜单管理', icon: 'TeamOutlined',type:1  },
                        component: RouteViewLayout,
                        children:[
                            {
                                path: '/system/menusAdmin/list',
                                name: 'menusAdmin-list',
                                meta: { title: '菜单列表', type:2  },
                                component:  () => import('@/views/menusAdmin/index.vue'),
                            },
                            {
                                path: '/system/role/add',
                                name: 'menusAdmin-add',
                                meta: { title: '新增菜单', type:2  },
                                component:  () => import('@/views/menusAdmin/add.vue'),
                            },
                            {
                                path: '/system/menusAdmin/:id',
                                name: 'menusAdmin-update',
                                meta: { title: '编辑菜单', type:2  },
                                component:  () => import('@/views/menusAdmin/_id.vue'),
                            },
                        ]
                    },
                    {
                        path: '/system/apis/',
                        name: 'apis',
                        redirect: "/system/apis/list",
                        breadcrumbName:'Api管理',
                        meta: { title: 'Api管理', icon: 'TeamOutlined',type:1  },
                        component: RouteViewLayout,
                        children:[
                            {
                                path: '/system/apis/list',
                                name: 'apis-list',
                                meta: { title: 'Api列表', type:2  },
                                component:  () => import('@/views/apis/index.vue'),
                            },
                            {
                                path: '/system/role/add',
                                name: 'apis-add',
                                meta: { title: '新增Api', type:2  },
                                component:  () => import('@/views/apis/add.vue'),
                            },
                            {
                                path: '/system/apis/:id',
                                name: 'apis-update',
                                meta: { title: '编辑Api', type:2  },
                                component:  () => import('@/views/apis/_id.vue'),
                            },
                        ]
                    },
                    {
                        path: '/system/site',
                        name: 'site',
                        redirect: "/system/site",
                        breadcrumbName:'站点管理',
                        meta: { title: '站点管理', icon: 'TeamOutlined',type:1  },
                        component:  () => import('@/views/site/index.vue'),
                    },
                ]
            },
            // {
            //     path: 'user',
            //     name: 'user',
            //     redirect: "/qy-admin/user/list",
            //     children: [
            //         {
            //             path: 'list',
            //             name: 'userlist',
            //             component:  () => import('@/views/user/index.vue'),
            //         },
            //         {
            //             path: 'add',
            //             name: 'useradd',
            //             component:  () => import('@/views/user/add.vue'),
            //         },
            //         {
            //             path: ':id',
            //             name: 'userupdate',
            //             component:  () => import('@/views/user/_id.vue'),
            //         },
            //     ]
            // },
            // {
            //     path: 'user/add',
            //     name: 'user-add',
            //     component: UserAdd,
            // },
            // {
            //     path: 'user/:id',
            //     name: 'user-id',
            //     component: UserEdit,
            // },
        ]

    },
]

