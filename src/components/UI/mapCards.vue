<template>
    <div class="cardBasicContainer">
        <div>
            <span>{{ this.index + 1 }}. </span>
            <span>{{ this.itinerary.itineraryPOI[0].City.name }}</span>
            <span class="alignRight ">{{ $t("mapPage.group") }}: {{ this.groupName ? this.groupName :
                $t("mapCards.noGroups") }}</span>
        </div>
        <!-- <div>
            <span class="dropboxText">{{ this.time }}</span> -->
        <!-- <span class="dropboxText textBasicMargin alignRight">{{ this.itinerary.itineraryPOI[0].Description.createdAt }}</span>
        </div> -->
    </div>
</template>

<script>
export default {
    props: ["itinerary", "index"],
    data() {
        return {
            groupName: null,
            test: null,
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
    }
}
</script>

<style scoped>
.alignRight {
    float: right;
}
</style>