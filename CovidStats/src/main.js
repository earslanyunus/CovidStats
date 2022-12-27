import {createPinia} from "pinia";
import { createApp } from 'vue'
import './style.css'
import '@vuepic/vue-datepicker/dist/main.css'
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts";
import router from "./router/index.js";
// import store from "./store/index.js";

const pinia = createPinia()
const app =createApp(App)
app.use(VueApexCharts)
app.use(router)
app.use(pinia)
// app.use(store)
app.mount('#app')
