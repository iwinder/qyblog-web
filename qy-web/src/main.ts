import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import {createPinia} from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';
// 引入使用主题的样式
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import VueLazyLoad from 'vue3-lazyload'
import router from "@/router";
import {GetRandomDefImg} from "@/utils/util";
import directives from '@/directives/index' //自定义指令导入
const app = createApp(App);



const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
// 添加到全局
app.use(Antd).use(VueLazyLoad,{
    loading: '/images/image-pending.gif',
    error: GetRandomDefImg,
}).use(router).use(directives).use(pinia).use(VMdPreviewHtml).mount('#app')