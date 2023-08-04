import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'animate.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { createApp } from 'vue'
import SvgIcon from "vue3-icon";
import Notifications from '@kyvg/vue3-notification'
import VueNumberFormat from 'vue-number-format'
import preloading from './components/preloading/preloading.vue';
import Vue3Geolocation from 'vue3-geolocation';
import JsonExcel from "vue-json-excel3"
import App from './App.vue'
import router from './router'
import store from './stores'

const app = createApp(App)
    app.use(store)
    app.use(router)
    app.use(VueSweetalert2)
    app.component("svg-icon", SvgIcon)
    app.component(preloading)
    app.component("downloadExcel", JsonExcel)
    app.use(VueNumberFormat, {prefix:'', isInteger: true})
    app.use(Notifications)
    app.use(Vue3Geolocation)

    app.mount('#app')
