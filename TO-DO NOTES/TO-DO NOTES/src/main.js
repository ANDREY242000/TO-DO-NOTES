import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router/router'
import Vuex from 'vuex'
import VueCarousel from '@chenfengyuan/vue-carousel';
import store from "./store/index"
import 'ant-design-vue/dist/reset.css';


createApp(App)
.use(router)
.use(Vuex)
.use(store)
.use(VueCarousel)
.use(Antd)
.mount('#app');