<template>
  <div class="app">
    <div class="container">
      <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component" :key="this.$route.path"></component>
        </transition>
      </router-view>
      <button @click="(openLandingPage)">Landing</button>
      <button @click="(openLoginPage)">Login</button>
      <button @click="(openMapPage)">Map</button>
      <button @click="(openProfilePage)">Profile</button>
    </div>
  </div>
</template>

<script>
export default {
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
