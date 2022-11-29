<template>
  <div class="forgetPassword">
    <img src="@/assets/Logo_vect.svg" class="logoAsBackground elementHorizontalyCentered" />
    <div class="login elementHorizontalyCentered">
      <span class="mediumTitle elementBasicMargin thirdZIndex">Réinitialiser votre mot de passe</span>
      <div class="ForgetPasswordContainer">
        <span class="smallTextSize">Entrer votre Email et nous vous enverrons un lien pour réinitialiser votre mot de
          passe :</span>
        <input v-model="email" placeholder="Email" />
        <span class="smallTextSize">Entrer votre code reçu par mail :</span>
        <input v-model="token" placeholder="Token" :disabled="!serverHasSendMail"/>
        <span class="smallTextSize">Nouveau mot de passe :</span>
        <input v-model="newPassword" placeholder="Nouveau mot de passe" :disabled="!serverHasSendMail"/>
        <span class="smallTextSize">Confirmer votre nouveau mot de passe :</span>
        <input v-model="confirmNewPassword" :disabled="!serverHasSendMail"
          placeholder="Confirmer votre nouveau mot de passe" />
      </div>
      <button v-if="!serverHasSendMail" class="elementBasicMargin basicVakaryButton"
        @click="requestPasswordReset">Accepter</button>
      <button v-if="serverHasSendMail" class="elementBasicMargin basicVakaryButton"
        @click="sendNewPassword">Accepter</button>
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
    }
  },
  methods: {
    openLoginPage() {
      this.$router.push("/loginPage");
    },
    requestPasswordReset() {
      this.$store.dispatch("requestPasswordReset", this.email).then((result) => {
        console.log(result);
        this.serverHasSendMail = true;
      }).catch((error) => {
        console.log(error);
        this.serverHasSendMail = true;
      });
    },
    sendNewPassword() {
      this.$store.dispatch("sendNewPassword", { password: "test", authorization: this.token }).then((result) => {
        console.log(result);
        this.serverHasSendMail = true;
      }).catch((error) => {
        console.log(error);
      });
    },
  },
}
</script>
  
<style scoped>
@import "@/components/Style/Main.scss";
@import "@/components/Style/Position.scss";
@import "@/components/Style/Text.scss";
@import "@/components/Style/Image.scss";

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
  opacity: 0.2;
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
  max-width: 20vw;
}
</style>