import {ref} from "vue";

export  class TabsObj {
    key: string;
    pkey: string;
    title:string;
    path:string;
    parent:string[];

    constructor(key:string,pkey: string,title:string,path:string,parent:string[]) {
        this.key = key;
        this.pkey = pkey;
        this.title = title;
        this.path = path;
        this.parent = parent;
    }
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
        key:"role",
        breadcrumbName:'角色管理',
        title: '角色管理',
        path:"/system/role",
        parent:["system"]
    },
]


const tabsMap = new Map();

export const initTabsMap=(objlist:any) =>{
    objlist.forEach(function (item:{key:string,pkey: string,breadcrumbName: string, title:string, path:string,parent:string[]}){
        tabsMap.set(item.key,new TabsObj(item.key,item.pkey ,item.title,item.path,item.parent))
    })
}
export const getValue=(key:String):TabsObj=>{
    return tabsMap.get(key)
}