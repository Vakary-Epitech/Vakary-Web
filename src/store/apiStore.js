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
                    const userProfile = {
                        selectedTypeOfInterest: this.state.mapStore.selectedTypeOfInterest,
                        tripTime: this.state.mapStore.tripTime,
                        methodOfLocomotion: this.state.mapStore.selectedMethodOfLocomotion,
                        currentLocation: this.state.userStore.currentUserLocation,
                    };
                    
                    axios.post(wording.serverAdress + "getWaypoints", { userProfile: userProfile }).then((path) => {
                        resolve(path);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
        checkIsUserIsAuthorizedToConnect(context, password) {
            return new Promise((resolve, reject) => {
                try {
                    axios.post(wording.serverAdress + "login", { username: this.state.userStore.mail, password: password }).then((canAuthentify) => {
                        context.commit('USER_CAN_LOG_IN');
                        resolve(canAuthentify);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
        getGroup() {
            return new Promise((resolve, reject) => {
                try {
                    axios.get(wording.serverAdress + "group/").then((group) => {
                        console.log("group")
                        resolve(group);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
        addGroup(groupInformations) {
            return new Promise((resolve, reject) => {
                try {
                    axios.put(wording.serverAdress + "group", {groupname: groupInformations.name, emails: groupInformations.emails}).then((group) => {
                        resolve(group);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
        checkIsCityIsAuthorizedToConnect(context, password) {
            return new Promise((resolve, reject) => {
                try {
                    axios.post(wording.serverAdress + "register", { email: this.state.userStore.mail, password: password, username: this.state.userStore.username}).then((canAuthentify) => {
                        context.commit('USER_CAN_LOG_IN');
                        resolve(canAuthentify);
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