<template>
  <div :class="dropdown ? 'large-window' : 'window'">
    <slot></slot>
    <LoadingSpin v-if="loading"/>
  </div>
</template>

<script>
import LoadingSpin from "./loadingSpin.vue";
export default {
  name: "MapWindows",
  components: {
    LoadingSpin,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    dropdown: {
      type: Boolean,
      default: false,
    }
  }
};

</script>

<style scoped>

.window {
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  border-radius: 25px;
  font-size: calc(6px + 0.6vw);
  max-height: 85vh;
  min-width: 15vw;
  max-width: 30vw;
  border: 1px solid rgb(192, 150, 40);
  padding: 15px;
  overflow: auto;
}

.large-window {
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  border-radius: 25px;
  font-size: calc(6px + 0.6vw);
  max-height: 85vh;
  width: 30vw;
  border: 1px solid rgb(192, 150, 40);
  padding: 15px;
  overflow: auto;
}
</style>