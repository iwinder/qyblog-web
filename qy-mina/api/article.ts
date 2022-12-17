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
    tags?:TagsDto[];
    category?:CategoryDto,
    defImg?:string,
}

export interface TagsDto {
    name: string;
    identifier: string;
}
export interface CategoryDto {
    name: string;
    identifier: string;
}