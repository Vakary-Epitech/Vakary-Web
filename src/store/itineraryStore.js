import axios from "axios";
import wording from "@/utils/wording";

const itineraryStore = {
    state: {
        itinerary: [],
        marker: [],
        path: [],
    },
    actions: {
        getItinerary(context) {
            return new Promise((resolve, reject) => {
                try {

                    let config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: wording.serverAdress + "itinerary/getAll/me",
                        headers: {
                            "Authorization": this.state.store.token
                        },
                    };

                    axios.request(config).then((itinerary) => {
                        context.commit('UPDATE_ITINERARY', itinerary.data.itinerary);
                        resolve(itinerary.data);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        deleteItinerary(context, itineraryId) {
            return new Promise((resolve, reject) => {
                try {
                    axios.delete(wording.serverAdress + "itinerary/" + itineraryId, {}).then((itinerary) => {
                        resolve(itinerary);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        createNewItinerary(context, itinerary) {
            return new Promise((resolve, reject) => {
                try {
                    let config = {
                        method: 'put',
                        maxBodyLength: Infinity,
                        url: wording.serverAdress + "itinerary/me",
                        headers: {
                            "Authorization": this.state.store.token
                        },
                        data: {
                            city: itinerary.city,
                            availableTime: itinerary.availableTime,
                            budget: itinerary.budget,
                            nbPeople: itinerary.nbPeople,
                            nbChild: itinerary.nbChild,
                            typeResearchLocations: itinerary.typeResearchLocations,
                            handicapAccess: itinerary.handicapAccess,
                        },
                    };
                    axios.request(config).then((newItinerary) => {
                        if (newItinerary.data.createdItinerary) {
                            context.commit('ADD_NEW_ITINERARY', newItinerary.data.createdItinerary);
                        }
                        resolve(newItinerary);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
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
        ADD_NEW_ITINERARY(state, newItinerary) {
            const i = state.itinerary.findIndex(itinerary => itinerary.id === newItinerary.id)
            if (i < 0)
                return;

            let itinerayData = {
                itineraryPOI: JSON.parse(newItinerary.data),
                id: newItinerary.id,
            };
            state.itinerary.push(itinerayData);
            for (let POI in itinerayData.itineraryPOI) {
                state.marker.push({
                    label: itinerayData.itineraryPOI[POI].name,
                    geolocalisation: {
                        lat: itinerayData.itineraryPOI[POI].Localisation.latitude,
                        lng: itinerayData.itineraryPOI[POI].Localisation.longitude,
                    },
                });
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
}