const userStore = {
    state: {
        userId: "",
        token: "",
        userInfo: {},
        currentUserLocation: {
            latitude: 0,
            longitude: 0,
        },
        mail: "",
        userIsLoggedIn: true,
        username: "",
        userProfileImage: "",
    },
    mutations: {
        UPDATE_USER_LOCATION(state, coords) {
            console.log("User Coords:", coords.latitude, coords.longitude);
            state.currentUserLocation.latitude = 48.8610061;
            state.currentUserLocation.longitude = 2.3359302999999727;
        },
        USER_CAN_LOG_IN(state, mail) {
            state.userIsLoggedIn = true;
            state.mail = mail;
        },
        UPDATE_USER_INFO(state, userInfo) {
            state.userInfo = {};
            state.userInfo = userInfo.data.user;
            if (userInfo.data.token)
                state.token = userInfo.data.token;
            state.mail = userInfo.data.user.email;
            state.userProfileImage = userInfo.data.user.picture;
        },
    },
};

export default userStore;