<template>
  <div class="selectionContainer">
    <div class="selectionFrame">
      <img src="@/assets/Logo_vect.svg" class="logoSize elementBasicMargin elementHorizontalyCentered" />
      <!-- <button @click="changeLanguage">EN</button> -->
      <b class="mediumTitle">{{ $t("inscriptionPage.register") }}</b>
      <div v-if="this.$route.params.type == 0" class="selectionDisplayForm">
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
      <div v-else class="selectionDisplayForm">
        <label>{{ $t("inscriptionPage.city") }}</label>
        <input required v-model="$store.state.userStore.username">
        <label>{{ $t("inscriptionPage.zip") }}</label>
        <input required v-model="postalCode">
        <label>{{ $t("inscriptionPage.email") }}</label>
        <input required v-model="$store.state.userStore.mail">
        <label>{{ $t("inscriptionPage.password") }}</label>
        <input required type="password" v-model="password">
        <label>{{ $t("inscriptionPage.confirmPassword") }}</label>
        <input required type="password" v-model="passwordConfirm">
        <label v-if="this.passwordAreNotTheSame" class="wrongInputText">{{ $t("inscriptionPage.different") }}</label>
      </div>
      <button @click="(confirmInscription)" class="basicVakaryButton elementBasicMargin">{{ $t("inscriptionPage.confirm") }}</button>
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
    this.typeOfInscription = this.$route.params.type;
  },
  methods: {
    changeLanguage() {
      if (this.$i18n.locale == "fr") {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = "fr";
      }
    },
    confirmInscription() {
      if (this.password == this.passwordConfirm) {
        this.$store.dispatch("checkIfAccountCanBeCreated", this.password).then(() => {
          this.$store.state.userStore.userIsLoggedIn = true;
          this.$router.push("/mapPage");
        }).catch(() => {
          this.$store.state.userStore.userIsLoggedIn = true;
          this.$router.push("/mapPage");
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
@import "@/components/Style/Button.scss";
@import "@/components/Style/Position.scss";

.selectionFrame {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border: 4px solid rgb(192, 150, 40);
  border-radius: 15px;
  padding: 5px;
  width: 450px;
  margin: auto 50px;
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
