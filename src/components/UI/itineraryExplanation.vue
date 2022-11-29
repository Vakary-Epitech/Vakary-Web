<template>
    <div class="explanatoryCardDesign">
        <div>
            <div class="backArrow" @click="goBackToItineraryDropdown"></div>
            <span>City : {{ this.selectedItineraryInfo.city }}</span>
            <button @click="checkPreviousPOI">Previous POI</button>
            <button @click="checkNextPOI">Next POI</button>
            <span>POI Name : {{ getCurrentPOIName }}</span>
            <br />
            <span>POI Description : {{ getCurrentPOIDescription }}</span>
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
    },
    methods: {
        goBackToItineraryDropdown() {
            this.$emit("goBackToItineraryDropdown");
        },
        checkNextPOI() {
            if (this.currentWaypointIndex < this.selectedItineraryInfo.POIInfo.length - 1)
                this.currentWaypointIndex += 1;
        },
        checkPreviousPOI() {
            if (this.currentWaypointIndex > 0)
                this.currentWaypointIndex -= 1;
        },
    }
}
</script>

<style scoped lang="scss">
@import "@/components/Style/Button.scss";

.explanatoryCardDesign {
    display: flex;
    background-color: var(--background-color-primary);
    color: var(--text-primary-color);
    border-radius: 15px;
    border: none;
    font-size: calc(12px + 0.4vw);
    width: 20vw;
    height: 80vh;
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
}

div.backArrow {
	width: 3vmin;
	height: 3vmin;
	box-sizing: border-box;
	transform: rotate(-135deg);
    margin-top: 15px;
    margin-left: 15px;
	
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
		transition:.2s ease;
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
</style>