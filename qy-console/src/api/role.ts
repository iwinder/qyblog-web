import {PageInfo} from "@/api/common";
import request from "@/utils/axios";
import {ApisType} from "@/api/apis";

export interface RoleType {
    id:string,
    name: string;
    identifier?: string;
    menusIDs?:string[];
    apiIDs?:string[];
}
export interface RoleMenusApisType {
    id?:string,
    menusIDs?: string[];
    apis?: ApisType[];
    apiIDs?: string[];
}

const roleApi = {
    list: '/admin/v1/role',
    add: '/admin/v1/role',
    update: '/admin/v1/role',
    delete: '/admin/v1/role',
    getOne: '/admin/v1/role/',
    saveRoleMenus: '/admin/v1/role-menus',
    saveRoleApis: '/admin/v1/role-apis',
}

export function List (parameter:PageInfo) {
    return request.get(roleApi.list,{
        params: parameter
    })
}


export function Add (parameter:RoleType) {
    return request.post(roleApi.add,parameter)
}
export function Update (id:string,parameter:RoleType) {
    return request.put(roleApi.getOne+id,parameter)
}
export function Delete (ids:string[]) {
    return request.delete(roleApi.delete,{
        data: {
            ids:ids
        }
    })
}
export function GetOne (id:string) {
    return request.get(roleApi.getOne+id)
}
export function SaveRoleMenus (parameter:RoleMenusApisType) {
    return request.post(roleApi.saveRoleMenus,parameter)
}
export function SaveRoleApis (parameter:RoleMenusApisType) {
    return request.post(roleApi.saveRoleApis,parameter)
}