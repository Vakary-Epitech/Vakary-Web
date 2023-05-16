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
        this.$store.dispatch("getGroup").then(() => {
            this.$store.dispatch("getItinerary")
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