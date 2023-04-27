<template>
  <div class="background">
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
</template>

<script>
import Register from "@/components/UI/registrationCard.vue";
import Login from "@/components/UI/loginCard.vue";
import Password from "@/components/UI/forgotPassword.vue";
export default {
  components : {
    Register,
    Login,
    Password
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
  }
};
</script>


<style scoped>
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
</style>