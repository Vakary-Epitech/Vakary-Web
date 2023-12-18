import { createStore } from 'vuex'
import apiStore from './apiStore'
import userStore from './userStore'
import mapStore from './mapStore';
import VuexPersistence from 'vuex-persist'
import groupStore from './groupStore';
import itineraryStore from './itineraryStore';
import profileStore from './profileStore';

//Make the userStore persistent
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['userStore'],
})

const store = createStore({
    modules: {
        apiStore: apiStore, //Communication with api
        userStore: userStore, //Store every user information, action and mutation
        mapStore: mapStore, //Store every map information, action and mutation
        groupStore: groupStore,
        itineraryStore: itineraryStore,
        profileStore: profileStore,
    },
    plugins: [vuexLocal.plugin],
});

export default store;