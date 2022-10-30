import {LoginReqForm} from "@/api/login";

export interface PageInfo {
    current?: number,
    pageSize?: number,
    total?: number,
    pages?: number,
    firstFlag?: boolean,
    LastFlag?: boolean,
}

