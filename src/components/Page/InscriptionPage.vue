<template>
  <div class="background">
    <div class="centered-svg">
        <img src="@/assets/logo_long_vect.svg">
    </div>
    <div class="card mx-auto my-auto mt-3">
      <div class="card-header">
        <h4 class="text-center mt-3">{{ $t("inscriptionPage.create")}}</h4>
      </div>
      <div class="card-body row">
        <div v-if="error">
          <p class="wrongID text-center">
            <span class="bold">L'inscription a échouée<br></span>
            <span v-if="emailError">Email invalide</span>
            <span v-else-if="passwordError">Votre mot de passe doit contenir minimum 8 caractères, au moins une minuscule une majuscule et un chiffre</span>
            <span v-else>Une erreur s'est produite</span>
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
          <button @click="(confirmInscription)" class="btn buttonCards text-center">{{ $t("inscriptionPage.register") }}</button>
        </div>
        <div class="mt-2 text-center">
          <button class="redirectButton" @click="openLoginPage()">{{ $t("inscriptionPage.alreadyHaveAnAccount") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      passwordError: false,
      error: false,
      emailError: false,
    }
  },
  methods: {
    openLoginPage () {
      this.$router.push("/loginPage");
    },
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },
    isValidPassword(password) {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return re.test(String(password));
    },
    checkInformations(email, password) {
      if (!this.isValidEmail(email)) {
        this.emailError = true;
        this.error = true;
        return;
      }
      this.emailError = false;
      if (!this.isValidPassword(password)) {
        this.passwordError = true;
        this.error = true;
        return;
      }
      this.passwordError = false;
    },
    confirmInscription() {
      this.checkInformations(this.$store.state.userStore.mail, this.password);
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
.bold {
  font-weight: 600;
}

.card {
  background-color: #fff;
  min-width: 300px;
  max-width: 400px;
  position: relative;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
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
.buttonCards {
    margin-top: 5%;
    width: 100%;
    height: 25%;
    min-height: 40px;
    background-color: #C09628;
    color: white;
    font-size: calc(16px + 0.1vw);
    border: 2px solid rgb(192, 150, 40);
}

.buttonCards:hover {
    background-color: #000642;
    border: 2px solid #000642;
    color: white;
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
