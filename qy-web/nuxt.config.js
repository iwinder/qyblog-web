const cheerio = require('cheerio');
export default {
  debug:false,
  dev:false, 
  server: {
    port: 4001, // default: 3000
   host: '0.0.0.0' // default: localhost
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
      { "http-equiv": "X-UA-Compatible", content: "IE=edge,chrome=1" },
      { name: "format-detection", content: "telephone=no" },
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
    // 'ant-design-vue/dist/antd.css',
    '@/assets/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/antd-ui',
    // {src: '@/plugins/local-serve-storage', ssr: false},
    // {src: '@/plugins/localStorage', ssr: false},
    // '@/plugins/lru-cache',
    '@/plugins/qy-serve-tool',
    "@/plugins/qy-real-img",
    "@/plugins/qy-axios-cache",
    {src: '@/plugins/vueLazyLoad', ssr: true }, 
    { src: '@/plugins/vue-highlight', ssr: false }, 
  ],
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },
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
    analyze: true,
    telemetry:false,
    transpile: ['ant-design-vue'],
    babel: {
      plugins: [
        ['import',{
            libraryName: 'ant-design-vue',
            libraryDirectory: 'es',
            style: true,
          }]
      ]
    },
    module:{
    },
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    },
    extend(config, ctx) {
      const path = require('path');
      config.resolve.alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './assets/icons/antd-icon.js') // 引入需要的
    }
  },
  // hooks: {
  //   'render:route': (url, result) => {
  //     // const $ = cheerio.load(result.html,{decodeEntities: false});
  //     //由于window.__nuxt__总是位于body中的第一个script中，
  //     //所以我移除了body中第一个脚本标签
  //     // console.log("this.doc(`body script`).", this.doc(`body script`));
  //     // let num = -1;
  //     // let leng = $(`body script`).length;
  //     // for(let i=0;i<leng;i++) {
  //     //   console.log("$(`body script`)[i]", $(`body script`)[i]);
  //     //   if($($(`body script`)[i]).text().indexOf("window.__NUXT__")>=0) {
  //     //     num = i;break;
  //     //   }
  //     // }
  //     // if(num>=0) {
  //     //   $($(`body script`)[num]).remove();
      
  //     //   // eq(0).remove();
  //     //   result.html = $.html()
  //     // }

  //   }
  // },
  axios: {
    // baseURL: 'http://localhost:8000/api/admin',
    // or other axios configs.
    proxy: true,
    prefix: '/api/',
    withCredentials: true,
    
  },

  proxy: {
    '/api': {
        target: 'http://localhost:8000/api', // 代理地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', //将 /api 替换掉
        },
    },
  '/qy-content':{
      target: 'http://localhost:8000/qy-content', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/qy-content': '', //将 /api 替换掉
      },
    },

  },


}
