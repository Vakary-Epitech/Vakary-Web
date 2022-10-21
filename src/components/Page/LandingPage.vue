<template>
  <div>
    <div>
      <img class="background" src="@/assets/LandingPage/landingPageBackground.jpg">
      <div class="positionBackgroundCard">
        <b class="textOnTopOfCard">Vakary vos vacances selon vos envies !</b>
        <div class="backgroundCardPosition">
          <img src="@/assets/Logo_vect.svg" class="logoSize logoPosition">
          <div class="textPosition">
            <label class="firstBoxText">On organise vos vacances de rêves pour vous et gratuitement</label>
            <label class="firstBoxText">Dites nous vos préférences, la ville que vous souhaitez visiter et un itinéraire personnalisé vous sera proposé</label>
            <label class="firstBoxText">De plus grâçe à Vakary mobile vous pourrez suivre votre itinéraire en temps réel, et bien plus !</label>
          </div>
          <div class="inputStyle">
            <button class="blueVakaryButton biggerButton">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  transform: translate(20%, -60%)
}


.textOnTopOfCard {
  font-size: 35px;
  color: white;
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
  margin-bottom: 20px;
}

.biggerButton {
  font-size: 26px;
}
</style>
