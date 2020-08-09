export const state = () => ({
    siteInfo: {

    }
  })
  
  export const mutations = {
    add(state, text) {
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

  const actions = {
    async getInfo({state, commit}, val) {
     commit('SET_VALUE', val);
    }
   };