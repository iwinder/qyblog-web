import {API_PRE} from "~/utils/constants";

export interface MenusDto {
    id:string,
    name: string;
    url:string;
    blanked:number;
    children:MenusDto[],
}
export interface MenusListDto {
    items:MenusDto[];
}

const menusName = API_PRE+"menus";
const menusApi = {
    headList: menusName + "/header",
    footerList: menusName + "/footer",
}

export function GetHeadListUrl () {
    return menusApi.headList;
}
export function GetFooterListUrl () {
    return menusApi.footerList;
}
