import Vue from 'vue'
import App from './App.vue'
import 'vue-use-vuex';
import router from '@/router';
import '@/init';
import store from '@/store';

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
