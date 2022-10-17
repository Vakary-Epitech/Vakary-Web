const mapStore = {
    state: {
        marker: [],
        selectedMarker: [],
        selectedMethodOfLocomotion: "walking",
        selectedTypeOfInterest: [],
        tripTime: "",
    },
    mutations: {
        UPDATE_MARKER_ARRAY(state, marker) {
            state.marker = marker;
        },
        ADD_GEOLOCALISATION_OF_MARKER(state, geolocalisation) {
            state.selectedMarker.push(geolocalisation);
        },
        RESET_SELECTED_MARKER(state) {
            state.selectedMarker = [];
        },
    },
    actions: {
        markerHasBeenSelected(context, geolocalisation) {
            context.commit('ADD_GEOLOCALISATION_OF_MARKER', geolocalisation);
        },
        resetSelectedMarker(context) {
            context.commit('RESET_SELECTED_MARKER');
        },
    },
};

export default mapStore;