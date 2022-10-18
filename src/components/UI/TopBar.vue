<!-- This component is used for the top bar of the website
     The structure is using the bootstrap grid system and structured as follow: 
        - div row 
        - div col 
     It is using as well the i18n system for a translation system -->
<template>
    <div class="row addBorder mt-3">
        <div class="col-2 mb-3">
            <img @click="(openMobilePage)" class="logo" src="@/assets/Logo_vect.svg">
        </div>
        <div class="col-2 my-auto">
            <button class="default-color to-page" @click="(openMobilePage)">{{ $t("topBar.web") }}</button>
        </div>
        <div class="col-2 my-auto">
            <button class="default-color to-page" @click="(openMobilePage)">{{ $t("topBar.mobile") }}</button>
        </div>
        <div class="col-2 my-auto">
            <button class="default-color to-page" @click="(openMobilePage)">{{ $t("topBar.vip") }}</button>
        </div>
        <div class="col-2 my-auto">
            <button class="default-color connexion-button" @click="(openLoginPage)">{{ $t("topBar.signup") }}</button>
            
        </div>
        <div class="col-2 my-auto">
            <button class="register-button" @click="(openMobilePage)">{{ $t("topBar.signin") }}</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'topBar',
        methods: {
            openLandingPage() {
                this.$router.push("/");
            },
            openLoginPage() {
                this.$router.push("/loginPage");
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
    width: auto;
    height: 50px;
    cursor: pointer;
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
}

.register-button {
    background-color: #000642;
    color: #C09628;
    border: 3px #000642 solid;
    border-radius: 20px;
}

.register-button:hover {
    background-color: #C09628;
    color: #000642;
    border: 3px #C09628 solid;
    font-size: 20px;
}

.connexion-button {
    background-color: #fff;
    border: 3px #000642 solid;
    border-radius: 20px;
}

.connexion-button:hover {
    font-size: 20px;
    border: 3px #C09628 solid;
}
</style>