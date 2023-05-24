<template>
    <div class="explanatoryCardDesign row">
        <div>
            <div class="mt-3 backArrow" @click="goBackToItineraryDropdown"></div>
            <h4 class="titleLimiterSize">{{ this.selectedItineraryInfo?.itineraryPOI[this.currentWaypointIndex].City.name }}</h4>
            <div class="ms-3 my-auto text-center titleLimiterSize">
                <h4>{{ getCurrentPOIName }}</h4>
            </div>
            <div class="imgWrapper text-center">
                <img class="imageProportion" :src="getCurrentPOIImage" />
            </div>
            <span class="textMargin descriptionLimiterSize" style="font-size: calc(6px + 1.2vh)">{{ getCurrentPOIDescription}}</span>
            <div class="openHoursDesign timeSizeLimiter">
                <span style="white-space: pre-line; font-size: calc(6px + 1.2vh);">{{ $t("mapPage.openHours") }} <br />{{ getCurrentPOIOpenHours }}</span>
            </div>
            <div class="row custom">
                <div class="col-6 text-start">
                    <button v-if="this.currentWaypointIndex > 0" class="custom-button" @click="checkPreviousPOI"><i
                            class="fa-solid fa-2xl fa-arrow-left custom-arrow"></i></button>
                    <span class="ms-1" v-if="this.currentWaypointIndex > 0"> {{ $t("mapPage.previousPoint") }}</span>
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
    </div>
</template>

<script>
export default {
    props: ["selectedItineraryInfo"],
    data() {
        return {
            currentWaypointIndex: 0,
        }
    },
    mounted() {
        if (this.selectedItineraryInfo?.itineraryPOI.length < 2) {
                        return;
                    }
        let arrayOfOrigin = [];
        for (let itineraryData in this.selectedItineraryInfo?.itineraryPOI) {
            arrayOfOrigin.push({
                lat: this.selectedItineraryInfo.itineraryPOI[itineraryData].Localisation.latitude,
                lng: this.selectedItineraryInfo.itineraryPOI[itineraryData].Localisation.longitude,
            })
        }

        const destination = arrayOfOrigin[arrayOfOrigin.length - 1]
        const origin = arrayOfOrigin[0]

        arrayOfOrigin.pop();
        arrayOfOrigin.shift();
        this.$store.dispatch("post", {
            path: "getPath",
            data: {
                origin: origin,
                destination: destination,
                waypoints: arrayOfOrigin,
            }
        }).then(() => {
            console.log("all fine")
        })
        .catch((error) => {
            console.log(error);
        });
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
            return (this.selectedItineraryInfo?.itineraryPOI[this.currentWaypointIndex].openingHours);
        },
    },
    methods: {
        goBackToItineraryDropdown() {
            this.$emit("goBackToItineraryDropdown");
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
    }
}
</script>

<style scoped lang="scss">
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
    background-color: #fff;
    border: 3px solid #fff;
    border-radius: 15px;
}

.custom-button:hover {
    border: 3px solid rgb(192, 150, 40);
}

.explanatoryCardDesign {
    overflow: auto;
    display: flex;
    background-color: var(--background-color-primary);
    color: var(--text-primary-color);
    border-radius: 15px;
    border: none;
    font-size: calc(6px + 0.6vw);
    width: 350px;
    height: 90vh;
    margin-top: 0.1vh;
    margin-bottom: 0.1vh;
    text-align: center;
    border: 2px solid rgb(192, 150, 40);
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
    max-height: 14vh;
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

.frontArrow {
    cursor: pointer;
    width: 3vmin;
    height: 3vmin;
    box-sizing: border-box;
    transform: rotate(45deg);
    margin-top: calc(4px + 0.6vh);
    margin-right: calc(6px + 0.6vw);

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

div.backArrowBottom {
    cursor: pointer;
    width: 3vmin;
    height: 3vmin;
    box-sizing: border-box;
    transform: rotate(-135deg);
    margin-top: calc(4px + 0.6vh);
    margin-left: calc(6px + 0.6vw);

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


.slide-fade-enter-active {
    position: absolute;
    transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>