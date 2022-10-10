import { defineStore } from 'pinia'
import {FileLibType} from "@/api/file_lib_config";
export const useParamsStore = defineStore('paramsStore', {
    state: () => {
        return {
            menusParentId: "0",
            apisTabsActiveKey: "1",
            fileLibType:{} as FileLibType
        }
    },
    actions: {

    }
})

