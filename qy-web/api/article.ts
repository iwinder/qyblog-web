import {PageDto,PageStrDto} from "~/api/common";
import {API_PRE} from "~/utils/constants";
export interface ArticleDto {
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
    commentFlag?:boolean  ;
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
    tagsString?: string;
    tagColors?: string[];
    tags?:TagDto[];
    category?:CategoryDto,
    defImg?:string,
}
export interface ArticleDataDto {
    data: ArticleDto
}
export interface TagDto {
    name: string;
    identifier: string;
}
export interface TagDataDto {
    data: TagDto
}
export interface CategoryDto {
    name: string;
    identifier: string;
}
export interface CategoryDataDto {
    data: CategoryDto
}


export interface ArticleListDto {
    pageInfo: PageStrDto,
    items:ArticleDto[],
}


const articleName = API_PRE+"article";
const categoryName = API_PRE+"category";
const tagName = API_PRE+"tag";
const articleApi = {
    list: articleName,
    getOne: articleName+"/",
    getCategory: categoryName+"/",
    getTag: tagName+'/',
}

export function GetArticleListUrl () {
    return articleApi.list;
}
export function GetArticleOneUrl (name:string) {
    return articleApi.getOne+name;
}
export function GetArticleTagUrl (name:string) {
    return articleApi.getTag+name;
}
export function GetArticleCategoryUrl (name:string) {
    return  articleApi.getCategory+name;
}
