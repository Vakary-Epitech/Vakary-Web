<template>
    <TopBar class="col" :connected="true"/>
    <div class="container">
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
            const fileReader = new FileReader();
            fileReader.onload = () => {}
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
  
<style scoped>

.createGroupeButton {
    background: #FFE9D3;
    border: 1px solid rgb(192, 150, 40);
    border-radius: 5px;
    padding: 10px 20px;
}

.createGroupeButton:hover {
    background: #FFD9B3;
}

</style>