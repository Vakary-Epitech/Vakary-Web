<template>
  <div class="app">
    <div :class="{'root-dark': isDarkMode}">
      <button :class="{'black-moon': isDarkMode}" class="btn-dark-mode" @click="isDarkMode = !isDarkMode">
        <i class="fas fa-moon"></i>
      </button>
      <router-view v-slot="{ Component }">
        <component :is="Component" :key="this.$route.path"></component>
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    geti18n() {
      return this.$i18n.locale;
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
  --text-primary-color: black;
  --accent-color: #cacaca;
  --background-cards-color: #f6f6f6;
}

.btn-dark-mode {
  position: fixed;
  top: 20px;
  right: 150px;
  z-index: 999;
  border-radius: 6px;
}

.black-moon {
  color: white;
  background-color: black;
}

.root-dark {
  --background-color-primary: black;
  --text-primary-color: white;
  --accent-color: #cacaca;
  --background-cards-color: #1c1c1c;
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
