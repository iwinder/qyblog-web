import request from "@/utils/axios";
import {ArticlePageInfo} from "@/api/article";
import {PageInfo} from "@/api/common";

const commentApi = {
    list: '/web/v1/comment',
    add: '/web/v1/comment',
}
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
export interface CommentPageInfo extends PageInfo {
    agentId?: string;
    rootId?: string;
}

export function List (parameter:CommentPageInfo) {
    return request.get(commentApi.list,{
        params: parameter
    })
}

export function Add (parameter:CommentDto) {
    return request.post(commentApi.add,parameter)
}