import {PageInfo} from "@/api/common";
import request from "@/utils/axios";
import {RoleType} from "@/api/role";

export interface ApisType {
    id:string,
    apiGroup?:string,
    method: string,
    path?: string,
    description?: string,
    identifier?: string,
    groupId?:string,
    statusFlag?:number,
    children?:ApisType[]
}

export interface ApisPageInfo extends PageInfo{
    apiGroup?:string,
    method: string,
    path?: string,
    description?: string,
    identifier?: string
}

export interface ApisGroupType {
    id:string,
    name:string,
    identifier: string
}

export interface ApisGroupPageInfo extends PageInfo{
    name?:string,
    identifier?: string
}

const apisApi = {
    list: '/admin/v1/sysapi',
    add: '/admin/v1/sysapi',
    update: '/admin/v1/sysapi',
    delete: '/admin/v1/sysapi',
    getOne: '/admin/v1/sysapi/',
    getTree: '/admin/v1/sysapi-tree',
}
const apisGroupApi = {
    list: '/admin/v1/sysapiGroup',
    add: '/admin/v1/sysapiGroup',
    update: '/admin/v1/sysapiGroup',
    delete: '/admin/v1/sysapiGroup',
    getOne: '/admin/v1/sysapiGroup/',
}
export function List (parameter:ApisPageInfo) {
    return request.get(apisApi.list,{
        params: parameter
    })
}


export function Add (parameter:ApisType) {
    return request.post(apisApi.add,parameter)
}
export function Update (id:string,parameter:ApisType) {
    return request.put(apisApi.getOne+id,parameter)
}
export function Delete (ids:string[]) {
    return request.delete(apisApi.delete,{
        data: {
            ids:ids
        }
    })
}
export function GetOne (id:string) {
    return request.get(apisApi.getOne+id)
}

export function GetTree () {
    return request.get(apisApi.getTree)
}

export function GroupList (parameter:ApisGroupPageInfo) {
    return request.get(apisGroupApi.list,{
        params: parameter
    })
}


export function GroupAdd (parameter:ApisGroupType) {
    return request.post(apisGroupApi.add,parameter)
}
export function GroupUpdate (id:string,parameter:ApisGroupType) {
    return request.put(apisGroupApi.getOne+id,parameter)
}
export function GroupDelete (ids:string[]) {
    return request.delete(apisGroupApi.delete,{
        data: {
            ids:ids
        }
    })
}