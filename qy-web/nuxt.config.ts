// https://nuxt.com/docs/api/configuration/nuxt-config
import defHeadConfig from "./assets/config/defHead";

export default defineNuxtConfig({
    runtimeConfig: {
        API_BASE: '/api',
        BACKEND_URL: 'http://localhost:3000',
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
    // 代理服务器
    nitro: {
        dev:true,
        // baseURL:"/api",

        devProxy: {
            '/api': {
                target: 'http://localhost:8000/api/',
                changeOrigin: true
            }
        }
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
