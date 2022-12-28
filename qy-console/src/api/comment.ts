import {TagsType} from "@/api/tags";
import {PageInfo} from "@/api/common";
import request from "@/utils/axios";

const commentApi = {
    list: '/admin/v1/comment',
    add: '/admin/v1/comment',
    update: '/admin/v1/comment',
    delete: '/admin/v1/comment',
    getOne: '/admin/v1/comment/',
    updateState: '/admin/v1/comment/state',
    total: '/admin/v1/comment/total',
    comment: '/admin/v1/comment/comment',
}

export interface CommentType {
    id?:string,
    statusFlag?:number,
    agentId?:string,
    memberId?:string,
    atMemberIds?:string,
    agent?:string,
    memberName?:string,
    ip?:string,
    email?:string,
    url?:string,
    rootId?:string,
    parentId?:string,
    content?:string,
    meta?:string,
    parentUserName?:string,
    objTitle?:string,
    objLink?:string,
    avatar?:string,
    createdAt?:string,
}

export interface UpdateCommentStateType {
    ids:string[],
    statusFlag:number,
}

export interface CommentPageInfo extends PageInfo {
    searchText?: string;
    statusFlag?: number;
}

export function List (parameter:CommentPageInfo) {
    return request.get(commentApi.list,{
        params: parameter
    })
}

export function Add (parameter:CommentType) {
    return request.post(commentApi.add,parameter)
}
export function Update (id:string,parameter:CommentType) {
    return request.put(commentApi.getOne+id,parameter)
}
export function Comment (parameter:CommentType) {
    return request.put(commentApi.comment,parameter)
}
export function UpdateState (parameter:UpdateCommentStateType) {
    return request.post(commentApi.updateState,parameter)
}
export function Total () {
    return request.get(commentApi.total)
}

export function Delete (ids:string[]) {
    return request.delete(commentApi.delete,{
        data: {
            ids:ids
        }
    })
}
