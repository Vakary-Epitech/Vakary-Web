<!-- This component is used for the presentation of the mobile application Vakary
     The page is not complete yet, it still needs all the mobile screenshots + video
     The structure is using the bootstrap grid system and structured as follow: 
        - a container-fluid
        - div row 
        - div col 
     It is using as well the i18n system for a translation system -->
<template>
    <topBar class="col-12" :connected="false" />
    <div class="container">
        <div class="row test">
            <div class="col-2 my-auto text-center">
                <img class="qrcode" src="@/assets/Logo_vect.svg">
            </div>
            <div class="col-6 my-auto">
                <p>Vakary est disponible sur mobile.</p>
                <p>Scannez le code QR avec votre appareil mobile pour télécharger Vakary.</p>
            </div>
            <div class="col-4 my-auto text-center">
                <img class="qrcode" src="@/assets/qrcode.jpeg">
            </div>
            <div class="col-6 text-center my-auto">
                <img class="badges" src="@/assets/badges/google-play-badge.png">
            </div>
            <div class="col-6 my-auto">
                <img class="badges" src="@/assets/badges/app-store-badge.svg">
            </div>
        </div>
        <div class="row">
            <div class="col-6 my-auto mediumTextSize">
                <h1>{{ $t("mobilePage.text1") }}</h1>
            </div>
            <div class="col-6">
                <img class="image elementHorizontalyCentered"
                    src="https://codelabs.developers.google.com/static/codelabs/google-maps-in-flutter/img/71c460c73b1e061e.png">
            </div>
        </div>
        <div class="row bg-white">
            <div class="col-6">
                <img class="image elementHorizontalyCentered"
                    src="https://codelabs.developers.google.com/static/codelabs/google-maps-in-flutter/img/71c460c73b1e061e.png">
            </div>
            <div class="col-6 my-auto mediumTextSize">
                <h1>{{ $t("mobilePage.text2") }}</h1>
            </div>
        </div>
        <div class="row bg-blue">
            <div class="col-6 my-auto mediumTextSize">
                <h1>{{ $t("mobilePage.text3") }}</h1>
            </div>
            <div class="col-6">
                <img class="image elementHorizontalyCentered"
                    src="https://codelabs.developers.google.com/static/codelabs/google-maps-in-flutter/img/71c460c73b1e061e.png">
            </div>
        </div>
        <div class="row bg-white">
            <div class="col-6">
                <img class="image elementHorizontalyCentered"
                    src="https://codelabs.developers.google.com/static/codelabs/google-maps-in-flutter/img/71c460c73b1e061e.png">
            </div>
            <div class="col-6 my-auto mediumTextSize">
                <h1>{{ $t("mobilePage.text4") }}</h1>
            </div>
        </div>
        <div class="row bg-blue">
            <div class="col-8 mx-auto mediumTextSize bottomText">
                <h1>{{ $t("mobilePage.text5") }}</h1>
            </div>
            <div class="col-12 mx-auto">
                <img class="image elementHorizontalyCentered" src="https://img.freepik.com/free-vector/golden-point_23-2147514653.jpg?w=2000">
            </div>
        </div>
    </div>
</template>

<script>
import topBar from '../UI/TopBar.vue';
export default {
    components: {
        topBar
    }
}
</script>

<style scoped>

.bg-white {
    background-color: #fff;
    color: #000642;
}

.test {
    border: 1px solid #C09628;
    border-radius: 25px;
    margin-top: 30px;
}

.bg-blue {
    margin-top: 20px;
    /* background-color with a light blue */
    background-color: #e6f0ff;
    border-radius: 50px;
    color: #000642;
    /* border: 1px solid #C09628; */
}
.image {
    width: 30vw;
    height: 100vh;
}

.qrcode {
    width: 100px;
    height: auto;
}   

.badges {
    width: 200px;
    height: auto;
}
.bottomText {
    margin-top: 20px;
    margin-bottom: 20px;
};


.logo  {
    height: 10px !important;
}
</style>
