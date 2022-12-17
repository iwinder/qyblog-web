import request from "@/utils/axios";
import {ApisType} from "@/api/apis";

const homeApi = {
    updateContentCount: '/admin/v1/jobs/updateContentCount',
    generatorMap: '/admin/v1/jobs/generatorMap',
    updateAllArticleCount: '/admin/v1/jobs/updateAllPostsCount',
    emailToNotSend: '/admin/v1/jobs/emailToNotSend',
}


export function UpdateContentCount () {
    return request.post(homeApi.updateContentCount)
}

export function GeneratorMap () {
    return request.post(homeApi.generatorMap)
}
export function UpdateAllArticleCount () {
    return request.post(homeApi.updateAllArticleCount)
}
export function EmailToNotSend () {
    return request.post(homeApi.emailToNotSend)
}
