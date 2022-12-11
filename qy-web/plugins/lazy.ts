import Antd from "ant-design-vue";
import lazyPlugin from "vue3-lazy";
import {GetRandomDefImg} from "~/utils/util";



export default defineNuxtPlugin((nuxtApp) => {

    lazyPlugin.install( nuxtApp.vueApp, {
        loading: '/images/image-pending.gif',
        error: GetRandomDefImg(),
    })
})
