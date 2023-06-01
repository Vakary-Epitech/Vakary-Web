import axios from "axios";
import wording from "@/utils/wording";

const groupStore = {
    state: {
        groups: "UIUIUI",
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
        ADD_NEW_GROUP(state, group) {
            let emails = [];

            for (let mail in group.data.membersEmails) {
                emails.push({
                    id: mail,
                    emails: group.data.membersEmails[mail],
                    status: "unverified"
                })
            }
            state.groups.push({
                id: state.groups.length,
                backendGroupId: group.data.groupId,
                name: group.data.groupName,
                emails: emails,
            })
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
        testNewStore({ context, rootState }) {
            console.log(context);
            console.log(rootState);
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
    }
};

export default groupStore;