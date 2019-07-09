<template>
  <div id="control" class="container" @keyup.up="up" @keyup.down="down" @keyup.left="left" @keyup.right="right" tabindex="-1" autofocus>

    <Header :score="score" @newGame="newGame" />

    <div class="gameboard">
      <div class="grid-tile" v-for="n in 16" v-bind:key="n">
        <div class="default-tile"></div>
      </div>
      <Tile v-for="tile in tiles" :x="tile.x" :y="tile.y" :value="tile.value" :key="tile.id" />
      <YouWin :visible="youWin" @clickToContinue="continueGame" />
      <GameOver :visible="gameOver" @tryAgain="tryAgain" :score="score" />
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
      tiles: [],
      score: 0,
      tileValue: 0
    };
  },
  created() {
    //document.getElementById("control").focus();
    this.newGame();
  },
  computed: {
    nextUp: function() {
      var result = false;
      for (var a = 0; a < 4; a++) {
        var n = 0;
        var row = [];
        while (n < 4) {
          row.push(this.getTileValue(a, n));
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
      for (var b = 0; b < 4; b++) {
        var n = 3;
        var row = [];
        while (n >= 0) {
          row.push(this.getTileValue(n, b));
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
      for (var a = 0; a < 4; a++) {
        var n = 3;
        var row = [];
        while (n >= 0) {
          row.push(this.getTileValue(a, n));
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
      for (var b = 0; b < 4; b++) {
        var n = 0;
        var row = [];
        while (n < 4) {
          row.push(this.getTileValue(n, b));
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
    newTile: function(t) {
      for (var i = 0; i < t; i++) {
        if (this.tiles.length < 17) {
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
            id: this.generateId()
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
      //document.getElementById("control").focus();
    },

    resetArray: function() {
      this.tiles = [];
    },

    newGame: function() {
      this.gameOver = false;
      this.youWin = false;
      this.resetArray();
      this.score = 0;
      this.newTile(2);
      //document.getElementById("control").focus();
    },

    getTileValue: function(a, b) {
      var array = this.tiles;
      var results = array.map(function(tile) {
        if (tile.x == a && tile.y == b) {
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
        for (var a = 0; a < 4; a++ ) {
          var n = 0;
          var row = [];
          while (n < 4) {
            var value = this.getTileValue(a, n);
            var index = this.getTileIndex(a, n);
            if (value > 0) {
              row.push(this.tiles[index]);
            }
            n++;
          }

          this.sortRow(row, 0, -1);
         
        }
        this.newTile(1);
      }
    },

    left: function() {
      if (this.nextLeft && !this.popup) {
        for (var b = 0; b < 4; b++) {
          var n = 0;
          var row = [];
          while (n < 4) {
            var value = this.getTileValue(n, b);
            var index = this.getTileIndex(n, b);
            if (value > 0) {
              row.push(this.tiles[index]);
            }
            n++;
          }
          this.sortRow(row, -1, 0);
        }
        this.newTile(1);
      }
    },

    right: function() {
      if (this.nextRight && !this.popup) {
        for (var b = 0; b < 4; b++) {
          var n = 3;
          var row = [];
          while (n >= 0) {
            var value = this.getTileValue(n, b);
            var index = this.getTileIndex(n, b);
            if (value > 0) {
              row.push(this.tiles[index]);
            }
            n--;
          }
          this.sortRow(row, 1, 0);
        }
        this.newTile(1);
      }
    },

    down: function() {
      if (this.nextDown && !this.popup) {
        for (var a = 0; a < 4; a++) {
          var n = 3;
          var row = [];
          while (n >= 0) {
            var value = this.getTileValue(a, n);
            var index = this.getTileIndex(a, n);
            if (value > 0) {
              row.push(this.tiles[index]);
            }
            n--;
          }
          this.sortRow(row, 0, 1);
          
        }
        this.newTile(1);
      }
    },

    getTileIndex: function (a, b) {
      var index = this.tiles.findIndex(function (e) { 
        return e.x == a && e.y == b; 
      });
      return index;
    },

    removeTile: function(a, b, ms) {
      setTimeout(() => {
        var index = this.getTileIndex(a, b);
        this.tiles.splice(index, 1);  
      }, ms);
    },

    moveTile: function(a, b, c, d) {
      return new Promise(resolve => {
        var index = this.getTileIndex(a, b);
        this.tiles[index].x += c;
        this.tiles[index].y += d;
        resolve();
      });
    },

    doubleTile: function(a, b, ms) {
      setTimeout(() => {
        var index = this.getTileIndex(a, b);
        this.tiles[index].id = this.generateId();
        this.tiles[index].value *= 2;
        this.score += this.tiles[index].value;
      }, ms);
    },

    moveAndRemove: function(a, b, c, d, ms) {
      this.moveTile(a, b, c, d).then(
        this.removeTile(a+c, b+d, ms)
      );
    },

    moveAndDouble: function(a, b, c, d, ms) {
      this.moveTile(a, b, c, d).then(
        this.doubleTile(a+c, b+d, ms)
      );
    },

    sortRow: function(row, vectorX, vectorY) {

      var absX = Math.abs(vectorX);
      var absY = Math.abs(vectorY);

      if (vectorX == 1 || vectorY == 1) {
        var counter = 3;
      }
      else {
        var counter = 0;
      }

      for (var i = 0, line = counter; i < row.length; i++, line+=((-1 * vectorY) + (-1 * vectorX))) {

        var position1 = (absX * row[i].x) + (absY * row[i].y);
        var dist1 = Math.abs(line - position1);

        if (typeof row[i+1] !== 'undefined') {
          var position2 = (absX * row[i+1].x) + (absY * row[i+1].y);
          var dist2 = Math.abs(line - position2);
        }

        if (typeof row[i+1] !== 'undefined' && row[i].value == row[i+1].value) {
          this.moveAndRemove(row[i].x, row[i].y, vectorX * dist1, vectorY * dist1, 100);
          this.moveAndDouble(row[i+1].x, row[i+1].y, vectorX * dist2, vectorY * dist2, 100);
          i++;
        }
        else {
          this.moveTile(row[i].x, row[i].y, vectorX * dist1, vectorY * dist1);
        }
        
      }

    },

    generateId: function () {
      var result = '';
      var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < 6; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;      
    }

  }
};
</script>

<style scoped lang="scss">
@import "@/variables.scss";

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
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
