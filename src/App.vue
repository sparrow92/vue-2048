<template>
  <div id="app">
    <Gameboard />
  </div>
</template>

<script>
import Gameboard from "./components/Gameboard.vue";

export default {
  components: {
    Gameboard
  }
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

html {
  font-size: $base-fontsize;
}
body {
  background: #faf8ef;
  max-height: 100vh;
  overflow: hidden;
  margin: 0;
}
*:focus {
  outline: none;
}
button {
  border: none;
  cursor: pointer;
  outline: inherit;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}
</style>
