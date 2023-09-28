<template>
  <div>
    <main>
      <languages></languages>
      <section name="cardTop" class="d-none d-md-block">
        <img class="background" src="@/assets/LandingPage/landingPageBackground.jpg">
        <div class="row">
          <div class="positionBackgroundCard">
            <b class="textOnTopOfCard">{{ $t("vakarySlogan") }}</b>
            <div class="backgroundCardPosition">
              <img src="@/assets/Logo_vect.svg" class="logoSize logoPosition">
              <div class="textPosition">
                <label>{{ $t("landingPage.free") }}</label>
                <label>{{ $t("landingPage.pref") }}</label>
                <label class="p-1">{{ $t("landingPage.mobile") }}</label>
              </div>
              <div class="mt-2 mb-3">
                <button class="invertedBlueVakaryButton biggerButton py-1 text-center" @click="openConnexionPage">{{
                  $t("landingPage.registration") }}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section name="cardTop" class="d-md-none d-block mb-5">
        <img class="background" src="@/assets/LandingPage/landingPageBackground.jpg">
        <div class="row text-center positionBackgroundCardSmall">
          <b class="textOnTopOfCard">{{ $t("vakarySlogan") }}</b>
          <div class="py-2 backgroundCardPositionSmall">
            <div>
              <label>{{ $t("landingPage.free") }}</label>
              <label>{{ $t("landingPage.pref") }}</label>
              <label>{{ $t("landingPage.mobile") }}</label>
            </div>
            <div class="col-12 text-center my-1">
            <button class="blueButton py-1 text-center" @click="openConnexionPage">{{
              $t("landingPage.registration") }}</button>
            </div>
          </div>
        </div>
      </section>
      <section name="images">
        <div class="row ajustedMargin">
          <div class="col-6 col-md-7">
            <div class="row">
              <div class="d-none d-md-block ms-md-3 p-md-1 col-md-6 col-lg-4 mb-3 backgroundLeisures">
                <span class="overlay"><b>{{ $t("landingPage.religious") }}</b></span>
                <img src="@/assets/LandingPage/cathedrale.jpg">
              </div>
              <div class="col-12 col-md-6 col-lg-4 p-md-1 ms-md-3 ms-3 mb-3 backgroundLeisures">
                <span class="overlay"><b>{{ $t("landingPage.sport") }}</b></span>
                <img src="@/assets/LandingPage/stade.jpg">
              </div>
              <div class="col-12 col-md-6 col-lg-4 p-md-1 ms-md-3 ms-3 mb-3 backgroundLeisures">
                <span class="overlay"><b>{{ $t("landingPage.museum") }}</b></span>
                <img src="@/assets/LandingPage/musee.jpg">
              </div>
              <div class="d-none d-md-block col-md-6 col-lg-4 ms-3 p-md-1 ms-md-3 mb-3 backgroundLeisures">
                <span class="overlay"><b>{{ $t("landingPage.monuments") }}</b></span>
                <img src="@/assets/LandingPage/stanislas.jpg">
              </div>
              <div class="col-12 col-md-6 col-lg-4 ms-3 p-md-1 ms-md-3 mb-3 backgroundLeisures">
                <span class="overlay"><b>{{ $t("landingPage.park") }}</b></span>
                <img src="@/assets/LandingPage/parc.jpg">
              </div>
              <div class="d-none d-md-block col-md-6 p-md-1 ms-md-3 col-lg-4 mb-3 backgroundLeisures">
                <span class="overlay"><b>{{ $t("landingPage.resto") }}</b></span>
                <img src="@/assets/LandingPage/raclette.jpg">
              </div>
            </div>
          </div>
          <div class="d-none d-md-block col-md-2 my-auto text-center">
            <img class="dotsImage" src="@/assets/LandingPage/dots.jpg">
          </div>
          <div class="col-6 col-md-3 my-auto">
            <h1>{{ $t("landingPage.enjoy") }}</h1>
            <h5>{{ $t("landingPage.enjoy3") }}</h5>
          </div>
        </div>
      </section>
      <section name="pinkSection">
        <hr class="separationBar mt-5">
        <div class="pinkBoxWrapper">
          <div class="pinkBackground d-md-flex d-none">
            <div class="centerGroupText">
              <b><span class="groupText">{{ $t("landingPage.block3Text1") }}</span></b>
              <span class="groupText subtitleGroupText mt-4">{{ $t("landingPage.block3Text2b") }}</span>
              <div class="alignLeft">
                <button class="invertedBlueVakaryButton biggerButton availableSoon"  :class="`availableSoon${geti18n()}`" data-bs-toggle="modal"
                  data-bs-target="#modalMobile"><!-- {{ $t("landingPage.find") }}--><span class="arrow"></span></button>
                </div>
            </div>
            <div class="alignPhoneImage">
              <img class="telImage" src="@/assets/LandingPage/mapTelephone.png">
            </div>
          </div>
          <div class="pinkBackgroundSmall d-md-none d-flex">
            <div class="row">
              <div class="col-12 mt-3">
                <b><span class="text-center ms-3">{{ $t("landingPage.block3Text1") }}</span></b>
                <p class="text-center mt-3">{{ $t("landingPage.block3Text2b") }}</p>
                <div class="text-center">
                  <button class="invertedBlueVakaryButtonSmall mb-3 availableSoon"  :class="`availableSoon${geti18n()}`" data-bs-toggle="modal" data-bs-target="#modalMobile">
                    <!-- {{ $t("landingPage.find") }} --><span class="arrow"></span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section name="presentationCards">
        <hr class="separationBar mt-5">
        <div class="mt-5">
          <presentationCards />
        </div>
      </section>
      <section name="team">
        <hr class="separationBar marginSeparationDogo">
        <div class="col-12 text-center">
          <h4 class="mx-5">{{ $t("landingPage.learnMore") }}</h4>
          <button @click="openLearnMorePage()" class="basicVakaryButton mt-3" :class="`availableSoon${geti18n()}`"> <!--{{ $t("landingPage.learnMoreButton") }}--></button>
        </div>
      </section>
      <section name="footer">
        <hr class="separationBar marginSeparationDogo">
        <div class="row">
          <div class="col-12 text-center">
            <h2>{{ $t("landingPage.footer.follow-us") }}</h2>
          </div>
          <div class="col text-center my-5">
            <h4>{{ $t("landingPage.footer.instagram") }}</h4>
            <a href="https://www.instagram.com/vakaryapp/" target="_blank"><img class="mt-2 instagramLogo" src="@/assets/badges/instagram-logo.svg" alt="Instagram"></a>
          </div>
          <div class="col text-center my-5">
            <h4>{{ $t("landingPage.footer.twitter") }}</h4>
            <a href="https://twitter.com/VakaryApp" target="_blank"><img class="mt-3 twitterLogo" src="https://logowik.com/content/uploads/images/twitter-x5265.logowik.com.webp" alt="Twitter"></a>
          </div>
        </div>
        <hr class="separationBar marginSeparationDogo">
        <div class="row my-5">
          <div class="col-12 text-center">
            <h2>{{ $t("landingPage.footer.contact-us") }}</h2>
          </div>
          <div class="col text-center">
            <a href="mailto:service.vakary@gmail.com"><img class="emailLogo" src="@/assets/badges/mail-logo.svg"></a>
            <p class="mt-2">{{ $t("landingPage.footer.email-description") }}</p>
          </div>
        </div>
      </section>
      <section name="modalMobile">
        <div class="modal fade" id="modalMobile" tabindex="-1" aria-labelledby="modalMobileLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalMobileLabel">{{ $t("landingPage.modal.obtain") }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>{{ $t("landingPage.modal.download") }}</p>
                <div class="row">
                  <div class="col-6 my-3">
                    <img src="@/assets/LandingPage/qrcode.jpeg" class="qrCodeImage">
                  </div>
                  <div class="col-6 my-auto">
                    <p class="textOnTopOfQrCode">{{ $t("landingPage.modal.scan") }}</p>
                  </div>
                  <div class="col-6">
                    <img :src="require(`@/assets/badges/${geti18n()}/app-store-badge.svg`)" class="iosImage">
                  </div>
                  <div class="col-6">
                    <img :src="require(`@/assets/badges/${geti18n()}/google-play-badge.svg`)" class="androidImage">
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t("landingPage.modal.close")
                }}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import presentationCards from '../UI/presentationCards.vue';
import languages from '../UI/languagesModal.vue';
export default {
  components: {
    presentationCards,
    languages,
  },
  methods: {
    openConnexionPage() {
      this.$router.push("/connexionPage");
    },
    openLearnMorePage() {
      this.$router.push("/vakaryTeam");
    },
    geti18n() {
      return this.$i18n.locale;
    },
  }
}
</script>
<style scoped>

@media (min-width: 768px) and (max-width: 991.98px) {
  .col-md-6 {
    width: 45%;
  }
}

.buttonLanguage {
  cursor: pointer;
  border-radius: 6px;
  width: 30px;
  right: 20px;
  position: fixed; 
  top: 20px; 
  z-index: 2;  
}

@media (max-width: 991.98px) {
  .ajustedMargin {
    margin-top: 250px;
  }
}

@media (min-width: 992px) {
  .col-lg-4 {
    flex-basis: 30%;
    max-width: 33.33%;
  }

  .ajustedMargin {
    margin-top: 150px;
  }
}

.qrCodeImage {
  width: 100%;
  height: 100%;
}

.androidImage {
  width: 100%;
}

.iosImage {
  width: 100%;
}

.marginSeparationDogo {
  margin-top: 10vh;
  margin-bottom: 10vh;
}

.basicVakaryButton {
  display: inline;
  padding: 10px 20px;
  border-radius: 16px;
}

.groupText {
  display: flex;
  font-size: calc(15px + 0.8vw);
  width: 36vw;
  text-align: left;
  justify-content: left;
  align-items: center;
}

.subtitleGroupText {
  display: flex;
  font-size: calc(12px + 0.7vw);
  width: 30vw;
  text-align: left;
  justify-content: left;
  align-items: center;
}

.alignLeft {
  display: flex;
  justify-content: left;
  margin-top: 25px;
}

.blueButton {
    padding: 10px 16px;
    background-color: #000642;
    color: white;
    border: 2px solid #000642 solid;
    border-radius: 20px;
    transition: all .3s ease;
}

.alignPhoneImage {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.telImage {
  display: flex;
  max-width: 800px;
  max-height: 600px;
  transform: translate(-20%, 0);
}

.centerGroupText {
  display: flex;
  justify-content: center;
  text-align: left;
  align-items: left;
  flex-direction: column;
  width: 20px;
}

.background {
  width: 100%;
  height: 100%;
  z-index: -2;
  filter: brightness(70%);
}

.backgroundCardPosition {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 60vw;
  background-color: white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 16px;
  border: 2px solid rgb(192, 150, 40);
  flex-wrap: wrap;
}

.instagramLogo {
  width: 20%;
}

.twitterLogo {
  width: 20%;
}

.emailLogo {
  width: 10%;
}

.backgroundCardPositionSmall {
  display: flex;
  justify-content: left;
  align-items: left;
  width: 100%;
  background-color: white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 16px;
  border: 2px solid rgb(192, 150, 40);
  flex-wrap: wrap;
}

.backgroundCardPosition:hover {
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
}

.positionBackgroundCard {
  width: 60vw;
  position: absolute;
  transform: translate(30%, -80%);
}

.positionBackgroundCardSmall {
  width: 90vw;
  transform: translate(6%, -40%);
  position: absolute;
}

.pinkBoxWrapper {
  display: flex;
  text-align: left;
  justify-content: center;
}

.pinkBackground {
  display: flex;
  margin-top: 40px;
  width: 80vw;
  border-radius: 16px;
  flex-wrap: wrap;
  padding: 90px 0 70px 90px;
  background: #FFE9D3;
}

.invertedBlueVakaryButton {
  border-radius: 16px;
}

.pinkBackgroundSmall {
  margin-top: 20px;
  width: 80vw;
  border-radius: 16px;
  flex-wrap: wrap;
  background: #FFE9D3;
}

.invertedBlueVakaryButtonSmall {
  border-radius: 16px;
}

.pinkBackground>div {
  flex: 50%;
}

.textOnTopOfCard {
  font-size: calc(12px + 1.5vw);
  color: white;
}

.logoPosition {
  display: flex;
  margin-top: 10px;
  margin-right: 15px;
}

.textPosition {
  font-size: calc(12px + 0.7vw);
  margin-top: 10px;
  width: 60vw;
}

.biggerButton {
  font-size: calc(8px + 0.8vw);
}


.dotsImage {
  height: 10vh;
  border: 2px solid rgb(192, 150, 40);
  border-radius: 200px;
}

.row {
  margin-right: 0 !important;
}

.separationBar {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  border-top: 3px solid rgb(192, 150, 40);
  width: 40vw;
}

.backgroundLeisures {
  position: relative;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  padding: 10px 20px;
  border-radius: 10px;
}

.backgroundLeisures img {
  display: block;
  width: 100%;
  height: 100%;
  height: 25vh;
  object-fit: cover;
  border-radius: 10px;
}</style>
