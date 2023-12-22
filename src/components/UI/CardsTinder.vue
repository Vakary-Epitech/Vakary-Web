<template>
   <div v-if="!loading">       
       <div class="card" :style="cardStyle" :key="currentCardIndex" v-if="!skip"
                @mousedown="startDrag"
                @mousemove="dragCard"
                @mouseup="stopDrag">
                <div class="card-header">
                    <div class="col-12">
                        {{ cardsTinder[currentCardIndex].name }}
                        {{ getCurrentPOIName() }}
                    </div>
                </div>
                
                <div class="card-body" :class="{ expanded: expandedCardContent }" :style="{ backgroundImage: `url(${getCurrentPOIImage()})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
                    {{ selectedItinerary ||json }}
                    <div class="card-body-overlay"></div>
                    <div class="card-body-content">
                        <div class="row">
                            <div class="col-8">
                                <p class="ms-2"><i class="fa-regular fa-clock custom-size"></i>{{ getCurrentPOIOpenHours() }}</p>
                            </div>
                            <div class="col-4 text-end mt-2">
                                <button v-if="!expandedCardContent" @click="toggleCardContent" class="toggle-button me-2"><i class="fa-solid fa-info custom-size"></i></button>
                                <button v-if="expandedCardContent" @click="toggleCardContent" class="toggle-button me-2"><i class="fa-solid fa-arrow-down custom-size"></i></button>
                            </div>
                            <div class="col-12" v-if="expandedCardContent">
                                <!-- <p class="ms-2"><i class="fa-solid fa-euro-sign custom-size"></i>{{ getCurrentPOIPrice() }}</p> -->
                                <p class="ms-2"><i class="fa-solid fa-circle-info custom-size"></i>{{ getCurrentPOIDescription() }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card-footer">
                    <div class="row">
                        <div class="col text-start">
                            <button @click="disliked()" class="button-custom"><i class="fa-solid fa-xmark fa-xl custom-size xmark-icon"></i></button>
                        </div>
                        <div class="col text-center">
                            <button @click="pass()" class="button-custom"><i class="fa-solid fa-forward custom-size"></i></button>
                        </div>   
                        <div class="col text-end">
                            <button @click="liked()" class="button-custom"><i class="fa-solid fa-heart fa-xl custom-size heart-icon"></i></button>
                        </div>
                    </div>
                </div>
       </div>
   </div>
   <div class="text-center" v-if="skip">
       <loadingSpinner text="loadingSpin.loadingItinerary"/>
   </div>
   <div v-if="loading">
        <loadingSpinner/>
   </div>
</template>
  
<script>
import loadingSpinner from "../UI/loadingSpin.vue";
export default {
    props: {
      selectedItineraryInfo: Array,
    },
    components: {
        loadingSpinner,
    },
    data() {
      return {
        cardsTinder: [],
        cardsId: null,
        skip: false,
        dragging: false,
        xOffset: 0,
        yOffset: 0,
        localeLanguage: this.$i18n.locale,
        swiped: false,
        currentCardIndex: 0,
        swipeThreshold: 100,
        initialX: 0,
        initialY: 0,
        loading: true,
        expandedCardContent: false,
      };
    },
    computed: {
      cardStyle() {
        return {
            transform: `translate(${this.xOffset}px, ${this.yOffset}px)`,
            opacity: this.swiped ? 0 : 1,
        };
      },
    },
    mounted() {
        this.cardsTinder = this.$store.state.itineraryStore.itinerary[this.$store.state.itineraryStore.itinerary.length - 1]?.itineraryPOI;
        this.cardsId = this.$store.state.itineraryStore.itinerary[this.$store.state.itineraryStore.itinerary.length - 1]?.id;
        this.loading = false;
    },
    methods: {
        getCurrentPOIName() {
            return (this.cardsTinder[this.currentCardIndex].name);
        },
        getCurrentPOIDescription() {
            return (this.cardsTinder[this.currentCardIndex].Description[this.$i18n.locale]);
        },
        getCurrentPOIImage() {
            return (this.cardsTinder[this.currentCardIndex].image);
        },
        getCurrentPOIOpenHours() {
            if (this.cardsTinder[this.currentCardIndex].openingHours === "false") {
                return (this.$t("mapPage.noOpeningHours"));
            }
            let timeStamp = JSON.parse(this.cardsTinder[this.currentCardIndex].openingHours);
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
        getCurrentPOIPrice() {
            return (this.cardsTinder[this.currentCardIndex].averagePrice);
        },
        liked() {
            this.xOffset = 500;
            this.swiped = true;
            setTimeout(() => {
                this.currentCardIndex++;
                this.xOffset = 0;
                this.swiped = false;
            }, 300);
            if (this.currentCardIndex === this.cardsTinder.length - 1) {
                this.$emit("goBackToItineraryDropdown");
            }
        },
        disliked() {  
            this.loading = true;
            this.xOffset = -500;
            this.swiped = true;
            setTimeout(() => {
                this.xOffset = 0;
                this.swiped = false;
            }, 300);
            this.$store.dispatch("removePOI", {
                itineraryId: this.cardsId,
                POIId: this.cardsTinder[this.currentCardIndex].id
            }).then(() => {
                if (this.currentCardIndex === this.cardsTinder.length - 1) {
                    this.$emit("goBackToItineraryDropdown");
                }
                this.currentCardIndex++;
                this.loading = false;
            }).catch((err) => {
                console.log(err);
                this.loading = false;
            });
        },
        pass() {
            this.skip = true;
            this.$emit("goBackToItineraryDropdown");
        },
        toggleCardContent() {
            this.expandedCardContent = !this.expandedCardContent;
        },
        startDrag(event) {
            this.dragging = true;
            this.initialX = event.clientX;
            this.initialY = event.clientY;
            this.maxDragX = 500;
            this.maxDragY = 200;
        },
        dragCard(event) {
            if (this.dragging) {
                const offsetX = event.clientX - this.initialX;
                const offsetY = event.clientY - this.initialY;

                this.xOffset = Math.min(Math.max(offsetX, -this.maxDragX), this.maxDragX);
                this.yOffset = Math.min(Math.max(offsetY, -this.maxDragY), this.maxDragY);

                if (offsetX > this.maxDragX || offsetX < -this.maxDragX) {
                    this.stopDrag();
                }
            }
        },
        stopDrag() {
            if (this.dragging) {
                const swipeThreshold = 100;
                if (Math.abs(this.xOffset) > swipeThreshold) {
                    const swipeDirection = this.xOffset > 0 ? "right" : "left";
                    
                    this.handleSwipe(swipeDirection);
                }
                else {
                    this.resetCardPosition();
                }
                this.dragging = false;
            }
        },
        handleSwipe(direction) {
            if (direction === "right") {
                this.liked();
            } else if (direction === "left") {
                this.disliked();
            }
            this.resetCardPosition()
        },
        resetCardPosition() {
            this.xOffset = 0;
            this.yOffset = 0;
        }
    },
};
</script>
  
<style scoped>
.card {
    position: absolute;
    width: 30vw;
    height: 80vh;
    background-color: #fff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    cursor: grab;
    transition: transform 0.2s ease-out, opacity 0.3s ease-in-out;
}

.card-header {
    background-color: #fff;
    border: 0;
}

.card-footer {
    background-color: rgba(0, 0, 0, 0.04);
    border: 0;
}

.card-body {
    position: relative;
}

.card-body-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
}

.card-body-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 20%;
    height: auto;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-in-out;
    background-color: #fff;
}

.card-body.expanded .card-body-content {
    height: 50%;
    max-height: 500px;
    overflow: auto;
}

::-webkit-scrollbar {
  width: 0 !important;
}

.card:active {
    cursor: grabbing;
}

.button-custom {
    background-color: #fff;
    border: none;
    border-radius: 100%;
    padding: 10px;
    cursor: pointer;
}

.xmark-icon {
    color: green;
}

.heart-icon {
    color: red;
}

.toggle-button {
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 100%;
    padding: 10px;
    cursor: pointer;
}

.custom-size {
    width: 1.5rem;
}
</style>