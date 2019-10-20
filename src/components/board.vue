<template>
  <div>
    <div class="board" @mousemove="moveAt($event)">
      <div
        @mouseup="setDroppable(index)"
        class="square"
        :class="isBlackSquareAt(index) ?'black':'white'"
        v-for="(figure, index) in figures"
        :key="index"
        :style="item"
        :id="index"
      >
        <figure-my :id="index" :figureview="figure"></figure-my>
      </div>
    </div>
    <button class="buttonFlipped" @click="isFlipped=!isFlipped">Fliped</button>
  </div>
</template>
<script>
import store from "../store";
import figureMy from "./figure";
import { bus } from "./bus.js";
export default {
  name: "board",
  data() {
    return {
      squeres: [],
      isFlipped: false,
      map: {},
      numbers: [],
      x: "",
      y: "",
      el: "",
      isDraving: false,
      isShow: true
    };
  },

  methods: {
    isBlackSquareAt(coord) {
      return ((coord % 8) + Math.floor(coord / 8)) % 2;
    },
    moveAt(e) {
      if (this.isDraving) {
        this.x = e.pageX;
        this.y = e.pageY;
        bus.$emit("setCoord", { top: this.y, left: this.x });
      }
    },
    setDroppable(index) {
      if (this.isDraving) {
        var to = index;
        var from = this.el.id;
        if (from !== to) {
          this.ChessMove(from, to);
        }
        bus.$emit("setNewPosFigure", to);
        this.el = "";
        this.isDraving = false;
      }
    },
    Drag(e) {
      this.isDraving = true;
      this.el = e;
    },
    ChessMove(from, to) {
      var figure = this.figures[this.el.id];
      var peyLoad = { figure: figure, from: from, to: to };
      this.$store.commit("moveFigure", peyLoad);
    }
  },
  created: function() {
    bus.$on("setDrag", this.Drag);
  },

  components: {
    figureMy
  },
  computed: {
    figures() {
      var pos = {};
      var array = this.$store.getters.getFirstPosition;
       if (this.isFlipped){
        for (let index = 0; index < array.length; index++)        
          pos[index] = array.charAt(index);
           }
           else{
           for (let index = 0; index < array.length; index++) 
             pos[63-index] = array.charAt(index);
           }
        
        return pos;
     
    }
  }
};
</script>
<style scoped>
.board {
  width: 640px;
  height: 640px;
  border: 20px solid #55cdef;
}
.square {
  float: left;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.black {
  background-color: #999;
}
.white {
  background-color: #eee;
}
.buttonFlipped {
  margin: 20px;
}

.buttonNew {
  margin-top: 100px;
}
</style>
