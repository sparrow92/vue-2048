<template>
  <div class="youwin__container">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-show="visible" class="youwin__background"></div>
    </transition>
    <transition
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutDown"
    >
      <div v-show="visible" class="youwin__content">
        <h1 class="youwin__heading">You Win!</h1>
        <span class="youwin__text"><strong>Congratulations!</strong></span>
        <button class="youwin__button" v-on:click="continueGame">
          Click to Continue
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  methods: {
    continueGame: function() {
      this.$emit("clickToContinue");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.youwin {
  &__container {
    width: $gameboard-size;
    height: $gameboard-size;
    position: absolute;
    top: -$border-size;
    left: -$border-size;
    pointer-events: none;
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
    pointer-events: auto;
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
