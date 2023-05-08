const globalNonPersistantData = {
    state: {
        userId: "",
        userInfo: {},
        mail: "",
        userIsLoggedIn: true,
        username: "",
        groups: [],
        itinerary: [],
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
                        status: "unverified"
                    })
                }
                state.groups.push({
                    id: state.groups.length,
                    backendGroupId: groups.data.groups[group].id,
                    name: groups.data.groups[group].name,
                    emails: emails,
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
            for (let itinerary in itineraryArray) {
                state.itinerary.push(JSON.parse(itineraryArray[itinerary].data));
            }
        },
        ADD_NEW_ITINERARY(state, newItinerary) {
            state.itinerary.push(JSON.parse(newItinerary));
        }
    }
};

export default globalNonPersistantData;