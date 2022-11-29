import { createStore } from 'vuex'
import apiStore from './apiStore'
import userStore from './userStore'
import mapStore from './mapStore';
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['userStore'],
})

const store = createStore({
    modules: {
        apiStore: apiStore, //Communication with api
        userStore: userStore, //Store every user information, action and mutation
        mapStore: mapStore, //Store every map information, action and mutation
    },
    plugins: [vuexLocal.plugin],
});

export default store;