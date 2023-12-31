import axios from "axios";

const itineraryStore = {
    state: {
        itinerary: [],
        marker: [],
        path: [],
    },
    getters: {

    },
    mutations: {
        UPDATE_ITINERARY(state, itineraryArray) {
            for (let itinerary in itineraryArray) {
                if (!state.itinerary.some(el => el.id === itineraryArray[itinerary].id)) {
                    let itinerayData = {
                        itineraryPOI: JSON.parse(itineraryArray[itinerary].data),
                        id: itineraryArray[itinerary].id,
                    };
                    state.itinerary.push(itinerayData)
                }
            }

            for (let group in state.groups) {
                if (state.groups[group].itinerary) {
                    const i = state.itinerary.findIndex(itinerary => itinerary.id === state.groups[group].itinerary.id)
                    if (i == -1) {

                        let itinerayData = {
                            itineraryPOI: JSON.parse(state.groups[group].itinerary.data),
                            id: state.groups[group].itinerary.id,
                        };

                        state.itinerary.push(itinerayData)
                    }
                }
            }
        },
        UPDATE_PATH(state, path) {
            state.waypoints = [];
            for (let point in path) {
                for (let steps in path[point].steps) {
                    state.waypoints.push(path[point].steps[steps].start_location)
                }
            }
        },
        CLEAR_PATH(state) {
            state.waypoints = [];
        },
        UPDATE_MARKER(state, itineraryData) {
            state.marker = [];
            let index = 0;

            for (let POI in itineraryData.itineraryPOI) {
                state.marker.push({
                    label: itineraryData.itineraryPOI[POI].name,
                    geolocalisation: {
                        lat: itineraryData.itineraryPOI[POI].Localisation.latitude,
                        lng: itineraryData.itineraryPOI[POI].Localisation.longitude,
                    },
                    index: index,
                });
                index += 1;
            }
        },
        REMOVE_MARKER(state) {
            state.marker = [];
        },
        RESET_ITINERARY(state) {
            state.itinerary = [];
        }
    },
    actions: {
        getItinerary({ getters, commit }) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "itinerary/getAll/me", data: null, method: "get" })
                    let configGroupItinerary = getters.getConfig({ url: "group/getAll/me", data: null, method: "get" })

                    config.maxBodyLength = Infinity;
                    commit('RESET_ITINERARY');

                    axios.request(config).then((itinerary) => {
                        commit('UPDATE_ITINERARY', itinerary.data.itinerary);
                        axios.request(configGroupItinerary).then((group) => {
                            for (let id in group.data.groups) {
                                if (group.data.groups[id].itinerary != undefined) {
                                    commit('UPDATE_ITINERARY', [group.data.groups[id].itinerary]);
                                }
                            }
                            resolve(group)
                        }).catch((error) => {
                            reject(error);
                        })
                        resolve(itinerary.data);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        deleteItinerary({ getters, dispatch }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "itinerary/" + data.itineraryId, data: null, method: "delete" })

                    axios.request(config).then((itinerary) => {
                        dispatch("getItinerary");
                        resolve(itinerary);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        removePOI({ getters, dispatch }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "itinerary/removePOI", data: data, method: "post" })

                    axios.request(config).then((itinerary) => {
                        dispatch("getItinerary");
                        resolve(itinerary);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
        getItineraryById({ getters, commit }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "itinerary/" + data.itineraryId, data: null, method: "get" })

                    axios.request(config).then((itinerary) => {
                        commit('UPDATE_MARKER', itinerary.data);
                        resolve(itinerary);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        addItinerary({ getters, dispatch }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "itinerary/me", data: data, method: "put" })
                    
                    axios.request(config).then((newItinerary) => {
                        dispatch("getItinerary");
                        resolve(newItinerary);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        calculatePath({ getters, commit }, itinerary) {
            return new Promise((resolve, reject) => {
                try {
                    if (itinerary.itineraryPOI.length < 2) {
                        return;
                    }
                    let arrayOfOrigin = [];
                    for (let itineraryData in itinerary.itineraryPOI) {
                        arrayOfOrigin.push({
                            lat: itinerary.itineraryPOI[itineraryData].Localisation.latitude,
                            lng: itinerary.itineraryPOI[itineraryData].Localisation.longitude,
                        })
                    }

                    const destination = arrayOfOrigin[arrayOfOrigin.length - 1]
                    const origin = arrayOfOrigin[0]

                    arrayOfOrigin.pop();
                    arrayOfOrigin.shift();

                    const data = {
                        destination: destination,
                        origin: origin,
                        waypoints: arrayOfOrigin,
                    }
                    let config = getters.getConfig({ url: "getPath", data: data, method: "post" })

                    axios.request(config).then((steps) => {
                        commit('UPDATE_PATH', steps.data.path);
                        resolve(steps);
                    }).catch((error) => {
                        console.log(error);
                    })

                } catch (error) {
                    reject(error);
                }
            })
        },
        getNewCards({ getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "itinerary/getNewCards", data: data, method: "post" })

                    axios.request(config).then((cards) => {
                        resolve(cards);
                    }).catch((error) => {
                        console.log(error);
                    })

                } catch (error) {
                    reject(error);
                }
            })
        },
        sendLikedPOI({ getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "itinerary/sendLikedPOI", data: data, method: "post" })

                    axios.request(config).then((cards) => {
                        resolve(cards);
                    }).catch((error) => {
                        console.log(error);
                    })

                } catch (error) {
                    reject(error);
                }
            })
        },
        likePOI({ getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "interestPoint/" + data.id + "/like", data: data, method: "patch" })

                    axios.request(config).then((cards) => {
                        resolve(cards);
                    }).catch((error) => {
                        console.log(error);
                    })

                } catch (error) {
                    reject(error);
                }
            })
        },
        removelikePOI({ getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "interestPoint/" + data.id + "/removeLike", data: data, method: "patch" })

                    axios.request(config).then((cards) => {
                        resolve(cards);
                    }).catch((error) => {
                        console.log(error);
                    })

                } catch (error) {
                    reject(error);
                }
            })
        }
    },
}

export default itineraryStore;