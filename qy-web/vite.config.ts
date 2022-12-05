import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";
import {prismjsPlugin} from "vite-plugin-prismjs";
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
    viteCommonjs(),
    prismjsPlugin({
      languages: ['json','java','go','javascript','jq','typescript','sql','bash','yaml'],
      plugins: ["line-numbers"], //配置显示行号插件
      theme: "solarizedlight", //主题名称
      css: true,
    }),
    Components({
      dts: 'src/auto-import.d.ts',
      // dirs: ['src/components'],
      extensions: ['vue', 'jsx', 'tsx', 'ts', 'js'],
      resolvers: [AntDesignVueResolver({
        importStyle: "less",
        importLess:true,
        // importStyle: 'css',
        // importCss:true ,
        // cjs:true,
      })],
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
        lessOptions: {
          javascriptEnabled: true
        },
      }
    },
  },
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000/api', // 接口基地址
        rewrite: path => {
          // console.log(path); // 打印[/api/userInfo] 这就是http-proxy要请求的url,我们基地址实际是没有/api 所以replace掉
          return path.replace(/^\/api/, '');
        }
      }
    },
  },
  build: {
    commonjsOptions: {
    }
  },
  ssr:{
  },
  optimizeDeps: {
    include: ['@kangc/v-md-editor/lib/theme/vuepress.js'],

    esbuildOptions: {
      plugins: [
      ],
    },
  },
})
