<template>
    <div class="registrationTypeContainer">
        <div class="optionFrame">
            <img src="@/assets/Logo_vect.svg" class="logoSize elementBasicMargin elementHorizontalyCentered" />
            <b class="mediumTitle">Inscription Aventurier </b>
            <label class="smallTextSize">Envie de partir en vacances dans quelques minutes ou plusieurs mois ? Vous êtes
                au bon endroit !</label>
            <label class="smallTextSize elementBasicMargin">Grâce à votre compte vous pourrez avoir accès à votre profil, la création de groupe et bien plus encore !</label>
            <img src="@/assets/vacances.jpg" class="vacancesImageSize elementBasicMargin elementHorizontalyCentered" />
            <button class="basicVakaryButton" @click="(openInscriptionPageStandard)">Commencer l'aventure</button>
        </div>
        <div class="optionFrame">
            <img src="@/assets/Logo_vect.svg" class="logoSize elementBasicMargin elementHorizontalyCentered" />
            <b class="mediumTitle">Inscription Professionelle</b>
            <label class="smallTextSize">Que vous soyez une ville ou un professionel du tourisme, rejoignez l'aventure
                Vakary !</label>
            <img src="@/assets/officeDuTourisme.jpg"
                class="officeImageSize elementBasicMargin elementHorizontalyCentered" />
            <button class="basicVakaryButton" @click="(openInscriptionPagePro)">Rejoindre l'aventure</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        openInscriptionPageStandard() {
            this.$router.push({ name: "InscriptionPage", params: { type: 0 } });
        },
        openInscriptionPagePro() {
            this.$router.push({ name: "InscriptionPage", params: { type: 1 } });
        },
    }
}
</script>

<style scoped>
@import "@/components/Style/Button.scss";
@import "@/components/Style/Position.scss";
@import "@/components/Style/Text.scss";

.registrationTypeContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.optionFrame {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    border: 4px solid rgb(192, 150, 40);
    border-radius: 15px;
    padding: 5px;
    width: 30%;
    height: 80%;
    margin: auto 50px;
}

.officeImageSize {
    width: 55%;
    height: 45%;
}

.vacancesImageSize {
    width: 55%;
    height: 30%;
}
</style>
