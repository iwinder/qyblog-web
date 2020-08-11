import axios from 'axios'
export const state = () => ({
    siteInfo: {

    }
  })
  
  export const mutations = {
    setSiteBase(state, siteBase) {
      state.siteInfo =  siteBase;
      let _this  = this;
      console.log("state.siteInfo ", state.siteInfo );
      _this.$LruCache().set("qy_siteInfo",state.siteInfo );    
      // QyTool.setSiteInfoBase( state.siteBase);
    //   state.list.push({
    //     siteBase: {},
    //     done: false
    //   })
    },
    remove(state, { todo }) {
    //   state.list.splice(state.list.indexOf(todo), 1)
    },
    toggle(state, todo) {
    //   todo.done = !todo.done
    }
  }

  export const actions = {
    async getSiteInfo({state, commit}, val) {
      console.log("siteInfo/",state);
      let _this  =  this;
      // _this.$LruCache().set("qy_siteInfo", null);
      let  siteInfo =   _this.$LruCache().get("qy_siteInfo");
      if (!siteInfo) {
        console.log("!siteInfo", siteInfo);
          siteInfo  =  await     _this.$axios.get('/siteInfo/all').then(res => {
           let resp  = res.data;	
             if(resp.success) { 
              //  commit('setSiteBase',  resp.content);
              console.log("resp.content",  resp.content);
               return resp.content;
             }
         })
         if (siteInfo && !siteInfo.header ) {
          console.log("menus.content", siteInfo); 
           let menus = await _this.$axios.get('/siteInfo/menus').then(res => {
            let resp  = res.data;	
              if(resp.success) { 
               //  commit('setSiteBase',  resp.content);
               console.log("menus.content",  resp.content); 
                return resp.content;
              }
          })
          console.log("menus.content 22",  menus); 
          siteInfo.header =  menus.header;
          siteInfo.footer =  menus.footer;
         } else {
          siteInfo.header = JSON.parse(siteInfo.header);
          siteInfo.footer = JSON.parse(siteInfo.footer );
         }

         console.log("resp. new  siteInfo", siteInfo);
      }
      commit('setSiteBase',  siteInfo);
      // if(QyTool.isEmpty(oldSiteInfo)) {
        // let newSiteInfo =    await   new Promise((resolve, reject) => {
        //   axios.get('/siteInfo/all').then(res => {
        //     let resp  = res.data;	
        //       if(resp.success) { 
        //         commit('setSiteBase',  resp.content);
        //          return resp.content;
        //       }
        //   });
        // })
        // return newSiteInfo;
      // }
      // return oldSiteInfo;
   
        // return res;

    //         initSiteBase({ commit, state  }) {
    //   let _this = this;

    //       axios.get('/web/siteInfo/all' ).then(res => {
    //          let resp  = res.data				
    //          if(resp.success) {
    //           QyTool.refreshSiteInfoBase(resp.content);
    //           commit('setSiteBase', resp.content);
    //           commit('setSiteBaseFalg',  true);
    //           //  _this.initIco( _this.site .site_icon);
    //          }
    //        });
    // }
 
    }
   };