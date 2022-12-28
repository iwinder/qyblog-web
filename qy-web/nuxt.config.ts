// https://nuxt.com/docs/api/configuration/nuxt-config
import defHeadConfig from "./assets/config/defHead";

export default defineNuxtConfig({
    runtimeConfig: {
        API_BASE: '/api',
        BACKEND_URL: 'http://127.0.0.1:8000',
    },
    router:{

    },
    // 引入ant-design-vue样式
    css: ['ant-design-vue/dist/antd.css',"@kangc/v-md-editor/lib/style/preview-html.css",'@kangc/v-md-editor/lib/theme/style/vuepress.css'],
    // 插件方式引入ant-design-vue组件
    plugins: ["@/plugins/antd","@/plugins/previewHtml","@/plugins/regDirectives"],
    modules: [
        '@pinia/nuxt',

    ],
    vite: {
        base: './',
        // server: {
        //     proxy: {
        //       '/api': {
        //         target: 'http://localhost:7080/api', // 接口基地址
        //         rewrite: path => {
        //          // console.log(path); // 打印[/api/userInfo] 这就是http-proxy要请求的url,我们基地址实际是没有/api 所以replace掉
        //           return path.replace(/^\/api/, '');
        //         }
        //       }
        //     },
        // },

    },
    // 代理服务器
    nitro: {
        // dev:false,
        // baseURL:"http://127.0.0.1",

        // devProxy: {
        //     '/api': {
        //         target: 'http://127.0.0.1:7080/api/',
        //         changeOrigin: true
        //     }
        // }
    },
    app: {
        head: {
            charset: 'utf-16',
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
            title: defHeadConfig.title,
            meta: [
                { name: 'content-type', content: 'text/html;charset=utf-8' },
                { name: 'keywords', content:  defHeadConfig.keywords},
                { name: 'description', content:  defHeadConfig.description},
                { ['http-equiv']: 'x-ua-compatible', content: 'ie=edge,chrome=1' },
                { name: 'baidu-site-verification', content: '' },
                { property: 'og:title', content: defHeadConfig.title },
                { property: 'og:keywords', content: defHeadConfig.keywords },
                { property: 'og:description', content: defHeadConfig.description },
            ],
        }
    }
})
