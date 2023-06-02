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
            groupName: null
        }
    },
    mounted() {
        this.$store.dispatch("getGroup").then(() => {

            /*const group = this.$store.state.groupStore.groups.find((group) => {
                if (group.itinerary)
                    group.itinerary.id === this.itinerary.id;
            })
            if (group) {
                this.groupName = group.name;
            }*/
        }).catch((error) => {
            console.log(error);
        });
    },
}
</script>

<style scoped>
.alignRight {
    float: right;
}
</style>