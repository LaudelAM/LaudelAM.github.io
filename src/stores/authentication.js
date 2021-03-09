export default {
  state: {
    user: null,
  },

  getters: {
    getUser(state) {
      return state.user;
    },

    isLoggedIn(state){
      if(state.user != null){
        return true
      }else{
        return false
      }
    }
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    logUserOut(state) {
      state.user = null;
    },
  },

};
