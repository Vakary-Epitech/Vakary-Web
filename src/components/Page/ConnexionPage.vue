<template>
  <languages></languages>
  <!-- <img @click="changeLanguage()" class="buttonLanguage" :src="geti18n() == 'en' ? require('@/assets/badges/flags/french-flag.svg') : require('@/assets/badges/flags/gb-flag.svg')"> -->
  <div class="background fadeshow1">
    <div class="centered-svg">
      <img src="@/assets/logo_long_vect.svg">
    </div>
    <div class="card mx-auto my-auto mt-3">
        <div v-if="registration">
            <Register @openLogin="openLogin"></Register>
        </div>
        <div v-else-if="login">
            <Login @loginDone="pageIsDone" @openRegistration="openRegister" @openForgetPassword="openPassword"></Login>
        </div>
        <div v-else-if="forgetPassword">
            <Password @openLogin="openLogin"></Password>
        </div>
    </div>
  </div>
  <div class="fadeshow2">
    <ScreenSizeTooSmall></ScreenSizeTooSmall>
  </div>
</template>

<script>
import Register from "@/components/UI/registrationCard.vue";
import Login from "@/components/UI/loginCard.vue";
import Password from "@/components/UI/forgotPassword.vue";
import languages from "@/components/UI/languagesModal.vue";
import ScreenSizeTooSmall from "@/components/UI/ScreenSizeTooSmall.vue";
export default {
  components : {
    Register,
    Login,
    Password,
    ScreenSizeTooSmall,
    languages
  },
  data() {
    return {
      currentPage: 'login',
      registration: true,
      login: false,
      forgetPassword: false
    };
  },
  methods: {
    registrationIsDone() {
        this.registration = true;
    },
    pageIsDone() {
      this.$router.push("/mapPage");
    },
    openLogin() {
      this.registration = false;
      this.login = true;
    },
    openRegister() {
      this.login = false;
      this.registration = true;
    },
    openPassword() {
      this.login = false;
      this.forgetPassword = true;
    },
    changeLanguage() {
      this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
    },
    geti18n() {
      return this.$i18n.locale;
    },
  }
};
</script>


<style scoped>

.buttonLanguage {
  cursor: pointer;
  border-radius: 6px;
  width: 30px;
  right: 20px;
  position: fixed; 
  top: 20px; 
  z-index: 2;  
}

.background {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #f0f2f5;
}

.centered-svg {
  display: block;
  margin: 5% auto 10px;
  width: 300px;
}

.card {
  background-color: #fff;
  min-width: 300px;
  max-width: 400px;
  position: relative;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

@media only screen and (max-width: 767px) {
  .fadeshow1 {
    display: none;
  }
}

@media only screen and (min-width: 767px) {
  .fadeshow2 {
    display: none;
  }
}
</style>