import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { dom } from "@fortawesome/fontawesome-svg-core";
import i18n from './i18n'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

library.add(fab);
library.add(fas);
library.add(far);
dom.watch();

const app = createApp(App);
app.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    },
});
require('./components/Style/Main.scss');

app.use(i18n);
app.use(ElementPlus)
app.use(router);
app.use(store);
library.add(faPlus, faXmark)
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

