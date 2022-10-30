<template>
    <div id="app">
        <div class="col-12 text-center">
            <button @click="showModal = true">Créer un groupe</button>
        </div>
        <!-- transition pour afficher la modale avec la liste des groupes -->
        <transition name="fade" appear>
            <div class="modal-overlay-group" v-if="showModal"></div>
        </transition>
        <!-- modal avec liste des groupes plus la possibilité de créer un nouveau groupe -->
        <transition name="pop" appear>
            <div class="modalGroup" role="dialog" v-if="showModal">
                <div class="row">
                    <!-- <div class="col-6 text-start">
                        <font-awesome-icon class="plusCreateGroup" @click="createGroupe" icon="fa-solid fa-plus" />
                    </div> -->
                    <div class="col-12 text-end">
                        <font-awesome-icon class="plusCreateGroup" @click="showModal = false" icon="fa-solid fa-xmark" />
                    </div>
                </div>
                <!-- card de groupe avec la photo de groupe & le nom du groupe -->
                <!-- v-for div with groups -->
                <div class="row mt-3" v-for="(group, index) in groups" :key="index">
                    <div class="col-12">
                        <div @click="showGroupe(index)" class="groupCard">
                            <div class="row text-center">
                                <div class="col-12 mt-2">
                                    <img class="groupPicture" :src="group?.photo"/>
                                </div>
                                <div class="col-12">
                                    <h3>{{group.name}}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div @click="showGroupe" class="groupCard" >
                    <div class="row text-center">
                        <div class="col-12 mt-2">
                            <img class="groupPicture" :src="require('@/assets/groupe.jpg')" />
                        </div>
                        <div class="col-12">
                            <h2>VAKARY</h2>
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center mt-3">
                    <button @click="createGroupe">Créer un groupe</button>
                </div>
            </div>
        </transition>
        <!-- component pour créer un groupe et afficher la liste des membres -->
        <CreateGroup @send-data="update" v-show="createGroup" :key="keyCreateGroup"/>
        <showMembers :groups=groups[indexGroup] v-show="showMembers" :key="showGroup"/>
    </div>
</template>
  
<script>
import CreateGroup from '@/components/UI/CreateGroup.vue';
import showMembers from '@/components/UI/ShowMembers.vue';

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
            indexGroup: 0,
            groups: [],
            showGroup: 0,
            keyCreateGroup : 0
        }
    },
    methods: {
        update(object) {
            this.groups.push(object);
            const fileReader = new FileReader();
            fileReader.onload = () => {
                    const result = fileReader.result;
                    this.groups[this.groups.length - 1].photo = result;
                }
            if (object.photo) {
                fileReader.readAsDataURL(object.photo);
            }
        },
        showGroupe(index) {
            this.showGroup++;
            this.indexGroup = index;
            this.showMembers = true;
        },
        createGroupe() {
            this.keyCreateGroup++
            this.createGroup = true;
        }

    },

};
</script>
  
<style scoped>
.groupCard {
    background: #000642;
    height: auto;
    cursor: pointer;
    color: #C09628;
}

.groupPicture {
    width: 150px;
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
    overflow-y: auto;
    padding: 2rem;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    background: #FFF;
    z-index: 999;
    transform: none;
}

.groupCard {
    border-radius: 20px;
    background: #000642;
}


.modal-overlay-group {
    top : 0;
    left : 0;
    right: 0;
    bottom: 0;
    position: absolute;
    background: #2c3e50;
    opacity: 0.6;
}

.plusCreateGroup {
    font-size: 40px;
    cursor: pointer;
}
</style>