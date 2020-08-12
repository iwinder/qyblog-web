import Vue from 'vue'
import LRU from 'lru-cache'

const lcache = new LRU({
    // 缓存队列长度
    max: 0,
    // 缓存有效期
    maxAge: 60000
  })
  let num = 1;
const LruCache = { 
    get: function (key) {
        let result = lcache.get(key)
     
        if (result) {
          return JSON.parse(result)
        }
     
        return null
      },
      set: function (key, value,maxAge) {
        if (value) {
            if(maxAge) {
                lcache.set(key, JSON.stringify(value), maxAge);
            } else {
                lcache.set(key, JSON.stringify(value))
            }
          return true
        }
        return false
      }, 
  }


  export default ({ app }, inject) => {
    // Set the function directly on the context.app object
    inject("LruCache",    ()=> {
      num++;
      console.log("~~~~~~num", num);
        return LruCache;
    }  )

  }
  
// Vue.use(LruCache)