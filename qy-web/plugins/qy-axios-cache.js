 
import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'



export default function ({ $axios, redirect }) {
  // 请求中使用了useCache: true的话，会被缓存起来以便下次直接返回从而减少服务器压力
  let defaultAdapter = $axios.defaults.adapter
  let cacheCfg = new LRUCache({
    maxAge: 1000 * 10, //有效期10s
    max: 1000 // 最大缓存数量
  })
 console.log("dddddd defaultAdapter", defaultAdapter);
  $axios.defaults.adapter = cacheAdapterEnhancer(defaultAdapter, { enabledByDefault: false, cacheFlag: 'useCache', defaultCache: cacheCfg })
}

// 3. 在api请求时添加useCache标志即可，如在某个页面中
// export default {
//   asyncData ({app, params}) {
//     let id = params.id
//     return app.$axios.get(`RStar/getRStarDetail/?itemId=${id}`, {useCache: true}).then(res => {
//       return (res && res.data) || {}
//     })
//   }
// }