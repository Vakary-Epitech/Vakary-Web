<template>
  <div class="login elementHorizontalyCentered">
    <img src="@/assets/Logo_vect.svg" class="logoSize elementBasicMargin elementHorizontalyCentered" />
    <label class="elementBasicMargin">Sign in to Vakary</label>
    <div class="elementHorizontalyCentered">
      <form v-show="pro" class="loginPageInformationContainer">
        <label>Code d'authentification:</label>
        <input type="code" required v-model="code">
        <label>Code authentification oublie ?</label>
        <label>Email ou Nom d'utilisateur:</label>
        <input type="email" required v-model="email">
        <label>Mot de passe:</label>
        <input type="password" required v-model="password">
        <label>Mot de passe oublie ?</label>
      </form>

      <form v-show="!pro" class="loginPageInformationContainer">
        <label>Email ou Nom d'utilisateur:</label>
        <input type="email" required v-model="email">
        <label>Mot de passe:</label>
        <input type="password" required v-model="password">
        <button class="basicVakaryButton"> Connexion</button>
        <button class="basicVakaryButton" @click="(openForgetPassword)">Mot de passe oublie ?</button>
      </form>
    </div>
    <div class="elementHorizontalyCentered loginPageInscriptionContainer">
      <label class="newToText">New to Vakary ? </label>
      <button class="InscriptionButton blueVakaryButton" @click="(openSelectAccount)">Inscription</button>
    </div>
    <button class="basicVakaryButton" v-if="!pro" v-on:click="pro = true"> Connexion Professionelle</button>
    <button class="basicVakaryButton" v-if="pro" v-on:click="pro = false"> Connexion Standard</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pro: false
    }
  },
  methods: {
    openSelectAccount() {
      this.$router.push("/selectAccount");
    },
    openForgetPassword() {
      this.$router.push("/forgetPassword")
    }
  },
}
</script>

<style scoped>
@import "@/components/Style/Button.scss";

.elementBasicMargin {
  margin-top: 10px;
  margin-bottom: 10px;
}

.newToText {
  margin-top: 3px;
  margin-left: 5px;
}

.InscriptionButton {
  margin: auto 5px;
}

.login {
  display: flex;
  background-color: var(--background-color-primary);
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: translate(0%, 18%);
}

.login input {
  background-color: var(--background-color-secondary);
  border-color: var(--text-primary-color);
  margin: 10px auto;
}

.login label {
  color: var(--text-primary-color);
}

.loginPageInscriptionContainer {
  display: flex;
  justify-content: center;
  border: 1px solid #000642;
  border-radius: 15px;
  padding: 5px;
  width: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
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

;
</style>
