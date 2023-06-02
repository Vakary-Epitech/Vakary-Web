import axios from "axios";
import wording from "@/utils/wording";

const userStore = {
    state: {
        token: "",
        userInfo: {},
        mail: "",
        username: "",
        userProfileImage: "",
    },
    mutations: {
        UPDATE_USER_INFO(state, userInfo) {
            state.userInfo = {};
            state.userInfo = userInfo.data.user;
            state.mail = userInfo.data.user.email;
            state.userProfileImage = userInfo.data.user.picture;
        },
    },
    actions: {
        userConnection({ commit, rootGetters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = rootGetters.getConfig({ url: "login", data: data, method: "post" })

                    axios.request(conf).then((canAuthentify) => {
                        commit('UPDATE_USER_INFO', canAuthentify);
                        commit('UPDATE_USER_TOKEN', canAuthentify.data.token);
                        resolve("user connected");
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        userRegister({ commit, rootGetters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = rootGetters.getConfig({ url: "register", data: data, method: "put" })

                    axios.request(conf).then((canAuthentify) => {
                        commit('UPDATE_USER_INFO', canAuthentify);
                        commit('UPDATE_USER_TOKEN', canAuthentify.data.token);
                        resolve("user Created");
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        userPasswordReset({ rootGetters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = rootGetters.getConfig({ url: "forgotPassword", data: data, method: "post" })

                    axios.request(conf).then((canAuthentify) => {
                        resolve(canAuthentify)
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        userTokenPasswordResetCheck({ rootGetters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = rootGetters.getConfig({ url: "password/verificationToken", data: data, method: "post" })

                    axios.request(conf).then(() => {
                        resolve(true);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        userSendNewPassword({ rootGetters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = rootGetters.getConfig({ url: "changePassword", data: data, method: "post" })

                    axios.request(conf).then((canAuthentify) => {
                        resolve(canAuthentify)
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        updateUserProfile({ commit, rootGetters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = rootGetters.getConfig({ url: "me", data: null, method: "get" })
                    let requestData = new FormData();
                    requestData.append('description', requestData.description)

                    if (typeof (data.picture) == 'object')
                        requestData.append('profilPicture', data.picture[0], data.picture[0].name);

                    axios.patch(wording.serverAdress + 'me', requestData, { headers: { "Authorization": conf.headers.Authorization } }).then(() => {
                        axios.request(conf).then((userProfile) => {
                            commit('UPDATE_USER_INFO', userProfile);
                            resolve("profile updated");
                        }).catch((error) => {
                            reject(error)
                        })
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

export default userStore;