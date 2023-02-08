<template>
    <div class="registrationTypeContainer">
        <button @click="changeLanguage">EN</button>
        <div class="optionFrame">
            <img src="@/assets/Logo_vect.svg" class="logoSize elementBasicMargin elementHorizontalyCentered" />
            <b class="mediumTitle">{{ $t("registrationTypePage.titleStandard") }}</b>
            <label class="smallTextSize">{{ $t("registrationTypePage.standardUser") }}</label>
            <label class="smallTextSize elementBasicMargin">{{ $t("registrationTypePage.user") }}</label>
            <img src="@/assets/vacances.jpg" class="vacancesImageSize elementBasicMargin elementHorizontalyCentered" />
            <button class="basicVakaryButton" @click="(openInscriptionPageStandard)">{{ $t("registrationTypePage.confirmStandard") }}</button>
        </div>
        <div class="optionFrame">
            <img src="@/assets/Logo_vect.svg" class="logoSize elementBasicMargin elementHorizontalyCentered" />
            <b class="mediumTitle">{{ $t("registrationTypePage.titlePro") }}</b>
            <label class="smallTextSize">{{ $t("registrationTypePage.proUser") }}</label>
            <img src="@/assets/officeDuTourisme.jpg"
                class="officeImageSize elementBasicMargin elementHorizontalyCentered" />
            <button class="basicVakaryButton" @click="(openInscriptionPagePro)">{{ $t("registrationTypePage.confirmPro") }}</button>
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
        changeLanguage() {
            this.$i18n.locale = this.$i18n.locale === "fr" ? "en" : "fr";
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
