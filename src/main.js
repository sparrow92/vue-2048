import Vue from "vue";
import App from "./App.vue";
import "animate.css";
import autofocus from "vue-autofocus-directive";
Vue.directive("autofocus", autofocus);

Vue.config.productionTip = false;

window.addEventListener(
  "keydown",
  function(e) {
    let keys = ["Space", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
    if (keys.indexOf(e.key) > -1) {
      e.preventDefault();
    }
  },
  false
);

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
