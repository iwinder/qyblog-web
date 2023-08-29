

export interface PageDto {
    current: number,
    pageSize: number,
    total?: number,
    pages?: number,
    firstFlag?: boolean,
    lastFlag?: boolean,
}

export interface PageStrDto {
    current: string,
    pageSize: string,
    total: string,
    pages: string,
    firstFlag?: boolean,
    lastFlag?: boolean,
}
