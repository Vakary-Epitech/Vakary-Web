import axios from "axios";
import wording from "@/utils/wording";

const apiStore = {
    actions: {
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
    },
}

export default apiStore;