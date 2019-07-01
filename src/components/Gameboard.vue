<template>
  <div class="gameboard">
    <div class="debug">
      <button v-on:click="addItem">Dodaj kafelek</button>
      <button v-on:click="test">rusz</button>
      <button v-on:click="removeItem">remove 0</button>
    </div>

    <div class="grid-tile" v-for="n in 16" v-bind:key="n">
      <div class="default-tile"></div>
    </div>

    <transition-group enter-active-class="animated bounceIn" tag="div">
      <Tile v-for="item in items" :x="item['x']" :y="item['y']" :id="item.id" :score="item.score" :key="item.id" />
    </transition-group>

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
      uid: 10,
      items: [
        { 'x': 1, 'y': 2, score: 64, id: 0 },
        { 'x': 3, 'y': 3, score: 2048, id: 1 }
      ]
    }
  },
  methods: {
    test: function () {
      this.goRight().then(this.removeItem);
    },
    goRight: function () {
      return new Promise((resolve, reject) => {
          this.items[0]['x'] = 3;
          resolve();
      })
    },
    addItem: function () {
      this.items.push({ 'x': 0, 'y': 2, score: 64, id: this.uid++}); 
    },
    trzysekundy: function () {
      return new Promise((resolve, reject) => {
          this.items[0]['x'] = 2;
          resolve();
      })
    },
    removeItem: function () {
        //this.$delete(this.items, 0);
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if(item.id == 0) {
                this.items.splice(i, 1);
                this.items.push({ 'x': 3, 'y': 2, score: 128, id: this.uid++}); 
                break;
            }
        }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/variables.scss";

.debug {
  position: fixed;
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  & button {
    margin-bottom: 3px;
  }
}
.gameboard {
  height: $gameboard-size;
  width: $gameboard-size;
  border-radius: $border-radius;
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
  border-radius: $border-radius;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
