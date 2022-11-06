import {PageInfo} from "@/api/common";
import request from "@/utils/axios";
import {ApisType} from "@/api/apis";

export interface ShortLinkType {
    id?:string,
    name?: string;
    description?: string;
    url?:string;
    identifier?:string;
}

const linkApi = {
    list: '/admin/v1/shortLink',
    add: '/admin/v1/shortLink',
    delete: '/admin/v1/shortLink',
    getOne: '/admin/v1/shortLink/',
}

export function List (parameter:PageInfo) {
    return request.get(linkApi.list,{
        params: parameter
    })
}


export function Add (parameter:ShortLinkType) {
    return request.post(linkApi.add,parameter)
}
export function Update (parameter:ShortLinkType) {
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