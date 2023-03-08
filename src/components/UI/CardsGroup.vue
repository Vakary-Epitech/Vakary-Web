<template>
    <div @click="showGroupe(index)" class="groupCard">
        <div class="row text-start">
            <div class="col-6 col-lg-4">
                <img v-if="exists" class="groupPicture" :src="group.photo ? group.photo : require('@/assets/Logo_vect.svg')" />
                <img v-else class="groupPicture" :src="require('@/assets/Logo_vect.svg')" />
            </div>
            <div class="row col-6 col-lg-4">
                <div class="col-12">
                    <h3 v-if="exists">{{group.name}}</h3>
                    <h3 v-else>NO GROUP</h3>
                </div>
                <div  v-if="exists">
                    <div class="col-12" v-for="(member, index) in group.members" :key="index">
                        <div v-if="index < 3">
                            {{member.mail}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <showMembers @change-group-photo="changeGroupPhoto" :groups=this.$store.state.userStore.groups[indexGroup] v-show="showMembers" :key="keyShowGroup"/>
</template>

<script>
import showMembers from '@/components/UI/ShowMembers.vue';
export default {
    name: "CardsGroup",
    components: {
        showMembers,
    },
    props: {
        group: {
            type: Object,
        },
        index: {
            type: Number,
        },
        exists: {
            type: Boolean,
        }
    },
    data() {
        return {
            indexGroup: 0,
            groups: [],
            keyShowGroup: 0,
            showMembers: false,
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
        changeGroupPhoto(photo) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                    const result = fileReader.result;
                    this.$store.state.userStore.groups[this.indexGroup].photo = result;
                }
            if (photo) {
                fileReader.readAsDataURL(photo);
            }
        },
        showGroupe(index) {
            if (this.exists) {
                this.keyShowGroup++;
                this.indexGroup = index;
                this.showMembers = true;
            }
        },
    },

};
</script>

<style>
</style>