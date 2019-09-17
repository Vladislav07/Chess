<template>
  <div class="board">
    <div
      class="square"
      :class="isBlackSquareAt(index) ?'black':'white'"
      v-for="(item, index) in squeres"
      :key="index"
      :style="item"
      ref="numbers"
    ></div>
    <input class="buttonNew" type="button" value="New" @click="newFigures" />
    <input class="buttonFlip" type="button" value="New" @click="flipBoard" />
  </div>
</template>
<script>
import store from "../store";
export default {
  name: "board",
  data() {
    return {
      squeres: [],
      isFlipped: false,
      figures: "", //'rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR',
      map: {},
      numbers: []
    };
  },
  methods: {
    isBlackSquareAt(coord) {
      return ((coord % 8) + Math.floor(coord / 8)) % 2;
    },
    newFigures() {
      for (var coord = 0; coord < 64; coord++) {
        var fig = this.figures;
        this.showFigureAt(coord, fig.charAt(coord));
      }
    },
    showFigureAt(coord, figure) {
      if (this.map[coord] == figure) return;
      this.map[coord] = figure;
      this.$refs.numbers[coord].innerHTML ='<div id="f$coord" class="figure">$figure</div>'// this.getChessSymbole(figure);

      // setDraggable();
    },
    getChessSymbole(figure) {
      switch (figure) {
        case "K":
          return "&#9812;";
        case "Q":
          return "&#9813;";
        case "R":
          return "&#9814;";
        case "B":
          return "&#9815;";
        case "N":
          return "&#9816;";
        case "P":
          return "&#9817;";
        case "k":
          return "&#9818;";
        case "q":
          return "&#9819;";
        case "r":
          return "&#9820;";
        case "b":
          return "&#9821;";
        case "n":
          return "&#9822;";
        case "p":
          return "&#9823;";
        default:
          return "";
      }
    }
  },
  created: function() {
    var board = [];
    for (var coord = 0; coord < 64; coord++) {
      var square = {};

      board.push(square);
    }
    this.squeres = board;
  },
  mounted() {
    this.figures = store.getters.getFirstPosition;
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
.figure {
  font-size: 60px;
}
.buttonNew {
  margin-top: 100px;
}
</style>
