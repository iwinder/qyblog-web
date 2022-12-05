import request from "@/utils/axios";
import {PageInfo} from "@/api/common";
import {TagsType} from "@/api/tags";

const articleApi = {
    list: '/admin/v1/article',
    add: '/admin/v1/article',
    update: '/admin/v1/article',
    delete: '/admin/v1/article',
    getOne: '/admin/v1/article/',
    initPermaLink: '/admin/v1/article/initPermaLink',
    changePassword: '/admin/v1/article-password',
}

export interface ArticleType {
    id:string;
    title?:string;
    permaLink?:string;
    canonicalLink?:string;
    summary?: string ;
    thumbnail?:string ;
    password?:string ;
    statusFlag?:number ;
    atype?:number   ;
    authorId?:string  ;
    categoryId?:string  ;
    categoryName?:string  ;
    commentAgentId?:string  ;
    commentFlag?:boolean  ;
    published?:boolean  ;
    viewCount?:number  ;
    likeCount?:number  ;
    hateCount?:number  ;
    content?:string  ;
    contentHtml?:string ;
    publishedAt?:string  ;
    nickName?:string  ;
    tagStrings?: string[];
    tagColors?: string[];
    tags?:TagsType[];
}


export interface ArticlePageInfo extends PageInfo {
    searchText?: string;
    atype?: number;
}

export function List (parameter:ArticlePageInfo) {
    return request.get(articleApi.list,{
        params: parameter
    })
}

export function Add (parameter:ArticleType) {
    return request.post(articleApi.add,parameter)
}
export function Update (id:string,parameter:ArticleType) {
    return request.put(articleApi.getOne+id,parameter)
}
export function Delete (ids:string[]) {
    return request.delete(articleApi.delete,{
        data: {
            ids:ids
        }
    })
}
export function GetOne (id:string) {
    return request.get(articleApi.getOne+id)
}
export function InitPermaLink (str:string) {
    return request.post(articleApi.initPermaLink, {title:str})
}