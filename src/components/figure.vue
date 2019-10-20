<template>
  <div
    class="figure"
    @mousedown="setDraggable()"
    :style="dynamicStyleObjec"
  >{{ toPlainText(getChessSymbole(figureview))}}</div>
</template>

<script>
import { bus } from "./bus.js";
export default {
  name: "figureMy",
  data() {
    return {
      isDragging: false,
      x: "",
      y: ""
    };
  },
  props: ["figureview"],
  methods: {
    getChessSymbole(figure) {
      switch (figure) {
        case "K":
          return `&#9812;`;
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
    },

    toPlainText(html) {
      const scratchDiv = document.createElement("div");
      scratchDiv.innerHTML = html;
      return scratchDiv.textContent;
    },
    setDraggable() {
      this.isDragging = true;
      console.log(this);
      bus.$emit("setDrag", this.$el);
    }
  },
 
  computed: {
    dynamicStyleObjec() {
      if (this.isDragging) {
        return {
          position: "absolute",
          top: this.y + "px",
          left: this.x + "px"
        };
      } else {

        return 0;
       }
      
    }
  },
  mounted() {
    bus.$on("setCoord", coord => {
      if (this.isDragging) {
        (this.x = coord.left - 30), (this.y = coord.top - 85);
      }
    });
    bus.$on("setNewPosFigure", () => {
      if (this.isDragging) {
        // debugger;
         this.isDragging = false;

      }
    });
  }
};
</script>

<style>
.figure {
  font-size: 60px;
}
</style>

