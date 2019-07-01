<template>
  <div class="tile" :style="style">
    <div :class="['default-tile tile-' + score]">{{ score }}</div>
  </div>
</template>

<script>
export default {
  name: "Tile",
  props: {
    id: Number,
    x: Number,
    y: Number,
    score: Number
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
  transition: all 0.15s ease;
  font-size: 4rem;
  font-weight: bold;  
}
.default-tile {
  width: $tile-size;
  height: $tile-size;
  background: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $border-radius;
  font-size: 1em;
}
.tile-2 {
  background:#ede3da;
  color: #766e66;
  font-size: 2em;
}
.tile-4 {
  background:#ecdfc9;
  color: #766e66;
  font-size: 2em;
}
.tile-8 {
  background:#edae7c;
  color: #fff;
  font-size: 2em;
}
.tile-16 {
  background:#ef9067;
  color: #fff;
  font-size: 2em;
}
.tile-32 {
  background:#ef7562;
  color: #fff;
  font-size: 2em;
}
.tile-64 {
  background: #ee5340;
  color: #fff;
  font-size: 2em;
}
.tile-128 {
  background: #eacd78;
  color: #fff;
  font-size: 1.7em;
  -webkit-box-shadow: 0px 0px 36px 3px rgba(242,173,36,1);
  -moz-box-shadow: 0px 0px 36px 3px rgba(242,173,36,1);
  box-shadow: 0px 0px 20px 3px rgba(234,205,120,0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}
.tile-256 {
  background: #eaca68;
  color: #fff;
  font-size: 1.7em;
  box-shadow: 0px 0px 22px 3px rgba(234,205,120,0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}
.tile-512 {
  background: #eac559;
  color: #fff;
  font-size: 1.7em;
  box-shadow: 0px 0px 25px 3px rgba(234,205,120,0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.10);
}
.tile-1024 {
  background: #e9c24a;
  color: #fff;
  font-size: 1.5em;
  box-shadow: 0px 0px 33px 3px rgba(234,205,120,1), inset 0 0 0 1px rgba(255, 255, 255, 0.15);
}
.tile-2048 {
  background: #e9bf3d;
  color: #fff;
  font-size: 1.5em;
  box-shadow: 0px 0px 36px 1px rgba(234,205,120,1), inset 0 0 0 1px rgba(255, 255, 255, 0.20);
}
.tile-4096 {
  background: #363636;
  color: #fff;
  font-size: 1.5em;
}
.tile-8192 {
  background: #363636;
  color: #fff;
  font-size: 1.5em;
}
</style>
