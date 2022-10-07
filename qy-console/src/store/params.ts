import { defineStore } from 'pinia'
export const useParamsStore = defineStore('paramsStore', {
    state: () => {
        return {
            menusParentId: "0",
            apisTabsActiveKey: "1",
        }
    },
    actions: {

    }
})

