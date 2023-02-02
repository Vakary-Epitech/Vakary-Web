<template>
  <div class="app">
    <div>
      <Transition>
      <router-view v-slot="{ Component }">
        <component :is="Component" :key="this.$route.path"></component>
      </router-view>
      <!--<button @click="(openLandingPage)">Landing</button>
      <button @click="(openLoginPage)">Login</button>
      <button @click="(openMapPage)">Map</button>
      <button @click="(openProfilePage)">Profile</button>
      <button @click="(openHomePage)">Home</button>
      <button @click="(openMobilePage)">Mobile</button>
      <button @click="(openGroupPage)">Groupe</button>
      <button @click="(openWebPage)">Web</button>
      <button @click="(openitineraryPage)">Itinerary</button>-->
    </Transition>
    </div>
  </div>
</template>

<script>
import themeButton from "../src/components/Theme/ThemeButton.vue";
export default {
  mounted() {
    this.$store.dispatch("retrievedCurrentUserPosition");
    this.$store.dispatch("retrievedMarkerData");
  },
  beforeCreate() {
    this.$router.push("/mapPage");
  },
  methods: {
    openHomePage() {
      this.$router.push("/vakaryHome");
    },
    openLoginPage() {
      this.$router.push("/loginPage");
    },
    openMapPage() {
      this.$router.push("/mapPage");
    },
    openProfilePage() {
      this.$router.push("/profilePage");
    },
    openMobilePage() {
      this.$router.push("/mobilePage");
    },
    openitineraryPage() {
      this.$router.push("/itineraryPage");
    },
    openGroupPage() {
      this.$router.push("/groupPage");
    },
    openWebPage() {
      this.$router.push("/VakaryWeb");
    },
    openLandingPage() {
      this.$router.push("/");
    },
  },
  components: { themeButton },
};
</script>

<style>
:root {
    --background-color-primary: white;
    --accent-color: #cacaca;
    --text-primary-color: #222;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
