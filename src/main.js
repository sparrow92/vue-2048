import Vue from "vue";
import App from "./App.vue";
import "animate.css";
import { TweenMax } from "gsap/TweenMax";

Vue.config.productionTip = false;

window.addEventListener(
  "keydown",
  function(e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
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
