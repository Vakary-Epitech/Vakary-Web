import axios from "axios";
// eslint-disable-next-line
import wording from "@/utils/wording";

const profileStore = {
    state: {
        userTravelProfile: []
    },
    mutations: {
        UPDATE_USER_TRAVEL_PROFILE(state, newProfile) {
            state.userTravelProfile = [];
            if (newProfile) {
                for (let indexProfile in newProfile) {
                    state.userTravelProfile.push({
                        name: newProfile[indexProfile].name,
                        id: newProfile[indexProfile].id,
                        description: newProfile[indexProfile].id,
                        InterestPointTypes: [],
                    })
                    for (let indexInterestPointType in newProfile[indexProfile].InterestPointTypes) {
                        state.userTravelProfile[indexProfile].InterestPointTypes.push(newProfile[indexProfile].InterestPointTypes[indexInterestPointType].name)
                    }
                }
            }
        },
    },
    getters: {
        getInterestPointType: (state) => ({ profilIndex }) => {
            return state.userTravelProfile[profilIndex].interestPointType
        }
    },
    actions: {
        createNewTravelProfil({ commit, getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = getters.getConfig({ url: "profil", data: data, method: "put" })
                    data.profilFields.userId = getters.getToken;

                    axios.request(conf).then((canAuthentify) => {
                        let confGet = getters.getConfig({ url: "me/profil", data: data, method: "get" })

                        axios.request(confGet).then((canAuthentify) => {
                            commit('UPDATE_USER_TRAVEL_PROFILE', canAuthentify.data);
                            resolve(canAuthentify);
                        })
                        resolve(canAuthentify);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
        getUserTravelProfile({ commit, getters }) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = getters.getConfig({ url: "me/profil", data: null, method: "get" })

                    axios.request(conf).then((canAuthentify) => {
                        commit('UPDATE_USER_TRAVEL_PROFILE', canAuthentify.data.profils);
                        resolve(canAuthentify);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
        deleteTravelProfile({ commit, getters }, profilId) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = getters.getConfig({ url: "profil/" + profilId, data: null, method: "delete" })

                    axios.request(conf).then((canAuthentify) => {
                        let confGet = getters.getConfig({ url: "me/profil", data: null, method: "get" })

                        axios.request(confGet).then((canAuthentify) => {
                            commit('UPDATE_USER_TRAVEL_PROFILE', canAuthentify.data);
                            resolve(canAuthentify);
                        })
                        resolve(canAuthentify);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
    }
};

export default profileStore