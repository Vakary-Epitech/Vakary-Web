<template>
  <div>
    <topBar />
    <img class="background" src="@/assets/LandingPage/landingPageBackground.jpg">
    <div class="positionBackgroundCard">
      <b class="textOnTopOfCard">Vakary vos vacances selon vos envies !</b>
      <div class="backgroundCardPosition">
        <img src="@/assets/Logo_vect.svg" class="logoSize logoPosition">
        <div class="textPosition">
          <label class="firstBoxText">On organise vos vacances de rêves pour vous et gratuitement</label>
          <label class="firstBoxText">Dites nous vos préférences, la ville que vous souhaitez visiter et un itinéraire
            personnalisé vous sera proposé</label>
          <label class="firstBoxText">De plus grâçe à Vakary mobile vous pourrez suivre votre itinéraire en temps
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
        <button class="basicVakaryButton biggerButton" @click="openSignUpPage">Inscription</button>
      </div>
    </div>
    <div></div>
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
    }
  }
}
</script>
<style scoped>
@import "@/components/Style/Main.scss";
@import "@/components/Style/Position.scss";
@import "@/components/Style/Text.scss";
@import "@/components/Style/Image.scss";

.background {
  width: 100%;
  height: 100%;
  z-index: -2;
  filter: brightness(70%)
}

.backgroundCardPosition {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 60vw;
  height: 35vh;
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
  transform: translate(20%, -80%);
}


.textOnTopOfCard {
  font-size: 35px;
  color: white;
}

.titleForImageType {
  font-size: 25px;
}

.textForImageType {
  font-size: 18px;
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
  font-size: 18px;
  margin-top: 10px;
  width: 60vw;
}

.inputStyle {
  display: flex;
  margin-top: 5px;
  margin-bottom: 10px;
}

.biggerButton {
  font-size: 24px;
}

.wrapperTypeBox {
  width: 45vw;
  height: 60vh;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.wrapperTypeBox>div {
  flex: 1 1 10vw;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
}

.textOnTopOfImage {
  font-size: 26px;
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
  transform: translate(0%, -30%);
}

.textTypeImageWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 30vw;
}

.textTypeMargin {
  margin-left: 30px;
  margin-bottom: 30px;
}
</style>
