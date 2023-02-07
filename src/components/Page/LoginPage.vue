<template>
  <div class="centerEverything">
    <img src="@/assets/Logo_vect.svg" class="logoAsBackground elementHorizontalyCentered" />
    <div class="login elementHorizontalyCentered">
      <label class="elementBasicMargin">{{ $t("loginPage.signIn") }}</label>
      
      <div class="elementHorizontalyCentered">
        <div v-show="pro" class="loginPageInformationContainer">
          <label class="smallTextSize">{{ $t("loginPage.authentificationCode") }}</label>
          <input type="code" required v-model="code">
          <label>{{ $t("loginPage.mailOrUsername") }}</label>
          <input required v-model="$store.state.userStore.mail">
          <label>{{ $t("loginPage.password") }}</label>
          <input type="password" required v-model="password">
          <div v-if="userDontExist" class="wrongInputText">{{ $t("loginPage.accountDontExist") }}</div>
          <button class="basicVakaryButton marginButton" @click="(checkIfCityIsAuthorizeToConnect)">{{ $t("loginPage.connection") }}</button>
          <button class="basicVakaryButton marginButton" @click="(openForgetPassword)">{{ $t("loginPage.forgotPassword") }}</button>
        </div>

        <div v-show="!pro" class="loginPageInformationContainer">
          <label>{{ $t("loginPage.mailOrUsername") }}</label>
          <input v-model="$store.state.userStore.mail">
          <label>{{ $t("loginPage.password") }}</label>
          <input type="password" v-model="password">
          <div v-if="userDontExist" class="wrongInputText">{{ $t("loginPage.accountDontExist") }}</div>
          <button class="basicVakaryButton marginButton" @click="(checkIfUserIsAuthorizeToConnect)">{{ $t("loginPage.connection") }}</button>
          <button class="basicVakaryButton marginButton" @click="(openForgetPassword)">{{ $t("loginPage.forgotPassword") }}</button>
        </div>
      </div>

      <div class="elementHorizontalyCentered loginPageInscriptionContainer">
        <label class="newToText">{{ $t("loginPage.newToVakary") }}</label>
        <button class="buttonInscription blueVakaryButton" @click="(openRegistrationSelection)">{{ $t("loginPage.inscription") }}</button>
      </div>

      <button class="basicVakaryButton" v-if="!pro" v-on:click="pro = true">{{ $t("loginPage.connectionPro") }}</button>
      <button class="basicVakaryButton" v-if="pro" v-on:click="pro = false">{{ $t("loginPage.connectionUser") }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pro: false,
      password: "",
      code: "",
      userDontExist: false,
    }
  },
  methods: {
    openRegistrationSelection() {
      this.$router.push("/registrationType");
    },
    openForgetPassword() {
      this.$router.push("/forgetPassword")
    },
    checkIfUserIsAuthorizeToConnect() {
      this.$store.dispatch("checkIfUserIsAuthorizedToConnect", this.password).then(() => {
        this.$store.state.userStore.userIsLoggedIn = true;
        this.$router.push("/mapPage");
      }).catch(() => {
        this.userDontExist = true;
      })
    },
    checkIfCityIsAuthorizeToConnect() {
      this.$store.dispatch("checkIsCityIsAuthorizedToConnect", this.password).then(() => {
        this.$router.push("/vakaryHome");
      }).catch(() => {
        this.userDontExist = true;
      })
    }
  },
}
</script>

<style scoped>
@import "@/components/Style/Button.scss";
@import "@/components/Style/Position.scss";
@import "@/components/Style/Text.scss";

.centerEverything {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.newToText {
  margin-top: 3px;
  margin-left: 5px;
}

.marginButton {
  margin: 5px auto;
}

.logoAsBackground {
  width: 90vw;
  height: 90%;
  opacity: 0.2;
  position: absolute;
}

.buttonInscription {
  margin: auto 5px;
}

.login {
  height: 100vh;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
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
  background-color: white;
  border-radius: 15px;
  padding: 5px;
  width: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.loginPageInformationContainer {
  display: flex;
  background-color: white;
  text-align: center;
  flex-direction: column;
  border: 4px solid rgb(192, 150, 40);
  border-radius: 15px;
  padding: 5px;
  width: 300px;
}
</style>
