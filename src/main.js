import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
// import GAuth from 'vue3-google-oauth2'
// let gauthClient = '832869712029-8lvrg9k2t6fp7hkc4tis632u0nh5hlcc.apps.googleusercontent.com'


// const gAuthOptions = { clientId: gauthClient, scope: 'email', prompt: 'consent', fetch_basic_profile: false }
const app = createApp(App);
// app.use(GAuth, gAuthOptions)
app.use(router);
app.use(store);
app.mount('#app');