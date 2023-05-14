<template>
    <div class="explanatoryCardDesign descriptionLimiterSize">
        <div>
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ $t("itineraryModal.creation") }}</h5>
                <button @click="leaveGroupCreation" type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <span>{{ $t("itineraryModal.startingCity") }} </span><br>
                    <span v-if="error" class="text-danger">{{ $t("itineraryModal.error") }}</span>
                    <input class="w-100 form-control" type="text" v-model="city" :placeholder="placeholderCity">
                </div>
                <hr class="separationBar">
                <span >{{ $t("itineraryModal.howLong") }}</span><br>
                <div class="form-check col-12">
                    <input class="form-check-input mx-1" type="checkbox" value="" id="onehour">
                    <label class="form-check-label" for="onehour">
                        <span>{{ $t("itineraryModal.lessThanOneHour") }}</span>
                    </label>
                    <br>
                    <input class="form-check-input mx-1" type="checkbox" value="" id="multihours">
                    <label class="form-check-label" for="multihours">
                        <span>{{ $t("itineraryModal.fromOneToFour") }}</span>
                    </label>
                    <br>
                    <input class="form-check-input mx-1" type="checkbox" value="" id="morehours">
                    <label class="form-check-label" for="morehours">
                        <span>{{ $t("itineraryModal.moreThanFourHours") }}</span>
                    </label>
                </div>
                <hr class="separationBar">
                <div class="col-12">
                    <span>{{ $t("itineraryModal.startingDate") }}</span><br>
                    <input class="form-control ms-1" type="date" v-model="date">
                </div>
                <hr class="separationBar">
                <div class="col-12">
                    <span>{{ $t("itineraryModal.budget") }} </span><br>
                    <div class="row">
                        <div class="col-8 mt-2">
                            <input type="range" v-model="budget" class="form-range" min="0" max="300">
                        </div>
                        <div class="col-3">
                            <input class="form-control medium-input ms-1" disabled v-model="budget">
                        </div>
                        <div class="col-1 mt-2">
                            <span>€</span>
                        </div>
                    </div>
                </div>
                <hr class="separationBar">
                <div class="col-12">
                    <span>{{ $t("itineraryModal.howManyPeople") }}</span><br>
                    <div class="row">
                        <div class="ms-3 col-2 mt-2 mb-2">
                            <span>{{ $t("itineraryModal.adult") }}</span>
                        </div>
                        <div class="col-3 my-auto text-end mt-2 mb-2">
                            <button class="remove-decoration" @click="people > 0 ? people-- : people = 0"><i
                                    class="fa-solid fa-minus custom-maths"></i></button>
                        </div>
                        <div class="col-2 mt-2 mb-2">
                            <input disabled class="form-control small-input" v-model="people">
                        </div>
                        <div class="col-3 my-auto text-start mt-2 mb-2">
                            <button class="remove-decoration" @click="people++"><i
                                    class="fa-solid fa-plus custom-maths"></i></button>
                        </div>
                        <div class="ms-3 col-2">
                            <span>{{ $t("itineraryModal.child") }}</span>
                        </div>
                        <div class="col-3 my-auto text-end">
                            <button class="remove-decoration" @click="children > 0 ? children-- : children = 0"><i
                                    class="fa-solid fa-minus custom-maths"></i></button>
                        </div>
                        <div class="col-2">
                            <input disabled class="form-control small-input" v-model="children">
                        </div>
                        <div class="col-3 my-auto text-start">
                            <button class="remove-decoration" @click="children++"><i
                                    class="fa-solid fa-plus custom-maths"></i></button>
                        </div>
                    </div>
                </div>

                <hr class="separationBar" v-if="$store.state.globalNonPersistantData.groups.length > 0">

                <hr class="separationBar">
                <div class="col-12 mb-1">
                    <span>{{ $t("itineraryModal.interest") }}</span><br>
                </div>
                <div class="form-check col-12" v-for="POI in possibleType" :key="POI.id">
                    <input class="form-check-input mx-1" type="checkbox" :id="POI.id" :value=POI.POIType
                        v-model="$store.state.mapStore.selectedTypeOfInterest" />
                    <label class="form-check-label" :for="POI.id">
                        <span>{{ POI.POIName }}</span>
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button @click="generateItinerary" type="button" class="btn btn-primary"
                    style="margin: auto; margin-top: 10px; margin-bottom: 10px">{{ $t("itineraryModal.generate") }}</button>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    data() {
        return {
            date: "",
            timeOfStart: "00:00",
            timeOfEnd: "00:00",
            budget: 0,
            people: 1,
            error: false,
            days: 1,
            city: "",
            children: 0,
            indexOfGroup: 0,
            possibleType: [
                { id: 1, POIType: "Cultural Site", POIName: "Sites culturel" },
                { id: 2, POIType: "Castle", POIName: "Chateau" },
                { id: 3, POIType: "Remarkable Building", POIName: "Bâtiments remarquable" },
                { id: 4, POIType: "Museum", POIName: "Musée" },
                { id: 5, POIType: "Stadium", POIName: "Stade" },
                { id: 6, POIType: "Amusement Park", POIName: "Parcs et jardins" },
                { id: 7, POIType: "Walking Tour", POIName: "Itinéraire à pieds" },
                { id: 8, POIType: "Restaurant", POIName: "Restaurant" },
                { id: 9, POIType: "Nightclub", POIName: "Boite de nuit" },
                { id: 10, POIType: "Hotel", POIName: "Hotel" },
                { id: 11, POIType: "Church", POIName: "Eglise" },
                { id: 12, POIType: "InterestPointTypePlaceToVisit ", POIName: "test" }
            ],
        }
    },
    computed: {
        placeholderCity() {
            return (this.$t('itineraryModal.city'));
        },
    },
    methods: {
        test(index) {
            console.log(this.$store.state.globalNonPersistantData.groups[index])
        },
        leaveGroupCreation() {
            this.$emit("goBackToItineraryDropdown");
        },
        setIndex(index) {
            this.indexOfGroup = index;
        },
        prev() {
            // not working function yet: need to find a way to get the index of the active carousel item
            setTimeout(() => {
                if (this.indexOfGroup == 0) {
                    this.indexOfGroup = this.$store.state.globalNonPersistantData.groups.length;
                } else {
                    this.indexOfGroup--;
                }
            }, "1 second");
        },
        next() {
            // not working function yet: need to find a way to get the index of the active carousel item
            if (this.indexOfGroup < this.$store.state.globalNonPersistantData.groups.length) {
                this.indexOfGroup++;
            }
            else {
                this.indexOfGroup = 0;
            }
        },
        generateItinerary() {
            let timeOfStart = this.timeOfStart.split(":");
            let timeOfEnd = this.timeOfEnd.split(":");
            timeOfStart = parseInt(timeOfStart[0]) * 3600 + parseInt(timeOfStart[1]) * 60;
            timeOfEnd = parseInt(timeOfEnd[0]) * 3600 + parseInt(timeOfEnd[1]) * 60;
            let duration = timeOfEnd - timeOfStart;
            if (duration < 0) {
                duration += 24;
            }
            this.$store.dispatch("createNewItinerary", {
                city: this.city,
                availableTime: duration,
                budget: this.budget,
                nbPeople: this.people,
                nbChild: this.children,
                typeResearchLocations: this.$store.state.mapStore.selectedTypeOfInterest,
                group: this.$store.state.globalNonPersistantData.groups[this.indexOfGroup],
                handicapAccess: false,
            }).then(() => {
                this.$emit("goBackToItineraryDropdown");
            }).catch(() => {
                this.error = true;
            })
        },
    }
}
</script>

<style scoped>
.form-check .form-check-input {
    float: none !important;
}

.form-control {
    width: auto !important;
}

.form-check {
    padding-left: 0 !important;
}

.small-input {
    width: 50px !important;
}

.medium-input {
    width: 100px !important;
}

.custom-maths {
    color: #000642;
    border: 1px solid #000642;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
}

.remove-decoration {
    background-color: #fff;
    border: none;
}

.separation-bar {
    border-top: 3px solid rgb(192, 150, 40);
}

.form-range {
    color: red;
}

.explanatoryCardDesign {
    display: flex;
    background-color: var(--background-color-primary);
    color: var(--text-primary-color);
    border-radius: 15px;
    border: none;
    font-size: calc(6px + 0.6vw);
    width: 350px;
    height: 85vh;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 2px solid rgb(192, 150, 40);
    padding: 15px;
    overflow: auto;
}

.explanatoryCardDesign::-webkit-scrollbar {
    width: 1px;
}
</style>