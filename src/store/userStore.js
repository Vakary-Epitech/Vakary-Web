
const userStore = {
    state: {
        currentUserLocation: {
            latitude: 0,
            longitude: 0,
        },
    },
    mutations: {
        UPDATE_USER_LOCATION(state, coords) {
            state.currentUserLocation.latitude = coords.latitude;
            state.currentUserLocation.longitude = coords.longitude;
        },
    },
};

export default userStore;