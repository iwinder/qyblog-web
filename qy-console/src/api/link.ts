import {PageInfo} from "@/api/common";
import request from "@/utils/axios";
import {ApisType} from "@/api/apis";

export interface LinkType {
    id?:string,
    name?: string;
    description?: string;
    url?:string;
    ftype?:number;
}

const linkApi = {
    list: '/admin/v1/link',
    add: '/admin/v1/link',
    delete: '/admin/v1/link',
    getOne: '/admin/v1/link/',
}

export function List (parameter:PageInfo) {
    return request.get(linkApi.list,{
        params: parameter
    })
}


export function Add (parameter:LinkType) {
    return request.post(linkApi.add,parameter)
}
export function Update (parameter:LinkType) {
    return request.put(linkApi.getOne+parameter.id,parameter)
}
export function Delete (ids:string[]) {
    return request.delete(linkApi.delete,{
        data: {
            ids:ids
        }
    })
}
// export function GetOne (id:string) {
//     return request.get(roleApi.getOne+id)
// }
// export function SaveRoleMenus (parameter:RoleMenusApisType) {
//     return request.post(roleApi.saveRoleMenus,parameter)
// }
// export function SaveRoleApis (parameter:RoleMenusApisType) {
//     return request.post(roleApi.saveRoleApis,parameter)
// }