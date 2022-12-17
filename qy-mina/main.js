
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';
// 引入使用主题的样式
import '@kangc/v-md-editor/lib/theme/style/vuepress';

Vue.config.productionTip = false 

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.use(VMdPreviewHtml);
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
// import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
// import '@kangc/v-md-editor/lib/style/preview-html.css';
// 引入使用主题的样式
// import '@kangc/v-md-editor/lib/theme/style/vuepress';
export function createApp() {
  const app = createSSRApp(App)
  // app.use(VMdPreviewHtml);
  return {
    app
  }
}
// #endif