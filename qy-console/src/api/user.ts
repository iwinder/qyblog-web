import request from "@/utils/axios";
import {PageInfo} from "@/api/common";
import {RoleType} from "@/api/role";

const userApi = {
    list: '/api/admin/v1/user',
    add: '/api/admin/v1/user',
    update: '/api/admin/v1/user',
    delete: '/api/admin/v1/user',
    getOne: '/api/admin/v1/user/',
}

export interface UserType {
    id:string,
    username?: string;
    nickname?: string;
    password?: string;
    avatar?: string;
    email?: string;
    statusFlag?: number;
    roles?: RoleType[];
}

export function List (parameter:PageInfo) {
    return request.get(userApi.list,{
        params: parameter
    })
}

export function Add (parameter:UserType) {
    return request.post(userApi.add,parameter)
}
export function Update (id:bigint,parameter:UserType) {
    return request.put(userApi.getOne+id,parameter)
}
export function Delete (ids:string[]) {
    return request.delete(userApi.delete,{
        data: {
            ids:ids
        }
    })
}
export function GetOne (id:bigint) {
    return request.get(userApi.getOne+id)
}