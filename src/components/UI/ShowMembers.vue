<template>
    <div id="app" v-if="showMembers">
        <section name="groupManagement">
            <MapWindows dropdown="true">
                <div class="row">
                    <div class="col-12 text-end">
                        <button class="xMark" @click="goBackToGroupDropdown()"><i
                                class="fa-solid fa-xmark fa-lg"></i></button>
                    </div>
                </div>
                <section name="group">
                    <div class="row">
                        <div class="col-8 text-center">
                            <div v-if="editGroupName">
                                <h4 class="overflow mt-3">
                                    <input @blur="v$.newGroupName.$touch" v-model="newGroupName" class="changeGroupName">
                                </h4>
                                <div v-if="v$.newGroupName.$error" class="text-danger">
                                    {{ $t("showMembers.errors.name") }}
                                </div>
                            </div>
                            <p v-else-if="askingDelete">{{ $t("showMembers.deleteMessage") }}</p>
                            <h4 v-else class="overflow mt-3">{{ groupInformations.name }}</h4>
                        </div>
                        <div v-if="role == 'admin'" class="col-4 row">
                            <div class="col-6 my-auto mx-auto">
                                <button v-if="editGroupName" class="btn-check-change-group-name"
                                    @click="updateGroupName()"><i class="fa-solid fa-check fa-lg"></i></button>
                                <button v-else-if="askingDelete" class="btn-check-change-group-name"
                                    @click="deleteGroup()"><i class="fa-solid fa-check fa-lg"></i></button>
                                <button v-else class="btn-change-group-name" @click="editGroupName = true"><i
                                        class="fa-solid fa-pen"></i></button>
                            </div>
                            <div class="col-6 my-auto mx-auto">
                                <button v-if="editGroupName" class="btn-mark-change-group-name" @click="leaveEditName()"><i
                                        class="fa-solid fa-xmark fa-lg"></i></button>
                                <button v-else-if="askingDelete" class="btn-mark-change-group-name"
                                    @click="leaveAskingDelete()"><i class="fa-solid fa-xmark fa-lg"></i></button>
                                <button v-else class="btn-delete-group ms-2" @click="messageDeleteGroup"><i
                                        class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                        <div v-if="role == 'member'" class="col-4 mx-auto my-auto">
                            <button @click="leaveGroup" class="btn-delete-group-picture">{{ $t("showMembers.leave")
                            }}</button>
                        </div>
                    </div>
                </section>
                <section name="members">
                    <div class="row mt-3">
                        <div class="col-12">
                            <input :placeholder="$t('showMembers.placeholders.mail')" v-model="mailMember"
                                @keydown.enter.prevent="addMember()" class="inputClass" />
                            <div v-if="showEmailError" class="text-danger">
                                {{ $t("showMembers.errors.mail") }}
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3" v-for="(member, index) in groupInformations.emails" :key="index">
                        <div class="col-6 text-start" @click="openUserProfil(this.groupInformations.emails[index])">
                            <i class="fas fa-eye xMark" aria-hidden="true"  v-if="this.$store.state.userStore.userInfo.email !=  member.emails"></i>
                            <i class="fas icon-sign-blank xMarkWithoutHover" v-else> </i>
                            {{ member.emails }}
                        </div>
                        <div class="col-4 status" :class="getStatus(index)">
                            {{ member.status }}
                        </div>
                        <div class="col-2 text-center"
                            v-if="role == 'admin' && this.groupInformations.emails[index].role != 'admin'">
                            <button class="trashIcon" @click="deleteMember(index)"><i
                                    class="fa-solid fa-trash"></i></button>
                        </div>
                        <div class="col-2 text-center" v-if="this.groupInformations.emails[index].role == 'admin'">
                            <i class="fas fa-crown goldCrown" aria-hidden="true"></i>
                        </div>
                    </div>
                </section>
                <section name="picture">
                    <div v-if="groupInformations.photo?.preview" class="text-center">
                        <img :src="groupInformations.photo?.preview" class="img-thumbnail my-1" />
                        <label class="btn-add-group-picture mt-1" v-if="!groupInformations.photo?.preview">
                            {{ $t("showMembers.picture") }}
                            <input @change="onFileChange" type="file" hidden>
                        </label>
                    </div>
                    <div v-else class="text-center">
                        <img :src="groupInformations.photo" class="img-thumbnail my-1" />
                    </div>

                    <label class="btn-change-group-picture">
                        {{ $t("showMembers.changePicture") }}
                        <input @change="onFileChange" type="file" hidden>
                    </label>
                    <div v-if="groupInformations.photo != null">
                        <button @click="deleteGroupPicture" class="btn-delete-group-picture my-2"> {{
                            $t("showMembers.deletePicture") }} </button>
                    </div>
                </section>
                <section name="itinerary">
                    <ChoseItinerary @updateIndex="updateGroupIndex"></ChoseItinerary>
                </section>
                <div class="text-danger">
                    {{ errorMessage }}
                </div>
                <div class="col-12 mt-3 text-center">
                    <button @click="goBackToGroupDropdown" class="btn-save-group">{{ $t("showMembers.save") }}</button>
                </div>
            </MapWindows>
        </section>
    </div>
</template>
  
<script>
import useVuelidate from '@vuelidate/core';
import ChoseItinerary from "@/components/UI/ChoseItinerary.vue";
import { required, email, minLength, maxLength } from '@vuelidate/validators';
import MapWindows from "@/components/UI/MapWindows.vue";
export default {
    name: "createGroup",
    setup() {
        return { v$: useVuelidate() }
    },
    components: {
        ChoseItinerary,
        MapWindows
    },
    data() {
        return {
            picture: "",
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
            role: "",
            indexItinerary: 0,
            addGroupToItinerary: false,
            newGroupName: "",
            askingDelete: false,
            editGroupName: false,
            mailMember: '',
            showMembers: true,
            showEmailError: false,
            errorMessage: '',
        }
    },
    computed: {
        getGroups() {
            return this.$store.state.groupStore.groups;
        },
    },
    created() {
        this.groupInformations = this.groups;
        this.$store.dispatch("getGroupStatus", { id: this.groups.backendGroupId }).then((response) => {
            for (let i = 0; response?.data?.groupUser?.length; i++) {
                if (this.$store.state.userStore.mail == response.data.groupUser[i].User.email) {
                    this.role = response.data.groupUser[i].role;
                    break;
                }
            }
            for (let i = 0; i < response?.data?.groupUser?.length; i++) {
                for (let j = 0; j < this.groupInformations.emails.length; j++) {
                    if (this.groupInformations.emails[j].emails == response.data.groupUser[i].User.email)
                        this.groupInformations.emails[j].role = response.data.groupUser[i].role;
                }
            }
        });
        this.newGroupName = this.groupInformations.name;
    },
    methods: {
        messageDeleteGroup() {
            this.askingDelete = true;
        },
        updateGroupIndex(index, addGroup) {
            this.indexItinerary = index;
            this.addGroupToItinerary = addGroup;
        },
        goBackToGroupDropdown() {
            if (this.addGroupToItinerary) {
                this.$store.dispatch("addGroupToItinerary", {
                    groupname: this.groupInformations.name,
                    groupId: this.groupInformations.backendGroupId,
                    itineraryId: this.$store.state.itineraryStore.itinerary[this.indexItinerary].id
                }).catch((error) => {
                    console.log(error);
                });
            }
            this.$store.dispatch("updateGroup", this.groupInformations)
            this.CreateGroup = false;
            this.$emit("goBackToGroupDropdown");
        },
        getStatus(index) {
            let groupIndex = this.$store.state.groupStore.groups.findIndex(group => group.id === this.groupInformations.id);
            return this.$store.state.groupStore.groups[groupIndex].emails[index].status;
        },
        addMember() {
            if (!this.isValidEmail(this.mailMember)) {
                this.showEmailError = true;
                return;
            }
            this.showEmailError = false;
            this.errorMessage = '';
            this.$store.dispatch("patch", { path: "group/invitation/" + this.groupInformations.backendGroupId, data: { email: this.mailMember } }).then(() => {
                this.$emit("goBackToGroupDropdown");
            }).catch((error) => {
                this.errorMessage = error.response.data.message;
            });

            this.mailMember = '';
        },
        isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        },
        deleteMember(index) {
            let groupIndex = this.$store.state.groupStore.groups.findIndex(group => group.id === this.groupInformations.id);
            const group = this.$store.state.groupStore.groups[groupIndex];
            const user = this.$store.state.groupStore.groups[groupIndex].emails[index];

            this.$store.dispatch("kickUserFromGroup", { groupId: group.backendGroupId, email: user.emails }).then(() => {
                this.$store.dispatch("getGroup").catch((error) => {
                    console.log(error);
                })
                this.$emit("goBackToGroupDropdown");
            }).catch((error) => {
                console.log(error);
            })
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
            this.$store.dispatch("patch", {
                path: "group/" + this.groupInformations.backendGroupId,
                data: {
                    groupname: this.newGroupName,
                }
            });
        },
        leaveEditName() {
            this.editGroupName = false;
            this.newGroupName = this.groupInformations.name;
        },
        leaveAskingDelete() {
            this.askingDelete = false;
        },
        deleteGroup() {
            let index = this.$store.state.groupStore.groups.findIndex(group => group.id === this.groupInformations.id);
            this.showMembers = false;
            this.$emit("goBackToGroupDropdown");
            this.$store.dispatch("deleteGroup", this.$store.state.groupStore.groups[index]).then(() => {
                this.$store.dispatch("getGroup").catch((error) => {
                    console.log(error);
                })
            }).catch((error) => {
                console.log(error);
            });
            this.$store.state.groupStore.groups.splice(index, 1);
        },
        deleteGroupPicture() {
            this.groupInformations.photo = "https://eip.vakary.fr/uploads/group/base/basic_group_image_1.jpg";
        },
        leaveGroup() {
            let groupIndex = this.$store.state.groupStore.groups.findIndex(group => group.id === this.groupInformations.id);
            const group = this.$store.state.groupStore.groups[groupIndex];
            this.$store.dispatch("patch", {
                path: "group_user/deleteUserFromGroup",
                data: {
                    groupId: group.backendGroupId,
                    email: this.$store.state.userStore.mail,
                }
            }).then(() => {
                this.$store.dispatch("getGroup").catch((error) => {
                    console.log(error);
                })
                this.$emit("goBackToGroupDropdown");
            }).catch((error) => {
                console.log(error);
            })
        },
        onFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                this.groupInformations.picture = event.target.files;
                this.groupInformations.photo = {
                    file: file.name,
                    size: file.size,
                    type: file.type,
                    preview: reader.result
                };
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        },
        openUserProfil(emails) {
            this.$emit("openUserProfilOf", emails.emails);
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
    background-color: var(--background-color-primary);
    border: none;
    border-radius: 5px;
    padding: 2px 5px;
    color: var(--text-primary-color);
}

.xMarkWithoutHover {
    background-color: var(--background-color-primary);
    border: none;
    border-radius: 5px;
    padding: 2px 5px;
    color: var(--text-primary-color);
}

.xMark:hover {
    box-shadow: 0 0 0 2px var(--accent-color);
}

.btn-check-change-group-name {
    background-color: var(--background-color-primary);
    border: none;
    border-radius: 5px;
    padding: 2px 5px;
    color: green;
}

.btn-check-change-group-name:hover {
    box-shadow: 0 0 0 2px green;
}

.btn-mark-change-group-name {
    background-color: var(--background-color-primary);
    border: none;
    border-radius: 5px;
    color: #dc3545;
    padding: 2px 5px;
}

.btn-mark-change-group-name:hover {
    box-shadow: 0 0 0 2px #dc3545;
}

.btn-change-group-name {
    background-color: var(--background-color-primary);
    border: none;
    color: var(--text-color);
    border-radius: 5px;
    padding: 2px 5px;
}

.btn-change-group-name:hover {
    box-shadow: 0 0 0 2px rgb(192, 150, 40);
}

.btn-delete-group {
    background-color: var(--background-color-primary);
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
    color: black;
}

.denied {
    background-color: #FFBABA;
    border: 1px red solid;
    color: black;
}

.joined {
    background-color: #B6FBB2;
    border: 1px green solid;
    color: black;
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
    background-color: var(--background-color-primary);
    border-radius: 5px;
}

.trashIcon:hover {
    box-shadow: 0 0 0 2px #dc3545;
}
</style>
