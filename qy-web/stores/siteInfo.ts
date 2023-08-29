import { defineStore } from 'pinia'
import {SiteConfigDto} from "~/api/site_config";
// @ts-ignore
export const useSiteInfo = defineStore('webSiteInfo', {
    state: () => {
        return {
            siteInfoMap: [] as SiteConfigDto[],
        }
    },
    actions: {
        InitSiteInfoMap(items:SiteConfigDto[]) {
            this.siteInfoMap =items;
        },
        AddSiteInfoMap(items:SiteConfigDto[]) {
            this.siteInfoMap = this.siteInfoMap.concat(items);
        },
        GetSiteInfoByKey(key:string)  {
            const len = this.siteInfoMap.length;
            for (let i=0;i<len;i++) {
                if (this.siteInfoMap[i].configKey == key) {
                    // @ts-ignore
                    return  this.siteInfoMap[i].configValue;
                }
            }
            return "-1"
        },
        HasSiteInfo() {
            // @ts-ignore
            return this.siteInfoMap&&this.siteInfoMap.length>0&&this.siteInfoMap[0]!=null;
        }
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
