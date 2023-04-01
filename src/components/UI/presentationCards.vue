<template>
    <div class="wrapper" data-ride="carousel">
        <div class="cards" style="background-color: rgb(39, 114, 147);" caption="First Slide">
            <img src="https://static.wixstatic.com/media/881e1e_130b021664634d1fab8c738d683e72e9~mv2.jpg/v1/crop/x_0,y_57,w_600,h_420/fill/w_314,h_220,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Group-Tours-Home.jpg"
                class="imageSizeClass">
            <div class="imageBackground">
                <img src="https://cdn-icons-png.flaticon.com/512/268/268598.png"
                    class="imageWrapper elementHorizontalyCentered" />
            </div>
            <div class="seperationBetweenTextAndImage">
                <span class="titleText"><b>PARTEZ EN GROUPE</b></span>
                <div>
                    <span class="descriptionText">Vakary propose une fonctionnalité de groupe, vous pouvez partager
                        vos
                        vacances avec vos proches.</span>
                </div>
                <button class="buttonCards">Inscription</button>
            </div>
        </div>
        <div class="cards" style="background-color: rgb(22, 97, 131); margin-left: 50px; margin-right: 50px"
            caption="Second Slide">
            <img src="https://static.wixstatic.com/media/881e1e_2b7da08cec6d484c8efc8b0cda681f84~mv2.jpg/v1/crop/x_0,y_57,w_600,h_420/fill/w_314,h_220,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Custom-Tours-Photo-Homepage.jpg"
                class="imageSizeClass">
            <div class="imageBackground">
                <img src="https://cdn-icons-png.flaticon.com/512/1250/1250689.png"
                    class="imageWrapper elementHorizontalyCentered" />
            </div>
            <div class="seperationBetweenTextAndImage">
                <span class="titleText"><b>CRÉER UN PROFIL</b></span>
                <div>
                    <span class="descriptionText">Partagez vos envies, ce que vous aimez visiter et décrivez vous
                        pour
                        partager votre amour du voyage</span>
                </div>
                <button class="buttonCards">Inscription</button>
            </div>
        </div>
        <div class="cards" style="background-color: rgb(57, 134, 168);" caption="Third Slide">
            <img src="https://static.wixstatic.com/media/881e1e_19ff2f3f99594672ac8c5a4a26bbfdce~mv2.jpg/v1/crop/x_0,y_18,w_600,h_420/fill/w_314,h_220,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Vermont-Landscape.jpg"
                class="imageSizeClass">
            <div class="imageBackground">
                <img src="https://static.thenounproject.com/png/885975-200.png" class="imageWrapper" />
            </div>
            <div class="seperationBetweenTextAndImage">
                <span class="titleText"><b>VISITER LA FRANCE</b></span>
                <div>
                    <span class="descriptionText">Peut importe vos envies, nous
                        pouvons-vous proposer un itinéraire n'importe où en France !</span>
                </div>
                <button class="buttonCards">Inscription</button>
            </div>
        </div>
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
        onSlideStart() {
            this.$refs.myCarousel.prev()
        },
        onSlideEnd() {
            this.$refs.myCarousel.next()
        }
    }
}
</script>

<style scoped>
@import "@/components/Style/Button.scss";

.wrapper {
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
}

.buttonCards {
    margin-top: 5%;
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
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 15vw;
    min-width: 288px;
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
    width: 15vw;
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
    margin-top: 15%;
    text-align: center;
    padding: 8%;
}

.titleText {
    font-size: calc(24px + 0.8vw);
    color: white
}

.descriptionText {
    font-size: calc(16px + 0.1vw);
    color: white
}
</style>