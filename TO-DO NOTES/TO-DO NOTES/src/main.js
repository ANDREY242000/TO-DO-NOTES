import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import Vuex from 'vuex'
import store from "./store/index"
// добавить импорт axios

createApp(App).use(router).use(Vuex).use(store).mount('#app');