import axios from 'axios'
export const state = () => ({
    siteInfo: {

    }
  })
  
  export const mutations = {
    setSiteBase(state, siteBase) {
      state.siteInfo =  siteBase;
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
      // let  oldSiteInfo =    QyTool.getSiteInfoBase();
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