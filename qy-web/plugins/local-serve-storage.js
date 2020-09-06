 const LOCAL_KEY_SITE_GO_LINK  = "LOCAL_KEY_SITE_GO_LINK";
 const LocalServeStorage = {
    get: function (key) {
        let v = localStorage.getItem(key);
        if (v && typeof(v) !== "undefined" && v !== "undefined") {
            return JSON.parse(v);
        }
    },
    set: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    clearAll: function () {
        localStorage.clear();
    },
     /**
   *  保存登录Token
   * @param {*} token 
   */
    setSIteGoLink: function(token) {
        this. set(LOCAL_KEY_SITE_GO_LINK, token);
    },
    /**
     *  获取登录Token
     */
    getSIteGoLink: function() {
        return    this. get(LOCAL_KEY_SITE_GO_LINK) || {};
    },
    /**
     * 清除登录Token
     */
    removeSIteGoLink: function() {
        this. remove(LOCAL_KEY_SITE_GO_LINK);
    },
};

export default ({ app }, inject) => {
    // Set the function directly on the context.app object
    inject("LocalServeStorage",    ()=> {
        return LocalServeStorage;
    }  )
  
  }