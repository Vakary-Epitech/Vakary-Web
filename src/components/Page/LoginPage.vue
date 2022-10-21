<template>
  <div class="login elementHorizontalyCentered">
    <img src="@/assets/Logo_vect.svg" class="logoSize elementHorizontalyCentered" />
    <label class="elementBasicMargin">Sign in to Vakary</label>

    <div class="elementHorizontalyCentered">
      <div v-show="pro" class="loginPageInformationContainer">
        <label class="smallTextSize">Code d'authentification:</label>
        <input type="code" required v-model="code">
        <label>Email ou Nom d'utilisateur:</label>
        <input required v-model="email">
        <label>Mot de passe:</label>
        <input type="password" required v-model="password">
        <button class="basicVakaryButton" @click="(checkIfUserIsAuthorized)">Connexion</button>
        <button class="basicVakaryButton" @click="(openForgetPassword)">Mot de passe oublie ?</button>
      </div>

      <div v-show="!pro" class="loginPageInformationContainer">
        <label>Email ou Nom d'utilisateur:</label>
        <input v-model="email">
        <label>Mot de passe:</label>
        <input type="password" v-model="password">
        <button class="basicVakaryButton" @click="(checkIfUserIsAuthorized)">Connexion</button>
        <button class="basicVakaryButton" @click="(openForgetPassword)">Mot de passe oublie ?</button>
      </div>
    </div>
    
    <div class="elementHorizontalyCentered loginPageInscriptionContainer">
      <label class="newToText">New to Vakary ? </label>
      <button class="InscriptionButton blueVakaryButton" @click="(openRegistrationSelection)">Inscription</button>
    </div>

    <button class="basicVakaryButton" v-if="!pro" v-on:click="pro = true"> Connexion Professionelle</button>
    <button class="basicVakaryButton" v-if="pro" v-on:click="pro = false"> Connexion Standard</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pro: false,
      email: "",
      password: "",
      code: "",
    }
  },
  methods: {
    openRegistrationSelection() {
      this.$router.push("/registrationType");
    },
    openForgetPassword() {
      this.$router.push("/forgetPassword")
    },
    checkIfUserIsAuthorized() {
      this.$router.push("/vakaryHome");
    }
  },
}
</script>

<style scoped>
@import "@/components/Style/Button.scss";
@import "@/components/Style/Position.scss";

.newToText {
  margin-top: 3px;
  margin-left: 5px;
}

.InscriptionButton {
  margin: auto 5px;
}

.login {
  height: 100vh;
  display: flex;
  background-color: var(--background-color-primary);
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.login input {
  background-color: var(--background-color-secondary);
  border-color: var(--text-primary-color);
  margin: 10px auto;
}

.login label {
  color: var(--text-primary-color);
  font-size: 18px;
}

.loginPageInscriptionContainer {
  display: flex;
  justify-content: center;
  border: 1px solid #000642;
  border-radius: 15px;
  padding: 5px;
  width: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.loginPageInformationContainer {
  display: flex;
  background-color: var(--background-color-primary);
  text-align: center;
  flex-direction: column;
  border: 4px solid rgb(192, 150, 40);
  border-radius: 15px;
  padding: 5px;
  width: 300px;
}
</style>
