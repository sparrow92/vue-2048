<template>
  <div class="header">
    <div class="header__brand">2048</div>
    <div class="header__score">
      <span class="header__score--title">score:</span>
      <span class="header__score--amount">{{ score }}</span>
    </div>
    <div class="header__score">
      <span class="header__score--title">best score:</span>
      <span class="header__score--amount">158</span>
    </div>
    <div><button class="header__button"><strong>New Game</strong></button></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    score: Number
  },
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
