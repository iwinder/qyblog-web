import axios from 'axios'
export const state = () => ({
    siteInfo: {

    },
    siteGo: {

    },
    siteIndexLink: {

    }, 
    siteNotIndexLink: {

    }
  })
  
  export const getters = {
    getSiteGoUrl: (state) => (key) => {
      // console.log("getSiteGoUrl siteGo", state, state.siteInfo, state.siteGo);
      //  console.log("getSiteGoUrl key", key);
      return state.siteGo[key];
      // let _this  =  this; 
      // console.log("getters getSiteGoUrl", _this);
      // let url  = "";
      // if(_this.$QyServeTool().isEmpty(key)) {
      //   return ;
      // } 
      // url = _this.$state.siteGo[key];
      // console.log("url", url);
    }
  }
  export const mutations = {
    setSiteBase(state, siteBase) {
      state.siteInfo =  siteBase;
      let _this  = this; 
      _this.$LruCache().set("qy_siteInfo",state.siteInfo );      
    },
    setSiteGo(state, siteGoBase) {
      state.siteGo =  siteGoBase;
      let _this  = this; 
      _this.$LruCache().set("qy_siteGo",state.siteGo );     
      _this.$LocalServeStorage().setSIteGoLink(state.siteGo);   
    },
    setSiteIndexLink(state, data) {
        state.siteIndexLink =  data;
        let _this  = this; 
        _this.$LruCache().set("qy_siteIndexLink",state.siteIndexLink );     
    },
    setSiteNotIndexLink(state, data) {
      state.siteNotIndexLink =  data;
      let _this  = this; 
      _this.$LruCache().set("qy_siteNotIndexLink",state.siteNotIndexLink );     
      }
  }

  export const actions = {
    async getSiteInfo({state,commit}, val) {
      let _this  =  this; 
      if (  _this.$QyServeTool().isEmpty(state.siteInfo) ) {
        let  siteInfo =   _this.$LruCache().get("qy_siteInfo"); 
        if ( _this.$QyServeTool().isEmpty(siteInfo)) {  
            siteInfo  =  await     _this.$axios.get('/siteInfo/all').then(res => {
            let resp  = res.data;	
              if(resp.success) {  
                console.log("resp.content",  resp.content);
                return resp.content;
              }
          })
          if (siteInfo && !siteInfo.header ) {
            let menus = await _this.$axios.get('/siteInfo/menus').then(res => {
              let resp  = res.data;	
                if(resp.success) { 
                  return resp.content;
                }
            })
            siteInfo.header =  menus.header;
            siteInfo.footer =  menus.footer;
          } else {
            siteInfo.header = JSON.parse(siteInfo.header);
            siteInfo.footer = JSON.parse(siteInfo.footer );
          }
          commit('setSiteBase',  siteInfo);
        }
      } 
     console.log("state", state, this)
     _this.dispatch("siteInfo/getSiteIndexLink");
    },
    async getSiteGo({state, commit}, val)  {
      let _this  =  this;
      if (  _this.$QyServeTool().isEmpty(state.siteGo) ) { 
        let  siteGo=   _this.$LruCache().get("qy_siteGo"); 
        if(_this.$QyServeTool().isEmpty(siteGo)) {
            siteGo =   await     _this.$axios.get('/siteInfo/shortLinks').then(res => {
              let resp  = res.data;	
                if(resp.success) {  
                console.log("resp.content",  resp.content);
                  return resp.content;
                }
            }); 
      }
      commit('setSiteGo',  siteGo);
    } 
  },
  async getSiteIndexLink({state, commit}, val)  {
    let _this  =  this;
    if (  _this.$QyServeTool().isEmpty(state.siteIndexLink) ) { 
      let  siteIndexLink=   _this.$LruCache().get("qy_siteIndexLink"); 
      if(_this.$QyServeTool().isEmpty(siteIndexLink)) {
        siteIndexLink =   await     _this.$axios.get('/siteInfo/indexlinks').then(res => {
            let resp  = res.data;	
              if(resp.success) {  
              console.log("resp.content",  resp.content);
                return resp.content;
              }
          }); 
    }
    commit('setSiteIndexLink',  siteIndexLink);
  } 
}
};