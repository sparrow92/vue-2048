<template>
  <div class="gameboard">
    <button class="button" v-on:click="goRight">x</button>
    <div class="grid-tile" v-for="n in 16" v-bind:key="n">
      <div class="default-tile"></div>
      
    </div>
    <Tile :x="x" :y="2" />
  </div>
</template>

<script>
import Tile from "@/components/Tile.vue";
export default {
  name: "Gameboard",
  components: {
    Tile
  },
  data: function () {
    return {
      x: 0
    }
  },
  methods: {
    goRight: function () {
      this.x = this.x + 1;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/variables.scss";
.button {
  position: fixed;
  top: 15px;
  left: 15px;
}
.gameboard {
  height: $gameboard-size;
  width: $gameboard-size;
  border-radius: 4px;
  background: #baaca1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  position: relative;
  border: $border-size solid #baaca1;
  box-sizing: border-box;
}
.grid-tile {
  display: flex;
  justify-content: center;
  align-items: center;
}
.default-tile {
  width: $tile-size;
  height: $tile-size;
  background: #ccbfb5;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
