<!-- This component is used for the presentation of the mobile application Vakary
     The page is not complete yet, it still needs all the mobile screenshots + video
     The structure is using the bootstrap grid system and structured as follow: 
        - a container-fluid
        - div row 
        - div col 
     It is using as well the i18n system for a translation system -->
<template>
    <topBar :connected="false" />
    <main>
      <!-- <button @click="seti18n('en')">EN</button>
      <button @click="seti18n('fr')">FR</button> -->
      <section class="section orange-bg text-center">
            <div class="section__content row">
                <div class="section__title col-6 my-auto ">
                    <h1>{{ $t("mobilePage.text1") }}</h1>
                </div>
                <div class="col-6">
            <img class="screenshots" src="@/assets/mobilePage/pointmap.png" alt="Screenshot of the default page of the VAKARY app">
          </div>
        </div>
      </section>
      <section class="section blue-bg text-center">
            <div class="section__content row">
              <div class="col-6">
                <img class="screenshots" src="@/assets/mobilePage/itinerary.png" alt="Screenshot of the itinerary generation form in the VAKARY app">
              </div>
              <div class="section__title col-6 my-auto orange-text">
                <h1>{{ $t("mobilePage.text2") }}</h1>
              </div>
            </div>
      </section>
      <section class="section light-blue-bg text-center">
        <div class="section__content row">
              <div class="section__title col-6 my-auto orange-text">
                <h1>{{ $t("mobilePage.text3") }}</h1>
              </div>
                <div class="col-6">
                    <img class="screenshots" src="@/assets/mobilePage/description.png" alt="Screenshot of the point of interest description page in the VAKARY app">
                </div>
        </div>
      </section>
    </main>
</template>
    
<script>
import topBar from '../UI/TopBar.vue';
export default {
    components: {
        topBar
    },
    methods: {
        geti18n() {
            return this.$i18n.locale;
        },
        seti18n(lang) {
            this.$i18n.locale = lang;
        }
    }
}
</script>
    
<style scoped>

.orange-bg {
    background-color: #ecb61c;
}
.orange-text {
    color: #ecb61c;
}

.blue-bg {
  background-color: #1d1a38;
}

.blue-text {
  color: #1d1a38;
}
.light-blue-bg {
  background-color: #6d6c9a;
}

.light-blue-text {
  color: #6d6c9a;
}

.grey-bg {
  background-color: #e8e8e8;
}

.image {
    width: 30vw;
    height: 100vh;
}
.qrcode {
    width: 20vw;
    height: auto;
}

.badges {
    width: 200px;
    height: auto;
}
.logo  {
    width: 150px;
    height: auto;
}
.section {
    padding: 5rem 0;
  }
.screenshots {
    width: 20vw !important;
    height: auto !important;
}

.row {
    margin-right: 0 !important;
}
</style>