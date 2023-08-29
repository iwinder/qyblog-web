import { defineStore } from 'pinia'
import {MenusDto} from "~/api/menus";
// @ts-ignore
export const useMenusInfo = defineStore('webMenusInfo', {
    state: () => {
        return {
            headerMenus: [] as MenusDto[],
            footerMenus: [] as MenusDto[]
        }
    },
    actions: {

    },
    persist: {
        // 修改存储中使用的键名称，默认为当前 Store的 id
        // key: 'storekey',
        // 修改为 sessionStorage，默认为 localStorage
        enabled:true,
        strategies:[{ storage: process.client ? sessionStorage : undefined}]
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        // paths: ['nested.data'],
    },

})
