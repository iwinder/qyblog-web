import {PageInfo} from "@/api/common";
import request from "@/utils/axios";
import {RoleType} from "@/api/role";

export interface FileLibType {
    id:string,
    name:string,
    type?: string,
    identifier?: number,
    statusFlag:number,
}

export interface FileLibTypePageInfo extends PageInfo{
    name?:string,
}

const fileLibTypeApi = {
    list: '/admin/v1/fileLibType',
    add: '/admin/v1/fileLibType',
    update: '/admin/v1/fileLibType',
    delete: '/admin/v1/fileLibType',
    getOne: '/admin/v1/fileLibType/',
}

export function TypeList (parameter:PageInfo) {
    return request.get(fileLibTypeApi.list,{
        params: parameter
    })
}


export function TypeAdd (parameter:RoleType) {
    return request.post(fileLibTypeApi.add,parameter)
}
export function TypeUpdate (id:string,parameter:RoleType) {
    return request.put(fileLibTypeApi.getOne+id,parameter)
}
export function TypeDelete (ids:string[]) {
    return request.delete(fileLibTypeApi.delete,{
        data: {
            ids:ids
        }
    })
}