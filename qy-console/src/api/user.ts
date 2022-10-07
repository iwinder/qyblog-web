import request from "@/utils/axios";
import {PageInfo} from "@/api/common";
import {RoleType} from "@/api/role";

const userApi = {
    list: '/admin/v1/user',
    add: '/admin/v1/user',
    update: '/admin/v1/user',
    delete: '/admin/v1/user',
    getOne: '/admin/v1/user/',
    changePassword: '/admin/v1/user-password',
}

export interface UserType {
    id:string,
    username?: string,
    nickname?: string,
    password?: string,
    avatar?: string,
    email?: string,
    statusFlag?: number,
    roleNames?: string,
    roles?: RoleType[],
}

export function List (parameter:PageInfo) {
    return request.get(userApi.list,{
        params: parameter
    })
}

export function Add (parameter:UserType) {
    return request.post(userApi.add,parameter)
}
export function Update (id:string,parameter:UserType) {
    return request.put(userApi.getOne+id,parameter)
}
export function Delete (ids:string[]) {
    return request.delete(userApi.delete,{
        data: {
            ids:ids
        }
    })
}
export function GetOne (id:string) {
    return request.get(userApi.getOne+id)
}
export function ChangePassword (parameter:UserType) {
    return request.post(userApi.changePassword,parameter)
}