import axios from 'axios'
// initial state
const state = () => ({
    siteBase: {
        site_beian: "",
        site_description: "这是一个springboot的博客",
        site_icon: "https://windcoder.com/wp-content/uploads/2015/08/favicon-1.gif",
        site_key: "Java,Web",
        site_logo: "https://windcoder.com/wp-content/uploads/2017/02/logo_vift.png",
        site_name: "博客",
        site_open_date: "2013-07-17",
        site_small_logo: "https://windcoder.com/wp-content/uploads/2017/02/logo_vif_small.png",
        site_url: "",
    },
    siteBaseFalg: false
  })
  
  // getters
  const getters = {
    getSiteBase({ state, commit, rootState }) {
      return state.siteBase;
    }
  }
  
  // actions
  const actions = {
    initSiteBase({ commit, state  }) {
      let _this = this;

          axios.get('/web/siteInfo/all' ).then(res => {
             let resp  = res.data				
             if(resp.success) {
              QyTool.refreshSiteInfoBase(resp.content);
              commit('setSiteBase', resp.content);
              commit('setSiteBaseFalg',  true);
              //  _this.initIco( _this.site .site_icon);
             }
           });
    }
  }
  
  // mutations
  const mutations = {
    setSiteBase(state, siteBase) {
      console.log("sa",  state.siteBase);
      state.siteBase = siteBase;
      console.log("sa33",  state.siteBase);
      QyTool.setSiteInfoBase( state.siteBase);
    },
    setSiteBaseFalg(state, flag) {
      console.log("sa flag",  flag);
      state.siteBaseFalg = flag; 
    },
  
    decrementProductInventory (state, { id }) {
      const product = state.all.find(product => product.id === id)
      product.inventory--
    }
  }
  
  export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
  }