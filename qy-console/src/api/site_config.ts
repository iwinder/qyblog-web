import {PageInfo} from "@/api/common";
import request from "@/utils/axios";
import {RoleType} from "@/api/role";
import {GetOne} from "@/api/user";

export interface SiteConfigType {
    id:string,
    configKey?:string,
    configValue?: string,
    configName?: string,
    configTip?:string,
    ftype?:number,
}

export interface SiteConfigParamType {
    paramms:SiteConfigType[],
}




const siteConfigApi = {
    admin: '/admin/v1/siteConfig',
    web: '/web/v1/fileLibType',
}

export function List () {
    return request.get(siteConfigApi.admin)
}

export function  Update (parameter:SiteConfigParamType) {
    return request.put(siteConfigApi.admin,parameter)
}
export function ListBase () {
    return request.get(siteConfigApi.web)
}

