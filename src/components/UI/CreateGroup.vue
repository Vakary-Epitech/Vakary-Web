<template>
    <div id="app">
        <div class="background">
            <div class="row">
                <div class="col-12 text-end">
                    <font-awesome-icon class="xMark" @click="goBackToGroupDropdown()" icon="fa-solid fa-xmark" />
                </div>
            </div>
            <h2>Créer un nouveau groupe</h2>
            <section name="groupName">
                <div class="col-12 mt-3">
                    <input @blur="v$.groupInformations.name.$touch" placeholder="Nom du groupe"
                        v-model="groupInformations.name" />
                    <div v-if="v$.groupInformations.name.$error" class="text-danger">Group name must be between 3 and 15
                        characters</div>
                </div>
            </section>
            <section name="groupMembers">
                <div class="row mt-3">
                    <div class="col-12">
                        <input placeholder="Adresse mail des membres"
                            v-model="mailMember"
                            @keydown.enter.prevent="addMember"/>
                            <button class="btn-add-group-member" @click="addMember">Ajouter</button>
                            <div v-if="showEmailError" class="text-danger">
                                Format d'email incorrect
                            </div>
                        <div class="col-12 mt-3">
                        </div>
                        <div class="row mt-3" v-for="(member, index) in groupInformations.members" :key="index">
                            <div class="col-10">
                                <p>{{ member.mail }}</p>
                            </div>
                            <div class="col-2 text-end">
                                <font-awesome-icon class="xMark" @click="deleteMember(index)" icon="fa-solid fa-xmark" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section name="photoGroup">
                <div class="col-12 mt-3">
                    <label class="btn-add-group-picture">
                        Ajouter une photo de groupe
                        <input @change="onFileChange" type="file" hidden>
                    </label>
                </div>
                <div v-if="groupInformations.photo">
                    <div>
                        <img :src="groupInformations.photo.preview" class="img-thumbnail" />
                    </div>
                    <div>{{ groupInformations.photo.name }}</div>
                </div>
            </section>
            <div class="col-12 mt-3 text-center">
                <button @click="sendMessage" class="btn-save-group">Sauvegarder</button>
            </div>
            <div v-if="v$.groupInformations.name.$error" class="text-danger">Name required</div>
        </div>
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
            groupInformations: {
                name: "",
                members: [],
                photo: "",
                id: ""
            },
            showEmailError: false
        }
    },
    methods: {
        addMembers() {
            if (!this.isValidEmail(this.mailMember)) {
                this.showEmailError = true;
                return;
            }
            this.showEmailError = false;
            this.groupInformations.members.push({ mail: this.mailMember, status: "pending" })
            this.mailMember = ''; 
        },
        deleteMember(index) {
            this.groupInformations.members.splice(index, 1);
        },
        isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        },
        sendMessage() {
            const { groupInformations, mailMember } = this;

            if (mailMember.length !== 0) {
                this.addMembers();
            }

            groupInformations.id = uuidv4();


            this.$store.state.userStore.groups.push(groupInformations);

            this.CreateGroup = false;
            this.$emit("goBackToGroupDropdown");
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
        goBackToGroupDropdown() {
            this.CreateGroup = false;
            this.$emit("goBackToGroupDropdown");
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

.background {
    background-color: white;
    padding: 15px;
    border-radius: 15px;
    border: 2px solid rgb(192, 150, 40);
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

.btn-add-group-picture {
    background-color: #0077B5;
    border: 1px solid #0077B5;
    border-radius: 5px;
    color: #FFFFFF;
    padding: 10px 20px;
    cursor: pointer;
}

.btn-add-group-picture:hover {
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
.xMark {
    font-size: 2rem;
    color: #000;
    cursor: pointer;
}
</style>