import {PageDto, PageStrDto} from "~/api/common";
import {API_PRE} from "~/utils/constants";


export interface CommentDto {
    id?:string,
    agentId?:string,
    memberName?:string,
    email?:string,
    url?:string,
    parentId?:string,
    content?:string,
    avatar?:string,
    createdAt?:string,
    parentUserName?:string,
}
export interface CommentPageDto extends PageDto {
    agentId?: string;
    rootId?: string;
}
export interface CommentListDto {
    pageInfo: PageStrDto,
    items:CommentDto[],
    count:number
}
const commentName = API_PRE+"comment";
const commentApi = {
    list: commentName,
}


export function GetCommentListUrl () {
    return commentApi.list;
}
export function GetCommentAddUrl () {
    return commentApi.list;
}
