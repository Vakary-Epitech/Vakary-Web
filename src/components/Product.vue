<template>
  <!-- creation de la card avec design qui va s'afficher dans la page de presentation vakaryWeb -->
  <div class="product">
    <div :class="'product-inner ' + product.color">
      <div class="product-image-wrap">
        <img :src="product.src" class="image" />
      </div>
      <div class="product-detail">
        <h2>{{ product.title }}</h2>
        <h4 class="bg-text">{{ product.desc }}</h4>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'myProduct',
  props: ['product'],
}
</script>

<style scoped>
  .product {
    flex: 1 1 33.333%;
    width: 100%;
    padding: 35px;
  }
  .product-inner {
    position: relative;
    padding: 25px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    perspective: 1000px;
    border-radius: 20px;
  }

  .product-text-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    overflow: hidden;
    perspective: 1000px;
  }
  
  .product-text-wrap h2 {
    color: #313131;
    font-size: 128px;
    font-weight: 900;
    opacity: 0.2;
    transform-origin: center;
  }
  .product-image-wrap {
    position: relative;
    z-index: 1;
    transform-origin: center;
  }
  .product-image-wrap .image {
    width: 100%;
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.25));
  }
  .product-detail {
    background-color: #FFF;
    padding: 25px;
    margin: 0px -25px -25px;
  }
  .product-detail h2 {
    font-size: 24px;
    font-weight: 700;
    color: #676767;
    margin-bottom: 15px;
  }
  .product-detail p {
    font-size: 14px;
    line-height: 1.5;
    font-weight: 300;
    color: #676767;
  }
</style>