<template>
    <div id="app">
        <!-- transition pour afficher la modal de la création d'un nouveau groupe -->
        <transition name="fade" appear>
            <div class="modal-overlay" v-if="CreateGroup"></div>
        </transition>
        <!-- modal de la création de groupe
        -ajouter le back
        -modifier le design si besoin
         -->
        <transition name="pop" appear>
            <div class="modalCreateGroup" role="dialog" v-if="CreateGroup">
                <div class="row">
                    <div class="col-12 text-end">
                        <font-awesome-icon class="plusCreateGroup" @click="CreateGroup = false" icon="fa-solid fa-xmark" />
                    </div>
                </div>
                <h2>Créer votre nouveau groupe</h2>
                <div class="col-12 mt-3">
                    <h4>Nom du groupe</h4>
                    <input @blur="v$.groupInformations.name.$touch" placeholder="Vacances Famille" class="inputFormCreateGroupe" type="text" v-model="groupInformations.name" />
                    <div v-if="v$.groupInformations.name.$error" class="text-danger">Group name must contains between 3 and 15 characters</div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <h4>Adresse mail des membres</h4>
                        <input @blur="v$.mailMember.$touch" class="inputFormCreateGroupe" placeholder="exemple@exemple.com" type="email" @keydown.enter="addMembers" v-model="mailMember" />                    
                        <div v-if="v$.mailMember.$error" class="text-danger">Incorrect email</div>
                        <!-- vfor iterate with member of group -->
                        <div class="row mt-3" v-for="(member, index) in groupInformations.members" :key="index">
                            <div class="col-10">
                                <p>{{member.mail}}</p>
                            </div>
                            <div class="col-2">
                                <font-awesome-icon class="plusCreateGroup" @click="deleteMember(index)" icon="fa-solid fa-xmark" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-3">
                    <h4>Photo du groupe</h4>
                    <input type="file" @change="onFileChange" />
                </div>
                <div class="col-12 mt-3">
                    <button @click="sendMessage" class="buttonSave">Sauvegarder</button>
                </div>
                <!-- div if invalid display error invalid -->
                <div v-if="v$.groupInformations.name.$error" class="text-danger">Name required</div>

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
    methods: {
        addMembers() {
            this.groupInformations.members.push({ mail: this.mailMember, status: "pending" })
            this.mailMember = "";
        },
        sendMessage() {
            if (this.v$.$invalid) {
                return;
            }
            this.addMembers();
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
        updatePhoto(name, files) {
            if (files.length > 0) {
                this.groupInformations.photo = files[0];
            }
        }
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
                photo: ""
            },
        }
    },
    updated() {
    },
    validations() {
        return {
            mailMember: {
                required, email
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

.plusCreateGroup {
    font-size: 2rem;
    color: #000;
    cursor: pointer;
}

.buttonSave {
    color: #FFF;
    background: #000642;
    appearance: none;
    font: inherit;
    font-size: 1.8rem;
    border-radius: .3em;
}

.inputFormCreateGroupe {
    border-color: #000642;
    border-radius: 5px;
    width: 70%;
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

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
    transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
    opacity: 0;
    transform: scale(0.3) translateY(-50%);
}
</style>