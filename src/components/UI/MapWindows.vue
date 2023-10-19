<template>

  <div class="col-12 window">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MapWindows",
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
</style>