import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import {prismjsPlugin} from "vite-plugin-prismjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
    prismjsPlugin({
        languages: ['json','java','go','javascript','jq','typescript','sql','bash','yaml'],
        plugins: ["line-numbers"], //配置显示行号插件
        theme: "solarizedlight", //主题名称
        css: true,
      }),
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@':  resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    },
  },
  base: '/qycms/',
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/api', // 接口基地址
        rewrite: path => {
         // console.log(path); // 打印[/api/userInfo] 这就是http-proxy要请求的url,我们基地址实际是没有/api 所以replace掉
          return path.replace(/^\/api/, '');
        }
      }
    },
  },
  optimizeDeps: {
    include: ['@kangc/v-md-editor/lib/theme/vuepress.js'],
  },
})
