const globalNonPersistantData = {
    state: {
        userId: "",
        userInfo: {},
        mail: "",
        userIsLoggedIn: true,
        username: "",
        groups: [],
        itinerary: [],
        marker: [],
        path: [],
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
        UPDATE_ITINERARY(state, itineraryArray) {
            state.itinerary = [];
            state.marker = [];

            for (let itinerary in itineraryArray) {
                let itinerayData = {
                    itineraryPOI: JSON.parse(itineraryArray[itinerary].data),
                    id: itineraryArray[itinerary].id,
                };
                state.itinerary.push(itinerayData)
                for (let POI in itinerayData.itineraryPOI) {
                    state.marker.push({
                        label: itinerayData.itineraryPOI[POI].name,
                        geolocalisation: {
                            lat: itinerayData.itineraryPOI[POI].Localisation.latitude,
                            lng: itinerayData.itineraryPOI[POI].Localisation.longitude,
                        },
                    });
                }
            }
            for (let group in state.groups) {
                if (state.groups[group].itinerary) {
                    const i = state.itinerary.findIndex(itinerary => itinerary.id === state.groups[group].itinerary.id)
                    if (i == -1)
                        state.itinerary.push({
                            itineraryPOI: JSON.parse(state.groups[group].itinerary.data),
                            id: state.groups[group].itinerary.id,
                        })

                }
            }
        },
        ADD_NEW_ITINERARY(state, newItinerary) {
            const i = state.itinerary.findIndex(itinerary => itinerary.id === newItinerary.id)
            if (i < 0)
                return;

            let itinerayData = {
                itineraryPOI: JSON.parse(newItinerary.data),
                id: newItinerary.id,
            };
            state.itinerary.push(itinerayData);
            for (let POI in itinerayData.itineraryPOI) {
                state.marker.push({
                    label: itinerayData.itineraryPOI[POI].name,
                    geolocalisation: {
                        lat: itinerayData.itineraryPOI[POI].Localisation.latitude,
                        lng: itinerayData.itineraryPOI[POI].Localisation.longitude,
                    },
                });
            }
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
        UPDATE_PATH(state, path) {
            state.waypoints = [];
            for (let point in path) {
                for (let steps in path[point].steps) {
                    state.waypoints.push(path[point].steps[steps].start_location)
                }
            }
        },
        CLEAR_PATH(state) {
            console.log("SVP MR");
            state.waypoints = [];
        }
    }
};

export default globalNonPersistantData;