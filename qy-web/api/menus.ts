import request from "~/api/axios";
import {API_BASE} from "~/utils/constants";

export interface MenusDto {
    id:string,
    name: string;
    url:string;
    blanked:number;
    children:MenusDto[],
}

const menusApi = {
    headList: '/web/v1/menus/header',
    footerList: '/web/v1/menus/footer',
}

export function HeadList () {
    return request.get(menusApi.headList);
}

export function FooterList () {
    return request.get(menusApi.footerList);
}


export function GetHeadListUrl () {
    return  API_BASE+menusApi.headList;
}
export function GetFooterListUrl () {
    return  API_BASE+menusApi.footerList;
}
