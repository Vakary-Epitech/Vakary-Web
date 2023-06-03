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
                    <input class="w-100 form-control" type="text" v-model="city" :placeholder="placeholderCity">
                </div>
                <hr class="separationBar">
                <span>{{ $t("itineraryModal.howLong") }}</span><br>
                <div class="form-check col-12">
                    <input class="form-check-input mx-1" type="radio" value="one" v-model="checkItineraryLength"
                        id="onehour">
                    <label class="form-check-label" for="onehour">
                        <span>{{ $t("itineraryModal.lessThanOneHour") }}</span>
                    </label>
                    <br>
                    <input class="form-check-input mx-1" type="radio" value="oneToFour" v-model="checkItineraryLength"
                        id="multihours">
                    <label class="form-check-label" for="multihours">
                        <span>{{ $t("itineraryModal.fromOneToFour") }}</span>
                    </label>
                    <br>
                    <input class="form-check-input mx-1" type="radio" value="FourOrMore" v-model="checkItineraryLength"
                        id="morehours">
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
                <div class="col-12" v-if="$store.state.globalNonPersistantData.groups.length > 0">
                    <hr class="separationBar" v-if="$store.state.globalNonPersistantData.groups.length > 0">
                    <div class="row">
                        <div id="carouselExample" class="carousel slide">
                            <div class="row">
                                <div class="col-3 text-start">
                                    <button @click="prevSlide" class="arrowButton" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                        <i class="fa-solid fa-xl fa-arrow-left"></i>
                                    </button>
                                </div>
                                <div class="col-6 text-center">
                                    {{ $t("itineraryModal.group") }}
                                </div>
                                <div class="col-3 text-end">
                                    <button @click="nextSlide" class="arrowButton" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                        <i class="fa-solid fa-xl fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="carousel-inner mt-2">
                                <div class="carousel-item" v-for="(group, index) in groups" :key="index" :class="{ 'active': index === activeIndex }">
                                    <cardsGroup :group="group"></cardsGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="separationBar">
                <div class="col-12 mb-1">
                    <span>{{ $t("itineraryModal.interest") }}</span><br>
                </div>
                <div>
                    <div v-for="(category, categoryIndex) in categories" :key="categoryIndex">
                        <div class="row my-2">
                            <input class="col-1 ms-2" type="checkbox" :checked="checkToggle(category)"
                                @change="toggleAllPOIs(category)" />
                            <button class="col-10 mx-auto dropDownButton" @click="toggleDropdown(categoryIndex)">
                                {{ category }}
                                <font-awesome-icon class="mt-1"
                                    :icon="dropdownOpen[categoryIndex] ? ['fas', 'caret-up'] : ['fas', 'caret-down']"
                                    style="float: right" />
                            </button>
                        </div>
                        <div class="row my-2" v-show="isDropdownOpen(categoryIndex)"
                            v-for="(poi, poiIndex) in getPoisByCategory(category)" :key="poiIndex">
                            <input class="col sameSize" type="checkbox" v-model="selectedPOIs[poi]" value="poi" />
                            <span class="col-10">{{ poi }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <span v-if="error" class="text-danger">{{ error['message'] }}</span>
            <div class="modal-footer">
                <button @click="generateItinerary" type="button" class="btn btn-primary"
                    style="margin: auto; margin-top: 10px; margin-bottom: 10px">{{ $t("itineraryModal.generate") }}</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { InterestPointTypeAccommodation, InterestPointTypeEatOrDrink, InterestPointTypeShop, InterestPointTypeSport, InterestPointTypePlaceToVisit, InterestPointTypeGroup } from "@/utils/poiTypes.js";
import cardsGroup from "../UI/CardsGroup.vue";

export default {
    components: {
        cardsGroup
    },
    data() {
        return {
            checkItineraryLength: "",
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
            categories: Object.values(InterestPointTypeGroup),
            selectedPOIs: {},
            poiData: {
                [InterestPointTypeGroup.ACCOMMODATION]: Object.values(InterestPointTypeAccommodation),
                [InterestPointTypeGroup.RESTAURATION]: Object.values(InterestPointTypeEatOrDrink),
                [InterestPointTypeGroup.SHOP]: Object.values(InterestPointTypeShop),
                [InterestPointTypeGroup.SPORT]: Object.values(InterestPointTypeSport),
                [InterestPointTypeGroup.PLACE_TO_VISIT]: Object.values(InterestPointTypePlaceToVisit)
            },
            dropdownOpen: [],
            activeIndex: 0,
            totalItems: 0,
            isAnimating: false,
            groups: [],
        }
    },
    computed: {
        placeholderCity() {
            return (this.$t('itineraryModal.city'));
        },
    },
    mounted () {
        this.totalItems = this.$store.state.globalNonPersistantData.groups.length + 1;
    },
    created() {
        const noGroup = {
            name: this.$t('itineraryModal.noGroup'),
            photo: "https://eip.vakary.fr/uploads/group/base/basic_group_image_1.jpg",
            default: true
        };
        this.groups.push(noGroup);
        this.$store.state.globalNonPersistantData.groups.forEach(group => {
            this.groups.push(group);
        });
    },
    methods: {
        toTranslationKey(value) {
            const normalized = value.toLowerCase().replace(/\s+(.)/g, (_, char) => char.toUpperCase());
            return normalized.charAt(0).toLowerCase() + normalized.slice(1);
        },
        checkToggle(category) {
            const pois = this.poiData[category];
            const areAllTrue = pois.every(poi => this.selectedPOIs[poi]);
            const areAllFalse = pois.every(poi => !this.selectedPOIs[poi]);

            if (areAllTrue) {
                return true;
            } else if (areAllFalse) {
                return false;
            } else {
                return null;
            }
        },
        toggleAllPOIs(category) {
            const pois = this.poiData[category];
            const areAllTrue = pois.every(poi => this.selectedPOIs[poi]);
            const areAllFalse = pois.every(poi => !this.selectedPOIs[poi]);

            if (areAllTrue) {
                for (const poi of pois) {
                    this.selectedPOIs[poi] = false;
                }
            }
            else if (areAllFalse) {
                for (const poi of pois) {
                    this.selectedPOIs[poi] = true;
                }
            }
            else {
                for (const poi of pois) {
                    this.selectedPOIs[poi] = true;
                }
            }
        },
        toggleDropdown(categoryIndex) {
            this.dropdownOpen[categoryIndex] = !this.dropdownOpen[categoryIndex];
        },
        isDropdownOpen(categoryIndex) {
            return this.dropdownOpen[categoryIndex];
        },
        getPoisByCategory(category) {
            return this.poiData[category] || [];
        },
        leaveGroupCreation() {
            this.$emit("goBackToItineraryDropdown");
        },
        setIndex(index) {
            this.indexOfGroup = index;
        },
        prevSlide() {
            if (this.isAnimating) return;
            
            this.isAnimating = true;
            setTimeout(() => {
                if (this.activeIndex === 0) {
                    this.activeIndex = this.totalItems - 1;
                } else {
                    this.activeIndex--;
                }
                this.isAnimating = false;
            }, 500); // Temps d'animation (ajustez selon vos besoins)
        },
        nextSlide() {
            if (this.isAnimating) return;
            
            this.isAnimating = true;
            setTimeout(() => {
                this.activeIndex = (this.activeIndex + 1) % this.totalItems;
                this.isAnimating = false;
            }, 500); // Temps d'animation (ajustez selon vos besoins)
        },
        generateGoodFormat(POIs) {
            let goodFormat = [];
            for (var poi in POIs) {
                goodFormat.push(poi);
            }
            return goodFormat;
        },
        generateItinerary() {
            let duration = 0;

            if (this.checkItineraryLength == "one")
                duration = 3600; //One hour in second
            else if (this.checkItineraryLength == "oneToFour")
                duration = 3600 * 4; //Four hours in seconds
            else
                duration = 3600 * 8; //Eight hours in seconds

            this.error = "";
            this.$store.dispatch("put", {
                path: "itinerary/me",
                data: {
                    city: this.city,
                    availableTime: duration,
                    budget: this.budget,
                    nbPeople: this.people,
                    nbChild: this.children,
                    typeResearchLocations: this.generateGoodFormat(this.selectedPOIs),
                    // group: this.groups[this.activeIndex]?.default ? null : this.groups[this.activeIndex],
                    handicapAccess: false,
                },
                token: this.$store.state.userStore.token,
            }).then(() => {
                this.$store.dispatch("getItinerary").then(() => {
                    this.$emit("goBackToItineraryDropdown");
                }).catch((error) => {
                    this.error = error?.response?.data;
                })
            }).catch((error) => {
                this.error = error?.response?.data;
            })
        },
    }
}
</script>

<style scoped>

.form-check .form-check-input {
    float: none !important;
}

.arrowButton {
    background-color: #fff;
    border: 1px solid rgb(192, 150, 40);
    border-radius: 10px;
    color: black;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}

.arrowButton:hover {
    background-color: rgb(192, 150, 40);
    color: white;
    cursor: pointer;
}

.dropDownButton {
    background-color: #fff;
    border: 1px solid rgb(192, 150, 40);
    border-radius: 10px;
    color: black;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}

.form-control {
    width: auto !important;
}

.sameSize {
    width: 30px;
    height: 30px;
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

/* .explanatoryCardDesign::-webkit-scrollbar {
    width: 10px;
} */

/* ::-webkit-scrollbar {
    width: 100px !important;
} */
</style>