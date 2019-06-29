<template>
  <div class="tile" :style="style">
    <div class="tile2">2</div>
  </div>
</template>

<script>
export default {
  name: "Tile",
  props: {
    x: Number,
    y: Number
  },
  computed: {
    style() {
      return `left: ${this.x * 25}%; top: ${this.y * 25}%`;
    } 
  }
};
</script>

<style scoped lang="scss">
@import "@/variables.scss";
.tile {
  position: absolute;
  width: 25%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.25s ease-out;

}
.tile2 {
  width: $tile-size;
  height: $tile-size;
  background: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}
</style>
