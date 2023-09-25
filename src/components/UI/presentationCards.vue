<template>
    <div class="row" data-ride="carousel">
        <section name="groupCard" class="col-12 col-lg-4 centered">
            <div class="cards" style="background-color: rgb(39, 114, 147);" caption="First Slide">
                <img src="https://static.wixstatic.com/media/881e1e_130b021664634d1fab8c738d683e72e9~mv2.jpg/v1/crop/x_0,y_57,w_600,h_420/fill/w_314,h_220,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Group-Tours-Home.jpg"
                    class="imageSizeClass">
                <div class="imageBackground">
                    <img src="https://cdn-icons-png.flaticon.com/512/268/268598.png"
                        class="imageWrapper elementHorizontalyCentered" />
                </div>
                <div class="seperationBetweenTextAndImage">
                    <span class="titleText"><b>{{ $t("presentationCards.card1.title") }}</b></span>
                    <div>
                        <span class="descriptionText">{{ $t("presentationCards.card1.description") }}</span>
                    </div>
                    <button @click="openConnexionPage()" class="buttonCards">{{ $t("presentationCards.card1.registration")}}</button>
                </div>
            </div>
        </section>
        <section name="profilCard" class="col-12 mt-5 mt-lg-0 col-lg-4 centered">
            <div class="cards" style="background-color: rgb(22, 97, 131);"
                caption="Second Slide">
                <img src="https://static.wixstatic.com/media/881e1e_2b7da08cec6d484c8efc8b0cda681f84~mv2.jpg/v1/crop/x_0,y_57,w_600,h_420/fill/w_314,h_220,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Custom-Tours-Photo-Homepage.jpg"
                    class="imageSizeClass">
                <div class="imageBackground">
                    <img src="https://cdn-icons-png.flaticon.com/512/1250/1250689.png"
                        class="imageWrapper elementHorizontalyCentered" />
                </div>
                <div class="seperationBetweenTextAndImage">
                    <span class="titleText"><b>{{ $t("presentationCards.card2.title") }}</b></span>
                    <div>
                        <span class="descriptionText">{{ $t("presentationCards.card2.description") }}</span>
                    </div>
                    <button @click="openConnexionPage()" class="buttonCards">{{ $t("presentationCards.card2.registration") }}</button>
                </div>
            </div>
        </section>
        <section name="discoverCard" class="col-12 col-lg-4 mt-5 mt-lg-0 centered">
            <div class="cards" style="background-color: rgb(57, 134, 168);" caption="Third Slide">
                <img src="https://static.wixstatic.com/media/881e1e_19ff2f3f99594672ac8c5a4a26bbfdce~mv2.jpg/v1/crop/x_0,y_18,w_600,h_420/fill/w_314,h_220,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Vermont-Landscape.jpg"
                    class="imageSizeClass">
                <div class="imageBackground">
                    <img src="https://static.thenounproject.com/png/885975-200.png" class="imageWrapper" />
                </div>
                <div class="seperationBetweenTextAndImage">
                    <span class="titleText"><b>{{ $t("presentationCards.card3.title") }}</b></span>
                    <div>
                        <span class="descriptionText">{{ $t("presentationCards.card3.description") }}</span>
                    </div>
                    <button @click="openConnexionPage()" class="buttonCards">{{ $t("presentationCards.card3.registration") }}</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            slide: 0,
            sliding: null
        }
    },
    methods: {
        openConnexionPage() {
            this.$router.push("/connexionPage");
        },
    }
}
</script>

<style scoped>


.buttonCards {
    margin-top: 10%;
    width: 50%;
    height: 15%;
    min-height: 40px;
    background-color: #C09628;
    color: white;
    font-size: calc(16px + 0.1vw);;
    border: 2px solid rgb(192, 150, 40);
}

.buttonCards:hover {
    margin-top: 5%;
    width: 50%;
    height: 15%;
    min-height: 40px;
    background-color: #000642;
    border: 2px solid #000642;
    color: white;
    font-size: calc(16px + 0.1vw);;
}

.cards {
    position: relative;
    max-width: 18vw;
    min-width: 288px;
}

.centered {
    display: flex;
    justify-content: center;
    align-items: center;
}

.imageWrapper {
    max-width: 128px;
    max-height: 128px;
    border-style: solid;
    border-color: #C09628;
    border-radius: 200px;
    padding: 5px;
    border-style: solid;
    height: 100%;
    width: 100%
}

.imageSizeClass {
    width: 18vw;
    min-width: 288px;
}

.imageBackground {
    position: absolute;
    width: 6vw;
    min-width: 115px;
    border-radius: 50%;
    padding: 10px;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    left: 30%;
    top: 25%;
}

.seperationBetweenTextAndImage {
    text-align: center;
    padding: 8%;
    height: 100%;
    margin-top: 10%;
}

.titleText {
    display: flex;
    font-size: calc(24px + 0.8vw);
    color: white;
    height: 15vh;
}

.descriptionText {
    display: flex;
    height: 12vh;
    margin-top: 4vh;
    font-size: calc(16px + 0.1vw);
    color: white
}
</style>