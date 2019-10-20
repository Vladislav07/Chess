import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    position:'rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR'
  },
  mutations: {
    moveFigure(state, peyLoad) {
      var from = parseInt(peyLoad.from);
      var to = peyLoad.to;
      var figure = peyLoad.figure;
      // if(state.position.charAt(to)===figure){
      var array = state.position;
      var newArray = '';
      for (let index = 0; index < array.length; index++) {
        switch (index) {
          case from:
            debugger;
            let val = '1';
            newArray += val;
            break;
          case to:
             // debugger;
            let value = figure;
            newArray += value;
            break;
          default:
            const element = array[index];
            newArray += element;
            break;
        }

      }
      console.log(state.position);
      state.position = newArray;
    
      debugger;
    }


  },
  actions: {},
  getters: {
    getFirstPosition(state) {
      return state.position;
    }
  }
});
