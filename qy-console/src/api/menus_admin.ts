import {PageInfo} from "@/api/common";
import request from "@/utils/axios";
import {RoleType} from "@/api/role";

export interface MenusAdminType {
    id:string,
    name: string;
    identifier?: string;
    menusAdmin?:any;
}

const menusAdminApi = {
    list: '/api/admin/v1/menusAdmin',
    add: '/api/admin/v1/menusAdmin',
    update: '/api/admin/v1/menusAdmin',
    delete: '/api/admin/v1/menusAdmin',
    getOne: '/api/admin/v1/menusAdmin/',
}

export function List (parameter:PageInfo) {
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
export function GetOne (id:bigint) {
    return request.get(menusAdminApi.getOne+id)
}