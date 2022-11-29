<template>
    <TopBar class="col" :connected="true"/>
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
        <div class="col-12 text-center" v-if="$store.state.userStore.groups > 0">
            <h1>Mes groupes</h1>
        </div>
        <div class="row mt-3">
            <div class="col-12 col-lg-6 mt-3" v-for="(group, index) in $store.state.userStore.groups" :key="index">
                <div class="">
                    <cardsGroup :exists="true" :group=group :index=index></cardsGroup>
                </div>
            </div>
        </div>
        <div class="col-12 text-center mt-3">
            <button @click="createGroupe" class="createGroupeButton">Créer un groupe</button>
        </div>
            <!-- </div>
        </transition> -->
        <!-- component pour créer un groupe et afficher la liste des membres -->
        <CreateGroup @send-data=update v-show="createGroup" :key="keyCreateGroup"/>
        
    </div>
</template>
  
<script>
import CardsGroup from '@/components/UI/CardsGroup';
import CreateGroup from '@/components/UI/CreateGroup.vue';
import TopBar from '@/components/UI/TopBar.vue';
export default {
    name: "app",

    components: {
        CreateGroup,
        TopBar,
        CardsGroup,
    },
    data() {
        return {
            createGroup: false,
            indexGroup: 0,
            keyShowGroup: 0,
            keyCreateGroup : 0
        }
    },
    computed: {
        getGroups() {
            return this.$store.state.userStore.groups;
        }
    },
    created() {
    },
    methods: {
        update(object) {
            // this.groups.push(object);
            const fileReader = new FileReader();
            fileReader.onload = () => {
                    // const result = fileReader.result;
                    // this.groups[this.groups.length - 1].photo = result;
                }
            if (object.photo) {
                fileReader.readAsDataURL(object.photo);
            }
        },
        createGroupe() {
            this.keyCreateGroup++
            this.createGroup = true;
        },
    },

};
</script>
  
<style>

.createGroupeButton {
    background: #FFE9D3;
    border: 1px solid rgb(192, 150, 40);
    border-radius: 5px;
    padding: 10px 20px;
}

.createGroupeButton:hover {
    background: #FFD9B3;
}

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