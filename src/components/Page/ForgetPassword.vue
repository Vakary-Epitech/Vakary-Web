<template>
  <div class="container">
    <div class="forgetPassword">
      <img src="@/assets/Logo_vect.svg" class="logoAsBackground elementHorizontalyCentered" />
      <!-- <button @click="changeLanguage">EN</button> -->
      <div class="login elementHorizontalyCentered">
        <span class="mediumTitle elementBasicMargin thirdZIndex">{{ $t("forgetPage.title") }}</span>
        <div class="ForgetPasswordContainer">
          <span class="smallTextSize">{{ $t("forgetPage.link") }}</span>
          <input v-model="email" />
          <span class="smallTextSize">{{ $t("forgetPage.code") }}</span>
          <input v-model="token" :disabled="!serverHasSendMail"/>
          <span class="smallTextSize">{{ $t("forgetPage.new") }}</span>
          <input v-model="newPassword" :disabled="!serverHasSendMail"/>
          <span class="smallTextSize">{{ $t("forgetPage.confirm") }}</span>
          <input v-model="confirmNewPassword" :disabled="!serverHasSendMail"/>
          <button v-if="!serverHasSendMail" class="elementBasicMargin basicVakaryButton"
            @click="requestPasswordReset">{{ $t("forgetPage.accept") }}</button>
          <button v-if="serverHasSendMail" class="elementBasicMargin basicVakaryButton"
            @click="sendNewPassword">{{ $t("forgetPage.accept") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

  
<script>
export default {
  data() {
    return {
      email: '',
      serverHasSendMail: false,
      token: '',
      error: '',
      newPassword: '',
      confirmNewPassword: '',
    }
  },
  methods: {
    openLoginPage() {
      this.$router.push("/loginPage");
    },
    changeLanguage() {
      this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
    },
    requestPasswordReset() {
      this.$store.dispatch("requestPasswordReset", this.email).then((result) => {
        this.serverHasSendMail = true;
        console.log(result);
      }).catch((error) => {
        this.serverHasSendMail = true;
        this.error = error;
      });
    },
    sendNewPassword() {
      this.$store.dispatch("sendNewPassword", { password: "test", authorization: this.token }).then((result) => {
        this.serverHasSendMail = true;
        console.log(result);
      }).catch((error) => {
        this.error = error;
      });
    },
  },
}
</script>
  
<style scoped>

.login {
  height: 100vh;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
}

.forgetPassword {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.logoAsBackground {
  width: 90vw;
  height: 90vh;
  opacity: 20%;
  position: absolute;
}

.ForgetPasswordContainer {
  display: flex;
  background-color: var(--background-color-primary);
  text-align: center;
  flex-direction: column;
  border: 1px solid rgb(192, 150, 40);
  border-radius: 15px;
  padding: 5px;
  max-width: 400px;
  align-content: center;
  align-items: center;
}

.ForgetPasswordContainer>input {
  margin-top: 5px;
  margin-bottom: 15px;
  max-width: 60vw;
}
</style>