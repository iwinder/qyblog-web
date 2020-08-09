const cheerio = require('cheerio');
export default {
  server: {
    port: 4001, // default: 3000
  //  host: '0.0.0.0' // default: localhost
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },  
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src:'/js/local-storage.js'},
      { src:'/js/session-storage.js'},
      { src:'/js/qy-tool.js'},
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css',
    '@/assets/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/antd-ui',
    { src: '@/plugins/vue-highlight', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  hooks: {
    'render:route': (url, result) => {
      this.doc = cheerio.load(result.html,{decodeEntities: false});
      //由于window.__nuxt__总是位于body中的第一个script中，
      //所以我移除了body中第一个脚本标签
      this.doc(`body script`).eq(0).remove();
      result.html = this.doc.html()
    }
  },
  axios: {
    // baseURL: 'http://localhost:8000/api/admin',
    // or other axios configs.
    proxy: true,
    prefix: '/api/',
    withCredentials: true,
    
  },

  proxy: {
    '/api': {
        target: 'http://localhost:8000/api/web/', // 代理地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', //将 /api 替换掉
        },
    },
  '/content':{
      target: 'http://localhost:8000/content', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/content': '', //将 /api 替换掉
      },
    },

  }
}
