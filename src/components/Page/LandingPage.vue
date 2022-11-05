<template>
  <div>
    <topBar class="reajustWidth" />
    <img class="background" src="@/assets/LandingPage/landingPageBackground.jpg">
    <div class="positionBackgroundCard">
      <b class="textOnTopOfCard">Vakary vos vacances selon vos envies !</b>
      <div class="backgroundCardPosition">
        <img src="@/assets/Logo_vect.svg" class="logoSize logoPosition">
        <div class="textPosition">
          <label>On organise vos vacances de rêves pour vous et gratuitement</label>
          <label>Dites nous vos préférences, la ville que vous souhaitez visiter et un itinéraire
            personnalisé vous sera proposé</label>
          <label>De plus grâçe à Vakary mobile vous pourrez suivre votre itinéraire en temps
            réel, et bien plus !</label>
        </div>
        <div class="inputStyle">
          <button class="blueVakaryButton biggerButton" @click="openSignUpPage">Sign up</button>
        </div>
      </div>
    </div>
    <div class="wrapperImageTypeAndText">
      <div class="wrapperTypeBox">
        <div>
          <span class="textOnTopOfImage"><b>Sites Religieux</b></span>
          <img class="background backgroundImageTranslate" src="@/assets/LandingPage/cathedrale.jpg">
        </div>
        <div>
          <span class="textOnTopOfImage"><b>Sport</b></span>
          <img class="background backgroundImageTranslate" src="@/assets/LandingPage/stade.jpg">
        </div>
        <div>
          <span class="textOnTopOfImage"><b>Musée</b></span>
          <img class="background backgroundImageTranslate" src="@/assets/LandingPage/musee.jpg">
        </div>
        <div>
          <span class="textOnTopOfImage"><b>Monument</b></span>
          <img class="background backgroundImageTranslate" src="@/assets/LandingPage/stanislas.jpg">
        </div>
        <div>
          <span class="textOnTopOfImage"><b>Parc</b></span>
          <img class="background backgroundImageTranslate" src="@/assets/LandingPage/parc.jpg">
        </div>
        <div>
          <span class="textOnTopOfImage"><b>Restaurant</b></span>
          <img class="background backgroundImageTranslate" src="@/assets/LandingPage/raclette.jpg">
        </div>
      </div>
      <img class="dotsImage" src="@/assets/LandingPage/dots.jpg">
      <div class="textTypeImageWrapper">
        <span class="titleForImageType textTypeMargin"><b>Profiter au maximum de vos vacances !</b></span>
        <span class="textForImageType textTypeMargin">Que vous préferiez une balade, les monuments, les restaurant ou
          encore autre chose, nous
          avons ce qu'il vous faut</span>
      </div>
    </div>
    <hr class="separationBar">
    <div class="blueBoxWrapper">
      <div class="blueBackground">
        <div class="centerGroupText">
          <b><span class="groupText">Vakary part à l'aventure avec vous !</span></b>
          <span class="groupText subtitleGroupText">Vakary se déplace partout avec vous, grâce à notre application
            mobile, vous pourrez
            suivre votre itinéraire en temps réel et géolocaliser. Retrouver également vos amis avec lesquelles votre
            itinéraire est partagé</span>
          <div class="alignLeft">
            <button class="invertedBlueVakaryButton biggerButton" @click="openMobilePage">Trouver nos apps<span
                class="arrow"></span></button>
          </div>
          <div class="marginBottomText">
            <b><span class="groupText">Partager vos vacances !</span></b>
            <span class="groupText subtitleGroupText">Grâce à notre fonctionnalité de groupe, vous pouvez partager vos
              itinéraires, suivre
              la localisation de votre groupe et discuter avec eux !</span>
            <div class="alignLeft">
              <button class="invertedBlueVakaryButton biggerButton" @click="openSignUpPage">Sign up<span
                  class="arrow"></span></button>
            </div>
          </div>
        </div>
        <div class="alignPhoneImage">
          <img class="telImage" src="@/assets/LandingPage/mapTelephone.png">
        </div>
      </div>
    </div>
    <hr class="separationBar marginSeparationDogo">
    <div>
      <img src="@/assets/LandingPage/beautifulDogo.jpg" class="beautifulDogoImage">
      <div class="textOnDogo">
        <label class="textOnTopOfCard">Prêt à rejoindre l'aventure ?</label>
        <button class="invertedBlueVakaryButton biggerButton" @click="openSignUpPage">Inscription<span
            class="arrow"></span></button>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from '../UI/TopBar.vue';

export default {
  components: {
    topBar,
  },
  methods: {
    openSignUpPage() {
      this.$router.push("/loginPage");
    },
    openMobilePage() {
      this.$router.push("/mobilePage");
    }
  }
}
</script>
<style scoped>
@import "@/components/Style/Main.scss";
@import "@/components/Style/Position.scss";
@import "@/components/Style/Text.scss";
@import "@/components/Style/Image.scss";

.marginSeparationDogo {
  margin-top: 10vh;
  margin-bottom: 10vh;
}

.beautifulDogoImage {
  width: 100%;
  height: 50vw;
  filter: brightness(70%);
}

.textOnDogo {
  transform: translate(30%, -30vw);
  width: 70%
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

.reajustWidth {
  width: 100%;
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

.backgroundCardPosition:hover {
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
}

.positionBackgroundCard {
  width: 60vw;
  transform: translate(30%, -80%);
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
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.wrapperTypeBox>div {
  flex: 1 1 30%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.textOnTopOfImage {
  font-size: calc(10px + 1.5vw);
  color: white;
}

.backgroundImageTranslate {
  position: absolute;
  width: 14vw;
  height: 25vh;
  filter: brightness(80%);
  border-radius: 30px;
}

.dotsImage {
  width: 126px;
  height: 126px;
  border: 2px solid rgb(192, 150, 40);
  border-radius: 200px;
  margin-left: 20px;
}

.wrapperImageTypeAndText {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(0%, -15%);
}

.textTypeImageWrapper {
  display: flex;
  align-items: left;
  flex-direction: column;
  width: 30vw;
}

.textTypeMargin {
  margin-left: 30px;
  margin-bottom: 30px;
}

.signUpPageButton {
  width: 20%;
  align-items: center;

}

.separationBar {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  border-top: 3px solid rgb(192, 150, 40);
  width: 40vw;
}

.marginBetweenImage {
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>
