<template>
    <div id="app">
        <!-- boutton pour changer de page -->
        <button @click="(openVakaryHome)">Vakary Home</button>
        <h1>Groupe</h1>
        <button @click="showModal = true" class="buttonGroup">Groupe</button>
        <transition name="fade" appear>
            <div class="modal-overlay-group" v-if="showModal" @click="showModal = false"></div>
        </transition>
        <transition name="pop" appear>
            <div class="modalGroup" role="dialog" v-if="showModal">
                <div class="parentGroup">
                    <div class="crossCloseGroup">
                        <font-awesome-icon @click="showModal = false" icon="fa-solid fa-xmark" />
                    </div>
                    <div class="titleGroup">
                        <h1>Groupe</h1>
                    </div>
                    <div class="plusCreateGroup">
                        <font-awesome-icon @click="createGroup = true" icon="fa-solid fa-plus" />
                    </div>
                    <div class="card" style="width: 18rem;">
                    </div>
                </div>
                <div class="groupCard">
                    <div class="parentGroup">
                        <div class="pictureGroup"><img class="groupPicture" :src="require('./../assets/groupe.jpg')" /> </div>
                        <div class="nameGroup">
                            <h2 class="groupName">VAKARY</h2>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <CreateGroup v-if="createGroup" />
    </div>
</template>
  
<script>
import CreateGroup from './CreateGroup.vue';

export default {
    name: "app",
    components: {
    CreateGroup
},
    data() {
        return {
            showModal: false,
            createGroup : false
        }
    },
    mounted() {
        this.emitter.on("modalshow", () => {
            this.createGroup = false;
        })
    },
    // créations de la méthode pour avec une fonction pour changer de page
    methods: {
        openVakaryHome() {
            this.$router.push("/VakaryHome");
        },
    },

};
</script>
  
<style lang="css">

.groupCard {
    background: #000642;
    height: 113px;
}

.groupName {
    color: #C09628;
}

.groupPicture {
    width: 150px;
    margin-left: 0;
    border-radius: 20px;
}

.buttonGroup {
    border: none;
    color: #FFF;
    background: #2c3e50;
    appearance: none;
    font: inherit;
    font-size: 1.8rem;
    padding: .5em 1em;
    border-radius: .3em;
    cursor: pointer;
}

.modalGroup {
    position: fixed;
    margin: auto;
    width: 40%;
    height: 100%;
    margin-right: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    background: #FFF;
    z-index: 999;
    transform: none;
}

.groupCard {
    border-radius: 20px;
    background: #000642;
}

.groupName {
    color: #C09628;
}

.modal-overlay-group {
    content: '';
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background: #2c3e50;
    opacity: 0.6;
    cursor: pointer;
}

.parentGroup {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}

.crossCloseGroup {
    grid-area: 1 / 1 / 2 / 2;
}

.titleGroup {
    grid-area: 1 / 3 / 2 / 4;
}

.plusCreateGroup {
    grid-area: 1 / 5 / 2 / 6;
}

.pictureGroup {
    grid-area: 1 / 1 / 2 / 2;
}

.nameGroup {
    grid-area: 1 / 3 / 2 / 5;
}
</style>