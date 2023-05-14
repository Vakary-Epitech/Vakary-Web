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
            console.log(groups);
            state.groups = [];
            let emails = [];
            console.log(groups.data);
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

            for (let itinerary in itineraryArray) {
                let itinerayData = {
                    itineraryPOI: JSON.parse(itineraryArray[itinerary].data),
                    id: itineraryArray[itinerary].id,
                };
                state.itinerary.push(itinerayData)
            }
            console.log(state.itinerary)
        },
        ADD_NEW_ITINERARY(state, newItinerary) {
            let itinerayData = {
                itineraryPOI: JSON.parse(newItinerary.data),
                id: newItinerary.id,
            };
            state.itinerary.push(itinerayData);
            console.log(state.itinerary);
        },
        // eslint-disable-next-line
        UDPATE_GROUP_USER_STATUS(state, userStatus) {
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
    }
};

export default globalNonPersistantData;