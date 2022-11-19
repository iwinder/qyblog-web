import {createApp, FunctionalComponent} from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import router from "./router";
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';
import Prism from 'prismjs';
//导入组件库
import * as antIcons from '@ant-design/icons-vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App);

VMdEditor.Codemirror = Codemirror;
VMdEditor.use(vuepressTheme, {
    Prism,

}).use(createLineNumbertPlugin());
const antIconsList: any = antIcons;
// 注册组件
for (const key in antIconsList) {
    app.component(key, antIconsList[key])
}


const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
// 添加到全局
app.config.globalProperties.qantIcons = antIcons;
app.use(Antd).use(router).use(pinia).use(VMdEditor).mount('#app')
