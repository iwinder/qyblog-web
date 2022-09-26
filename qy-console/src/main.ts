import {createApp, FunctionalComponent} from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import router from "./router";
//导入组件库
import * as antIcons from '@ant-design/icons-vue';
import { createPinia } from 'pinia';

const app = createApp(App);

const antIconsList: any = antIcons;
// 注册组件
for (const key in antIconsList) {
    app.component(key, antIconsList[key])
}


const pinia = createPinia();

// 添加到全局
app.config.globalProperties.qantIcons = antIcons;
app.use(Antd).use(router).use(pinia).mount('#app')
