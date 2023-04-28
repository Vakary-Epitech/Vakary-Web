import axios from "axios";
import wording from "@/utils/wording";

const apiStore = {
    actions: {
        //DONT DELETE FOR NOW COULD BE USEFULL LATER

        /*retrievedCurrentUserPosition(context) {
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
        },*/

        checkIfUserIsAuthorizedToConnect(context, password) {
            return new Promise((resolve, reject) => {
                try {
                    axios.post(wording.serverAdress + "login", { username: this.state.userStore.username, password: password }).then((canAuthentify) => {
                        console.log(canAuthentify);
                        resolve(canAuthentify);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        retrieveUserInformation(context) {
            return new Promise((resolve, reject) => {
                try {
                    axios.get(wording.serverAdress + "user/email/" + this.state.userStore.username, {}).then((userInfo) => {
                        context.commit('UPDATE_USER_INFO', userInfo);
                        resolve(userInfo);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        getGroup(context) {
            return new Promise((resolve, reject) => {
                try {
                    axios.post(wording.serverAdress + "group/getAll", { id: this.state.userStore.userId }).then((group) => {
                        console.log(group)
                        context.commit('UPDATE_USER_GROUP', group);
                        resolve(group);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        addGroup(context, groupInformation) {
            return new Promise((resolve, reject) => {
                try {
                    let mailsList = [];
                    for (let mailIndex in groupInformation.members) {
                        mailsList.push(groupInformation.members[mailIndex].mail)
                    }
                    axios.put(wording.serverAdress + "group", { groupname: groupInformation.name, adminId: this.state.userStore.userId, emails: mailsList }).then((group) => {
                        resolve(group);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        requestPasswordReset(context, email) {
            return new Promise((resolve, reject) => {
                try {
                    axios.post(wording.serverAdress + "forgotPassword", { email: email }).then((canAuthentify) => {
                        console.log(canAuthentify);
                        resolve(canAuthentify)
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        checkIfAccountCanBeCreated(context, password) {
            return new Promise((resolve, reject) => {
                try {
                    console.log("email: ", this.state.userStore.mail, "password: ", password, "username: ", this.state.userStore.username)
                    axios.put(wording.serverAdress + "register", { email: this.state.userStore.mail, password: password, username: this.state.userStore.username }).then((canAuthentify) => {
                        console.log(canAuthentify.data);
                        context.commit('UPDATE_USER_INFO', canAuthentify);
                        resolve(canAuthentify)
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        sendNewPassword(context, requestParameters) {
            return new Promise((resolve, reject) => {
                try {
                    axios.patch(wording.serverAdress + "/changePassword", { id: this.state.userStore.userId }, {
                        headers: {
                            'authorization': requestParameters.authorization
                        }
                    }).then((canAuthentify) => {
                        console.log(canAuthentify);
                        resolve(canAuthentify)
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