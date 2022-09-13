<template>
  <div class="app">
    <div>
      <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component" :key="this.$route.path"></component>
        </transition>
      </router-view>
      <button @click="(openLandingPage)">Landing</button>
      <button @click="(openLoginPage)">Login</button>
      <button @click="(openMapPage)">Map</button>
      <button @click="(openProfilePage)">Profile</button>
      <button @click="(openMobilePage)">Mobile</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("retrievedCurrentUserPosition");
    this.$store.dispatch("retrievedMarkerData");
  },
  beforeCreate() {
    this.$router.push("/");
  },
  methods: {
    openLandingPage() {
      this.$router.push("/");
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
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
