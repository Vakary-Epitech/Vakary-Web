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
