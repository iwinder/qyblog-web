import {PageInfo} from "@/api/common";
import request from "@/utils/axios";
import {RoleType} from "@/api/role";

export interface MenusAdminType {
    id:string,
    path?:string,
    redirect?:string,
    name: string;
    identifier?: string;
    component?: string;
    level?: number;
    sort?: number;
    breadcrumbName?: string,
    icon?: string,
    type?: number,
    parentId?:string;
    statusFlag?:number,
    children?: MenusAdminType[],
}

export interface MenusAdminPageInfo extends PageInfo{
    type?: number,
    hasChildren?:boolean
    parentId?:string;
}

const menusAdminApi = {
    list: '/admin/v1/menusAdmin',
    add: '/admin/v1/menusAdmin',
    update: '/admin/v1/menusAdmin',
    delete: '/admin/v1/menusAdmin',
    getOne: '/admin/v1/menusAdmin/',
}

export function List (parameter:MenusAdminPageInfo) {
    return request.get(menusAdminApi.list,{
        params: parameter
    })
}


export function Add (parameter:RoleType) {
    return request.post(menusAdminApi.add,parameter)
}
export function Update (id:string,parameter:RoleType) {
    return request.put(menusAdminApi.getOne+id,parameter)
}
export function Delete (ids:string[]) {
    return request.delete(menusAdminApi.delete,{
        data: {
            ids:ids
        }
    })
}
export function GetOne (id:string) {
    return request.get(menusAdminApi.getOne+id)
}