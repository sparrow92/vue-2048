<template>
  <div class="container">
    <Header :score="score" @newGame="newGame" />
    <div
      id="gameboard"
      v-on:keyup.up="up"
      v-on:keyup.down="down"
      v-on:keyup.left="left"
      v-on:keyup.right="right"
      tabindex="-1"
      v-cloak
      autofocus
    >
      <div class="debug">
        <div>
          <button v-on:click="newTile(2)">add tiles</button>
          <button v-on:click="newGame">new game</button>
          <button v-on:click="addtile">add 2048 tile</button>
          <button v-on:click="testMove">rusz</button>
          <button v-on:click="removetile">remove 0</button>
          <button
            v-bind:class="[gameOver ? 'green' : 'red']"
            v-on:click="gameOver = !gameOver"
          >game over</button>
          <button v-bind:class="[youWin ? 'green' : 'red']" v-on:click="youWin = !youWin">you win</button>
          <button v-on:click="addPoints(100)">add points</button>
          <input v-model="aX" placeholder="x value" />
          <input v-model="aY" placeholder="y value" />
          <button v-on:click="getTileValue(aX, aY)">get value</button>
          <div>value of {{`[${aX}, ${aY}]`}}: {{ tileValue }}</div>
        </div>
        <div class="debug-down">
          <div>TILE: {{ largestTile }}</div>
          <div v-bind:class="[popup ? 'green' : 'red']">POP-UP</div>
          <div v-bind:class="[noStep ? 'green' : 'red']">NO STEP</div>
          <div v-bind:class="[nextUp ? 'green' : 'red']">UP</div>
          <div v-bind:class="[nextRight ? 'green' : 'red']">RIGHT</div>
          <div v-bind:class="[nextDown ? 'green' : 'red']">DOWN</div>
          <div v-bind:class="[nextLeft ? 'green' : 'red']">LEFT</div>
        </div>
      </div>

      <div class="grid-tile" v-for="n in 16" v-bind:key="n">
        <div class="default-tile"></div>
      </div>

      <transition-group enter-active-class="animated bounceIn" tag="div">
        <Tile
          v-for="tile in tiles"
          :x="tile['x']"
          :y="tile['y']"
          :id="tile.id"
          :value="tile.value"
          :key="tile.id"
        />
      </transition-group>

      <YouWin :visible="youWin" @clickToContinue="continueGame" />
      <GameOver :visible="gameOver" @tryAgain="tryAgain" :score="14785" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Tile from "@/components/Tile.vue";
import GameOver from "@/components/GameOver.vue";
import YouWin from "@/components/YouWin.vue";

export default {
  name: "Gameboard",
  components: {
    Header,
    Footer,
    Tile,
    GameOver,
    YouWin
  },
  data: function() {
    return {
      gameOver: false,
      youWin: false,
      uid: 10,
      tiles: [],
      score: 0,
      aX: 0,
      aY: 0,
      tileValue: 0
    };
  },
  created() {
    this.newGame();
  },
  computed: {
    nextUp: function() {
      var result = false;
      for (var x = 0; x < 4; x++) {
        var n = 0;
        var row = [];
        while (n < 4) {
          row.push(this.getTileValue(x, n));
          n++;
        }
        if (this.isMovePossible(row)) {
          result = true;
          break;
        }
      }
      return result;
    },

    nextRight: function() {
      var result = false;
      for (var y = 0; y < 4; y++) {
        var n = 3;
        var row = [];
        while (n >= 0) {
          row.push(this.getTileValue(n, y));
          n--;
        }
        if (this.isMovePossible(row)) {
          result = true;
          break;
        }
      }
      return result;
    },

    nextDown: function() {
      var result = false;
      for (var x = 0; x < 4; x++) {
        var n = 3;
        var row = [];
        while (n >= 0) {
          row.push(this.getTileValue(x, n));
          n--;
        }
        if (this.isMovePossible(row)) {
          result = true;
          break;
        }
      }
      return result;
    },

    nextLeft: function() {
      var result = false;
      for (var y = 0; y < 4; y++) {
        var n = 0;
        var row = [];
        while (n < 4) {
          row.push(this.getTileValue(n, y));
          n++;
        }
        if (this.isMovePossible(row)) {
          result = true;
          break;
        }
      }
      return result;
    },

    noStep: function() {
      return (
        !this.nextLeft && !this.nextUp && !this.nextRight && !this.nextDown
      );
    },

    popup: function() {
      return this.gameOver || this.youWin;
    },

    largestTile: function() {
      var array = this.tiles;
      var maximum = Math.max.apply(
        Math,
        array.map(function(arr) {
          return arr.value;
        })
      );
      return maximum;
    }
  },
  watch: {
    noStep: function(newValue) {
      if (newValue) {
        this.gameOver = true;
      }
    },

    largestTile: function(newValue) {
      if (newValue == 2048) {
        this.youWin = true;
      }
    }
  },
  methods: {
    newTile: function(x) {
      for (var i = 0; i < x; i++) {
        if (this.tiles.length < 16) {
          do {
            var a = Math.floor(Math.random() * 4);
            var b = Math.floor(Math.random() * 4);
            var notRandomNumbers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
            var index = Math.floor(Math.random() * notRandomNumbers.length);
            var tileVal = this.getTileValue(a, b);
          } while (tileVal > 0);

          //console.log(this.getTileValue(a,b));
          this.tiles.push({
            x: a,
            y: b,
            value: notRandomNumbers[index],
            id: this.uid++
          });
        }
      }
    },

    tryAgain: function() {
      this.gameOver = false;
      this.newGame();
    },

    continueGame: function() {
      this.youWin = false;
      document.getElementById("gameboard").focus();
    },

    resetArray: function() {
      this.tiles = [];
    },

    newGame: function() {
      this.resetArray();
      this.score = 0;
      this.newTile(2);
      document.getElementById("gameboard").focus();
    },

    getTileValue: function(x, y) {
      var array = this.tiles;
      var results = array.map(function(tile) {
        if (tile["x"] == x && tile["y"] == y) {
          return tile.value;
        } else {
          return null;
        }
      });
      this.tileValue = Math.max.apply(null, results);
      return Math.max.apply(null, results);
    },

    isMovePossible: function(array) {
      var filtered = array.filter(function(el) {
        return el > 0;
      }).length;
      var sliced = array.slice(0, filtered);
      array = sliced;
      var response = false;
      if (array.length == 1 && array[0] == 0) {
        response = true;
      }
      if (array.length > 1) {
        for (var i = 1; i < array.length; i++) {
          if (array[i] == array[i - 1] || array[i - 1] == 0 || array[i] == 0) {
            response = true;
            break;
          }
        }
      }
      return response;
    },

    up: function() {
      if (this.nextUp && !this.popup) {
        this.newTile(1);
      }
    },

    left: function() {
      if (this.nextLeft && !this.popup) {
        this.newTile(1);
      }
    },

    right: function() {
      if (this.nextRight && !this.popup) {
        this.newTile(1);
      }
    },

    down: function() {
      if (this.nextDown && !this.popup) {
        this.newTile(1);
      }
    },

    /* FUNKCJE TESTOWE! FUNKCJE TESTOWE! FUNKCJE TESTOWE! */

    testMove: function() {
      this.goRight().then(this.removetile);
    },

    goRight: function() {
      return new Promise(resolve => {
        this.tiles[0]["x"] = 3;
        resolve();
      });
    },

    addtile: function() {
      this.tiles.push({ x: 0, y: 2, value: 2048, id: this.uid++ });
    },

    trzysekundy: function() {
      return new Promise(resolve => {
        this.tiles[0]["x"] = 2;
        resolve();
      });
    },

    removetile: function() {
      for (var i = 0; i < this.tiles.length; i++) {
        var tile = this.tiles[i];
        if (tile.id == 0) {
          this.tiles.splice(i, 1);
          this.tiles.push({ x: 3, y: 2, value: 128, id: this.uid++ });
          break;
        }
      }
    },

    addPoints: function(x) {
      this.score = this.score + x;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/variables.scss";

.debug {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #baaca1;
  padding: 20px;
  width: 200px;
  box-sizing: border-box;
  justify-content: space-between;

  & .debug-down > div {
    font-weight: bold;
    margin: 5px;
  }

  & input {
    width: 35%;
    box-sizing: border-box;
    margin: 5px 5px;
    border: 1px solid rgb(170, 157, 157);
    padding: 3px;
  }

  & button {
    margin-bottom: 5px;
    padding: 7px;
    text-transform: uppercase;
    font-weight: bold;
    color: #363636;
    font-size: 0.9rem;
    width: 100%;
  }
  .red {
    color: rgb(160, 45, 45) !important;
  }
  .green {
    color: rgb(73, 151, 73) !important;
  }
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
}
#gameboard {
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
  margin: 50px 0;

  & .grid-tile {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .default-tile {
    width: $tile-size;
    height: $tile-size;
    background: #ccbfb5;
    border-radius: $border-radius;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
