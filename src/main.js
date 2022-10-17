import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { dom } from "@fortawesome/fontawesome-svg-core";
import i18n from './i18n'

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

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(i18n);
app.use(router);
app.use(store);
app.mount('#app');