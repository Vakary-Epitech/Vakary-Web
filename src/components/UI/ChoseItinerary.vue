<template>
    <div class="row mt-3" v-if="$store.state.itineraryStore?.itinerary.length > 0">
        <p class="text-center">{{ $t("showMembers.addGroupItinerary") }}</p>
        <div class="col-2 my-auto">
            <button class="custom-button" v-if="$store.state.itineraryStore?.itinerary.length > 1"
                @click="prev">
                <i class="fa-solid fa-arrow-left fa-xl custom-arrow"></i>
            </button>
        </div>
        <div class="col-8 text-center">
            <CardsItinerary class="cardsItinerary" :itinerary="this.$store.state.itineraryStore?.itinerary[indexItinerary]"></CardsItinerary>
        </div>
        <div class="col-2 my-auto text-end">
            <button class="custom-button" v-if="$store.state.itineraryStore?.itinerary.length > 1"
                @click.prevent="next">
                <i class="fa-solid fa-arrow-right fa-xl custom-arrow"></i>
            </button>
        </div>
        <div>
            <input type="checkbox" id="checkbox" v-model="addGroupToItinerary" />
            <label for="checkbox">
                <p>{{ $t("showMembers.addGroupItinerary") }}</p>
            </label>
        </div>
    </div>
</template>

<script>
import CardsItinerary from "@/components/UI/CardsItinerary.vue";
export default {
    name: "ChoseItinerary",
    components: {
        CardsItinerary
    },
    data() {
        return {
            indexItinerary: 0,
            addGroupToItinerary: false,
        }
    },
    methods: {
        next() {
            if (this.indexItinerary < this.$store.state.itineraryStore?.itinerary.length - 1) {
                this.indexItinerary++;
            }
            else {
                this.indexItinerary = 0;
            }
            this.$emit("updateIndex", this.indexItinerary, this.addGroupToItinerary);
        },
        prev() {
            if (this.indexItinerary > 0) {
                this.indexItinerary--;
            }
            else {
                this.indexItinerary = this.$store.state.itineraryStore?.itinerary.length - 1;
            }
            this.$emit("updateIndex", this.indexItinerary, this.addGroupToItinerary);
        },
    },
    watch: {
        addGroupToItinerary(value) {
            this.$emit("updateIndex", this.indexItinerary, value);
        }
    }
}
</script>

<style scoped>
.custom-button {
    margin-bottom: 15px;
    background-color: var(--background-color-primary);
    border: 3px solid #fff;
    border-radius: 15px;
}

.custom-button:hover {
    border: 3px solid rgb(192, 150, 40);
}

.custom-arrow {
    color: rgb(192, 150, 40);
}

</style>