<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" :key="this.$route.path"></component>
      </transition>
    </router-view>
    <button @click="(openLandingPage)">Landing</button>
    <button @click="(openLoginPage)">Login</button>
    <button @click="(openMapPage)">Map</button>
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
