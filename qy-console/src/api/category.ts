import {PageInfo} from "@/api/common";
import request from "@/utils/axios";
import {ApisType} from "@/api/apis";

export interface CategoryType {
    id:string,
    name: string;
    identifier?: string;
    description?:string;
    parentId?:string;
}

export interface CategoryPageInfo extends PageInfo {
    name?: string;
}
const categoryApi = {
    list: '/admin/v1/category',
    add: '/admin/v1/category',
    update: '/admin/v1/category',
    delete: '/admin/v1/category',
    getOne: '/admin/v1/category/',
}

export function List (parameter:CategoryPageInfo) {
    return request.get(categoryApi.list,{
        params: parameter
    })
}


export function Add (parameter:CategoryType) {
    return request.post(categoryApi.add,parameter)
}
export function Update (id:string,parameter:CategoryType) {
    return request.put(categoryApi.getOne+id,parameter)
}
export function Delete (ids:string[]) {
    return request.delete(categoryApi.delete,{
        data: {
            ids:ids
        }
    })
}
export function GetOne (id:string) {
    return request.get(categoryApi.getOne+id)
}
