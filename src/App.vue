<template>
  <div id="app">
    <board></board>
  </div>
</template>

<script>
import Board from "./components/board.vue";

export default {
  name: "app",
  components: {
    Board
  }
};
</script>
