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
            state.itinerary = [];
            state.marker = [];

            for (let itinerary in itineraryArray) {
                let itinerayData = {
                    itineraryPOI: JSON.parse(itineraryArray[itinerary].data),
                    id: itineraryArray[itinerary].id,
                };
                state.itinerary.push(itinerayData)
                for (let POI in itinerayData.itineraryPOI) {
                    state.marker.push({
                        label: itinerayData.itineraryPOI[POI].name,
                        geolocalisation: {
                            lat: itinerayData.itineraryPOI[POI].Localisation.latitude,
                            lng: itinerayData.itineraryPOI[POI].Localisation.longitude,
                        },
                    });
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

                        for (let POI in itinerayData.itineraryPOI) {
                            state.marker.push({
                                label: itinerayData.itineraryPOI[POI].name,
                                geolocalisation: {
                                    lat: itinerayData.itineraryPOI[POI].Localisation.latitude,
                                    lng: itinerayData.itineraryPOI[POI].Localisation.longitude,
                                },
                            });
                        }
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
        }
    },
    actions: {
        getItinerary({ getters, commit }) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "itinerary/getAll/me", data: null, method: "get" })
                    config.maxBodyLength = Infinity;

                    axios.request(config).then((itinerary) => {
                        commit('UPDATE_ITINERARY', itinerary.data.itinerary);
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
    },
}

export default itineraryStore;