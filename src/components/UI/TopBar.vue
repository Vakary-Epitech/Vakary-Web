<!-- This component is used for the top bar of the website
     The structure is using the bootstrap grid system and structured as follow: 
        - div row 
        - div col 
     It is using as well the i18n system for a translation system -->
<template>
    <div class="row addBorder mt-3">
        <div class="col text-center mb-3 ms-3">
            <img @click="(openHomePage)" class="logo" src="@/assets/logo_long_vect.svg">
        </div>
        <!-- in case we want to do an opening menu button on low resolution -->
        <!-- <div class="col-4 col-md mb-3">
            <img @click="(openLandingPage)" class="logo" src="@/assets/logo_long_vect.svg">
        </div>
        <div class="d-md-none col text-end">
            <button class="menu-button" @click="(openMenu)"> <i class="fa-solid fa-bars menu"></i></button>
        </div>
        <div class="d-md-inline d-none col-md text-center">
            <button class="default-color to-page" @click="(openWebPage)">{{ $t("topBar.web") }}</button>
        </div>
        <div class="d-md-inline d-none col-md text-center">
            <button class="default-color to-page" @click="(openMobilePage)">{{ $t("topBar.mobile") }}</button>
        </div>
        <div class="d-md-inline d-none col-md text-center">
            <button class="default-color to-page register-button" @click="(openLoginPage)">{{ $t("topBar.signup") }}</button>
        </div> -->
        <!-- text-end ==> text-center -->
        <div v-if="!connected" class="col text-center">
            <button class="default-color to-page" @click="(openWebPage)">{{ $t("topBar.web") }}</button>
        </div>
        <div v-if="!connected" class="col text-center">
            <button class="default-color to-page" @click="(openMobilePage)">{{ $t("topBar.mobile") }}</button>
        </div>
        <div v-if="!connected" class="col text-center">
            <button class="default-color to-page register-button" @click="(openLoginPage)">{{ $t("topBar.signup") }}</button>
        </div>
        <div v-if="connected" class="col text-end">
            <button class="default-color to-page" @click="(openGroupePage)">{{ $t("topBar.groupe") }}</button>
        </div>
        <div v-if="connected" class="col text-end">
            <button class="default-color to-page" @click="(openMapPage)">{{ $t("topBar.map") }}</button>
        </div>
        <div v-if="connected" class="col text-end">
            <button class="default-color to-page" @click="(openProfilePage)">{{ $t("topBar.profile") }}</button>
        </div>
        <div v-if="connected" class="col text-end">
            <button class="default-color to-page" @click="(openItineraryPage)">{{ $t("topBar.itinerary") }}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'topBar',
    data() {
        return {
        }
    },
    props: ["connected"],
    methods: {
        openHomePage() {
            if (!this.connected) {
                this.openLandingPage();
            }
            else {
                this.openHomeConnectedPage();
            }
        },
        openItineraryPage() {
            this.$router.push("ItineraryPage");
        },
        openHomeConnectedPage() {
            this.$router.push("vakaryHome");
        },
        openLandingPage() {
            this.$router.push("/");
        },
        openLoginPage() {
            this.$router.push("/loginPage");
        },
        openRegisterPage() {
            this.$router.push("/RegistrationType");
        },
        openMapPage() {
            this.$router.push("/mapPage");
        },
        openProfilePage() {
            this.$router.push("/profilePage");
        },
        openMobilePage() {
            this.$router.push("/mobilePage");
        },
        openWebPage() {
            this.$router.push("/VakaryWeb");
        },
        openGroupePage() {
            this.$router.push("/groupPage");
        },
        // openMenu() {
        //     console.log("hello world")
        // }
    },
};
</script>

<style scoped>
.addBorder {
    border-bottom: 1px solid #000000;
}

.row {
    margin-left: 0 !important;
}

.logo {
    cursor: pointer;
    height: 30px;
    /* remove height */
}

.default-color {
    color: #000642;
}

.default-color:hover {
    /* color: #fff; */
    /* gold color */
    color: #C09628;
}

.to-page {
    border: none;
    background-color: #fff;
    border-radius: 20px;
    padding: 5px;
    /* padding:10px */
}

/* .to-page:hover {
    background-color: #000000;
} */

.register-button{
    border: 1px #C09628 solid;
}

/* .menu {
    font-size: 30px;
    color: #000642;
    cursor: pointer;
}

.menu-button {
    background-color: #fff;
    border: none;
} */

</style>