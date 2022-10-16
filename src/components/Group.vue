<template>
    <div id="app">
        <!-- boutton pour changer de page -->
        <button @click="(openVakaryHome)">Vakary Home</button>
        <img class="logoVakary" @click="showModal = true" :src="require('./../assets/Logo_vect.png')" />
        <!-- transition pour afficher la modale avec la liste des groupes -->
        <transition name="fade" appear>
            <div class="modal-overlay-group" v-if="showModal" @click="showModal = false"></div>
        </transition>
        <!-- modal avec liste des groupes plus la possibilité de créer un nouveau groupe -->
        <transition name="pop" appear>
            <div class="modalGroup" role="dialog" v-if="showModal">
                <div class="parentGroup">
                    <div class="crossCloseGroup">
                        <font-awesome-icon @click="showModal = false" icon="fa-solid fa-xmark" />
                    </div>
                    <div class="plusCreateGroup">
                        <font-awesome-icon @click="createGroupe" icon="fa-solid fa-plus" />
                    </div>
                    <div class="card" style="width: 18rem;">
                    </div>
                </div>
                <!-- card de groupe avec la photo de groupe & le nom du groupe -->
                <div @click="showGroupe" class="groupCard" >
                    <div class="parentGroup">
                        <div class="pictureGroup"><img class="groupPicture" :src="require('./../assets/groupe.jpg')" />
                        </div>
                        <div class="nameGroup">
                            <h2 class="groupName">VAKARY</h2>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- component pour créer un groupe et afficher la liste des membres -->
        <CreateGroup v-show="createGroup" :key="keyCreateGroup"/>
        <showMembers v-show="showMembers" :key="showGroup"/>
    </div>
</template>
  
<script>
import CreateGroup from './CreateGroup.vue';
import showMembers from './showMembers.vue';

export default {
    name: "app",

    components: {
        CreateGroup,
        showMembers
    },
    data() {
        return {
            showModal: false,
            createGroup: false,
            showMembers: false,
            showGroup: 0,
            keyCreateGroup : 0

        }
    },
    mounted() {
        this.emitter?.on("modalshow", () => {
            this.createGroup = false;
        })
        this.emitter?.on("showMembers", () => {
            console.log(this.showMembers)
            this.showMembers = false;
        })
    },
    methods: {
        openVakaryHome() {
            this.$router.push("/VakaryHome");
        },

        showGroupe() {
            this.showGroup++
            this.showMembers = true;
        },
        createGroupe() {
            this.keyCreateGroup++
            this.createGroup = true;
        }

    },

};
</script>
  
<style lang="css">
.groupCard {
    background: #000642;
    height: 113px;
    cursor: pointer;
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
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}

.crossCloseGroup {
    grid-area: 1 / 1 / 2 / 2;
    font-size: 40px;
    cursor: pointer;
}

.plusCreateGroup {
    grid-area: 1 / 5 / 2 / 6;
    font-size: 40px;
    cursor: pointer;
}

.pictureGroup {
    grid-area: 1 / 1 / 2 / 2;
}

.logoVakary {
    display: flex;
    justify-self: flex-end;
    align-content: flex-end;
    max-width: 100px;
    cursor: pointer;
}

.nameGroup {
    grid-area: 1 / 3 / 2 / 5;
}
</style>