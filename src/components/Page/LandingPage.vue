<template>
  <div>
    <main>
      <!-- <button @click="changeLanguage">EN</button> -->
      <section class="d-none d-md-block">
        <img class="background" src="@/assets/LandingPage/landingPageBackground.jpg">
        <div class="row">
          <div class="positionBackgroundCard">
            <b class="textOnTopOfCard">{{ $t("vakarySlogan") }}</b>
            <div class="backgroundCardPosition">
              <img src="@/assets/Logo_vect.svg" class="logoSize logoPosition">
              <div class="textPosition">
                <label>Êtes-vous prêt à voyager et à découvrir les merveilles du monde ?</label>
                <label>Avec Vakary, vous pouvez organiser vos vacances de rêve gratuitement et facilement.</label>
                <label>Nous proposons des itinéraires personnalisés en fonction de vos préférences et de la région que vous souhaitez visiter.</label>
                <!-- <label>Obtenez Vakary dès maintenant et commencez à planifier votre prochain voyage.</label> -->
                <!-- <label>{{ $t("landingPage.free") }}</label>
                <label>{{ $t("landingPage.pref") }}</label>
                <label>{{ $t("landingPage.mobile") }}</label> -->
              </div>
              <div class="inputStyle">
                <button class="blueVakaryButton biggerButton" @click="openSignUpPage">{{ $t("landingPage.registration") }}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="d-md-none d-block mb-5">
        <img class="background" src="@/assets/LandingPage/landingPageBackground.jpg">
        <div class="row text-center positionBackgroundCardSmall">
          <b class="textOnTopOfCard">{{ $t("vakarySlogan") }}</b>
          <div class="backgroundCardPositionSmall">
            <div>
              <label>{{ $t("landingPage.free") }}</label>
              <label>{{ $t("landingPage.pref") }}</label>
              <label>{{ $t("landingPage.mobile") }}</label>
            </div>
            <button class="col-4 offset-4 blueVakaryButton biggerButton mb-1" @click="openSignUpPage">{{ $t("landingPage.registration") }}</button>
          </div>
        </div>
      </section>
      <section name="images">
        <div class="row">
          <div class="col-6 col-md-7">
            <div class="row">
              <div class="d-none d-md-block col-md-6 col-xl-4 mb-3 backgroundLeisures">
                <span class="overlay"><b>{{ $t("landingPage.religious") }}</b></span>
                <img src="@/assets/LandingPage/cathedrale.jpg">
              </div>
              <div class="d-none d-md-block col-md-6 col-xl-4 mb-3 backgroundLeisures">
                <span class="overlay"><b>{{ $t("landingPage.sport") }}</b></span>
                <img src="@/assets/LandingPage/stade.jpg">
              </div>
              <div class="col-12 col-md-6 col-xl-4 ms-3 ms-md-0 mb-3 backgroundLeisures">
                <span class="overlay"><b>{{ $t("landingPage.museum") }}</b></span>
                <img src="@/assets/LandingPage/musee.jpg">
              </div>
              <div class="col-12 col-md-6 col-xl-4 ms-3 ms-md-0 mb-3 backgroundLeisures">
                <span class="overlay"><b>{{ $t("landingPage.monuments") }}</b></span>
                <img src="@/assets/LandingPage/stanislas.jpg">
              </div>
              <div class="col-12 col-md-6 col-xl-4 ms-3 ms-md-0 mb-3 backgroundLeisures">
                <span class="overlay"><b>{{ $t("landingPage.park") }}</b></span>
                <img src="@/assets/LandingPage/parc.jpg">
              </div>
              <div class="d-none d-md-block col-md-6 col-xl-4 mb-3 backgroundLeisures">
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
      <section>
        <hr class="separationBar">
        <div class="blueBoxWrapper">
          <div class="blueBackground d-md-flex d-none">
            <div class="centerGroupText">
              <b><span class="groupText">{{ $t("landingPage.block3Text1") }}</span></b>
              <span class="groupText subtitleGroupText mt-4">{{ $t("landingPage.block3Text2b") }}</span>
              <div class="alignLeft">
                <button class="invertedBlueVakaryButton biggerButton" data-bs-toggle="modal" data-bs-target="#modalMobile">{{ $t("landingPage.find") }}<span
                    class="arrow"></span></button>
              </div>
              <!-- <div class="marginBottomText">
                <b><span class="groupText">{{ $t("landingPage.block3Text3") }}</span></b>
                <span class="groupText subtitleGroupText">{{ $t("landingPage.block3Text4") }}</span>
                <div class="alignLeft">
                  <button class="invertedBlueVakaryButton biggerButton" @click="openSignUpPage">{{ $t("landingPage.registration") }}<span
                      class="arrow"></span></button>
                </div>
              </div> -->
            </div>
            <div class="alignPhoneImage">
              <img class="telImage" src="@/assets/LandingPage/pointmap.png">
            </div>
          </div>
          <div class="blueBackgroundSmall d-md-none d-flex">
            <div class="row">
              <div class="col-12 mt-3">
                <p class="text-center"><b>{{ $t("landingPage.block3Text1") }}</b></p>
                <p class="ms-2">{{ $t("landingPage.block3Text2") }}</p>
                <div class="text-center">
                  <button class="invertedBlueVakaryButtonSmall" data-bs-toggle="modal" data-bs-target="#modalMobile">{{ $t("landingPage.find") }}<span
                      class="arrow"></span></button>
                </div>
              </div>
              <div class="col-12 mt-5">
                <p class="text-center"><b>{{ $t("landingPage.block3Text3") }}</b></p>
                <p class="ms-2">{{ $t("landingPage.block3Text4") }}</p>
                <div class="text-center mb-2">
                  <button class="invertedBlueVakaryButtonSmall" @click="openSignUpPage">{{ $t("landingPage.registration") }}<span
                      class="arrow"></span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section name="greenSection">
        <hr class="separationBar">
        <div class="greenBoxWrapper">
          <div class="greenBackground groupText">
            <h3>{{ $t("mobilePage.title") }}</h3>
            <p>{{ $t("mobilePage.text1") }}</p>
            <img class="w-100" src="@/assets/LandingPage/mapPresentation.png">
          </div>
        </div>
      </section>
      <section name="redSection">
        <hr class="separationBar">
        <div class="redBoxWrapper">
          <div class="redBackground groupText">
            Section présentation mobile
          </div>
        </div>
      </section>
      <section>
        <hr class="separationBar marginSeparationDogo">
        <div class="textOnDogo">
          <label class="textOnTopOfCard">{{ $t("landingPage.ready") }}</label>
          <button class="invertedBlueVakaryButton biggerButton" @click="openSignUpPage">{{ $t("landingPage.registration") }}<span class="arrow"></span></button>
        </div>
        <img src="@/assets/LandingPage/beautifulDogo.jpg" class="beautifulDogoImage">
      </section>
      <section name="modalMobile">
        <!-- modale that displays hello world as title and download mobile app as texte-->

        <div class="modal fade" id="modalMobile" tabindex="-1" aria-labelledby="modalMobileLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalMobileLabel">{{ $t("landingPage.modal.obtain") }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>{{ $t("landingPage.modal.download") }}</p>
                <div class="row" >
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
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t("landingPage.modal.close") }}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  components: {
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
    },
    openSignUpPage() {
      this.$router.push("/loginPage");
    },
    openMobilePage() {
      this.$router.push("/mobilePage");
    },
    geti18n() {
      return this.$i18n.locale;
    },
  }
}
</script>
<style scoped>
@import "@/components/Style/Main.scss";
@import "@/components/Style/Position.scss";
@import "@/components/Style/Text.scss";
@import "@/components/Style/Image.scss";

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

.textOnDogo {
  transform: translate(30%, 20vw);
  width: 70%;
  z-index: 1;
  position: absolute;
}

.beautifulDogoImage {
  width: 100%;
  height: 50vw;
  filter: brightness(70%);
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

.marginBottomText {
  margin-top: 10vh;
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
  border-radius: 50px;
  border: 2px solid rgb(192, 150, 40);
  flex-wrap: wrap;
}

.backgroundCardPositionSmall {
  display: flex;
  justify-content: left;
  align-items: left;
  width: 100%;
  background-color: white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 50px;
  border: 2px solid rgb(192, 150, 40);
  flex-wrap: wrap;
}

.backgroundCardPosition:hover {
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
}

.positionBackgroundCard {
  width: 60vw;
  transform: translate(30%, -80%);
}

.positionBackgroundCardSmall {
  width: 90vw;
  transform: translate(6%, -40%);
}

.blueBoxWrapper {
  display: flex;
  text-align: left;
  justify-content: center;
}

.blueBackground {
  display: flex;
  margin-top: 40px;
  width: 80vw;
  border-radius: 16px;
  flex-wrap: wrap;
  padding: 90px 0 70px 90px;
  background: #FFE9D3;
  /* #FCCFCF */
  /* #C6D8AF */
}

.greenBoxWrapper {
  display: flex;
  justify-content: center;
}
.greenBackground {
  margin-top: 40px;
  width: 80vw;
  border-radius: 16px;
  flex-wrap: wrap;
  padding: 90px 0 70px 90px;
  background-color: #C6D8AF;
}

.redBoxWrapper {
  display: flex;
  justify-content: center;
}
.redBackground {
  margin-top: 40px;
  width: 80vw;
  border-radius: 16px;
  flex-wrap: wrap;
  padding: 90px 0 70px 90px;
  background-color: #FCCFCF;
}


.blueBackgroundSmall {
  margin-top: 20px;
  width: 80vw;
  border-radius: 16px;
  flex-wrap: wrap;
  background: #FFE9D3;
}

.invertedBlueVakaryButtonSmall {
    padding: 10px 16px;
    background-color: #000642;
    color: white;
    border: 2px solid #000642 solid;
    border-radius: 20px;
    transition: all .3s ease;
    align-items: center;
}

.blueBackground>div {
  flex: 50%;
}

.textOnTopOfCard {
  font-size: calc(12px + 1.5vw);
  color: white;
}

.titleForImageType {
  font-size: calc(12px + 1.1vw);
}

.textForImageType {
  font-size: calc(12px + 0.9vw);
}

.logoPosition {
  display: flex;
  margin-top: 10px;
  margin-right: 15px;
}

.textPosition {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: calc(12px + 0.7vw);
  margin-top: 10px;
  width: 60vw;
}

.inputStyle {
  display: flex;
  margin-top: 5px;
  margin-bottom: 10px;
}

.biggerButton {
  font-size: calc(8px + 0.8vw);
}

.wrapperTypeBox {
  width: 50%;
  height: 60vh;
}

.wrapperTypeBox>div {
  flex: 1 1 30%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.textOnTopOfImage {
  position: absolute;
  z-index: 1;
  font-size: calc(10px + 1.5vw);
  color: white;
  margin-left: 10px;
}


.backgroundImageTranslate {
  z-index: -1;
  height: 25vh;
  filter: brightness(80%);
  border-radius: 30px;
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
    text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
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
}

</style>
