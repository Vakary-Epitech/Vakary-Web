const globalNonPersistantData = {
    state: {
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
                    photo: groups.data.groups[group].picture,
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
    }
};

export default globalNonPersistantData;