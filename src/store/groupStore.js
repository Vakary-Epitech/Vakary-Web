import axios from "axios";
import wording from "@/utils/wording";

const groupStore = {
    state: {
        groups: [],
    },
    mutations: {
        UPDATE_USER_GROUP(state, groups) {
            state.groups = [];
            let emails = [];
            for (let group in groups.data.groups) {
                emails = [];
                for (let mail in groups.data.groups[group].emails) {
                    emails.push({
                        id: mail,
                        emails: groups.data.groups[group].emails[mail],
                        status: "unverified",
                    })
                }
                state.groups.push({
                    id: state.groups.length,
                    backendGroupId: groups.data.groups[group].id,
                    name: groups.data.groups[group].name,
                    emails: emails,
                    itinerary: groups.data.groups[group].itinerary,
                    photo: groups.data.groups[group].picture,
                })
            }
        },
        UPDATE_GROUP_USER_STATUS(state, userStatus) {
            for (let group in state.groups) {
                if (state.groups[group].backendGroupId == userStatus.groupId) {
                    const i = state.groups[group].emails.findIndex(mail => mail.emails === userStatus.User.email)
                    if (i > -1) {
                        state.groups[group].emails[i].status = userStatus.status;
                    }
                    state.groups[group].emails[userStatus.User.email] = userStatus.User.status;
                }
            }
        },
    },
    actions: {
        deleteGroup({ getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    if (!data.backendGroupId)
                        return;

                    let config = getters.getConfig({ url: "group/" + data.backendGroupId, data: null, method: "delete" })

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

        getGroup({ commit, getters, dispatch }) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "group/getAll/me", data: null, method: "get" })

                    axios.request(config).then((group) => {
                        commit('UPDATE_USER_GROUP', group);
                        for (let id in group.data.groups) {
                            dispatch("getGroupStatus", group.data.groups[id]);
                        }
                        resolve(group)
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        addGroup({ getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let mailsList = "";
                    for (let mailIndex in data.members) {
                        if (data.members[mailIndex].mail)
                            mailsList += data.members[mailIndex].mail + ";";
                    }
                    mailsList = mailsList.slice(0, -1);

                    let formData = new FormData();
                    formData.append('groupname', data.name)
                    formData.append('emails', mailsList)
                    if (typeof (data.picture) == "object")
                        formData.append('file', data.photo);

                    axios.put(wording.serverAdress + 'group', formData, { headers: { "Authorization": getters.getToken } }).then((group) => {
                        resolve(group);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        getGroupStatus({ commit, getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "group_user/getAll/" + data.id, data: null, method: "get" })

                    axios.request(config).then((response) => {
                        for (let userStatus in response.data.groupUser) {
                            commit('UPDATE_GROUP_USER_STATUS', response.data.groupUser[userStatus]);
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

        groupInvitation({ getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "group_user/" + data.backendGroupId, data: data, method: "patch" })

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

        addGroupToItinerary({ getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let config = getters.getConfig({ url: "group/" + data.groupId, data: data, method: "patch" })
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
    }
};

export default groupStore;