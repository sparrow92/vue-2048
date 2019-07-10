<template>
  <div class="header">
    <div class="header__brand">2048</div>
    <div class="header__score">
      <span class="header__score--title">score:</span>
      <span class="header__score--amount">{{ animatedScore }}</span>
    </div>
    <div class="header__score">
      <span class="header__score--title">best score:</span>
      <span class="header__score--amount">{{ animatedBestScore }}</span>
    </div>
    <div>
      <button class="header__button" v-on:click="newGame"><strong>New Game</strong></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    score: Number
  },
  data: function() {
    return {
      bestScore: 0,
      tweenedScore: 0,
      tweenedBestScore: 0,
    };
  },
  computed: {
    animatedBestScore: function() {
      return this.tweenedBestScore.toFixed(0);
    },
    animatedScore: function() {
      return this.tweenedScore.toFixed(0);
    },
  },
  watch: {
    score: function(newValue) {
      if (newValue == 0) {
        this.tweenedScore = this.score;
      }
      TweenLite.to(this.$data, 0.5, { tweenedScore: newValue });
      if (newValue > this.bestScore) {
        this.bestScore = this.score;
      }
    },
    bestScore: function(newValue) {
      TweenLite.to(this.$data, 0.5, { tweenedBestScore: newValue });
    },
  },
  created() {

  },
  methods: {
    newGame: function () {
      this.$emit('newGame');
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/variables.scss";

.header {
  width: $gameboard-size;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &__brand {
    font-size: 3.4em;
    font-weight: bold;
    color: #776e65;
  }

  &__score {
    display: flex;
    flex-direction: column;
    text-transform: uppercase;

    &--title {
      font-size: 0.7rem;
      margin-bottom: 7px;
    }

    &--amount {
      font-size: 1.9rem;
      color: #363636;
    }
  }

  &__button {
    color: #363636;
    background: #ffd83d;
    font-size: 1.5em;
    padding: 15px;
    border-radius: 5px;
  }
}
</style>
