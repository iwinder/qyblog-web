import request from "@/utils/axios";

export interface MenusDto {
    id:string,
    name: string;
    url:string;
    blanked:number;
    parentId:string;
    children:MenusDto[],
}

const menusApi = {
    headList: '/web/v1/menus/head',
    footerList: '/web/v1/menus/footer',
}

export function HeadList () {
    return request.get(menusApi.headList)
}

export function FooterList () {
    return request.get(menusApi.footerList)
}