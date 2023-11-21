<!-- This component is used for the profile of the user
     The structure is using the bootstrap grid system and structured as follow: 
        - a container
        - div row 
        - div col 
     It is using as well the i18n system for a translation system -->
<template>
    <MapWindows style="min-width: 250px; max-width: 30vh; max-height: 85vh;">
        <div class="row" v-if="!loading">
            <div class="col-12">
                <div class="row" v-if="!editMode">
                    <div class="text-center">
                        <img class="profile-picture" :src="photoDisplay" alt="profile-picture">
                    </div>
                    <div class="col-12 text-center">
                        <h1 class="overflow">{{ user.username }}</h1>
                    </div>
                    <div v-if="description" class="col-12 mt-2" style="min-height: 15vh">
                        <h5>{{ $t("profilePage.info") }}</h5>
                        <span class="description">{{ description }}</span>
                    </div>
                </div>
                <div class="row" v-if="editMode" style="min-height: 15vh">
                    <div class="text-center">
                        <img @click="openFileExplorer()" class="profile-picture clickable"
                            :src="photoDisplay" alt="profile-picture">
                    </div>
                    <div class="col-12 mt-2 ">
                        <span>{{ $t("profilePage.info") }}</span><br>
                        <textarea v-model="description" :placeholder="description" rows="5" cols="80"
                            maxlength="300">Write stuff here...</textarea>
                        {{ description?.length }}/300
                    </div>
                    <div class="col-12 text-center">
                        <button @click="save" class="btn btn-primary">{{ $t("profilePage.save") }}</button>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <h5>Statistiques</h5>
                    </div>
                    <div class="col-6 col-xxxl-3 text-center">
                        <h6>{{ $t("profilePage.likes") }}</h6>
                        <p>{{ likes }}</p>
                    </div>
                    <!-- <div class="col-6 col-xxxl-3 text-center">
                        <h6>{{ $t("profilePage.totalKm") }}</h6>
                        <p>{{ user?.milesTraveled }}</p>
                    </div>
                    <div class="col-6 col-xxxl-3 text-center">
                        <h6>{{ $t("profilePage.comments") }}</h6>
                        <p>{{ user?.comments }}</p>
                    </div> -->
                    <div class="col-6 col-xxxl-3 text-center">
                        <h6>{{ $t("profilePage.verified") }}</h6>
                        <p v-if="user?.verified === 'true'"><i class="fa-solid fa-check green-check"></i></p>
                        <p v-if="user?.verified === 'false'"><i class="fa-solid fa-xmark red-xmark"></i></p>
                    </div>
                </div>
                <div class="row text-center">
                    <div class="col-12 col-xxxl-6">
                        <button class="btn btn-edit" @click="edit"><i class="fa-solid fa-pen me-2"></i>{{ $t("profilePage.edit") }}</button>
                    </div>
                    <div class="col-12 mt-2 mt-xxxl-0 col-xxxl-6">
                        <button class="btn btn-delete" @click="(deleteUser)"><i class="fa-solid fa-trash me-2"></i>{{ $t("profilePage.delete") }}</button>
                    </div>
                    <div class="col-12 mt-2">
                        <button class="btn btn-disconnect" @click="(disconnectUser)"><i class="fa-solid fa-arrow-right-from-bracket me-2"></i>{{ $t("profilePage.disconnect") }}</button>
                    </div>
                </div>
            </div>
        </div>
        <Loading v-if="loading"/>
    </MapWindows>
</template>
    
<script>
import MapWindows from "./MapWindows.vue";
import Loading from "./loadingSpin.vue";
export default {
    components: {
        MapWindows,
        Loading
    },
    data() {
        return {
            loading: false,
            editMode: false,
            description: this.$store.state.userStore.userInfo.description,
            user: this.$store.state.userStore.userInfo,
            picture: this.$store.state.userStore.userProfileImage,
            photoDisplay: this.$store.state.userStore.userProfileImage,
            likes: 0,
        }
    },
    mounted() {
        this.$store.dispatch('getUserLikes').then((res) => {
            this.likes = res.data.likedPOIs.length;
        }).catch((error) => {
            console.log(error);
        })
    },
    methods: {
        openFileExplorer() {
            const fileExplorer = document.createElement('input');
            fileExplorer.setAttribute('type', 'file');
            fileExplorer.setAttribute('accept', 'image/*');
            fileExplorer.click();
            fileExplorer.onchange = () => {
                const file = fileExplorer.files[0];
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    this.photoDisplay = fileReader.result;
                    this.picture = fileExplorer.files;
                }
                fileReader.readAsDataURL(file);
            }
        },
        edit() {
            this.editMode = true
        },
        save() {
            this.loading = true;
            this.$store.dispatch('updateUserProfile', {
                description: this.description,
                picture: this.picture,
            }).then(() => {
                this.loading = false;
                this.photoDisplay = this.$store.state.userStore.userProfileImage;
                this.editMode = false;
            }).catch((error) => {
                this.loading = false;
                console.log(error);
            })
        },
        disconnectUser() {
            this.$store.commit('CLEAR_USER_INFO')
            this.$router.push("/");
        },
        deleteUser() {
            this.loading = true;
            this.$store.dispatch('deleteUser').then(() => {
                this.loading = false;
                this.$router.push("/");
            }).catch((error) => {
                this.loading = false;
                console.log(error);
            })
        },
    },
}
</script>
<style scoped>

.description {
    max-width: 30ch;
}

.btn-edit {
    background-color: #fff;
    border: 1px solid rgb(192, 150, 40);
}

.btn-edit:hover {
    background-color: rgb(192, 150, 40);
    color: #fff;
}

.btn-disconnect {
    background-color: #fff;
    border: 1px solid rgb(192, 150, 40);
}

.btn-disconnect:hover {
    background-color: rgb(192, 150, 40);
    color: #fff;
}

.btn-delete {
    background-color: #fff;
    border: 1px solid #dd3c10;
}

.btn-delete:hover {
    background-color: #dd3c10;
    color: #fff;
}

.profile-picture {
    border-radius: 50%;
    border: 1px solid black;
    width: 128px;
    height: 128px;
    margin-left: auto;
    margin-right: auto;
}

.btn {
    width: 200px;
}

.clickable {
    cursor: pointer;
}

.clickable:hover {
    box-shadow: 0 0 0 2px black;
}

textarea {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
}

::-webkit-scrollbar {
    width: 0 !important;
}

.overflow {
    overflow: auto;
}

.green-check {
    color: #00ff00;
}

.red-xmark {
    color: #ff0000;
}
</style>
    