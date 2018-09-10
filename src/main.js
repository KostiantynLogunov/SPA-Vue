import Vue from 'vue'
import MainApp from './components/MainApp'


import { store } from "./store";
import { router } from "./routes";
import {initialize} from  './helpers/general'

initialize(store, router);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(MainApp)
});
