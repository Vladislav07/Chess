<template>
  <div class="board" @mousemove="moveAt($event)">
    <div
      @mouseup="setDroppable(index)"
      class="square"
      :class="isBlackSquareAt(index) ?'black':'white'"
      v-for="(item, index) in squeres"
      :key="index"
      :style="item"
      :id="index"
    >
      <figure-my :id="index" :figureview="showFigureAt(index)"></figure-my>
    </div>
  </div>
</template>
<script>
import store from "../store";
import figureMy from "./figure";
import {bus} from "./bus.js";
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
      isDraving:false,
      isShow:true
    };
  },
 
  methods: {
    isBlackSquareAt(coord) {
      return ((coord % 8) + Math.floor(coord / 8)) % 2;
    },
    showFigureAt(coord) {
     
      var figure = this.figures[coord];
     
      if (this.map[coord] == figure) return;
      this.map[coord] = figure;

      return figure;

      // setDraggable();
    },
    moveAt(e) {
      if (this.isDraving) {
        this.x = e.pageX;
        this.y = e.pageY;
        // console.log(this.x,this.y);
        bus.$emit("setCoord", { top: this.y, left: this.x });
      }
    },
    setDroppable(e) {
      if(this.isDraving){
      var to=e;
      var from= this.el.id;
      
      this.ChessMove(from, to);
      bus.$emit("setNewPosFigure");
      this.el='';
      this.isDraving=false;
      }
    },
    Drag(e) {
     this.isDraving=true;
      this.el = e;
    },
    ChessMove(from, to){
    
       var figure= this.map[this.el.id];
    
       var peyLoad={'figure':figure,'from':from, 'to':to};
       console.log(peyLoad);
       this.$store.commit('moveFigure',peyLoad);
    }
  },
  created: function() {
    var board = {};
    for (var coord = 0; coord < 64; coord++) {
      var square = {};
    
      board[coord]=coord;
    }
    this.squeres = board;
     bus.$on('setDrag', this.Drag);
  },
 
  components: {
    figureMy
   
  },
   computed:{
   figures() {
     var s=0;
     var pos={};
    var array=this.$store.getters.getFirstPosition;
     for (let index = 0; index < array.length; index++) {
      // debugger;
       var value= array.charAt(index);
       pos[index]=value;
       s++;
     }
       
     console.log(s);

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

.buttonNew {
  margin-top: 100px;
}
</style>
