import request from "~/api/axios";
import {API_BASE} from "~/utils/constants";

export interface LinkDto {
    id:string,
    name: string;
    url:string;
    description:string,
}
export interface ShortLinkDto {
    url:string;
    identifier:string,
}


const linkApi = {
    allList: '/web/v1/link/all',
    indexList: '/web/v1/link/index',
    shortList: '/web/v1/link/short',
}

export function AllList () {
    return request.get(linkApi.allList)
}

export function IndexList () {
    return request.get(linkApi.indexList)
}
export function ShortList () {
    return request.get(linkApi.shortList)
}


export function GetAllListUrl () {
    return  API_BASE+linkApi.allList;
}
export function GetIndexListUrl () {
    return  API_BASE+linkApi.indexList;
}
export function GetShortListtUrl () {
    return  API_BASE+linkApi.shortList;
}
