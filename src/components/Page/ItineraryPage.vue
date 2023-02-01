<template>
    <TopBar class="col" :connected="true"/>
    <div class="row">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Planifier mon itinéraire
        </button>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Création de votre itinéraire</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="col-12">
                            <span>Ville de départ </span><br>
                            <input class="w-100 form-control" type="text" v-model="city" placeholder="Ville">
                        </div>
                        <hr class="separationBar">
                        <span>Pendant combien de temps ?</span><br>
                        <div class="form-check col-12">
                            <input class="form-check-input mx-1" type="checkbox" value="" id="onehour">
                            <label class="form-check-label" for="onehour">
                                <span>Pendant 1 heure</span>
                            </label>
                            <br>
                            <input class="form-check-input mx-1" type="checkbox" value="" id="multihours">
                            <label class="form-check-label" for="multihours">
                                <span>1 à 4 heures</span>
                            </label>
                            <br>
                            <input class="form-check-input mx-1" type="checkbox" value="" id="morehours">
                            <label class="form-check-label" for="morehours">
                                <span>Plus de 4 heures</span>
                            </label>
                        </div>
                        <hr class="separationBar">
                        <div class="col-12">
                            <span>Quelle est la date de départ de votre itinéraire ? </span><br>
                            <input class="form-control ms-1" type="date" v-model="date">
                        </div>
                        <hr class="separationBar">
                        <div class="col-12">
                            <span>Budget total </span><br>
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
                            <span>Combien de personnes vont vous accompagner ?</span><br>
                            <div class="row">
                                <div class="ms-3 col-2 mt-2 mb-2">
                                    <span>Adulte</span>
                                </div>
                                <div class="col-3 my-auto text-end mt-2 mb-2">
                                    <button class="remove-decoration" @click="people > 0 ? people--: people=0"><i class="fa-solid fa-minus custom-maths"></i></button>
                                </div>
                                <div class="col-2 mt-2 mb-2">
                                    <input disabled class="form-control small-input" v-model="people">
                                </div>
                                <div class="col-3 my-auto text-start mt-2 mb-2">
                                    <button class="remove-decoration" @click="people++"><i class="fa-solid fa-plus custom-maths"></i></button>
                                </div>
                                <div class="ms-3 col-2">
                                    <span>Enfant</span>
                                </div>
                                <div class="col-3 my-auto text-end">
                                    <button class="remove-decoration" @click="children > 0 ? children--: children=0"><i class="fa-solid fa-minus custom-maths"></i></button>
                                </div>
                                <div class="col-2">
                                    <input disabled class="form-control small-input" v-model="children">
                                </div>
                                <div class="col-3 my-auto text-start">
                                    <button class="remove-decoration" @click="children++"><i class="fa-solid fa-plus custom-maths"></i></button>
                                </div>
                            </div>
                        </div>
                        <hr class="separationBar" v-if="$store.state.userStore.groups.length > 0">
                        <div class="col-12" v-if="$store.state.userStore.groups.length > 0">
                            <span>Vos groupes</span><br>
                            <div id="carouselExampleControls" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
                                <div class="carousel-inner">
                                    <div class="carousel-item active" v-for="(group, index) in $store.state.userStore.groups" :key="index">
                                        <cardsGroup :group="group" :index="index" :exists="true"></cardsGroup>
                                        {{ group.name }}
                                        {{ $store.state.userStore.groups[index] }}
                                        {{ setIndex(index) }}
                                    </div>
                                </div>                
                                <button v-if="$store.state.userStore.groups.length > 1" @click="prev" class="carousel-control-prev black" type="button"
                                    data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button v-if="$store.state.userStore.groups.length > 1" @click.prevent="next" class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                                    data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <hr class="separationBar">
                        <!-- <div class="col-12 mb-3 text-center">
            <span>Vos City Pass</span><br>
            <div id="carouselExampleControls2" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" class="cityPass" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png" class="cityPass" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev black" type="button"
                    data-bs-target="#carouselExampleControls2" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls2"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
                        </div> -->
                        <div class="col-12 mb-1">
                            <span>Centres d'intérêts</span><br>
                        </div>
                        <div class="form-check col-12" v-for="POI in possibleType" :key="POI.id">
                            <input class="form-check-input mx-1" type="checkbox" :id="POI.id" :value=POI.POIType v-model="$store.state.mapStore.selectedTypeOfInterest" />
                            <label class="form-check-label" :for="POI.id">
                                <span>{{ POI.POIType }}</span>
                            </label>
                        </div>
                    </div>  
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button @click="generateItinerary" type="button" class="btn btn-primary" data-bs-dismiss="modal">Générer l'itinéraire</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import TopBar from "../UI/TopBar.vue";
import CardsGroup from "../UI/CardsGroup.vue";
export default {
    components: {
        TopBar,
        CardsGroup,
    },
    data() {
        return {
            date: "",
            timeOfStart: "00:00",
            timeOfEnd: "00:00",
            budget: 0,
            people: 1,
            days: 1,
            city: "",
            children: 0,
            indexOfGroup: 0,
            possibleType: [
                { id: 1, POIType: "Sites culturel" },
                { id: 2, POIType: "Points d'intérêt" },
                { id: 3, POIType: "Bâtiments remarquable" },
                { id: 4, POIType: "Sites religieux" },
                { id: 5, POIType: "Places intéressante" },
                { id: 6, POIType: "Parcs et jardins" },
                { id: 7, POIType: "Lieux de mémoire" },
                { id: 8, POIType: "Cimetières militaire" },
                { id: 9, POIType: "Sites archéologique" },
                { id: 10, POIType: "Evenements sportif" },
                { id: 11, POIType: "Evenements divertissant" }
            ],
        }
    },
    methods: {
        setIndex(index) {
            this.indexOfGroup = index;
        },
        prev() {
            // not working function yet: need to find a way to get the index of the active carousel item
            setTimeout(() => {
                if (this.indexOfGroup == 0) {
                    this.indexOfGroup = this.$store.state.userStore.groups.length;
                } else {
                    this.indexOfGroup--;
                }
            }, "1 second");
        },
        next() {
            // not working function yet: need to find a way to get the index of the active carousel item
            if (this.indexOfGroup < this.$store.state.userStore.groups.length) {
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
            console.log("date de départ : ", this.date);
            console.log("heure de départ : ", this.timeOfStart);
            console.log("heure de fin : ", this.timeOfEnd);
            console.log("durée : ", duration);
            console.log("budget : ", this.budget);
            console.log("nombre de personnes : ", this.people);
            console.log("nombre d'enfants : ", this.children);
            console.log("type d'intérêt : ", this.$store.state.mapStore.selectedTypeOfInterest);
            console.log("index of groupe: ", this.indexOfGroup);
            console.log("group: ", this.$store.state.userStore.groups[this.indexOfGroup])
            // this.$store.dispatch("mapStore/generateItinerary", {
            //     date: this.date,
            //     timeOfStart: this.timeOfStart,
            //     timeOfEnd: this.timeOfEnd,
            //     duration: duration,
            //     budget: this.budget,
            //     people: this.people,
            //     children: this.children,
            //     typeOfInterest: this.$store.state.mapStore.selectedTypeOfInterest,
            //     group: this.$store.state.userStore.groups[this.indexOfGroup],
            // });
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
    color:red;
}
</style>