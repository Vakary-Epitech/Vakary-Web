<template>
    <div id="app">
        <div class="background">
            <div class="row">
                <div class="col-12 text-end">
                    <button class="xMark" @click="goBackToGroupDropdown()"><i class="fa-solid fa-xmark fa-lg"></i></button>
                </div>
            </div>
            <h2>{{ $t("createGroup.title") }}</h2>
            <section name="groupName">
                <div class="col-12 mt-3">
                    <input @blur="v$.groupInformations.name.$touch" :placeholder="$t('createGroup.placeholders.name')"
                        v-model="groupInformations.name" class="inputClass" />
                    <div v-if="v$.groupInformations.name.$error" class="text-danger">
                        {{ $t("createGroup.errors.name") }}
                    </div>
                </div>
            </section>
            <section name="groupMembers">
                <div class="row mt-3">
                    <div class="col-12">
                        <input :placeholder="$t('createGroup.placeholders.mail')" v-model="mailMember"
                            @keydown.enter.prevent="addMember()" class="inputClass" />
                        <div v-if="showEmailError" class="text-danger">
                            {{ $t("createGroup.errors.mail") }}
                        </div>
                        <div v-if="onlyOneMembers" class="text-danger">
                            {{ $t("createGroup.errors.oneMembers") }}
                        </div>
                    </div>
                </div>
                <div class="row mt-3" v-for="(member, index) in groupInformations.members" :key="index">
                    <div v-if="member.admin" class="col-12">
                        <span>{{ $t("createGroup.admin") }} {{ member.mail }}</span>
                    </div>
                    <div v-else class="row">
                        <div class="col-10">
                            <p class="overflow">{{ member.mail }}</p>
                        </div>
                        <div class="col-2 text-end">
                            <button class="trashIcon" @click="deleteMember(index)"><i
                                    class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </section>
            <section name="photoGroup">
                <div v-if="groupInformations.photo" class="text-center" style="max-width: 300px; margin: auto">
                    <img :src="groupInformations.photo?.preview" :alt="groupInformations.photo?.name"
                        class="img-thumbnail my-1" />
                </div>
                <label class="btn-add-group-picture" v-if="!groupInformations.photo?.preview">
                    {{ $t("createGroup.picture") }}
                    <input @change="onFileChange" type="file" hidden>
                </label>
                <div v-if="groupInformations.photo?.preview">
                    <label class="btn-change-group-picture">
                        {{ $t("createGroup.changePicture") }}
                        <input @change="onFileChange" type="file" hidden>
                    </label>
                </div>
            </section>
            <section name="itinerary">
                <ChoseItinerary @updateIndex="updateGroupIndex"></ChoseItinerary>
            </section>
            <div class="col-12 mt-3 text-center">
                <button @click="sendMessage" class="btn-save-group">{{ $t("createGroup.save") }}</button>
            </div>
            <div v-if="error" class="text-danger">
                <p>{{ errorMessage }}</p>
            </div>
            <div v-if="v$.groupInformations.name.$error || errorName" class="text-danger">{{
                $t("createGroup.errors.name-required") }}</div>
        </div>
    </div>
</template>
  
<script>
import useVuelidate from '@vuelidate/core';
import ChoseItinerary from "@/components/UI/ChoseItinerary.vue";
import { v4 as uuidv4 } from 'uuid';
import { required, email, minLength, maxLength } from '@vuelidate/validators';
export default {

    name: "createGroup",
    setup() {
        return { v$: useVuelidate() }
    },
    components: {
        ChoseItinerary
    },
    data() {
        return {
            CreateGroup: true,
            errorName: false,
            error: false,
            mailMember: "",
            firstName: "",
            listMembers: [],
            groupInformations: {
                name: "",
                members: [],
                photo: {},
                id: ""
            },
            showEmailError: false,
            onlyOneMembers: false,
            indexItinerary: 0,
            addGroupToItinerary: false,
        }
    },
    created() {
        this.groupInformations.members.push({ mail: this.$store.state.userStore.userInfo.email, status: "accepted", admin: true })
    },
    methods: {
        updateGroupIndex(index, addGroup) {
            this.indexItinerary = index;
            this.addGroupToItinerary = addGroup;
        },
        addMember() {
            if (!this.isValidEmail(this.mailMember)) {
                this.showEmailError = true;
                return;
            }
            if (this.groupInformations.members.some(member => member.mail === this.mailMember)) {
                this.showEmailError = true;
                return;
            }
            this.showEmailError = false;
            this.groupInformations.members.push({ mail: this.mailMember, status: "pending", admin: false })
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
            if (this.mailMember.length !== 0) {
                this.addMember();
            }
            if (!this.groupInformations.name) {
                this.errorName = true;
                return;
            }
            if (this.groupInformations.members.length < 2) {
                this.onlyOneMembers = true;
                return;
            }
            this.errorName = false;
            this.groupInformations.id = uuidv4();
            this.error = false;
            this.$store.dispatch("addGroup",
                this.groupInformations
            ).then(() => {
                this.$store.dispatch("getGroup").catch((error) => {
                    this.errorMessage = error?.response?.data?.message;
                })
                if (this.addGroupToItinerary) {
                    this.$store.dispatch("addGroupToItinerary", {
                        groupName: this.groupInformations.name,
                        groupId: this.groupInformations.backendGroupId,
                        itineraryId: this.$store.state.globalNonPersistantData.itinerary[this.indexItinerary].id
                    }).catch((error) => {
                        console.log(error);
                    });
                }
                this.CreateGroup = false;
                this.$emit("goBackToGroupDropdown");
            }).catch((error) => {
                console.log(error)
                this.error = true;
                this.errorMessage = error?.response?.data?.message;
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
                    maxLength: maxLength(18)
                }
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
    min-width: 300px;
    min-height: 300px;
    overflow: auto;
    max-height: 80vh;
}

::-webkit-scrollbar {
    width: 0 !important;
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

.overflow {
    overflow: auto;
    max-height: 200px;
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
