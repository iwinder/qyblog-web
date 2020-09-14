import createPersistedState from 'vuex-persistedstate';
import * as Cookies from "js-cookie";
import  { Base64 } from 'js-base64'

// import SecureLS from "secure-ls";
// var ls = new SecureLS({ isCompression: false,encryptionSecret:"dsodi" });

let cookieStorage = {
  getItem: function(key) { 
    let value =  null;
    if(key =='vuex') {
      let oldVal = Cookies.get(key);
      if(oldVal!=null && oldVal != '') {
        value =  JSON.parse(Base64.decode( oldVal));
      }
      value = null;
    } else {
      value = Cookies.getJSON(key);
    }
    return value;
  },
  setItem: function(key, value) { 
     let val = value;
     if(key =='vuex') { 
         val = Base64.encode( JSON.stringify(value),true)
     }
    return Cookies.set(key,val, {expires: 3, secure: false});
  },
  removeItem: function(key) {
    return Cookies.remove(key);
  }
};

export default (context) => {
  createPersistedState({
    storage: cookieStorage,
    getState: cookieStorage.getItem,
    setState: cookieStorage.setItem
    // storage: {
    //   getItem: (key) => ls.get(key),
    //   setItem: (key, value) => ls.set(key, value),
    //   removeItem: (key) => ls.remove(key),
    // },
  })(context.store);
};

