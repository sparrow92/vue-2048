<template>
  <div class="gameover__container">
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-show="visible" class="gameover__background"></div>
    </transition>
    <transition enter-active-class="animated shake" leave-active-class="animated bounceOutDown">
      <div v-show="visible" class="gameover__content">
        <h1 class="gameover__heading">Game Over!</h1>
        <span class="gameover__text">Your score:<strong> {{ score }}</strong></span>
        <button class="gameover__button">Try Again!</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "GameOver",
  props: {
    visible: Boolean,
    score: Number
  }
};
</script>

<style scoped lang="scss">
@import "@/variables.scss";

.gameover {
  &__container {
    width: $gameboard-size;
    height: $gameboard-size;
    position: absolute;
    top: -$border-size;
    left: -$border-size;
  }

  &__background {
    background: rgba(250, 248, 239, 0.65);
    width: 100%;
    height: 100%;
    border-radius: $border-radius;
  }

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__heading {
    font-size: 5.5em;
    font-weight: bold;
    margin: 0 0 7px;
  }

  &__text {
    font-size: 2.5em;
    margin-bottom: 25px;
  }

  &__button {
    color: #363636;
    background: #ffd83d;
    font-size: 1.3em;
    padding: 15px;
    border-radius: 5px;
    font-weight: bold;
    width: fit-content;
  }
}
</style>
