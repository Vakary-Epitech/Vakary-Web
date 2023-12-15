<template>
    <MapWindows dropdown="true">
        <div v-if="!loading">
            <div class="modal-header" style="margin-bottom: 20px;">
                <h5 class="modal-title" id="exampleModalLabel">{{ $t("tripProfile.profileCreate") }}</h5>
                <button @click="leaveGroupCreation" class="xMark"><i class="fa-solid fa-xmark fa-lg"></i></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <span>{{ $t("tripProfile.profileName") }} </span><br>
                    <input class="w-100 form-control" type="text" v-model="profileName" :placeholder="placeholderCity"
                        style="margin-top: 5px;">
                </div>
                <hr class="separationBar" style="margin-bottom: 10px; margin-top: 10px;">
                <div class="col-12 mb-1">
                    <span>{{ $t("itineraryModal.interest") }}</span><br>
                </div>
                <div v-for="(category, categoryIndex) in categories" :key="categoryIndex">
                    <div class="row my-2">
                        <input class="col-1 ms-2" type="checkbox" :checked="checkToggle(category)"
                            @change="toggleAllPOIs(category)" />
                        <button class="col-10 mx-auto dropDownButton" @click="toggleDropdown(categoryIndex)">
                            <font-awesome-icon class="mt-1 ms-2"
                                :icon="dropdownOpen[categoryIndex] ? ['fas', 'caret-down'] : ['fas', 'caret-right']"
                                style="float: left" />
                            <span style="float: left" class="ms-3">{{ $t(category.key) }}</span>
                        </button>
                    </div>
                    <div class="row my-2" v-show="isDropdownOpen(categoryIndex)"
                        v-for="(poi, poiIndex) in getPoisByCategory(category)" :key="poiIndex">
                        <input class="col sameSize" type="checkbox" v-model="selectedPOIs[poi.value]" value="poi.value" />
                        <span class="col-10">{{ $t(poi.key) }}</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button @click="generateProfile" type="button" class="btn btn-primary"
                    style="margin: auto; margin-top: 10px; margin-bottom: 10px">{{
                        $t("tripProfile.profileButtonConfirmation") }}</button>
            </div>
        </div>
        <Loading v-if="loading" />
    </MapWindows>
</template>

<script>
import MapWindows from "@/components/UI/MapWindows.vue";
import { IPTNatural, IPTActivity, IPTDrinking, IPTCultural, IPTEating, IPTEvent, IPTTour, IPTTypeGroup } from "@/utils/poiTypes.js";
import Loading from "../UI/loadingSpin.vue";

export default {
    components: {
        MapWindows,
        Loading,
    },
    data() {
        return {
            categories: Object.values(IPTTypeGroup),
            selectedPOIs: {},
            poiData: {
                Tour: Object.values(IPTTour),
                Event: Object.values(IPTEvent),
                Natural: Object.values(IPTNatural),
                Activity: Object.values(IPTActivity),
                Drinking: Object.values(IPTDrinking),
                Eating: Object.values(IPTEating),
                Cultural: Object.values(IPTCultural),
            },
            dropdownOpen: [],
            profileName: "",
            activeIndex: 0,
            totalItems: 0,
            error: false,
            loading: false,
        }
    },
    methods: {
        toTranslationKey(value) {
            const normalized = value.toLowerCase().replace(/\s+(.)/g, (_, char) => char.toUpperCase());
            return normalized.charAt(0).toLowerCase() + normalized.slice(1);
        },
        checkToggle(category) {
            const pois = this.poiData[category.value];
            const areAllTrue = pois.every(poi => this.selectedPOIs[poi.value]);
            const areAllFalse = pois.every(poi => !this.selectedPOIs[poi.value]);

            if (areAllTrue) {
                return true;
            } else if (areAllFalse) {
                return false;
            } else {
                return null;
            }
        },
        toggleAllPOIs(category) {
            const pois = this.poiData[category.value];
            const areAllTrue = pois.every(poi => this.selectedPOIs[poi.value]);
            const areAllFalse = pois.every(poi => !this.selectedPOIs[poi.value]);

            if (areAllTrue) {
                for (const poi of pois) {
                    this.selectedPOIs[poi.value] = false;
                }
            }
            else if (areAllFalse) {
                for (const poi of pois) {
                    this.selectedPOIs[poi.value] = true;
                }
            }
            else {
                for (const poi of pois) {
                    this.selectedPOIs[poi.value] = true;
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
            return this.poiData[category.value] || [];
        },
        leaveGroupCreation() {
            this.$emit("goBackToItineraryDropdown");
        },
        generateGoodFormat(POIs) {
            let goodFormat = [];
            for (var poi in POIs) {
                goodFormat.push(poi);
            }
            return goodFormat;
        },
        generateProfile() {
            this.$store.dispatch('createNewTravelProfil', {
                typeOfPoi: this.generateGoodFormat(this.selectedPOIs),
                profilFields: {
                    name: this.profileName,
                    adultCount: 0,
                    childCount: 0,
                    babyCount: 0,
                }
            }).then(() => {
                this.$store.dispatch('getUserTravelProfile').then(() => {
                    this.$emit("goBackToItineraryDropdown");
                });
            })
        }
    }
}
</script>

<style scoped>
.xMark {
    background-color: var(--background-color-primary);
    border: none;
    border-radius: 5px;
    padding: 2px 5px;
    color: var(--text-primary-color);
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

.sameSize {
    width: 30px;
    height: 30px;
}
</style>