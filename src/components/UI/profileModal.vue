<!-- This component is used for the profile of the user
     The structure is using the bootstrap grid system and structured as follow: 
        - a container
        - div row 
        - div col 
     It is using as well the i18n system for a translation system -->
<template>
    <div class="ProfilCardDesign">
        <div class="basicContainer">
            <div class="container">
                <div class="row" v-if="!editMode">
                    <div>
                        <img class="profile-picture" :src="photoDisplay" alt="profile-picture">
                    </div>
                    <div class="text-center">
                        <h1 class="overflow" style="max-width:200px">{{ user.username }}</h1>
                    </div>
                    <div v-if="description" class="col-12 overflow">
                        <span>{{ $t("profilePage.info") }}</span><br>
                        <p class="description">{{ description }}</p>
                    </div>
                </div>
                <div class="row" v-if="editMode">
                    <div>
                        <img @click="openFileExplorer()" class="profile-picture clickable"
                            :src="photoDisplay" alt="profile-picture">
                    </div>
                    <div class="col-6 mt-3 offset-3">
                        <span>{{ $t("profilePage.info") }}</span><br>
                        <textarea v-model="description" :placeholder="description" rows="5" cols="80"
                            maxlength="300">Write stuff here...</textarea>
                        {{ description?.length }}/300
                    </div>
                    <div class="col-12">
                        <button @click="save" class="btn btn-primary">{{ $t("profilePage.save") }}</button>
                    </div>
                </div>
                <div class="row">
                    <div class="row">
                        <div class="col-5 offset-1">
                            <span>{{ $t("profilePage.comments") }}</span><br>
                            <p>{{ user?.comments }}</p>
                        </div>
                        <div class="col-3 offset-2">
                            <span>{{ $t("profilePage.likes") }}</span><br>
                            <p>{{ user?.likes }}</p>
                        </div>
                    </div>
                    <div v-if="user?.lastMonument" class="col-12">
                        <span>{{ $t("profilePage.lastPlaceVisited") }}</span><br>
                        <p>{{ user?.lastMonument }}</p>
                    </div>
                    <div v-if="user?.lastEvent" class="col-12">
                        <span>{{ $t("profilePage.lastEventAttended") }}</span><br>
                        <p>{{ user?.lastEvent }}</p>
                    </div>
                    <div class="col-12">
                        <span>{{ $t("profilePage.totalKm") }}</span><br>
                        <p>{{ user?.milesTraveled }}</p>
                    </div>
                </div>
                <div class="col-12 my-2">
                    <button @click="edit">{{ $t("profilePage.edit") }}</button>
                </div>
                <div class="col-12 my-2">
                    <button @click="(disconnectUser)">{{ $t("profilePage.disconnect") }}</button>
                </div>
                <div class="col-12 mt-2">
                    <button @click="(deleteUser)">{{ $t("profilePage.delete") }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>

export default {
    data() {
        return {
            editMode: false,
            description: this.$store.state.userStore.userInfo.description,
            user: this.$store.state.userStore.userInfo,
            picture: this.$store.state.userStore.userProfileImage,
            photoDisplay: this.$store.state.userStore.userProfileImage,
        }
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
            this.$store.dispatch('updateUserProfile', {
                description: this.description,
                picture: this.picture,
            }).then(() => {
                this.photoDisplay = this.$store.state.userStore.userProfileImage;
                this.editMode = false;
            }).catch((error) => {
                console.log(error);
            })
        },
        disconnectUser() {
            this.$router.push("/");
        },
        deleteUser() {
            this.$store.dispatch('deleteUser').then(() => {
                this.$router.push("/");
            }).catch((error) => {
                console.log(error);
            })
        },
    },
}
</script>
<style scoped>
.row {
    margin: 0 !important;
}

.overflow {
    overflow-x: auto;
}

.description {
    max-width: 30ch;
}

.profile-picture {
    border-radius: 50%;
    border: 1px solid black;
    width: 128px;
    height: 128px;
    margin-left: auto;
    margin-right: auto;
}

.clickable {
    cursor: pointer;
}

.clickable:hover {
    box-shadow: 0 0 0 2px black;
}

p {
    color: #c09628;
    overflow: auto;
}

div {
    position: relative;
}

textarea {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
}

.carousel-control-next {
    filter: invert(100%);
}

.carousel-control-prev {
    filter: invert(100%);
}

.container {
    background-color: var(--background-color-primary);
    max-width: 300px;
}

::-webkit-scrollbar {
    width: 0 !important;
}


.container button {
    background: white;
    color: black;
    background-color: var(--background-color-secondary);
    color: var(--text-primary-color);
    border: 2px solid rgb(192, 150, 40);
    border-radius: 20px;
}

.container button:hover {
    box-shadow: 0 0 10px rgb(192, 150, 40);
}

.container div {
    color: var(--text-primary-color);
}

.ProfilCardDesign {
    display: flex;
    background-color: var(--background-color-primary);
    color: var(--text-primary-color);
    border-radius: 15px;
    border: none;
    font-size: calc(6px + 0.6vw);
    max-height: 85vh;
    margin-top: 15px;
    margin-bottom: 5px;
    border: 2px solid rgb(192, 150, 40);
    padding: 15px;
    overflow: auto;
    /* width: 300px; */
}

.ProfilCardDesign::-webkit-scrollbar {
    width: 1px;
}

.overflow {
    overflow: auto;
}

.container input {
    background-color: var(--background-color-secondary);
    border-color: var(--text-primary-color);
}
</style>
    