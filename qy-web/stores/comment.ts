import { defineStore } from 'pinia'
// @ts-ignore
export const useCommentInfo = defineStore('webComment', {
    state: () => {
        return {
            userInfo: {
                memberName:"",
                email:"",
                url:"",
                authotImg:"",
            },
        }
    },
    actions: {

    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'auth',
                // 此处 如果 在nuxt3中直接使用 localStorage 或 sessionStorage 会报一个错
                storage: process.client ? sessionStorage : undefined,
            }
        ]
    }
})
