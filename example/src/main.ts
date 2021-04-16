import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import mitt from 'mitt';
const emitter = mitt();

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import  { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);

new Vue({
    provide: {
        emitter: emitter
    },
    render: h => h(App),
}).$mount('#app');
