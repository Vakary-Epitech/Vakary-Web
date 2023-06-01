import { createStore } from 'vuex'
import apiStore from './apiStore'
import userStore from './userStore'
import mapStore from './mapStore';
import VuexPersistence from 'vuex-persist'
import globalNonPersistantData from './globalNonPersistantData'
import groupStore from './groupStore';
import wording from "@/utils/wording";

//Make the userStore persistent
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['userStore'],
})

const store = createStore({
    modules: {
        globalNonPersistantData: globalNonPersistantData, //Every non persistant data
        apiStore: apiStore, //Communication with api
        userStore: userStore, //Store every user information, action and mutation
        mapStore: mapStore, //Store every map information, action and mutation
        groupStore: groupStore,
    },
    state: {
        config: {
            maxBodyLength: Infinity,
            url: wording.serverAdress,
            headers: {
                "Authorization": "",
            },
        },
    },
    getters: {
        getConfig: (state) => ({ url, data, method }) => {
            let conf = state.config;
            conf.url += url;
            conf.data = data;
            conf.method = method;
            return conf;
        }
    },
    mutations: {
        UPDATE_USER_TOKEN(state, token) {
            state.config.headers.Authorization = token; 
        },
    },
    plugins: [vuexLocal.plugin],
});

export default store;