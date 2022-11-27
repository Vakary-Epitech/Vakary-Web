const userStore = {
    state: {
        currentUserLocation: {
            latitude: 0,
            longitude: 0,
        },
        mail: "",
        userIsLoggedIn: true,
        username: "",
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
    },
};

export default userStore;