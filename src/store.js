import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    position:'rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR'
  },
  mutations: {},
  actions: {},
  getters:{
    getFirstPosition(state){
      return state.position;
    }
  }
});
