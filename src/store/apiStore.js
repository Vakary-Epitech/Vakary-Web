import axios from "axios";
import wording from "@/utils/wording";

const apiStore = {
    actions: {

        createNewItinerary(context, itinerary) {
            return new Promise((resolve, reject) => {
                try {
                    axios.put(wording.serverAdress + "itinerary", {
                        city: itinerary.city,
                        availableTime: itinerary.availableTime,
                        budget: itinerary.budget,
                        nbPeople: itinerary.nbPeople,
                        nbChild: itinerary.nbChild,
                        typeResearchLocations: itinerary.typeResearchLocations,
                        handicapAccess: itinerary.handicapAccess,
                        userId: this.state.userStore.userId
                    }).then((canAuthentify) => {
                        resolve(canAuthentify);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        checkIfUserIsAuthorizedToConnect(context, password) {
            return new Promise((resolve, reject) => {
                try {
                    axios.post(wording.serverAdress + "login", { username: this.state.userStore.username, password: password }).then((canAuthentify) => {
                        context.commit('UPDATE_USER_INFO', canAuthentify);
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
                    axios.get(wording.serverAdress + "user/email/" + this.state.userStore.mail, {}).then((userInfo) => {
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

        deleteGroup(context, group) {
            return new Promise((resolve, reject) => {
                try {
                    if (!group.backendGroupId)
                        return;

                    let config = {
                        method: 'delete',
                        maxBodyLength: Infinity,
                        url: wording.serverAdress + "group/" + group.backendGroupId,
                        headers: {},
                    };

                    axios.request(config)
                        .then((result) => {
                            resolve(result);
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
                    if (!this.state.userStore.userId)
                        return

                    let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: wording.serverAdress + 'group/getAll/' + this.state.userStore.userId,
                        headers: {}
                    }
                    axios.request(config).then((group) => {
                        console.log(group);
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
                        if (groupInformation.members[mailIndex].mail)
                            mailsList.push(groupInformation.members[mailIndex].mail)
                    }

                    const formData = new FormData();
                    formData.append("emails", mailsList);
                    formData.append("groupname", groupInformation.name);
                    formData.append("file", groupInformation.picture);

                    let config = {
                        method: 'put',
                        maxBodyLength: Infinity,
                        header: {
                            'Content-Type': 'multipart/form-data'
                        },
                        url: wording.serverAdress + 'group',
                        data: formData,
                    }

                    axios.request(config).then((group) => {
                        context.commit('ADD_NEW_GROUP', group);
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
                    axios.put(wording.serverAdress + "register", { email: this.state.userStore.mail, password: password, username: this.state.userStore.username }).then((canAuthentify) => {
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
                        resolve(canAuthentify)
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
        // get function
        get(path) {
            return new Promise((resolve, reject) => {
                try {
                    axios.get(wording.serverAdress + path).then((response) => {
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
    },
}

export default apiStore;