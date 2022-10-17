<!-- This component is used for the presentation of the mobile application Vakary
     The page is not complete yet, it still needs all the mobile screenshots + video
     The structure is using the bootstrap grid system and structured as follow: 
        - a container-fluid
        - div row 
        - div col 
     It is using as well the i18n system for a translation system -->
<template>
    <topBar class="col-12"/>
    <div class="container-fluid">
        <div class="row bg-white">
            <iframe class="bg-video"
                src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1">
            </iframe>
            <div class="col-12">
                <h1>{{ $t("mobilePage.title") }}</h1>
            </div>
        </div>
        <div class="row bg-blue">
            <div class="col-6 my-auto">
                <h1>{{ $t("mobilePage.text1") }}</h1>
            </div>
            <div class="col-6">
                <img class="image" src="https://codelabs.developers.google.com/static/codelabs/google-maps-in-flutter/img/71c460c73b1e061e.png">
            </div>
        </div>
        <div class="row bg-white">
            <div class="col-6">
                <img class="image" src="https://codelabs.developers.google.com/static/codelabs/google-maps-in-flutter/img/71c460c73b1e061e.png">
            </div>
            <div class="col-6 my-auto">
                <h1>{{ $t("mobilePage.text2") }}</h1>
            </div>
        </div>
        <div class="row bg-blue">
            <div class="col-6 my-auto">
                <h1>{{ $t("mobilePage.text3") }}</h1>
            </div>
            <div class="col-6">
                <img class="image" src="https://codelabs.developers.google.com/static/codelabs/google-maps-in-flutter/img/71c460c73b1e061e.png">
            </div>
        </div>
        <div class="row bg-white">
            <div class="col-6">
                <img class="image" src="https://codelabs.developers.google.com/static/codelabs/google-maps-in-flutter/img/71c460c73b1e061e.png">
            </div>
            <div class="col-6 my-auto">
                <h1>{{ $t("mobilePage.text4") }}</h1>
            </div>
        </div>
        <div class="row bg-blue">
            <div class="col-8 mx-auto">
                <h1>{{ $t("mobilePage.text5") }}</h1>
            </div>
            <div class="col-12 mx-auto">
                <img class="image" src="https://img.freepik.com/free-vector/golden-point_23-2147514653.jpg?w=2000">
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

.bg-blue {
    background-color:#000642;
    color: #c09628;
}

.bg-video {
    width: 100%;
    height: 80vh;
}

.image {
    width: 30vw;
    height: 100vh;
}
</style>
