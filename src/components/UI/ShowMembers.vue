<template>
    <div id="app" v-if="showMembers">
        <section name="groupManagement">
            <div class="background">
                <div class="row">
                    <div class="col-12 text-end">
                        <button class="xMark" @click="goBackToGroupDropdown()"><i class="fa-solid fa-xmark fa-lg"></i></button>
                    </div>
                </div>
                <section name="group">
                    <div class="row">
                        <div class="col-8 text-center">
                            <div v-if="editGroupName">
                                <h4 class="overflow mt-3">
                                    <input 
                                    @blur="v$.newGroupName.$touch" 
                                    v-model="newGroupName"
                                    class="changeGroupName"
                                    >
                                </h4>
                                <div v-if="v$.newGroupName.$error" class="text-danger">
                                    {{ $t("showMembers.errors.name") }}
                                </div>
                            </div>
                            <p v-else-if="askingDelete">{{ $t("showMembers.deleteMessage") }}</p>
                            <h4 v-else class="overflow mt-3">{{ groupInformations.name }}</h4>
                        </div>
                        <div class="col-2 mx-auto my-auto">
                            <button v-if="editGroupName" class="btn-check-change-group-name" @click="updateGroupName()"><i class="fa-solid fa-check fa-lg"></i></button>
                            <button v-else-if="askingDelete" class="btn-check-change-group-name" @click="deleteGroup()"><i class="fa-solid fa-check fa-lg"></i></button>
                            <button v-else class="btn-change-group-name" @click="editGroupName = true"><i class="fa-solid fa-pen"></i></button>
                        </div>
                        <div class="col-2 mx-auto my-auto">
                            <button v-if="editGroupName" class="btn-mark-change-group-name" @click="leaveEditName()"><i class="fa-solid fa-xmark fa-lg"></i></button>
                            <button v-else-if="askingDelete" class="btn-mark-change-group-name" @click="leaveAskingDelete()"><i class="fa-solid fa-xmark fa-lg"></i></button>
                            <button v-else class="btn-delete-group ms-2" @click="messageDeleteGroup"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </section>
                <section name="members">
                    <div class="row mt-3">
                        <div class="col-12">
                            <input 
                                :placeholder="$t('showMembers.placeholders.mail')"
                                v-model="mailMember"
                                @keydown.enter.prevent="addMember()"
                                class="inputClass"
                            />
                            <div v-if="showEmailError" class="text-danger">
                                {{ $t("showMembers.errors.mail") }}
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3" v-for="(member, index) in groupInformations.members" :key="index">
                        <div class="col-6 text-start">
                            {{ member.mail }}
                        </div>
                        <div class="col-4 status" :class="getStatus(index)">
                            {{ member.status }}
                        </div>
                        <div class="col-2" v-if="!member.admin">
                            <button class="trashIcon" @click="deleteMember(index)"><i class="fa-solid fa-trash"></i></button>
                        </div>
                        <div class="col-2 text-center" v-else>
                            <i class="fas fa-crown goldCrown" aria-hidden="true"></i>
                        </div>
                    </div>
                </section>
                <section name="picture">
                    <div v-if="groupInformations.photo" class="text-center">
                        <img :src="groupInformations.photo?.preview" :alt="groupInformations.photo?.name" class="img-thumbnail my-1"/>
                    </div>
                    <label class="btn-add-group-picture mt-1" v-if="!groupInformations.photo?.preview">
                        {{ $t("showMembers.picture") }}
                        <input @change="onFileChange" type="file" hidden>
                    </label>
                    <div v-if="groupInformations.photo?.preview">
                        <label class="btn-change-group-picture">
                            {{  $t("showMembers.changePicture") }}
                            <input @change="onFileChange" type="file" hidden>
                        </label>
                        <button @click="deleteGroupPicture" class="btn-delete-group-picture my-2"> {{ $t("showMembers.deletePicture") }} </button>
                    </div>
                </section>
                <div class="col-12 mt-3 text-center">
                    <button @click="goBackToGroupDropdown" class="btn-save-group">{{ $t("showMembers.save") }}</button>
                </div>
            </div>
        </section>
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
            newGroupName: "",
            askingDelete: false,
            editGroupName: false,
            mailMember: '',
            showMembers: true,
            showEmailError: false
        }
    },
    computed: {
        getGroups() {
            return this.$store.state.userStore.groups;
        },
    },
    created() {
        this.groupInformations = this.groups;
        this.newGroupName = this.groupInformations.name;
    },
    methods: {
        messageDeleteGroup () {
            this.askingDelete = true;
        },
        goBackToGroupDropdown() {
            this.CreateGroup = false;
            this.$emit("goBackToGroupDropdown");
        },
        getStatus(index) {
            return this.groupInformations.members[index].status;
        },
        addMember() {
            if (!this.isValidEmail(this.mailMember)) {
                this.showEmailError = true;
                return;
            }
            this.showEmailError = false;
            this.groupInformations.members.push({ mail: this.mailMember, status: "pending", admin: false })
            this.mailMember = ''; 
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
            if (this.v$.newGroupName.$error) {
                return;
            }
            this.groupInformations.name = this.newGroupName;
            this.editGroupName = false;
        },
        leaveEditName() {
            this.editGroupName = false;
            this.newGroupName = this.groupInformations.name;
        },
        leaveAskingDelete() {
            this.askingDelete = false;
        },
        deleteGroup() {
            let index = this.$store.state.userStore.groups.findIndex(group => group.id === this.groupInformations.id);
            this.$store.state.userStore.groups.splice(index, 1);
            this.showMembers = false;
            this.$emit("goBackToGroupDropdown");
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
                maxLength: maxLength(18),
            }
        }
    }
};
</script>

<style scoped>

.inputClass {
    border: 1px solid rgb(192, 150, 40);
    border-radius: 5px;
    padding: 5px 5px;
    width: 100%;
}

.background {
    background-color: white;
    padding: 15px;
    border-radius: 15px;
    border: 2px solid rgb(192, 150, 40);
    max-height: 400px;
    max-width: 400px;
    overflow: auto;
}
::-webkit-scrollbar {
  width: 0 !important;
}

.changeGroupName {
    text-decoration: none;
    border: none;
}

.changeGroupName:focus {
    outline: none;
    border: none;
}

.overflow {
    overflow: auto;
}

.btn-save-group {
    background-color: #FFFFFF;
    border: 1px solid rgb(192, 150, 40);
    border-radius: 5px;
    color: black;
    padding: 10px 20px;
    width: 50%;
    text-align: center;
}

.btn-save-group:hover {
    box-shadow: 0px 0px 5px 0px rgb(192, 150, 40);
}

.btn-add-group-picture {
    background-color: #0077B5;
    border: 1px solid #0077B5;
    border-radius: 5px;
    color: #FFFFFF;
    padding: 10px 20px;
    width: 100%;
    cursor: pointer;
    text-align: center;
}

.btn-add-group-picture:hover {
    box-shadow: 0px 0px 5px 0px #0077B5;
}

.btn-delete-group-picture {
    background-color: #FFFFFF;
    border: 1px solid #dc3545;
    border-radius: 5px;
    color: #dc3545;
    padding: 10px 20px;
    width: 100%;
    text-align: center;
}

.btn-delete-group-picture:hover {
    box-shadow: 0px 0px 5px 0px #dc3545;
}

.btn-change-group-picture {
    background-color: #0077B5;
    border: 1px solid #0077B5;
    border-radius: 5px;
    color: #FFFFFF;
    padding: 10px 20px;
    width: 100%;
    cursor: pointer;
    text-align: center;
}

.btn-change-group-picture:hover {
    box-shadow: 0px 0px 5px 0px #0077B5;
}

.xMark {
    background-color: #FFFFFF;
    border: none;
    border-radius: 5px;
    padding: 2px 5px;
    color: black;
}

.xMark:hover {
    box-shadow: 0 0 0 2px black;
}

.btn-check-change-group-name {
    background-color: #FFFFFF;
    border: none;
    border-radius: 5px;
    padding: 2px 5px;
    color: green;
}

.btn-check-change-group-name:hover {
    box-shadow: 0 0 0 2px green;
}

.btn-mark-change-group-name {
    background-color: #FFFFFF;
    border: none;
    border-radius: 5px;
    color: #dc3545;
    padding: 2px 5px;
}

.btn-mark-change-group-name:hover {
    box-shadow: 0 0 0 2px #dc3545;
}

.btn-change-group-name {
    background-color: #FFFFFF;
    border: none;
    border-radius: 5px;
    padding: 2px 5px;
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
    text-align: center;
}

.goldCrown {
    color: #FFD700;
}
.trashIcon {
    color: #dc3545;
    border: none;
    background-color: white;
    border-radius: 5px;
}

.trashIcon:hover {
    box-shadow: 0 0 0 2px #dc3545;
}

</style>
