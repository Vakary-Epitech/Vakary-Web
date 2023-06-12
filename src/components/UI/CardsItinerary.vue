<template>
    <div class="card" @click="calculateData" data-bs-toggle="modal" data-bs-target="#exampleModal">
        {{itinerary.itineraryPOI[0].City.name }}
        <div id="exampleModal" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Information sur l'itinéraire sur la ville {{ itinerary.itineraryPOI[0].City.name }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Cet itinéraire comporte {{ numberOfPoints }} points, a un coût total de {{ budget }} € et une durée d'environ {{ time }}</p>
                        <div class="row">
                            <div id="carouselExample" class="carousel slide">
                                <div class="row">
                                    <div class="col-3 text-start">
                                        <button @click="prevSlide" class="arrowButton" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                            <i class="fa-solid fa-xl fa-arrow-left"></i>
                                        </button>
                                    </div>
                                    <div class="col-6">
                                        <div class="carousel-inner">
                                            <div class="carousel-item" v-for="(poi, index) in itinerary.itineraryPOI" :key="index" :class="{ 'active': index === activeIndex }">
                                                <p>Lieu {{ index + 1}}: {{ poi.name }}</p>
                                                <img :src="poi.image" class="imageProportion" />
                                                <p>Prix moyen : {{  poi.averagePrice }} €</p>
                                                <p>Temps moyen sur place: {{ poi.averageTime }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-3 text-end">
                                        <button @click="nextSlide" class="arrowButton" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                            <i class="fa-solid fa-xl fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardsItinerary",
    props: {
        itinerary: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            numberOfPoints: 0,
            budget: 0,
            time: 0,
            activeIndex: 0,
            isAnimating: false,
        }
    },
    computed: {
        calculNumber() {
            console.log(Object.keys(this.itinerary.itineraryPOI).length);
            return this.itinerary.itineraryPOI.length;
        }
    },
    methods: {
        test() {
            console.log(this.itinerary);
        },
        calculateData() {
            this.numberOfPoints = Object.keys(this.itinerary.itineraryPOI).length;
            this.budget = this.itinerary.itineraryPOI.reduce((acc, poi) => acc + poi.averagePrice, 0);
            this.time = this.itinerary.itineraryPOI.reduce((acc, poi) => acc + poi.averageTime, 0);
            console.log(this.itinerary.itineraryPOI[0].City.name);
        },
        nextSlide() {
            if (this.isAnimating) return;
            
            this.isAnimating = true;
            setTimeout(() => {
                this.activeIndex = (this.activeIndex + 1) % this.numberOfPoints;
                this.isAnimating = false;
            }, 500); // Temps d'animation (ajustez selon vos besoins)        
        },
        prevSlide() {
            if (this.isAnimating) return;
            
            this.isAnimating = true;
            setTimeout(() => {
                this.activeIndex = (this.activeIndex - 1 + this.numberOfPoints) % this.numberOfPoints;
                this.isAnimating = false;
            }, 500); // Temps d'animation (ajustez selon vos besoins)        
        }
    }
}
</script>

<style scoped>

.modal {
    cursor: default;
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
.imageProportion {
    height: 20vh;
    max-width: 285px;
    margin-top: calc(2px + 0.6vh);
    margin-bottom: calc(2px + 0.6vh);
}

</style>
