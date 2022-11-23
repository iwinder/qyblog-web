import request from "@/utils/axios";

export interface SiteConfigDto {
    configKey:string,
    configValue: string,
}

const siteApi = {
    base: '/web/v1/siteConfig/base',
}
export function BaseINfo () {
    return request.get(siteApi.base)
}