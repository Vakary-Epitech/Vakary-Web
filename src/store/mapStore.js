const mapStore = {
    state: {
        marker: [],
    },
    mutations: {
        UPDATE_MARKER_ARRAY(state, marker) {
            state.marker = marker;
        }, 
    },
};

export default mapStore;