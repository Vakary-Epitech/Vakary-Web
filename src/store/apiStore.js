import axios from "axios";
import wording from "@/utils/wording";

const apiStore = {
    actions: {
        getItinerary(context) {
            return new Promise((resolve, reject) => {
                try {

                    let config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: wording.serverAdress + "itinerary/getAll/me",
                        headers: {
                            "Authorization": this.state.userStore.token
                        },
                    };

                    axios.request(config).then((itinerary) => {
                        console.log(itinerary.data.itinerary)
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
                        if (itinerary.data.itinerary) {
                            context.commit('UPDATE_ITINERARY', itinerary.data.itinerary);
                        }
                        resolve(itinerary.data);
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
                            "Authorization": this.state.userStore.token
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

        checkIfUserIsAuthorizedToConnect(context, password) {
            return new Promise((resolve, reject) => {
                try {
                    axios.post(wording.serverAdress + "login", { username: this.state.userStore.mail, password: password }).then((canAuthentify) => {
                        console.log(canAuthentify);
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
                    if (!this.state.userStore.token)
                        return

                    let config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: wording.serverAdress + 'group/getAll/me',
                        headers: {
                            "Authorization": this.state.userStore.token
                        }
                    }
                    axios.request(config).then((group) => {
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
                    let mailsList = "";
                    for (let mailIndex in groupInformation.members) {
                        if (groupInformation.members[mailIndex].mail)
                            mailsList += groupInformation.members[mailIndex].mail + ";";
                    }
                    mailsList = mailsList.slice(0, -1);

                    let config = {
                        method: 'put',
                        maxBodyLength: Infinity,
                        url: wording.serverAdress + 'group',
                        headers: {
                            "Authorization": this.state.userStore.token,
                        },
                        data: {
                            emails: mailsList,
                            groupname: groupInformation.name,
                            file: groupInformation.picture,
                        },
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

        verifyTokenPasswordReset(context, token) {
            return new Promise((resolve, reject) => {
                try {
                    axios.post(wording.serverAdress + "password/verificationToken", { token: token }).then(() => {
                        resolve(true);
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
                    axios.post(wording.serverAdress + "changePassword", { password: requestParameters.password,  }, {
                        headers: {
                            'Authorization': requestParameters.token
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

        checkIfAccountCanBeCreated(context, password) {
            return new Promise((resolve, reject) => {
                try {
                    axios.put(wording.serverAdress + "register", { email: this.state.userStore.mail, password: password, username: this.state.userStore.username }).then((canAuthentify) => {
                        console.log(canAuthentify);
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

        // eslint-disable-next-line
        addGroupToItinerary(context, data) {
            return new Promise((resolve, reject) => {
                try {
                    console.log(data);
                    axios.patch(wording.serverAdress + "group/" + data.groupId, { groupname: data.groupName, itineraryId: data.itineraryId }).then((response) => {
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        // get function
        get(context, path) {
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
        post(context, {path, data}) {
            return new Promise((resolve, reject) => {
                try {
                    axios.post(wording.serverAdress + path, {...data}).then((response) => {
                        context.commit('UPDATE_USER_INFO', response);
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
        put(context, {path, data}) {
            return new Promise((resolve, reject) => {
                try {
                    axios.put(wording.serverAdress + path, {...data}).then((response) => {
                        context.commit('UPDATE_USER_INFO', response);
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
        delete(context, {path, data}) {
            return new Promise((resolve, reject) => {
                try {
                    axios.delete(wording.serverAdress + path, {...data}).then((response) => {
                        resolve(response);
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