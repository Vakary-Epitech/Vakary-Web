<template>
    <div class="explanatoryCardDesign">
        <div>
            <div class="topBarExplanation">
                <div class="backArrow" @click="goBackToItineraryDropdown"></div>
                <span class="titlePosition" style="font-size: calc(8px + 0.6vw);">{{ this.selectedItineraryInfo.city
                }}</span>
            </div>
            <span style="font-size: calc(6px + 0.6vw);">{{ getCurrentPOIName }}</span>
            <br />
            <div class="imgWrapper">
                <img class="imageProportion" :src="getCurrentPOIImage" />
            </div>
            <span class="textMargin descriptionLimiterSize" style="font-size: calc(6px + 1.2vh)">{{ getCurrentPOIDescription
            }}</span>
            <div class="openHoursDesign timeSizeLimiter">
                <span style="white-space: pre-line; font-size: calc(6px + 1.2vh);">{{ $t("mapPage.openHours") }} <br />{{ getCurrentPOIOpenHours }}</span>
            </div>
            <div class="arrowOnTheLine">
                <div style="display: flex; width: 50%;">
                    <div v-if="this.currentWaypointIndex > 0" class="backArrowBottom" @click="checkPreviousPOI"></div>
                    <span style="font-size: calc(4px + 1.2vh); margin: auto" v-if="this.currentWaypointIndex > 0">{{
                        $t("mapPage.previousPoint") }}</span>
                </div>
                <div style="display: flex; width: 50%; justify-content: right;">
                    <span v-if="this.currentWaypointIndex < this.selectedItineraryInfo.POIInfo.length - 1"
                        style="font-size: calc(4px + 1.2vh); margin: auto">{{ $t("mapPage.nextPoint") }}</span>
                    <div v-if="this.currentWaypointIndex < this.selectedItineraryInfo.POIInfo.length - 1" class="frontArrow"
                        @click="checkNextPOI"></div>
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
    computed: {
        getCurrentPOIName() {
            return (this.selectedItineraryInfo.POIInfo[this.currentWaypointIndex].name);
        },
        getCurrentPOIDescription() {
            return (this.selectedItineraryInfo.POIInfo[this.currentWaypointIndex].description);
        },
        getCurrentPOIImage() {
            return (this.selectedItineraryInfo.POIInfo[this.currentWaypointIndex].image);
        },
        getCurrentPOIOpenHours() {
            return (this.selectedItineraryInfo.POIInfo[this.currentWaypointIndex].openHours);
        },
    },
    methods: {
        goBackToItineraryDropdown() {
            this.$emit("goBackToItineraryDropdown");
        },
        checkNextPOI() {
            if (this.currentWaypointIndex < this.selectedItineraryInfo.POIInfo.length - 1) {
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
.explanatoryCardDesign {
    display: flex;
    background-color: var(--background-color-primary);
    color: var(--text-primary-color);
    border-radius: 15px;
    border: none;
    font-size: calc(6px + 0.6vw);
    min-width: 300px;
    width: 20vw;
    height: 85vh;
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
    border: 2px solid rgb(192, 150, 40);
}

.imgWrapper {
    padding: auto;
    margin: auto;
    margin-top: calc(4px + 0.6vh);
    margin-bottom: calc(4px + 0.6vh);
    margin-left: 5px;
    margin-right: 10px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
    min-width: 285px;
    align-self: center;
}

.imageProportion {
    height: 20vh;
    margin-top: calc(2px + 0.6vh);
    margin-bottom: calc(2px + 0.6vh);
}

.topBarExplanation {
    display: flex;
    margin-bottom: calc(6px + 0.4vh);
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

.titlePosition {
    display: flex;
    width: 100%;
    margin-top: calc(12px + 0.6vh);
    justify-content: center;
}

.arrowOnTheLine {
    display: flex;
    flex-direction: row;
    margin-top: calc(6px + 0.6vh);
    height: 5vmin;
}

.descriptionLimiterSize {
    max-height: 30vh;
    overflow: auto;
}

.timeSizeLimiter {
    margin-top: 15px;
    max-height: 14vh;
    overflow: auto;   
}

div.backArrow {
    width: 3vmin;
    height: 3vmin;
    box-sizing: border-box;
    transform: rotate(-135deg);
    margin-top: calc(12px + 0.6vh);
    margin-left: calc(16px + 0.6vw);
    position: absolute;

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
}</style>