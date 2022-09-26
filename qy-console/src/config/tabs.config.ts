import {ref} from "vue";

export  interface TabsObj {
    key: string;
    pkey: string;
    title:string;
    path:string;
    parent:string[];
}

export const tabsKeyMap=  [
    {
        key:"dashboard",
        title: '仪表盘',
        path:"/dashboard",
        parent:[],
    },
    {
        key:"user",
        breadcrumbName:'用户管理',
        title: '用户管理',
        path:"/system/user",
        parent:["system"]
    },
    {
        key:"user-list",
        pkey:"user",
        breadcrumbName:'用户列表',
        title: '用户列表',
        path:"/system/user/list",
        parent:["system"]
    },
    {
        key:"user-add",
        pkey:"user",
        breadcrumbName:'用户新增',
        title: '用户新增',
        path:"/system/user/add",
        parent:["system","user"]
    },
    {
        key:"user-update",
        pkey:"user",
        breadcrumbName:'用户新增',
        title: '用户新增',
        path:"/system/user/:id",
        parent:["system","user"]
    },
    {
        key:"role",
        breadcrumbName:'角色管理',
        title: '角色管理',
        path:"/system/role",
        parent:["system"]
    },
    {
        key:"menusAdmin",
        breadcrumbName:'菜单管理',
        title: '菜单管理',
        path:"/system/menusAdmin",
        parent:["system"]
    },
    {
        key:"apis",
        breadcrumbName:'Api管理',
        title: 'Api管理',
        path:"/system/apis",
        parent:["system"]
    },
    {
        key:"site",
        breadcrumbName:'站点管理',
        title: '站点管理',
        path:"/system/site",
        parent:["system"]
    },
]


const tabsMap = new Map();

export const initTabsMap=(objlist:any) =>{
    objlist.forEach(function (item:TabsObj){
        tabsMap.set(item.key,item)
    })
}
export const getValue=(key:String):TabsObj=>{
    return tabsMap.get(key)
}