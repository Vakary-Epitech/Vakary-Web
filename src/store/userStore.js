import axios from "axios";
import wording from "@/utils/wording";

const userStore = {
    state: {
        token: "",
        userInfo: {},
        mail: "",
        username: "",
        userProfileImage: "",
        config: {
            maxBodyLength: Infinity,
            url: wording.serverAdress,
            headers: {},
        },
    },
    getters: {
        getConfig: (state) => ({ url, data, method }) => {
            let conf = { ...state.config };
            conf.url += url;
            if (data)
                conf.data = data;
            conf.method = method;
            return conf;
        },
        getToken: (state) => {
            return (state.config.headers.Authorization)
        },
    },
    mutations: {
        UPDATE_USER_TOKEN(state, token) {
            state.config.headers.Authorization = token;
        },
        UPDATE_USER_INFO(state, userInfo) {
            state.userInfo = {};
            state.userInfo = userInfo.data.user;
            state.mail = userInfo.data.user.email;
            state.userProfileImage = userInfo.data.user.picture;
        },
        CLEAR_USER_INFO(state) {
            state.userInfo = null;
            state.token = "";
        }
    },
    actions: {
        fetchUserData({ commit, getters }) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = getters.getConfig({ url: "me", data: null, method: "get" })
                    axios.request(conf).then((canAuthentify) => {
                        commit('UPDATE_USER_INFO', canAuthentify);
                        resolve(canAuthentify);
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        userConnection({ commit, getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = getters.getConfig({ url: "login", data: data, method: "post" })
                    axios.request(conf).then((canAuthentify) => {
                        commit('UPDATE_USER_TOKEN', canAuthentify.data.user.token);
                        let confData = getters.getConfig({ url: "me", data: null, method: "get" })
                        axios.request(confData).then((canAuthentify) => {
                            commit('UPDATE_USER_INFO', canAuthentify);
                            resolve("user connected");
                        }).catch((error) => {
                            reject(error);
                        })
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        userRegister({ commit, getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = getters.getConfig({ url: "register", data: data, method: "put" })

                    axios.request(conf).then((canAuthentify) => {
                        commit('UPDATE_USER_TOKEN', canAuthentify.data.user.token);
                        let confData = getters.getConfig({ url: "me", data: null, method: "get" })
                        axios.request(confData).then((canAuthentify) => {
                            commit('UPDATE_USER_INFO', canAuthentify);
                            resolve("user connected");
                        }).catch((error) => {
                            reject(error);
                        })
                        resolve("user Created");
                    }).catch((error) => {
                        reject(error);
                    })
                } catch (error) {
                    reject(error);
                }
            })
        },

        userPasswordReset({ getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = getters.getConfig({ url: "forgotPassword", data: data, method: "post" })

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

        userTokenPasswordResetCheck({ getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = getters.getConfig({ url: "password/verificationToken", data: data, method: "post" })

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

        userSendNewPassword({ getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = getters.getConfig({ url: "changePassword", data: data, method: "post" })

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

        updateUserProfile({ commit, getters }, data) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = getters.getConfig({ url: "me", data: null, method: "get" })

                    let requestData = new FormData();
                    requestData.append('description', data.description)
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
        getUserLikes({ getters }) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = getters.getConfig({ url: "me/like/interestPoint", data: null, method: "get" })

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
        deleteUser({ getters }) {
            return new Promise((resolve, reject) => {
                try {
                    let conf = getters.getConfig({ url: "me", data: null, method: "delete" })

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
    }
};

export default userStore;