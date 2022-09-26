import {PageInfo} from "@/api/common";
import request from "@/utils/axios";
import {UserType} from "@/api/user";

export interface RoleType {
    id:string,
    name: string;
    identifier?: string;
    menusAdmin?:any;
}

const roleApi = {
    list: '/api/admin/v1/role',
    add: '/api/admin/v1/role',
    update: '/api/admin/v1/role',
    delete: '/api/admin/v1/role',
    getOne: '/api/admin/v1/role/',
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
export function GetOne (id:bigint) {
    return request.get(roleApi.getOne+id)
}