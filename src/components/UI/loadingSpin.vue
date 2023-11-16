<template>
  <div class="d-flex justify-content-center align-items-center p-3">
    <div class="spinner-container">
      <img src="@/assets/logov2.5.png" alt="logo" width="50" class="rotate">
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

<style>
.spinner-container {
  display: flex;
  align-items: center;
}

.rotate {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>