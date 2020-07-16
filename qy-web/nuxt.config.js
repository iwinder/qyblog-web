
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
    '@/plugins/antd-ui'
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
