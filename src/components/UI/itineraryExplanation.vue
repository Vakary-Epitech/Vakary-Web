<template>
    <MapWindows style="min-height: 80vh;" dropdown="true">
        <div class="row" v-if="!loading">
            <div class="col-3 my-auto">
                <div class="backArrow" @click="goBackToItineraryDropdown"></div>
            </div>
            <h4 class="titleLimiterSize col-6 my-auto text-center">{{
                this.selectedItineraryInfo?.itineraryPOI[this.currentWaypointIndex].City.name }}
            </h4>
            <div class="col-3 text-end my-auto">
                <button class="deleteButton" @click="deleteItinerary()">
                    <i class="fa-solid fa-trash fa-xl"></i>
                </button>
            </div>
            <div class="col-12 ms-3 my-auto text-center titleLimiterSize">
                <h4>{{ getCurrentPOIName }}</h4>
            </div>
            <div class="imgWrapper text-center">
                <img class="imageProportion" :src="getCurrentPOIImage" />
            </div>
            <span class="textMargin descriptionLimiterSize" style="font-size: calc(6px + 1.2vh)">{{
                getCurrentPOIDescription }}</span>
            <div class="openHoursDesign timeSizeLimiter card">
                <span style="white-space: pre-line; font-size: calc(6px + 1.2vh);">{{ $t("mapPage.openHours") }} <br />{{
                    getCurrentPOIOpenHours }}</span>
            </div>
            <div class="row custom">
                <div class="col-6 text-start">
                    <span class="ms-1" v-if="this.currentWaypointIndex > 0"> {{ $t("mapPage.previousPoint") }}</span>
                    <button v-if="this.currentWaypointIndex > 0" class="custom-button" @click="checkPreviousPOI"><i
                            class="fa-solid fa-2xl fa-arrow-left custom-arrow"></i></button>
                </div>
                <div class="col-6 text-end">
                    <span v-if="this.currentWaypointIndex < this.selectedItineraryInfo?.itineraryPOI.length - 1"> {{
                        $t("mapPage.nextPoint") }}</span>
                    <button v-if="this.currentWaypointIndex < this.selectedItineraryInfo?.itineraryPOI.length - 1"
                        class="custom-button ms-1" @click="checkNextPOI"><i
                            class="fa-solid fa-2xl fa-arrow-right custom-arrow"></i></button>
                </div>
            </div>
        </div>
        <Loading v-if="loading"/>
    </MapWindows>
</template>

<script>
import Loading from "./loadingSpin.vue";
import MapWindows from "@/components/UI/MapWindows.vue";
export default {
    components: {
        MapWindows,
        Loading
    },
    props: ["selectedItineraryInfo"],
    data() {
        return {
            loading: false,
            currentWaypointIndex: 0,
        }
    },
    mounted() {
        this.$store.dispatch("calculatePath", this.selectedItineraryInfo)
        this.$store.commit('UPDATE_MARKER', this.selectedItineraryInfo)
    },
    computed: {
        getCurrentPOIName() {
            return (this.selectedItineraryInfo?.itineraryPOI[this.currentWaypointIndex].name);
        },
        getCurrentPOIDescription() {
            return (this.selectedItineraryInfo?.itineraryPOI[this.currentWaypointIndex].Description[this.$i18n.locale]);
        },
        getCurrentPOIImage() {
            return (this.selectedItineraryInfo?.itineraryPOI[this.currentWaypointIndex].image);
        },
        getCurrentPOIOpenHours() {
            if (this.selectedItineraryInfo?.itineraryPOI[this.currentWaypointIndex].openingHours === "false") {
                return (this.$t("mapPage.noOpeningHours"));
            }
            let timeStamp = JSON.parse(this.selectedItineraryInfo?.itineraryPOI[this.currentWaypointIndex].openingHours);
            try {
                let timeString = "";
                for (let i in timeStamp.label[this.$i18n.locale])
                    timeString += timeStamp.label[this.$i18n.locale][i];
                return (timeString);
            } catch (error) {
                let timeString = "";
                for (let i in timeStamp[0]['opens'])
                    timeString += timeStamp[0]['opens'][i];
                timeString += " - ";
                for (let i in timeStamp[0]['closes'])
                    timeString += timeStamp[0]['closes'][i];
                if (timeString.includes("false"))
                    return (this.$t("mapPage.noOpeningHours"))
                return (timeString);
            }
        },
    },
    methods: {
        goBackToItineraryDropdown() {
            this.$emit("goBackToItineraryDropdown");
            this.$store.commit('REMOVE_MARKER')
        },
        checkNextPOI() {
            if (this.currentWaypointIndex < this.selectedItineraryInfo?.itineraryPOI.length - 1) {
                this.currentWaypointIndex += 1;
                this.$emit("checkNextPOI");
            }
        },
        checkPreviousPOI() {
            if (this.currentWaypointIndex > 0) {
                this.currentWaypointIndex -= 1;
                this.$emit("checkPreviousPOI");
            }
        },
        deleteItinerary() {
            this.loading = true;
            this.$store.dispatch("deleteItinerary", { itineraryId: this.selectedItineraryInfo.id }).then(() => {
                this.$store.dispatch("getItinerary").then(() => {
                    this.loading = false;
                    this.$emit("goBackToItineraryDropdown");
                }).catch((error) => {
                    this.loading = false;
                    this.error = error?.response?.data;
                })
            }).catch((error) => {
                this.loading = false;
                this.error = error?.response?.data;
            })
        },
    }
}
</script>

<style scoped lang="scss">
.deleteButton {
    border-radius: 5px;
    border: 1px solid red;
    background-color: var(--background-color);
    color: var(--text-color);
    padding: 5px;
}

.deleteButton:hover {
    color: red;
}

.custom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}

.custom-arrow {
    color: rgb(192, 150, 40);
}

.custom-button {
    margin-bottom: 15px;
    background-color: var(--background-color);
    border: 3px solid var(--background-cards-color);
    border-radius: 15px;
}

.custom-button:hover {
    border: 3px solid rgb(192, 150, 40);
}

::-webkit-scrollbar {
    width: 0 !important;
}

.imgWrapper {
    padding: auto;
    margin: auto;
    margin-top: calc(4px + 0.6vh);
    margin-bottom: calc(4px + 0.6vh);
    margin-left: 0.1vw;
    margin-right: 0.2vw;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
    min-width: 285px;
    align-self: center;
}

.imageProportion {
    height: 20vh;
    max-width: 285px;
    margin-top: calc(2px + 0.6vh);
    margin-bottom: calc(2px + 0.6vh);
}

.textMargin {
    display: flex;
    margin-left: calc(3px + 0.6vw);
    margin-right: calc(3px + 0.6vw);
}

.openHoursDesign {
    display: flex;
    text-align: center;
    margin-top: calc(3px + 0.6vh);
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
}

.descriptionLimiterSize {
    max-height: 20vh;
    overflow: auto;
}

.titleLimiterSize {
    max-height: 10vh;
    overflow: auto;
}

.timeSizeLimiter {
    margin-top: 15px;
    overflow: auto;
}

div.backArrow {
    cursor: pointer;
    width: 3vmin;
    height: 3vmin;
    box-sizing: border-box;
    transform: rotate(-135deg);

    &::before {
        content: '';
        width: 100%;
        height: 100%;
        border-width: .3vmin .3vmin 0 0;
        border-style: solid;
        border-color: #C09628;
        transition: .2s ease;
        display: block;
        transform-origin: 100% 0;
    }


    &:after {
        content: '';
        float: left;
        position: relative;
        top: -100%;
        width: 100%;
        height: 100%;
        border-width: 0 .3vmin 0 0;
        border-style: solid;
        border-color: #C09628;
        transform-origin: 90% 0;
        transition: .2s ease;
    }

    &:hover::after {
        transform: rotate(45deg);
        border-color: #C09628;
        height: 120%;
    }

    &:hover::before {
        border-color: #C09628;
        transform: scale(.8);

    }

}
.card {
  background-color: var(--background-cards-color);
}

</style>