<template>
    <MapWindows dropdown>
        <div v-if="!loading">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ $t("itineraryModal.creation") }}</h5>
                <button @click="leaveGroupCreation" class="xMark"><i class="fa-solid fa-xmark fa-lg"></i></button>
            </div>
            <div class="modal-body">
                <div class="col-12" v-if="$store.state.profileStore.userTravelProfile.length > 0">
                    <hr class="separationBar" v-if="$store.state.profileStore.userTravelProfile.length > 0">
                    <div class="row">
                        <div id="carouselExample" class="carousel slide">
                            <div class="row">
                                <div class="col-3 text-start">
                                    <button @click="prevSlideProfile" class="arrowButton" type="button"
                                        data-bs-target="#carouselExample" data-bs-slide="prev">
                                        <i class="fa-solid fa-xl fa-arrow-left"></i>
                                    </button>
                                </div>
                                <div class="col-6 text-center">
                                    {{ $t("itineraryModal.profile") }}
                                </div>
                                <div class="col-3 text-end">
                                    <button @click="nextSlideProfile" class="arrowButton" type="button"
                                        data-bs-target="#carouselExample" data-bs-slide="next">
                                        <i class="fa-solid fa-xl fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="carousel-inner mt-2">
                                <div class="carousel-item" v-for="(profile, index) in profile" :key="index"
                                    :class="{ 'active': index === profileActiveIndex }">
                                    <CardsProfile :profile="profile" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3 text-start">
                                    <button class="arrowButton" type="button" @click="deleteProfile()">
                                        <i class="fa-solid fa-trash fa-xl"></i>
                                    </button>
                                </div>
                                <div class="col-6 text-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="display: flex; justify-content: center; align-items: center;">
                    <button @click="createProfil()" class="basicVakaryButton mt-3">{{
                        $t("itineraryModal.profileButton") }}</button>
                </div>
                <hr class="separationBar">
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
            </div>
            <span v-if="error" class="text-danger">{{ error['message'] }}</span>
            <div class="modal-footer">
                <button @click="generateItinerary" type="button" class="btn btn-primary"
                    style="margin: auto; margin-top: 10px; margin-bottom: 10px">{{ $t("itineraryModal.generate") }}</button>
            </div>
        </div>
        <Loading v-if="loading" />
    </MapWindows>
</template>
  
<script>
import Loading from "../UI/loadingSpin.vue";
import MapWindows from "../UI/MapWindows.vue";
import CardsProfile from './CardsProfile.vue';
export default {
    components: {
        Loading,
        MapWindows,
        CardsProfile
    },
    data() {
        return {
            checkItineraryLength: "",
            date: "",
            budget: 0,
            people: 1,
            error: false,
            loading: false,
            city: "",
            children: 0,
            activeIndex: 0,
            totalItems: 0,
            isAnimating: false,
            groups: [],

            profileActiveIndex: 0,
            profileTotalItems: 0,
            profile: [],
        }
    },
    computed: {
        placeholderCity() {
            return (this.$t('itineraryModal.city'));
        },
    },
    mounted() {
        this.totalItems = this.$store.state.groupStore.groups.length + 1;
        this.profileTotalItems = this.$store.state.profileStore.userTravelProfile.length;
    },
    created() {
        if (this.$store.state.profileStore.userTravelProfile)
            this.$store.state.profileStore.userTravelProfile.forEach(profile => {
                this.profile.push(profile);
            });
    },
    methods: {
        deleteProfile() {
            this.$store.dispatch("deleteTravelProfile",
                this.$store.state.profileStore.userTravelProfile[this.profileActiveIndex].id
            ).then(() => {
                this.loading = false;
                this.$store.dispatch('getUserTravelProfile').then(() => {
                    this.$emit("goBackToItineraryDropdown");
                });
            }).catch((error) => {
                this.loading = false;
                this.error = error?.response?.data;
            })
        },
        createProfil() {
            this.$emit("createProfil");
        },
        leaveGroupCreation() {
            this.$emit("goBackToItineraryDropdown");
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
            }, 500);
        },
        nextSlide() {
            if (this.isAnimating) return;

            this.isAnimating = true;
            setTimeout(() => {
                this.activeIndex = (this.activeIndex + 1) % this.totalItems;
                this.isAnimating = false;
            }, 500);
        },
        prevSlideProfile() {
            if (this.isAnimating) return;

            this.isAnimating = true;
            setTimeout(() => {

                if (this.profileActiveIndex <= 0) {
                    this.profileActiveIndex = this.profileTotalItems - 1;
                } else {
                    this.profileActiveIndex--;
                }
                this.isAnimating = false;
            }, 500);
        },
        nextSlideProfile() {
            if (this.isAnimating) return;

            this.isAnimating = true;
            setTimeout(() => {
                if (this.profileActiveIndex >= this.$store.state.profileStore.userTravelProfile.length)
                    this.profileActiveIndex = 0;
                else
                    this.profileActiveIndex++;
                this.isAnimating = false;
            }, 500);
        },
        generateItinerary() {
            this.loading = true;
            let duration = 0;

            if (this.checkItineraryLength == "one")
                duration = 3600;
            else if (this.checkItineraryLength == "oneToFour")
                duration = 3600 * 4;
            else
                duration = 3600 * 8;

            this.error = "";
            this.$store.dispatch("addItinerary", {
                city: this.city,
                availableTime: duration,
                budget: this.budget,
                nbPeople: this.people,
                nbChild: this.children,
                typeResearchLocations: this.$store.state.profileStore.userTravelProfile[this.profileActiveIndex].InterestPointTypes,
                handicapAccess: false,
            }).then(() => {
                this.$store.dispatch("getItinerary").then(() => {
                    this.loading = false;
                    this.$emit("goBackToItineraryDropdown");
                    this.$emit("itineraryCreated");
                });
            }).catch((error) => {
                this.loading = false;
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

.xMark {
    background-color: var(--background-color-primary);
    border: none;
    border-radius: 5px;
    padding: 2px 5px;
    color: var(--text-primary-color);
}

.arrowButton {
    background-color: var(--background-color-primary);
    border: 1px solid rgb(192, 150, 40);
    border-radius: 10px;
    color: var(--text-primary-color);
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
    background-color: var(--background-color-primary);
    border: 1px solid rgb(192, 150, 40);
    border-radius: 10px;
    color: var(--text-primary-color);
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
    color: var(--text-primary-color);
    border: 1px solid var(--text-primary-color);
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
}

.remove-decoration {
    background-color: var(--background-color-primary);
    border: none;
}

.form-range {
    color: red;
}
</style>