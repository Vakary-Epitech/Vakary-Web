<template>
    <div class="container">
      <h1 class="text-center">{{ $t("aboutUs.title") }}</h1>
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4 mb-5">
          <div class="card h-100">
            <img class="card-img-top" src="https://via.placeholder.com/300x200" alt="Photo de profil">
            <div class="card-body">
              <h5 class="card-title">{{ $t("aboutUs.teamMember1.name") }}</h5>
              <p class="card-text">{{ $t("aboutUs.teamMember1.description") }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-5">
          <div class="card h-100">
            <img class="card-img-top" src="https://via.placeholder.com/300x200" alt="Photo de profil">
            <div class="card-body">
              <h5 class="card-title">{{ $t("aboutUs.teamMember2.name") }}</h5>
              <p class="card-text">{{ $t("aboutUs.teamMember2.description") }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  

<script>
export default {
    components: {},
    name: 'LearnMorePage',
};

</script>

<style scoped>
</style>