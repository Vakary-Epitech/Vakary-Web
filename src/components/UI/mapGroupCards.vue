<template>
    <div class="cardBasicContainer">
        <div class="my-2">
            <span class="ms-2"> {{ this.groupName }} </span>
            <span class="alignRight me-2"> {{ this.numberOfMember }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["groupName", "numberOfMember"],
    mounted() {
        this.$store.dispatch("get", {
            path: "group/getAll/me",
            token: this.$store.state.userStore.token,
        }).then((response) => {
            this.$store.commit('UPDATE_USER_GROUP', response);
            for (let id in response.data.groups) {
                this.$store.dispatch("get", {
                    path: "group_user/getAll/" + response.data.groups[id].id,
                    token: this.$store.state.userStore.token,
                }).then((response) => {
                    for (let userStatus in response.data.groupUser) {
                            this.$store.commit('UPDATE_GROUP_USER_STATUS', response.data.groupUser[userStatus]);
                        }
                }).catch((error) => {
                    console.log(error);
                })
            }
        }).catch((error) => {
            console.log(error);
        });
    },
}
</script>

<style scoped>
.cardBasicContainer {
    height: 5vh;
}

.alignRight {
    float: right;
}
</style>