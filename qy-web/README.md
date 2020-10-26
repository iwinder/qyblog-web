# qy-web

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

```
npm i -S vuex-persistedstate
npm install js-cookie --save
npm install --save js-md5

npm install nuxt-ssr-cache -save
```

```
pm2 start npm --name "qy-web" -- run start
pm2 delete qy-web
pm2 stop qy-web
$ pm2 logs                      # 显示所有应用程序的日志

$ pm2 logs [app-name]           # 显示指定应用程序的日志
```