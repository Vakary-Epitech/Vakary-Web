<template>
    <div class="container">
        <!-- <div class="col-12 text-center">
            <button @click="showModal = true">Créer un groupe</button>
        </div> -->
        <!-- transition pour afficher la modale avec la liste des groupes -->
        <!-- <transition name="fade" appear>
            <div class="modal-overlay-group" v-if="showModal"></div>
        </transition> -->
        <!-- modal avec liste des groupes plus la possibilité de créer un nouveau groupe -->
        <!-- <transition name="pop" appear> -->
            <!-- <div class="modalGroup" role="dialog" v-if="showModal"> -->
                <!-- <div class="row"> -->
                    <!-- <div class="col-6 text-start">
                        <font-awesome-icon class="plusCreateGroup" @click="createGroupe" icon="fa-solid fa-plus" />
                    </div> -->
                    <!-- <div class="col-12 text-end">
                        <font-awesome-icon class="plusCreateGroup" @click="showModal = false" icon="fa-solid fa-xmark" />
                    </div> -->
                <!-- </div> -->
                <!-- card de groupe avec la photo de groupe & le nom du groupe -->
                <!-- v-for div with groups -->
        <div class="col-12 text-center" v-if="groups.length > 0">
            <h1>Mes groupes</h1>
        </div>
        <div class="row mt-3">
            <div class="col-6 mt-3" v-for="(group, index) in groups" :key="index">
                <div class="">
                    <div @click="showGroupe(index)" class="groupCard">
                        <div class="row text-start">
                            <div class="col-6 col-lg-4">
                                <img class="groupPicture" :src="group.photo ? group.photo : require('@/assets/Logo_vect.svg')" />
                            </div>
                            <div class="row col-6 col-lg-4">
                                <div class="col-12">
                                    <h3>{{group.name}}</h3>
                                </div>
                                <div class="col-12" v-for="(member, index) in group.members" :key="index">
                                    <div v-if="index < 3">
                                        {{member.mail}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 text-center mt-3">
            <button @click="createGroupe">Créer un groupe</button>
        </div>
            <!-- </div>
        </transition> -->
        <!-- component pour créer un groupe et afficher la liste des membres -->
        <CreateGroup @send-data="update" v-show="createGroup" :key="keyCreateGroup"/>
        <showMembers @change-group-photo="changeGroupPhoto" @delete-group="deleteGroup(indexGroup)" :groups=groups[indexGroup] v-show="showMembers" :key="keyShowGroup"/>
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
            createGroup: false,
            showMembers: false,
            indexGroup: 0,
            groups: [],
            keyShowGroup: 0,
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
        changeGroupPhoto(photo) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                    const result = fileReader.result;
                    this.groups[this.indexGroup].photo = result;
                }
            if (photo) {
                fileReader.readAsDataURL(photo);
            }
        },
        showGroupe(index) {
            this.keyShowGroup++;
            this.indexGroup = index;
            this.showMembers = true;
        },
        createGroupe() {
            this.keyCreateGroup++
            this.createGroup = true;
        },
        deleteGroup(index) {
            this.groups.splice(index, 1);
            this.showMembers = false;
        }

    },

};
</script>
  
<style>
.groupCard {
    background: #FFE9D3;
    height: auto;
    cursor: pointer;
    border-radius: 20px;
    color: black;
}

.groupPicture {
    border-radius: 20px;
    width: 150px;
    height: 150px;
}

</style>