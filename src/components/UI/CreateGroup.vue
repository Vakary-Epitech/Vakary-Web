<template>
    <div id="app">
        <transition name="fade" appear>
            <div class="modal-overlay" v-if="CreateGroup"></div>
        </transition>
        <transition name="pop" appear>
            <div class="modalCreateGroup" v-if="CreateGroup">
                <div class="row">
                    <div class="col-12 text-end">
                        <font-awesome-icon class="xMark" @click="CreateGroup = false" icon="fa-solid fa-xmark" />
                    </div>
                </div>
                <h2>Créer un nouveau groupe</h2>
                <div class="col-12 mt-3">
                    <input @blur="v$.groupInformations.name.$touch" placeholder="Nom du groupe" v-model="groupInformations.name" />
                    <div v-if="v$.groupInformations.name.$error" class="text-danger">Group name must contains between 3 and 15 characters</div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <input @blur="v$.mailMember.$touch" placeholder="Adresse mail des membres" @keydown.enter="addMembers" v-model="mailMember" />                    
                        <div v-if="v$.mailMember.$error" class="text-danger">Incorrect email</div>
                        <div class="row mt-3" v-for="(member, index) in groupInformations.members" :key="index">
                            <div class="col-10">
                                <p>{{member.mail}}</p>
                            </div>
                            <div class="col-2 text-end">
                                <font-awesome-icon class="xMark" @click="deleteMember(index)" icon="fa-solid fa-xmark" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-3">
                    <label class="addGroupPicture">
                        Ajouter une photo de groupe
                        <input @change="onFileChange" type="file" hidden>
                    </label>
                </div>
                <div v-if="groupInformations.photo">
                    {{groupInformations.photo.name}}
                </div>
                <div class="col-12 mt-3 text-center">
                    <button @click="sendMessage" class="saveButton">Sauvegarder</button>
                </div>
                <div v-if="v$.groupInformations.name.$error" class="text-danger">Name required</div>
            </div>
        </transition>
    </div>
</template>
  
<script>
import useVuelidate from '@vuelidate/core';
import { v4 as uuidv4 } from 'uuid';
import { required, email, minLength, maxLength } from '@vuelidate/validators';
export default {

    name: "createGroup",
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            CreateGroup: true,
            mailMember: "",
            firstName: "",
            listMembers: [],
            groupInformations : {
                name: "",
                members: [],
                photo: "",
                id: ""
            },
        }
    },
    methods: {
        addMembers() {
            if (this.v$.mailMember.$error) {
                return;
            }
            this.groupInformations.members.push({ mail: this.mailMember, status: "pending" })
            this.mailMember = "";
        },
        sendMessage() {
            if (this.v$.$invalid) {
                this.v$.groupInformations.name.$touch();
                return;
            }
            if (this.mailMember.length != 0) {
                this.addMembers();
            }
            this.groupInformations.id = uuidv4();
            this.$store.dispatch("addGroup", this.groupInformations).then(() => {
                console.log("group added");
            }).catch(() => {
                console.log("group not added ==> Error");
            })
            this.$store.dispatch("getGroup", this.groupInformations).then(() => {
                console.log("group ");
            }).catch(() => {
                console.log("not group ==> Error");
            })
            this.$emit('sendData', this.groupInformations);
            this.CreateGroup = false;
        },
        deleteMember(index) {
            this.groupInformations.members.splice(index, 1);
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.groupInformations.photo = file;
        },
    },
    validations() {
        return {
            mailMember: {
                email
            },
            groupInformations: {
                name: {
                    minLength: minLength(3),
                    required,
                    maxLength: maxLength(15)
                }
            }
        }
    }
};
</script>

<style scoped>

.addGroupPicture {
    background: #FFE9D3;
    border: 1px solid rgb(192, 150, 40);
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
}

.addGroupPicture:hover {
    background: #FFD9B3;
}

.saveButton {
    background: #FFE9D3;
    border: 1px solid #000642;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
}

.saveButton:hover {
    background: #FFD9B3;
}

.xMark {
    font-size: 2rem;
    color: #000;
    cursor: pointer;
}

.buttonSave {
    background: #FFE9D3;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
}

.modalCreateGroup {
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
/* create the same modal but with width and height at 100% if the media query is small */
@media screen and (max-width: 600px) {
    .modalCreateGroup {
        width: 100%;
        height: 100%;
        border-radius: 0;
    }
}

</style>