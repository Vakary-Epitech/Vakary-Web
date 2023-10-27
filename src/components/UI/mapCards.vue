<template>
    <div class="cardBasicContainer">
        <div>
            <span>{{ this.index + 1 }}. </span>
            <span>{{ this.itinerary.itineraryPOI[0].City.name }}</span>
            <span class="float-end">{{ this.groupName ? this.groupName :
                $t("mapCards.noGroups") }}</span>
        </div>
        <div class="text-end">
            <span class="dropboxText">{{ $t("mapCards.createdAt") }} {{ formattedDate }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["itinerary", "index"],
    data() {
        return {
            groupName: null,
            formattedDate: null,
        }
    },
    mounted() {
        this.$store.dispatch("getGroup").then(() => {
            this.$store.state.groupStore.groups.find((group) => {
                if (group.itinerary) {
                    if (group.itinerary.id === this.itinerary.id) {
                        this.groupName = group.name;
                    }
                }
            })
        })
        const date = new Date(this.itinerary.itineraryPOI[0].Description.createdAt);
        this.formattedDate = date.toLocaleString();
    }
}
</script>

<style scoped>

</style>