import { defineStore } from 'pinia'
import {tabsKeyMap} from "@/config/tabs.config";
import {UserType} from "@/api/user";
import {MenusAdminType} from "@/api/menus_admin";
import {SiteConfigType} from "@/api/site_config";
export const useSiteInfo = defineStore('adminSiteInfo', {
    state: () => {
        return {
            siteInfoMap: [] as SiteConfigType[]
        }
    },
    actions: {
        InitSiteInfoMap(items:SiteConfigType[]) {
            this.siteInfoMap =items;
        },
        GetSiteInfoByKey(key:string)  {
            const len = this.siteInfoMap.length;
            for (let i=0;i<len;i++) {
                if (this.siteInfoMap[i].configKey == key) {
                    return  this.siteInfoMap[i].configValue;
                }
            }
        },
        HasSiteInfo() {
            return this.siteInfoMap&&this.siteInfoMap.length>0;
        }
    },
    persist: {
        // 修改存储中使用的键名称，默认为当前 Store的 id
        // key: 'storekey',
        // 修改为 sessionStorage，默认为 localStorage
        storage: window.sessionStorage,
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        // paths: ['nested.data'],
    },

})
