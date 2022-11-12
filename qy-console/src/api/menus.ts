import {PageInfo} from "@/api/common";
import request from "@/utils/axios";

export interface MenusAgentType {
  id?:string,
  name?: string;
  ftype?:string;
}

export interface MenusType {
  id?:string,
  name?: string;
  url?:string;
  blanked?:number;
  parentId?:string;
  targetId?:string;
  children?:MenusType[],
}

export interface MenusPageInfo extends PageInfo {
  name?: string;
  targetId?:string;
}
const agentApi = {
  list: '/admin/v1/menusAgent',
  add: '/admin/v1/menusAgent',
  delete: '/admin/v1/menusAgent',
  getOne: '/admin/v1/menusAgent/',
}
const menusApi = {
  list: '/admin/v1/menus',
  add: '/admin/v1/menus',
  delete: '/admin/v1/menus',
  getOne: '/admin/v1/menus/',
}

export function AgentList (parameter:PageInfo) {
  return request.get(agentApi.list,{
    params: parameter
  })
}


export function AgentAdd (parameter:MenusAgentType) {
  return request.post(agentApi.add,parameter)
}
export function AgentUpdate (parameter:MenusAgentType) {
  return request.put(agentApi.getOne+parameter.id,parameter)
}
export function AgentDelete (ids:string[]) {
  return request.delete(agentApi.delete,{
    data: {
      ids:ids
    }
  })
}

export function List (parameter:MenusPageInfo) {
  return request.get(menusApi.list,{
    params: parameter
  })
}


export function Add (parameter:MenusAgentType) {
  return request.post(menusApi.add,parameter)
}
export function Update (parameter:MenusAgentType) {
  return request.put(menusApi.getOne+parameter.id,parameter)
}
export function Delete (ids:string[]) {
  return request.delete(menusApi.delete,{
    data: {
      ids:ids
    }
  })
}