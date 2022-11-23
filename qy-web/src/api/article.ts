import {PageInfo} from "@/api/common";
import request from "@/utils/axios";

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
export interface TagsType {
    id:string,
    name: string;
    identifier: string;
}

export interface ArticlePageInfo extends PageInfo {
    searchText?: string;
}
const articleApi = {
    list: '/admin/v1/article',
    getOne: '/admin/v1/article/',
}
export function List (parameter:ArticlePageInfo) {
    return request.get(articleApi.list,{
        params: parameter
    })
}
export function GetOne (name:string) {
    return request.get(articleApi.getOne+name)
}