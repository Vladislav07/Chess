import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    position: 'rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR'
  },
  mutations: {
    moveFigure(state, peyLoad) {
      var from = parseInt(peyLoad.from);
      var to = parseInt(peyLoad.to);
      var figure = peyLoad.figure;
      var array = state.position;
      var newArray = '';
      for (let index = 0; index < array.length; index++) {
        switch (index) {
          case from:
            let val = '1';
            newArray += val;
            break;
          case to:
            let value = figure;
            newArray += value;
            break;
          default:
            const element = array[index];
            newArray += element;
            break;
        }
      }
      state.position = newArray;
    }
  },
  actions: {},
  getters: {
    getFirstPosition(state) {
      return state.position;
    }
  }
});
