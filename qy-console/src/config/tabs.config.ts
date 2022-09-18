import {ref} from "vue";

export  class TabsObj {
    key: string;
    title:string;
    path:string;
    parent:string[];

    constructor(key:string,title:string,path:string,parent:string[]) {
        this.key = key;
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
        key:"role",
        breadcrumbName:'角色管理',
        title: '角色管理',
        path:"/system/role",
        parent:["system"]
    },
]


const tabsMap = new Map();

export const initTabsMap=(objlist:any) =>{
    objlist.forEach(function (item:{key:string,breadcrumbName: string, title:string, path:string,parent:string[]}){
        tabsMap.set(item.key,new TabsObj(item.key,item.title,item.path,item.parent))
    })
}
export const getValue=(key:String):TabsObj=>{
    return tabsMap.get(key)
}