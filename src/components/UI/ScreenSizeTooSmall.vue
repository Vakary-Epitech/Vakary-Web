<template>
    <div class="background">
        <div class="centered-svg">
        <img src="@/assets/logo_long_vect.svg">
        </div>
        <div class="card mx-auto my-auto mt-3">
            <div class="card-body row">
                <div class="text-center">
                    <p>{{ $t("screenSizePage.screenSizeTooSmall")}}</p>
                    <p>{{ $t("screenSizePage.mobile")}}</p>
                </div>
                <div class="row text-center">
                    <div class="col-6">
                        <img :src="require(`@/assets/badges/${geti18n()}/app-store-badge.svg`)"
                            class="iosImage">
                    </div>
                    <div class="col-6">
                        <img :src="require(`@/assets/badges/${geti18n()}/google-play-badge.svg`)"
                            class="androidImage">
                    </div>
                    <button type="button" class="btn btn-secondary" style="margin-top: 10px" @click="goBackToLandingPage()">{{ $t("screenSizePage.goBack")}}</button>
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

.background {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #f0f2f5;
}

.centered-svg {
  display: block;
  margin: 5% auto 10px;
  width: 300px;
}

.card {
  background-color: #fff;
  min-width: 300px;
  max-width: 400px;
  position: relative;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
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