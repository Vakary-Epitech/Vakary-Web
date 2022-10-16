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
import ThemeButton from "../src/components/Theme/ThemeButton.vue";
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
    openMobilePage() {
      this.$router.push("/mobilePage");
    },
  },
  components: { ThemeButton },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: var(--background-color-primary);
  min-height: 100vh;
}

.app button {
  background: white;
  margin: 10px auto;
  border: 0;
  color: black;
  background-color: var(--background-color-secondary);
  color: var(--text-primary-color);
  border: 2px solid rgb(192, 150, 40);
  border-radius: 20px;
}
</style>
