import {PageInfo} from "@/api/common";

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