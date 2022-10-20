<template>
  <div>
    <div>
      <img class="backgroundImage" :src="require('@/assets/LandingPage/landingPageBackground.jpg')">
      <form class="box">
        <div class="field">
          <figure class="image is-64x64">
            <img src="@/assets/Logo_vect.svg">
          </figure>
          <h1 class="hugeTitle">Vakary vos vacances selon vos envies !</h1>
          <h5 class="subtitle">On organise vos vacances de rêves pour vous et gratuitement</h5>
        </div>
        <button class="button is-primary is-large">Sign up</button>
      </form>
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

.backgroundBoxPosition {
  display: flex;
  position: absolute;
  left: 10vw;
  top: 65vh;
  width: 70vw;
  height: 40vh;
}
</style>
