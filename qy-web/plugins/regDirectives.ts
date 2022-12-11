import VMdPreviewHtml from "@kangc/v-md-editor/lib/preview-html";
import directives from '@/plugins/directives/index' //自定义指令导入
export default defineNuxtPlugin((nuxtApp) => {

    nuxtApp.vueApp.use(directives)
})
