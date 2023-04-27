<template>
  <div class="app">
    <div>
      <router-view v-slot="{ Component }">
        <component :is="Component" :key="this.$route.path"></component>
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$router.push("/");
  },
  methods: {
    geti18n() {
      return this.$i18n.locale;
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
    openWebPage() {
      this.$router.push("/VakaryWeb");
    },
    openLandingPage() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
@import '@/components/Style/Button.scss';
@import '@/components/Style/Main.scss';
@import '@/components/Style/Position.scss';
@import '@/components/Style/Text.scss';
@import '@/components/Style/Image.scss';

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
