import Vue from 'vue'
Vue.directive('update-url', {
  inserted: function(el) {
    console.log('my-global-directive',el)
  }
})