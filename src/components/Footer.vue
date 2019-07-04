<template>
  <footer class="footer">
    <span>
      <strong>vue-2048</strong> created by 
      <a href="https://github.com/sparrow92">sparrow92</a>. Check source code on  
    </span> 
    <a href="https://github.com/sparrow92/2048">
      <button class="footer__button">
        <span>
          <img src="https://img.icons8.com/ios-glyphs/30/000000/github.png">
        </span>
        <span>GitHub</span>
      </button>    
    </a>      
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped lang="scss">
@import "@/variables.scss";

.footer {
  font-size: 0.9em;
  display: flex;
  align-items: center;

  & a {
    text-decoration: none;
    color:#3273dc;

    &:visited {
      color: none;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 3px 8px;
    line-height: 1;
    border: 1px solid rgb(197, 196, 196);
    margin-left: 7px;
    font-weight: bold;
    background: #eee; 

    img {
      width: 20px;
      margin-right: 3px;      
    }
  }
}
</style>
