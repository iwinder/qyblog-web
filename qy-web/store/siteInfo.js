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
      return state.siteGo[key];
    },
    getIndexLink:  (state) => (key) => {
      return state.siteIndexLink;
    },
  }
  export const mutations = {
    setSiteBase(state, siteBase) {
      state.siteInfo =  siteBase;      
    },
    setSiteGo(state, siteGoBase) {
      state.siteGo =  siteGoBase;
    },
    setSiteIndexLink(state, data) {
        state.siteIndexLink =  data;
    },
    setSiteNotIndexLink(state, data) {
      state.siteNotIndexLink =  data;   
      }
  }

  export const actions = {
    async getSiteInfo({state,commit}, val) {
      let _this  =  this;  
        let  siteInfo =    {}; 
          try{ 
              siteInfo  =  await     _this.$axios.get('/web/siteInfo/all',{useCache: true}).then(res => {
              if(!res|| !res.data) {
                _this.error({ statusCode: 500, message: res});
              } 
              let resp  = res.data;	
                if(resp.success) {  
                  return resp.content;
                } else {
                    if(resp.code == '404') {
                      _this.error({ statusCode: 404, message: resp.message});
                    } else  {
                        _this.error({ statusCode: 500, message: resp.message});
                    }
                }
            })
         } catch (error) {
            // if(error.status == 404)  {
            //     _this.error({ statusCode: 404, message: error.message});
            // } else {
            //    error({ statusCode: 500, message: error.message});
            // }
          }
          if (siteInfo && !siteInfo.header ) {
            let menus ={};
            try{ 
            menus  = await _this.$axios.get('/web/siteInfo/menus').then(res => {
              let resp  = res.data;	
                if(resp.success) { 
                  return resp.content;
                } else {
                  if(resp.code == '404') {
                    _this.error({ statusCode: 404, message: resp.message});
                  } else  {
                      _this.error({ statusCode: 500, message: resp.message});
                  }
                }
            })
            siteInfo.header =  menus.header;
            siteInfo.footer =  menus.footer; 
           } catch (error) {
              if(error.status == 404)  {
                  _this.error({ statusCode: 404, message: error.message});
              } else {
                  _this.error({ statusCode: 500, message: error.message});
              }
            }
          } 
          else {
            if ((typeof siteInfo.header == 'string')) {
              siteInfo.header = JSON.parse(siteInfo.header);
              siteInfo.footer = JSON.parse(siteInfo.footer );
            }
           
          }
          commit('setSiteBase',  siteInfo); 
    
    },
    async getSiteGo({state, commit}, val)  {
      let _this  =  this; 
          let  siteGo =   await     _this.$axios.get('/web/siteInfo/shortLinks').then(res => {
              let resp  = res.data;	
                if(resp.success) {  
                  return resp.content;
                } else {
                  if(resp.code == '404') {
                    _this.error({ statusCode: 404, message: resp.message});
                  } else  {
                      _this.error({ statusCode: 500, message: resp.message});
                  }
                }
            });  
      commit('setSiteGo',  siteGo); 
  },
  async getSiteIndexLink({state, commit}, val)  {
    let _this  =  this;
    let  siteIndexLink=  {}; 
    siteIndexLink =   await     _this.$axios.get('/web/siteInfo/indexlinks').then(res => {
        let resp  = res.data;	
          if(resp.success) {  
            return resp.content;
          } else {
            if(resp.code == '404') {
              _this.error({ statusCode: 404, message: resp.message});
            } else  {
                _this.error({ statusCode: 500, message: resp.message});
            }
          }
      });  
    commit('setSiteIndexLink',  siteIndexLink); 
  }
};