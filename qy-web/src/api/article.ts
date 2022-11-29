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
    categoryIdentifier:string  ;
    commentAgentId?:string  ;
    published?:boolean  ;
    viewCount?:number  ;
    commentCount:number;
    likeCount?:number  ;
    hateCount?:number  ;
    content?:string  ;
    contentHtml?:string ;
    publishedAt?:string  ;
    publishedDateMD?:string;
    nickName?:string  ;
    tagStrings?: string[];
    tagColors?: string[];
    tags?:TagsType[];
    category?:CategoryType,
    defImg?:string,
    commentAgentFlag?:boolean,
}
export interface TagsType {
    name: string;
    identifier: string;
}
export interface CategoryType {
    name: string;
    identifier: string;
}
export interface ArticlePageInfo extends PageInfo {
    searchText?: string;
    categoryName?: string
    tagName?: string
}
const articleApi = {
    list: '/web/v1/article',
    getOne: '/web/v1/article/',
    getCategory: '/web/v1/category/',
    getTag: '/web/v1/tag/',
}
export function List (parameter:ArticlePageInfo) {
    return request.get(articleApi.list,{
        params: parameter
    })
}
export function GetOne (name:string) {
    return request.get(articleApi.getOne+name)
}
export function GetTag (name:string) {
    return request.get(articleApi.getTag+name)
}
export function GetCategory (name:string) {
    return request.get(articleApi.getCategory+name)
}