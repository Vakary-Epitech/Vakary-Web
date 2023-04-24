<template>
  <div class="selectionContainer">
    <div class="selectionFrame">
      <b class="mediumTitle">{{ $t("inscriptionPage.register") }}</b>
      <img src="@/assets/Logo_vect.svg" class="logoAsBackground elementBasicMargin elementHorizontalyCentered" />
      <!-- <button @click="changeLanguage">EN</button> -->
      <div class="selectionDisplayForm">
        <label>{{ $t("inscriptionPage.name") }}</label>
        <input required v-model="$store.state.userStore.username">
        <label>{{ $t("inscriptionPage.email") }}</label>
        <input required type="mail" v-model="$store.state.userStore.mail">
        <label>{{ $t("inscriptionPage.password") }}</label>
        <input required type="password" v-model="password">
        <label>{{ $t("inscriptionPage.confirmPassword") }}</label>
        <input required type="password" v-model="passwordConfirm">
        <label v-if="this.passwordAreNotTheSame" class="wrongInputText">{{ $t("inscriptionPage.different") }}</label>
      </div>
      <button @click="(confirmInscription)" class="basicVakaryButton elementBasicMargin">{{ $t("inscriptionPage.confirm") }}</button>
      <!-- div already got an account ? Login -->
      <div class="col-12">
        <p>{{ $t ("inscriptionPage.alreadyHaveAnAccount") }} <button class="blueVakaryButton" @click="openLoginPage">{{ $t ("inscriptionPage.signin") }}</button></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      passwordConfirm: "",
      postalCode: "",
      passwordAreNotTheSame: false,
    }
  },
  created() {
    this.typeOfInscription = 0;
  },
  methods: {
    changeLanguage() {
      if (this.$i18n.locale == "fr") {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = "fr";
      }
    },
    openLoginPage () {
      this.$router.push("/loginPage");
    },
    confirmInscription() {
      if (this.password == this.passwordConfirm) {
        this.$store.dispatch("checkIfAccountCanBeCreated", this.password).then(() => {
          this.$store.state.userStore.userIsLoggedIn = true;
          this.$router.push("/mapPage");
        }).catch((error) => {
          console.log(error);
          this.userDontExist = true;
        })
      } else {
        this.passwordAreNotTheSame = true;
      }
    }
  }
}
</script>

<style scoped>
.selectionFrame {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border: 4px solid rgb(192, 150, 40);
  background-color: var(--background-color-primary);
  border-radius: 15px;
  padding: 5px;
  width: 450px;
  margin: auto 50px;
}
.logoAsBackground {
  width: 90vw;
  height: 90%;
  opacity: 0.2;
  position: absolute;
  z-index: -1;
}
.selectionContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.selectionDisplayForm {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

label {
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
