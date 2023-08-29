import {API_PRE} from "~/utils/constants";
export interface LinkDto {
    id:string,
    name: string;
    url:string;
    description:string,
}
export interface LinkListDto {
    items: LinkDto[],
}
export interface ShortLinkDto {
    url:string;
    identifier:string,
}

export interface ShortLinkListDto {
    items:ShortLinkDto[];
}


const linkName = API_PRE+"link";

const linkApi = {
    allList: linkName + "/all",
    indexList: linkName + "/index",
    shortList: linkName + "/short",
}


export function GetAllListUrl () {
    return  linkApi.allList;
}
export function GetIndexListUrl () {
    return linkApi.indexList;
}
export function GetShortListtUrl () {
    return linkApi.shortList;
}
