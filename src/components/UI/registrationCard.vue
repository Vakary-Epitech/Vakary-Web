<template>
  <div class="card-header">
    <h4 class="text-center mt-3">{{ $t("inscriptionPage.create")}}</h4>
  </div>
  <div class="card-body row">
    <div v-if="error">
      <p class="wrongID text-center">
        <span class="bold">{{ $t("inscriptionPage.errors.failed")}}<br></span>
        <span v-if="emailError">{{ $t("inscriptionPage.errors.email")}}</span>
        <span v-else-if="userNameError">{{ $t("inscriptionPage.errors.username")}}</span>
        <span v-else-if="passwordError">{{ $t("inscriptionPage.errors.password")}}</span>
        <span v-else>{{ $t("inscriptionPage.errors.error")}}</span>
      </p>
    </div>
    <div class="my-2">
      <input type="text" class="form-control"  v-model="$store.state.userStore.username" 
      :placeholder="$t('inscriptionPage.username')">
    </div>
    <div class="my-2">
      <input type="text" class="form-control"  v-model="$store.state.userStore.mail" 
      :placeholder="$t('inscriptionPage.email')">
    </div>
    <div class="my-2">
      <input type="password" class="form-control"  v-model="password" 
      :placeholder="$t('inscriptionPage.password')">
    </div>
    <div>
      <button @click="(confirmInscription)" class="btn newButton text-center">{{ $t("inscriptionPage.register") }}</button>
    </div>
    <div class="mt-2 text-center">
      <button class="redirectButton" @click="openLoginPage()">{{ $t("inscriptionPage.alreadyHaveAnAccount") }}</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['openLogin'],
  data() {
    return {
      password: "",
      passwordError: false,
      error: false,
      emailError: false,
      userNameError: false,
    }
  },
  methods: {
    openLoginPage () {
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
      this.emailError = false;
      this.passwordError = false;
      this.userNameError = false;
      this.error = false;
      this.checkInformations(this.$store.state.userStore.username, this.$store.state.userStore.mail, this.password);
      this.$store.dispatch("checkIfAccountCanBeCreated", this.password).then(() => {
        this.$store.state.userStore.userIsLoggedIn = true;
        this.$router.push("/mapPage");
      }).catch((error) => {
        console.log(error);
        this.error = true;
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
