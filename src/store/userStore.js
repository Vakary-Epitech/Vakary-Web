
const userStore = {
    state: {
        currentUserLocation: {
            latitude: 0,
            longitude: 0,
        },
        mail: "",
        userIsLoggedIn: false,
    },
    mutations: {
        UPDATE_USER_LOCATION(state, coords) {
            console.log("User Coords:", coords.latitude, coords.longitude);
            state.currentUserLocation.latitude = 49.356444;
            state.currentUserLocation.longitude = 6.169481;
        },
        USER_CAN_LOG_IN(state) {
            state.userIsLoggedIn = true;
        },
    },
};

export default userStore;