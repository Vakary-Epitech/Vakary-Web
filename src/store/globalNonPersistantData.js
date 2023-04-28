const globalNonPersistantData = {
    state: {
        userId: "",
        userInfo: {},
        currentUserLocation: {
            latitude: 0,
            longitude: 0,
        },
        mail: "",
        userIsLoggedIn: true,
        username: "",
        groups: [],
    },
    mutations: {
        UPDATE_USER_GROUP(state, groups) {
            state.groups = [];
            for (let group in groups.data.groups) {
                state.groups.push({
                    id: state.groups.length,
                    backendGroupId: groups.data.groups[group].id,
                    name: groups.data.groups[group].name,
                    emails: groups.data.groups[group].emails,
                })
            }
        },
    }
};

export default globalNonPersistantData;