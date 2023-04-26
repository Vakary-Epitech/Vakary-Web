<template>
  <div class="background">
    <div class="centered-svg">
        <img src="@/assets/logo_long_vect.svg">
    </div>
    <div class="card mx-auto my-auto mt-3">
      <div class="card-header">
        <h4 class="text-center mt-3">{{ $t("forgetPassword.title")}}</h4>
      </div>
      <div class="card-body row">
        <div v-if="userDontExist" >
          <p class="wrongID text-center">
            <span class="bold">{{ $t("forgetPassword.error.idWrong")}}<br></span>
            <span>{{ $t("forgetPassword.error.messageID")}}</span>
          </p>
        </div>
        <div v-else-if="invalidToken" >
          <p class="wrongID text-center">
            <span class="bold">{{ $t("forgetPassword.error.codeWrong")}}<br></span>
            <span>{{ $t("forgetPassword.error.messageCode")}}</span>
          </p>
        </div>
        <div v-else-if="userExist && !invalidToken">
          <p class="correctID text-center">
            <span class="bold">{{ $t("forgetPassword.success.idCorrect")}}<br></span>
            <span>{{ $t("forgetPassword.success.messageID")}}</span>
          </p>
        </div>
        <div v-if="userExist">
          <div class="my-2">
              <input type="text" class="form-control"  v-model="token"
              :placeholder="$t('forgetPassword.placeholders.code')">
          </div>
          <div class="my-2">
              <input type="password" class="form-control"  v-model="newPassword"
              :placeholder="$t('forgetPassword.placeholders.password')">
          </div>
          <div>
            <button @click="(requestPasswordReset)" class="btn buttonCards text-center">{{ $t("forgetPassword.buttons.change")}}</button>
          </div>
        </div>
        <div v-if="!userExist" class="my-2">
          <input type="text" class="form-control"  v-model="id" 
          :placeholder="$t('forgetPassword.placeholders.id')">
        </div>
      </div>
      <div class="card-body row" v-if="!userExist">
        <div class="col-6">
          <button @click="(openLoginPage)" class="btn buttonCancelCards text-center">{{ $t("forgetPassword.buttons.cancel")}}</button>
        </div>
        <div class="col-6">
          <button @click="(requestPasswordReset)" class="btn buttonCards text-center">{{ $t("forgetPassword.buttons.search")}}</button>
        </div>
      </div>
    </div>
  </div>
</template>


  
<script>
export default {
  data() {
    return {
      id: '',
      serverHasSendMail: false,
      token: '',
      userExist: false,
      userDontExist: false,
      newPassword: '',
      invalidToken: false,
    }
  },
  methods: {
    openLoginPage() {
      this.$router.push("/loginPage");
    },
    requestPasswordReset() {
      this.$store.dispatch("requestPasswordReset", this.id).then(() => {
        this.serverHasSendMail = true;
        this.userExist = true;
      }).catch(() => {
        this.serverHasSendMail = true;
        this.userDontExist = true;
      });
    },
    sendNewPassword() {
      this.$store.dispatch("sendNewPassword", { password: this.newPassword, authorization: this.token }).then(() => {
        this.serverHasSendMail = true;
        this.invalidToken = true;
        this.openLoginPage();
      }).catch(() => {
        this.invalidToken = true;
      });
    },
  },
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

.correctID {
  background-color: #E6FFE1;
  padding: 5px;
  border: 1px solid #3cdd10;
}

.buttonCancelCards {
    margin-top: 5%;
    width: 100%;
    height: 25%;
    min-height: 40px;
    background-color: #fff;
    font-size: calc(16px + 0.1vw);
    border: 2px solid #0d6efd;
}

.buttonCancelCards:hover {
    border: 2px solid #0d6efd;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
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
</style>