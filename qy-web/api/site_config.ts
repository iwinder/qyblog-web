import {API_PRE} from "~/utils/constants";

export interface SiteConfigDto {
    configKey:string,
    configValue: string,
}
export interface SiteConfigListDto {
    items:SiteConfigDto[];
}
export interface SiteInfoDto {
    site_name?: string,
    site_key?:string,
    site_description?: string,
    site_icon?: string,
    site_url  ?: string,
    site_open_date?: string,
    site_beian ?: string,
    site_comment_flag?: string,
    site_foot_code?: string,
    site_logo?: string,
    site_small_logo?: string,
    site_home_undisplay_cats?: string,
    site_head_code?: string,
    site_sider_code?: string,
    site_desc?: string,
    site_qq?: string,
    site_qq_group?: string,
    site_weibo?: string,
    site_weixin_qr?: string,
    site_mailme_id?: string,
    site_pay_flag?: string,
    site_weixin_pay_qr?: string,
    site_alipay_pay_qr?: string,
}

const siteName = API_PRE+"siteConfig";
const siteApi = {
    base: siteName + "/base",
    other: siteName + "/other",
}

export function GetBaseUrl () {
    return siteApi.base
}
export function GetOhterUrl () {
    return  siteApi.other
}
