import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import router from "./router";


createApp(App).use(Antd).use(router).mount('#app')
