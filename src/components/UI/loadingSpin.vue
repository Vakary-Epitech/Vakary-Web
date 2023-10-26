<template>
  <div class="d-flex justify-content-center align-items-center p-3">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">{{ $t(text || 'loadingSpin.loading') }}</span>
    </div>
    <span class="ms-3">{{ $t(text || 'loadingSpin.loading') }}</span>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    text: {
      type: String,
    }
  },
};
</script>

<style scoped>
</style>
