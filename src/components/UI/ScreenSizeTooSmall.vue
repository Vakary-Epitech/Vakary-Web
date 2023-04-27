<template>
    <div class="centerEverything">
        <img src="@/assets/Logo_vect.svg" class="logoAsBackground elementHorizontalyCentered" />
        <div class="login elementHorizontalyCentered">
            <div class="elementHorizontalyCentered">
                <div class="loginPageInformationContainer">
                    <label>{{ $t("screenSizePage.ScreenSizeTooSmall") }}</label>
                    <div class="modal-content" style="margin-top: 10px">
                        <div class="modal-body">
                            <div class="row">
                                <div>
                                    <img src="@/assets/LandingPage/qrcode.jpeg" class="qrCodeContainer">
                                </div>
                                <div class="col-6">
                                    <img :src="require(`@/assets/badges/${geti18n()}/app-store-badge.svg`)"
                                        class="iosImage">
                                </div>
                                <div class="col-6">
                                    <img :src="require(`@/assets/badges/${geti18n()}/google-play-badge.svg`)"
                                        class="androidImage">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" style="margin-top: 10px" @click="goBackToLandingPage()">{{
                                $t("screenSizePage.goBack")
                            }}</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password: "",
            userDontExist: false,
        }
    },
    methods: {
        geti18n() {
            return this.$i18n.locale;
        },
        goBackToLandingPage() {
            this.$router.push("/");
        },
    },
}
</script>

<style scoped>
@import "@/components/Style/Button.scss";
@import "@/components/Style/Position.scss";
@import "@/components/Style/Text.scss";

.centerEverything {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
}

.logoAsBackground {
    width: 200vw;
    height: 90%;
    opacity: 0.2;
    position: absolute;
}

.login {
    height: 100vh;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2;
}

a {
    text-decoration: none;
}

.login input {
    background-color: var(--background-color-secondary);
    border-color: var(--text-primary-color);
    margin: 10px auto;
}

.login label {
    color: var(--text-primary-color);
    font-size: 18px;
}

.loginPageInformationContainer {
    display: flex;
    background-color: white;
    text-align: center;
    flex-direction: column;
    border: 4px solid rgb(192, 150, 40);
    border-radius: 15px;
    padding: 5px;
    width: 300px;
    padding: 10px;
}

.qrCodeContainer {
    width: 70%;
    margin: auto;
}

.androidImage {
    margin-top: 20px;
    width: 100%;
}

.iosImage {
    margin-top: 20px;
    width: 100%;
}
</style>