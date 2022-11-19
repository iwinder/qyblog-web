import {PageInfo} from "@/api/common";
import request from "@/utils/axios";
import {RoleType} from "@/api/role";
import {GetOne} from "@/api/user";

export interface FileType {
    id:string,
    originFileName?:string,
    fname?: string,
    fsize?: string,
    extention?:string,
    mimeType?:string,
    fhash?:string,
    fmd5?:string,
    relativePath?:string,
    defUrl?:string,
    updatedAt?:string,
}

export interface FileLibType {
    id:string,
    name:string,
    type?: string,
    identifier?: number,
    statusFlag:number,
}
export interface FileLibConfigType {
    id:string,
    accessKey?:string,
    secretKey?: string,
    bucket?: string,
    prefix?:string,
    domain?:string,
    endpoint?:string,
    typeId?:string,
}
export interface FileLibTypePageInfo extends PageInfo{
    name?:string,
}
export interface FileLibPageInfo extends PageInfo{
    searchText?:string,
    typeId?:string,
}
export interface FileTypePageInfo extends PageInfo{
    searchText?:string,
    typeId?:string,
    marker?:string,
}

const fileLibTypeApi = {
    list: '/admin/v1/fileLibType',
    add: '/admin/v1/fileLibType',
    update: '/admin/v1/fileLibType',
    delete: '/admin/v1/fileLibType',
    getOne: '/admin/v1/fileLibType/',
}
const fileLibConfigApi = {
    save: '/admin/v1/fileLibConfig',
    getOne: '/admin/v1/fileLibConfig/',
}

const fileLibApi = {
    list: '/admin/v1/fileLib/byType/',
    upload: '/admin/v1/file/upload',
}

export function FileList (parameter:FileLibPageInfo) {
    return request.get(fileLibApi.list+parameter.typeId,{
        params: parameter
    })
}


export function TypeList (parameter:FileLibTypePageInfo) {
    return request.get(fileLibTypeApi.list,{
        params: parameter
    })
}


export function TypeAdd (parameter:FileLibType) {
    return request.post(fileLibTypeApi.add,parameter)
}
export function TypeUpdate (parameter:FileLibType) {
    return request.put(fileLibTypeApi.getOne+parameter.id,parameter)
}
export function TypeDelete (ids:string[]) {
    return request.delete(fileLibTypeApi.delete,{
        data: {
            ids:ids
        }
    })
}

export function ConfigSave (parameter:FileLibConfigType) {
    return request.post(fileLibConfigApi.save,parameter)
}
export function ConfigGetOne (id:string) {
    return request.get(fileLibConfigApi.getOne+id)
}

export function Upload(data:FormData) {
    return request.post(fileLibApi.upload,data)
}