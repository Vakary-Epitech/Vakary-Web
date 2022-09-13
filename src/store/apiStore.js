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
                    axios.post(wording.serverAdress + "getWaypoints", { selectedMarker: this.state.mapStore.selectedMarker, methodOfLocomotion:  this.state.mapStore.selectedMethodOfLocomotion }).then((path) => {
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