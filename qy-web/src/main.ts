import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import {createPinia} from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';
import router from "@/router";
const app = createApp(App);



const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
// 添加到全局
app.use(Antd).use(router).use(pinia).use(VMdPreviewHtml).mount('#app')