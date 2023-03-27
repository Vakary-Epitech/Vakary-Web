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
        <div v-if="!connected" class="col text-end">
            <button class="default-color to-page" @click="(openWebPage)">{{ $t("topBar.web") }}</button>
        </div>
        <div v-if="!connected" class="col text-end">
            <button class="default-color to-page" @click="(openMobilePage)">{{ $t("topBar.mobile") }}</button>
        </div>
        <div v-if="!connected" class="col text-end">
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
        <div class="col text-end mb-3 ms-6">
            <img src="https://cdn-icons-png.flaticon.com/512/197/197374.png" class="flag-button" @click="(engLanguage)"/>
            <img src="https://cdn-icons-png.flaticon.com/512/197/197560.png" class="flag-button" @click="(frenchLanguage)"/>
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
                this.openLandingPage();
            }
        },
        frenchLanguage() {
            this.$i18n.locale = "fr";
        },
        engLanguage() {
            this.$i18n.locale = "en";
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
    },
};
</script>

<style scoped>
@import "@/components/Style/Button.scss";

.addBorder {
    border-bottom: 1px solid #000000;
}

.row {
    margin-left: 0 !important;
}

.logo {
    cursor: pointer;
    height: 30px;
}

.default-color {
    color: #000642;
}

.default-color:hover {
    color: #C09628;
}

.to-page {
    border: none;
    background-color: #fff;
    border-radius: 20px;
    padding: 5px;
}


.register-button{
    border: 1px #C09628 solid;
}

</style>