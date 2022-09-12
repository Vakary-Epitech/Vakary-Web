import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import mitt from 'mitt';

const emitter = mitt();
const app = createApp(App);
app.use(router);
app.use(store);
app.config.globalProperties.emitter = emitter;
library.add(faPlus, faXmark)
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

