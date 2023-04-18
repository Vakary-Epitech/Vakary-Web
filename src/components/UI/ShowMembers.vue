<template>
    <div id="app" v-if="showMembers">
            <div class="background" v-if="!editGroupName">
                <div class="row">
                    <div class="col-12 text-end">
                        <font-awesome-icon class="xMark" @click="goBackToGroupDropdown()" icon="fa-solid fa-xmark" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-8 text-center">
                        <h1>{{ groupInformations.name }}</h1>
                    </div>
                    <div class="col-2 mx-auto my-auto">
                        <button class="btn-change-group-name" @click="editGroupName = true"><i class="fa-solid fa-pen"></i></button>
                    </div>
                    <div class="col-2 mx-auto my-auto">
                        <button class="btn-delete-group ms-2" @click="messageDeleteGroup"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                <div class="col-12 text-center my-2">
                    <img class="w-100" :src="groupInformations.photo?.preview" :alt="groupInformations.photo?.name" />
                </div>
                <label class="btn-change-group-picture" v-if="!groupInformations.photo?.preview">
                    Add group picture
                    <input @change="onFileChange" type="file" hidden>
                </label>
                <div v-if="groupInformations.photo?.preview">
                    <label class="btn-change-group-picture">
                        Change group picture
                        <input @change="onFileChange" type="file" hidden>
                    </label>
                    <button @click="deleteGroupPicture" class="ms-3">Delete group Picture</button>
                </div>
                <h4 v-show="groupInformations?.members?.length > 0">Membres du groupe</h4>
                <div class="row mt-3" v-for="(member, index) in groupInformations.members" :key="index">
                    <div class="col-6 text-start">
                        {{ member.mail }}
                    </div>
                    <div class="col-4 status" :class="getStatus(index)">
                        {{ member.status }}
                    </div>
                    <div class="col-2">
                        <font-awesome-icon class="trashIcon" @click="deleteMember(index)" icon="fa-solid fa-trash" />
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <input placeholder="Adresse mail des membres"
                                v-model="mailMember"
                                @keydown.enter.prevent="addMember()"/>
                                <button class="btn-add-group-member" @click="addMember()">Ajouter</button>
                                <div v-if="mailMember && !isValidEmail(mailMember)" class="text-danger">
                                    Format d'email incorrect
                                </div>
                    </div>
                </div>
                <div class="col-12 mt-3 text-center">
                    <button @click="goBackToGroupDropdown" class="button-test">Sauvegarder</button>
                </div>
                <div class="col-12">
                    <b>id: {{ groupInformations.id }}</b>
                </div>
            </div>
            <div class="background" v-if="editGroupName">
                <div class="row">
                    <div class="col-12 text-end">
                        <font-awesome-icon class="xMark" @click="editGroupName = false;" icon="fa-solid fa-xmark" />
                    </div>
                </div>
                <div class="col-12 text-center">
                    <h1>{{groupInformations.name}}</h1>
                </div>
                <div class="col-12 text-center">
                    <input @blur="v$.newGroupName.$touch" v-model="newGroupName" />
                </div>
                <div v-if="v$.newGroupName.$error" class="text-danger">Group name must contains between 3 and 15
                    characters</div>
                <div class="col-12 text-center">
                    <button class="btn btn-primary mt-2" @click="updateGroupName()">Valider</button>
                </div>
            </div>
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
                photo: {
                    name: "",
                    size: 0,
                    type: "",
                    preview: "",
                },
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
        messageDeleteGroup () {
            //l'idée est de faire une popup pour confirmer la suppression du groupe ou pas forcément une popup,
            //juste une variable qui changerait l'icone crayon et l'icon poubelle par un icon de validation et un icon de croix
            //et qui afficherait un message de confirmation de suppression du groupe
        },
        goBackToGroupDropdown() {
            this.CreateGroup = false;
            this.$emit("goBackToGroupDropdown");
        },
        getStatus(index) {
            return this.groupInformations.members[index].status;
        },
        addMember() {
            if (this.mailMember && this.isValidEmail(this.mailMember)) {
                this.groupInformations.members.push({ mail: this.mailMember, status: "pending" })
                this.mailMember = '';
            }
        },
        isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
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
            let index = this.$store.state.userStore.groups.findIndex(group => group.id === this.groupInformations.id);
            this.$store.state.userStore.groups.splice(index, 1);
            this.showMembers = false;
        },
        deleteGroupPicture() {
            this.groupInformations.photo = {
                name: "",
                preview: "",
                size: "",
                type: "",
            }
        },
        onFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                this.groupInformations.photo = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    preview: reader.result
                };
            };

            if (file) {
                reader.readAsDataURL(file);
            }
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

.background {
    background-color: white;
    padding: 15px;
    border-radius: 15px;
    border: 2px solid rgb(192, 150, 40);
}

.button-test {
  background-color: rgb(192, 150, 40);; /* couleur orangée */
  border-radius: 15px;
  border: 2px solid rgb(192, 150, 40);; /* couleur dorée */
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  transition: all 0.3s ease;
}

.button-test:hover {
  background-color: #ffffff; /* couleur blanche */
  color: rgb(192, 150, 40);; /* couleur dorée */
  cursor: pointer;
}

.xMark {
    font-size: 2rem;
    color: #000;
    cursor: pointer;
}

.btn-add-group-member {
    background-color: #0077B5;
    border: 1px solid #0077B5;
    border-radius: 5px;
    color: #FFFFFF;
    margin-left: 5px;
    padding: 5px 5px;
    cursor: pointer;
}

.btn-add-group-member:hover {
    background-color: #4B4B4B;
    border: 1px solid #4B4B4B;
    color: #FFFFFF;
}

.btn-change-group-picture {
    background-color: #0077B5;
    border: 1px solid #0077B5;
    border-radius: 5px;
    color: #FFFFFF;
    padding: 10px 20px;
    cursor: pointer;
}

.btn-change-group-picture:hover {
    background-color: #4B4B4B;
    border: 1px solid #4B4B4B;
    color: #FFFFFF;
}

.btn-save-group {
    background-color: #FFFFFF;
    border: 1px solid #0077B5;
    border-radius: 5px;
    color: #0077B5;
    padding: 10px 20px;
    cursor: pointer;
}

.btn-save-group:hover {
    background-color: #0077B5;
    border: 1px solid #0077B5;
    color: #FFFFFF;
}

.btn-change-group-name {
    background-color: #FFFFFF;
    border: none;
    border-radius: 5px;
    padding: 2px 5px;
    cursor: pointer;
}

.btn-change-group-name:hover {
    box-shadow: 0 0 0 2px rgb(192, 150, 40);
}

.btn-delete-group {
    background-color: #FFFFFF;
    border: none;
    border-radius: 5px;
    color: #dc3545;
    padding: 2px 5px;
    cursor: pointer;
}

.btn-delete-group:hover {
    box-shadow: 0 0 0 2px #dc3545;
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
</style>
