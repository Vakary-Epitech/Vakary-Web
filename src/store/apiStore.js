import axios from "axios";
import wording from "@/utils/wording";

const apiStore = {
    actions: {
        retrievedCurrentUserPosition(context) {
            return new Promise((resolve, reject) => {
                try {
                    const isSupported = 'navigator' in window && 'geolocation' in navigator
                    if (isSupported)
                        resolve(
                            navigator.geolocation.getCurrentPosition(function (position) {
                                context.commit('UPDATE_USER_LOCATION', position.coords);
                            })
                        );
                    else {
                        reject("not supported");
                    }
                } catch (error) {
                    reject(error);
                }
            })
        },
        retrievedMarkerData(context) {
            return new Promise((resolve, reject) => {
                try {
                    axios.post(wording.serverAdress + "getData").then((markerData) => {
                        context.commit('UPDATE_MARKER_ARRAY', markerData.data);
                        console.log(markerData.data);
                        resolve(markerData);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error)
                }
            })
        },
        calculatePath() {
            return new Promise((resolve, reject) => {
                try {
                    const userProfile = {
                        selectedTypeOfInterest: this.state.mapStore.selectedTypeOfInterest,
                        tripTime: this.state.mapStore.tripTime,
                        methodOfLocomotion: this.state.mapStore.selectedMethodOfLocomotion,
                        currentLocation: this.state.userStore.currentUserLocation,
                    };
                    
                    axios.post(wording.serverAdress + "getWaypoints", { selectedMarker: this.state.mapStore.selectedMarker, userProfile: userProfile }).then((path) => {
                        console.log(path);
                        resolve(path);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        }
    },
}

export default apiStore;