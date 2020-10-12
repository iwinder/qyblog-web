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
    'ant-design-vue/dist/antd.css',
    '@/assets/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/antd-ui',
    {src: '@/plugins/local-serve-storage', ssr: false},
    {src: '@/plugins/localStorage', ssr: false},
    '@/plugins/lru-cache',
    '@/plugins/qy-serve-tool',
    "@/plugins/qy-real-img",
    "@/plugins/qy-axios-cache",
    "@/plugins/vue-update-url",

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
    '@nuxtjs/axios',
    'nuxt-ssr-cache',
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  hooks: {
    'render:route': (url, result) => {
      // const $ = cheerio.load(result.html,{decodeEntities: false});
      //由于window.__nuxt__总是位于body中的第一个script中，
      //所以我移除了body中第一个脚本标签
      // console.log("this.doc(`body script`).", this.doc(`body script`));
      // let num = -1;
      // let leng = $(`body script`).length;
      // for(let i=0;i<leng;i++) {
      //   console.log("$(`body script`)[i]", $(`body script`)[i]);
      //   if($($(`body script`)[i]).text().indexOf("window.__NUXT__")>=0) {
      //     num = i;break;
      //   }
      // }
      // if(num>=0) {
      //   $($(`body script`)[num]).remove();
      
      //   // eq(0).remove();
      //   result.html = $.html()
      // }

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
        target: 'http://localhost:8000/api', // 代理地址
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

  },

  cache: {
    // if you're serving multiple host names (with differing
    // results) from the same server, set this option to true.
    // (cache keys will be prefixed by your host name)
    // if your server is behind a reverse-proxy, please use
    // express or whatever else that uses 'X-Forwarded-Host'
    // header field to provide req.hostname (actual host name)
    useHostPrefix: false,
    pages: [
      '/',
      // these are prefixes of pages that need to be cached
      // if you want to cache all pages, just include '/'
      // '/page1',
      // '/page2',

      // you can also pass a regular expression to test a path
      // /^\/page3\/\d+$/,

      // to cache only root route, use a regular expression
      // /^\/\w+((-)?\w+)+$/
    ],
    
    key(route, context) {
      // custom function to return cache key, when used previous
      // properties (useHostPrefix, pages) are ignored. return 
      // falsy value to bypass the cache
    },

    store: {
      type: 'redis',
      host: '121.36.247.59',
      port: 6380,
      auth_pass:"windadmin",
      ttl: 10 * 60,
      db: 0,
      configure: [
        // these values are configured
        // on redis upon initialization
        // ['maxmemory', '200mb'],
        ['maxmemory-policy', 'allkeys-lru'],
      ],
    },
  },
}
