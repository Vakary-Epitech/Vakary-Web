import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
// import GAuth from 'vue3-google-oauth2'
// let gauthClient = '832869712029-8lvrg9k2t6fp7hkc4tis632u0nh5hlcc.apps.googleusercontent.com'
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


// const gAuthOptions = { clientId: gauthClient, scope: 'email', prompt: 'consent', fetch_basic_profile: false }
const app = createApp(App);
// app.use(GAuth, gAuthOptions)
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(i18n);
app.use(router);
app.use(store);
app.mount('#app');