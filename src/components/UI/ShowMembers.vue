<template>
    <div id="app" v-if="showMembers">
        <!-- transition pour afficher la modal de la liste des membres -->
        <transition name="fade" appear>
            <div class="modal-overlay" v-if="showMembers"></div>
        </transition>
        <transition name="pop" appear>
            <!-- modal de la liste des membres
            -ajouter le back
            -retravailler le design si possible
             -->
             <div class="modalshowMembers">
                <div class="row">
                    <div class="col-12 text-end">
                        <font-awesome-icon class="xMark" @click="showMembers = false;" icon="fa-solid fa-xmark" />
                    </div>
                </div>
                <div class="col-12 text-center">
                    <h1>{{groupInformations.name}}</h1>
                </div>
                <!-- edit group's name -->
                <div class="col-12 text-center">
                    <button class="addGroupPicture" @click="editGroupName = true">Modifier le nom du groupe</button>
                </div>
                <!-- delete group -->
                <div class="col-12 text-center">
                    <button class="addGroupPicture" @click="deleteGroup">Supprimer le groupe</button>
                </div>
                <div class="col-12 text-center">
                    <img class="w-100" :src="groupInformations.photo"/>
                </div>
                <!-- edit group photo -->
                <label class="addGroupPicture">
                        Modifier la photo du groupe
                        <input @change="onFileChange" type="file" hidden>
                </label>
                <!-- make a popup where we can edit group's name -->
                <transition name="fade" appear>
                    <div class="modal-overlay" v-if="editGroupName"></div>
                </transition>
                <transition name="pop" appear>
                    <div class="modalEditGroupName" v-if="editGroupName">
                        <div class="row">
                            <div class="col-12 text-end">
                                <font-awesome-icon class="xMark" @click="editGroupName = false;" icon="fa-solid fa-xmark" />
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <h1>Modifier le nom du groupe</h1>
                        </div>
                        <div class="col-12 text-center">
                            <input @blur="v$.newGroupName.$touch" v-model="newGroupName" />
                        </div>
                        <div v-if="v$.newGroupName.$error" class="text-danger">Group name must contains between 3 and 15 characters</div>
                        <div class="col-12 text-center">
                            <button @click="updateGroupName()">Valider</button>
                        </div>
                        <!-- if error in name validators -->

                    </div>
                </transition>
                <h4 v-show="groupInformations?.members?.length > 0">Membres du groupe</h4>
                <div class="row mt-3" v-for="(member, index) in groupInformations.members" :key="index">
                    <div class="col-6 text-start">
                        <input v-model="member.mail">
                    </div>
                    <div class="col-4 status" :class="getStatus(index)">
                        {{member.status}}
                    </div>
                    <div class="col-2">
                        <font-awesome-icon class="trashIcon" @click="deleteMember(index)" icon="fa-solid fa-trash" />
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <input @blur="v$.mailMember.$touch" placeholder="Ajouter un membre" v-model="mailMember" />
                        <div v-if="v$.mailMember.$error" class="text-danger">Incorrect email</div>
                    </div>
                    <div class="col-12">
                        <button class="addGroupPicture" @click="addMember" >Ajouter un membre</button>
                    </div>
                </div>
                <div class="col-12">
                    <b>id: {{groupInformations.id}}</b>
                </div>
            </div>
        </transition>
    </div>
</template>
  
<script>
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, maxLength } from '@vuelidate/validators';
export default {

    name: "createGroup",
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            groupInformations: {
                name: "",
                members: [],
                photo: "",
                id: "",
            },
            editGroupName: false,
            newGroupName: "",
            mailMember: '',
            showMembers: true,
        }
    },
    computed: {
        getGroups() {
            return this.$store.state.userStore.groups;
        },
    },
    created() {
        this.groupInformations = this.groups;
    },
    methods: {
        getStatus(index) {
            return this.groupInformations.members[index].status;
        },
        addMember() {
            if (this.v$.mailMember.$error) {
                return;
            }
            this.groupInformations.members.push({ mail: this.mailMember, status: "pending" })
            this.mailMember = "";
            this.v$.mailMember.$reset();
        },
        deleteMember(index) {
            this.groupInformations.members.splice(index, 1);
        },
        editName() {
            this.editNameGroup = true;
        },
        updateGroupName() {
            if (this.v$.newGroupName.$invalid) {
                return;
            }
            this.editGroupName = false; 
            this.v$.newGroupName.$reset();
            this.groupInformations.name = this.newGroupName;
            this.newGroupName = "";
        },
        deleteGroup() {
            // delete the group in the local storage
            let index = this.$store.state.userStore.groups.findIndex(group => group.id === this.groupInformations.id);
            this.$store.state.userStore.groups.splice(index, 1);
            this.showMembers = false;
        },  
        onFileChange(e) {
            const file = e.target.files[0];
            this.groupInformations.photo = file;
            this.$emit("changeGroupPhoto", this.groupInformations.photo);
        },
    },
    props: {
        groups: {
            type: Object,
            default: () => ({})
        },
    },
    validations() {
        return {
            mailMember: {
                required, email
            },
            newGroupName: {
                    minLength: minLength(3),
                    required,
                    maxLength: maxLength(15)
            }
        }
    }
};
</script>

<style scoped>
.xMark {
    font-size: 2rem;
    color: #000;
    cursor: pointer;
}

.pending {
    border: 1px grey solid;
    background-color: #C4C4C4;
}

.denied {
    background-color: #FFBABA;
    border: 1px red solid;
}

.accepted {
    background-color: #B6FBB2;
    border: 1px green solid;
}

.status {
    border-radius: 1em;
}

.trashIcon {
    font-size: 1rem;
    color: red;
    cursor: pointer;
}
.buttonAddMembers {
    border: none;
    color: #FFF;
    background: #000642;
    margin-top: 20px;
    appearance: none;
    font: inherit;
    font-size: 0.7rem;
    padding: .5em 1em;
    border-radius: .3em;
    cursor: pointer;
}

.addGroupPicture {
    background: #FFE9D3;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    color: #FF8C00;
    cursor: pointer;
}
.modalshowMembers {
    position: absolute;
    position: fixed;
    background-color: #FFF;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    margin: auto;
    text-align: center;
    width: 40%;
    height: 80%;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transform: none;
}

@media screen and (max-width: 900px) {
    .modalshowMembers {
        width: 100%;
        height: 100%;
    }
}
.modalEditGroupName {
    position: absolute;
    position: fixed;
    background-color: #FFF;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    margin: auto;
    text-align: center;
    width: 40%;
    height: 80%;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transform: none;
}
.modal-overlay {
    content: '';
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background: #2c3e50;
    opacity: 0.6;
}
</style>
