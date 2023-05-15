<template>
    <div class="cardBasicContainer">
        <div>
            <span>{{ this.itinerary.id }}. </span>
            <span>{{ this.itinerary.itineraryPOI[0].City.name }}</span>
            <span class="alignRight ">{{ $t("mapPage.group") }}: {{ this.groupName ? this.groupName : "Aucun groupe assigné" }}</span>
        </div>
        <!-- <div>
            <span class="dropboxText">{{ this.time }}</span> -->
            <!-- <span class="dropboxText textBasicMargin alignRight">{{ this.itinerary.itineraryPOI[0].Description.createdAt }}</span>
        </div> -->
    </div>
</template>

<script>
export default {
    props :["itinerary"],
    data () {
        return {
            groupName: null
        }
    },
    created() {
        console.log(this.itinerary)
    },
    mounted() {
        this.$store.dispatch("getGroup").then(() => {
            const group = this.$store.state.globalNonPersistantData.groups.find((group) => {
                if (group.itinerary)
                    group.itinerary.id === this.itinerary.id;
            });
            if (group) {
                this.groupName = group.name;
            }
        });
    },
}
</script>

<style scoped>

.alignRight {
    float: right;
}
</style>