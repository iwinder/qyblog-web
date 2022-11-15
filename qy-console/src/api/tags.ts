import {PageInfo} from "@/api/common";
import request from "@/utils/axios";
import {ApisType} from "@/api/apis";

export interface TagsType {
    id:string,
    name: string;
    identifier?: string;
    description?:string;
}

export interface TagsPageInfo extends PageInfo {
    name?: string;
}
const tagsApi = {
    list: '/admin/v1/tags',
    add: '/admin/v1/tags',
    update: '/admin/v1/tags',
    delete: '/admin/v1/tags',
    getOne: '/admin/v1/tags/', 
}

export function List (parameter:TagsPageInfo) {
    return request.get(tagsApi.list,{
        params: parameter
    })
}


export function Add (parameter:TagsType) {
    return request.post(tagsApi.add,parameter)
}
export function Update (id:string,parameter:TagsType) {
    return request.put(tagsApi.getOne+id,parameter)
}
export function Delete (ids:string[]) {
    return request.delete(tagsApi.delete,{
        data: {
            ids:ids
        }
    })
}
export function GetOne (id:string) {
    return request.get(tagsApi.getOne+id)
}
 