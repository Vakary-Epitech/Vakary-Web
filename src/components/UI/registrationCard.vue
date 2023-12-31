<template>
  <div class="card-header">
    <h4 class="text-center mt-3">{{ $t("inscriptionPage.create") }}</h4>
  </div>
  <div class="card-body row" v-if="!loading">
    <div v-if="error">
      <p class="wrongID text-center">
        <span class="bold">{{ $t("inscriptionPage.errors.failed") }}<br></span>
        <span v-if="emailError">{{ $t("inscriptionPage.errors.email") }}</span>
        <span v-else-if="userNameError">{{ $t("inscriptionPage.errors.username") }}</span>
        <span v-else-if="passwordError">{{ $t("inscriptionPage.errors.password") }}</span>
        <span v-else>{{ errorMessage }}</span>
      </p>
    </div>
    <div class="my-2">
      <input type="text" class="form-control" v-model="$store.state.userStore.username"
        :placeholder="$t('inscriptionPage.username')">
    </div>
    <div class="my-2">
      <input type="email" class="form-control" v-model="$store.state.userStore.mail"
        :placeholder="$t('inscriptionPage.email')">
    </div>
    <div class="my-2">
      <input @keyup.enter="(confirmInscription)" type="password" class="form-control" v-model="password" :placeholder="$t('inscriptionPage.password')">
    </div>
    <div>
      <button @click="(confirmInscription)" class="btn newButton text-center">{{ $t("inscriptionPage.register")
      }}</button>
    </div>
    <div class="mt-2 text-center">
      <button class="redirectButton" @click="openLoginPage()">{{ $t("inscriptionPage.alreadyHaveAnAccount") }}</button>
    </div>
    <div class="mt-2 text-center">
      <button @click="authenticateWithGoogle" class="btn google-signin-button">
        <img class="google-logo"
          src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.441/static/media/google-logo.e086107b.svg"
          alt="google-logo" />
        <span class="google-text">
          {{ $t("inscriptionPage.google") }}
        </span>
      </button>
    </div>
  </div>
  <Loading v-if="loading"/>
</template>

<script>
import Loading from "@/components/UI/loadingSpin.vue";
export default {
  emits: ['openLogin'],
  components: {
    Loading
  },
  data() {
    return {
      password: "",
      errorMessage: "",
      passwordError: false,
      error: false,
      emailError: false,
      userNameError: false,
      loading: false
    }
  },
  methods: {
    authenticateWithGoogle() {
      window.location.href = "https://eip.vakary.fr/v1/auth/google";
    },
    openLoginPage() {
      this.$emit("openLogin");
    },
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },
    isValidPassword(password) {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])?[a-zA-Z\d\W_]{8,}$/;
      return re.test(String(password));
    },
    isValidUsername(username) {
      const re = /^[a-zA-Z0-9]{3,}$/;
      return re.test(String(username));
    },
    checkInformations(username, email, password) {
      if (!this.isValidUsername(username)) {
        this.userNameError = true;
        this.error = true;
        return;
      }
      if (!this.isValidEmail(email)) {
        this.emailError = true;
        this.error = true;
        return;
      }
      if (!this.isValidPassword(password)) {
        this.passwordError = true;
        this.error = true;
        return;
      }
    },
    confirmInscription() {
      this.loading = true;
      this.emailError = false;
      this.passwordError = false;
      this.userNameError = false;
      this.error = false;
      this.checkInformations(this.$store.state.userStore.username, this.$store.state.userStore.mail, this.password);
      if (this.error === true) {
        return;
      }
      this.errorMessage = "";
      this.$store.dispatch("userRegister", {
        username: this.$store.state.userStore.username,
        email: this.$store.state.userStore.mail,
        password: this.password
      }).then(() => {
        this.loading = false;
        this.$router.push("/mapPage");
      }).catch((error) => {
        this.loading = false;
        this.errorMessage = error?.response?.data?.message;
        this.error = true;
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.google-signin-button {
  border: 1px solid grey;
  height: 40px;
  padding: 8px 8px;
}

.google-signin-button:hover {
  border: 1px solid rgb(192, 150, 40);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.google-text {
  font-family: 'Roboto', sans-serif;
  size: 14px;
  color: 0, 0, 0 (54%);
}

.google-logo {
  width: 18px;
  height: 18px;
  margin-right: 24px;
  margin-bottom: 5px;
}

.bold {
  font-weight: 600;
}

input {
  border: 1px solid rgb(192, 150, 40);
  height: 40px;
}

.wrongID {
  background-color: #FFE4E1;
  padding: 5px;
  border: 1px solid #dd3c10;
}

.redirectButton {
  background-color: #fff;
  border: none;
  color: #0d6efd;
}

.redirectButton:hover {
  text-decoration: underline;
}
</style>
