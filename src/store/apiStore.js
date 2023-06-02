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
                        for (let id in group.data.groups) {
                            context.dispatch("getGroupStatus", group.data.groups[id]);
                        }
                        resolve(group.data);
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

                    let data = new FormData();
                    data.append('groupname', groupInformation.name)
                    data.append('emails', mailsList)
                    if (typeof(groupInformation.picture) == "object")
                        data.append('file', groupInformation.picture[0], groupInformation.picture[0].name);

                    axios.put(wording.serverAdress + 'group', data, { headers: { "Authorization": this.state.userStore.token } }).then((group) => {
                        resolve(group);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        addGroupToItinerary(context, data) {
            return new Promise((resolve, reject) => {
                try {
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

        get(context, { path, token }) {
            return new Promise((resolve, reject) => {
                try {
                    const headers = {};
                    if (token) {
                        headers.Authorization = token;
                    }
                    axios.get(wording.serverAdress + path, { headers }).then((response) => {
                        if (path == "group/getAll/me") {
                            context.commit('UPDATE_USER_GROUP', response);
                        }
                        if (path == "") {
                            for (let userStatus in response.data.groupUser) {
                                context.commit('UPDATE_GROUP_USER_STATUS', response.data.groupUser[userStatus]);
                            }
                        }
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
        post(context, { path, data, token }) {
            return new Promise((resolve, reject) => {
                try {
                    const headers = {};
                    if (token) {
                        headers.Authorization = token;
                    }
                    axios.post(wording.serverAdress + path, { ...data }, { headers }).then((response) => {
                        if (path == "login") {
                            context.commit('UPDATE_USER_INFO', response);
                            context.commit('UPDATE_USER_TOKEN', response.data.token);
                        }
                        if (path == "getPath") {
                            context.commit('UPDATE_PATH', response.data.path);
                        }
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        put(context, { path, data, token }) {
            return new Promise((resolve, reject) => {
                try {
                    const headers = {};
                    if (token) {
                        headers.Authorization = token;
                    }
                    axios.put(wording.serverAdress + path, { ...data }, { headers }).then((response) => {
                        if (path == "group") {
                            context.commit('ADD_NEW_GROUP', response);
                        }
                        if (path == "itinerary/me") {
                            if (response.data.createdItinerary) {
                                context.commit('ADD_NEW_ITINERARY', response.data.createdItinerary);
                            }
                        }
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
        delete(context, { path, token }) {
            return new Promise((resolve, reject) => {
                try {
                    const headers = {};
                    if (token) {
                        headers.Authorization = token;
                    }
                    axios.delete(wording.serverAdress + path, { headers }).then((response) => {
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        getGroupStatus(context, groups) {
            return new Promise((resolve, reject) => {
                try {

                    let config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: wording.serverAdress + "group_user/getAll/" + groups.id,
                        headers: {
                            "Authorization": this.state.userStore.token,
                        },
                    }

                    axios.request(config).then((response) => {
                        for (let userStatus in response.data.groupUser) {
                            context.commit('UPDATE_GROUP_USER_STATUS', response.data.groupUser[userStatus]);
                        }
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        groupInvitation(context, action) {
            return new Promise((resolve, reject) => {
                try {

                    let config = {
                        method: 'patch',
                        maxBodyLength: Infinity,
                        url: wording.serverAdress + "group_user/" + action.backendGroupId,
                        headers: {
                            "Authorization": this.state.userStore.token,
                        },
                        data: {
                            email: this.state.userStore.mail,
                            status: action.status,
                        }
                    }

                    axios.request(config).then((response) => {
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        patch(context, { path, data, token }) {
            return new Promise((resolve, reject) => {
                try {
                    const headers = {};
                    if (token) {
                        headers.Authorization = token;
                    }
                    axios.patch(wording.serverAdress + path, { ...data }, { headers }).then((response) => {
                        // context.commit('UPDATE_USER_INFO', response);
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },
        calculatePath(context, itinerary) {
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

                    let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: wording.serverAdress + "getPath",
                        data: {
                            destination: destination,
                            origin: origin,
                            waypoints: arrayOfOrigin,
                        }
                    }
                    axios.request(config).then((steps) => {
                        context.commit('UPDATE_PATH', steps.data.path);
                        resolve(steps);
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

export default apiStore;