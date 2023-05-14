<template>  
  <div class="card-header">
    <h4 class="text-center mt-3">{{ $t("forgetPassword.title")}}</h4>
  </div>
  <div class="card-body row">
    <div v-if="userDontExist" >
      <p class="wrongID text-center">
        <span class="bold">{{ $t("forgetPassword.errors.idWrong")}}<br></span>
        <span>{{ $t("forgetPassword.errors.messageID")}}</span>
      </p>
    </div>
    <div v-else-if="invalidToken" >
      <p class="wrongID text-center">
        <span class="bold">{{ $t("forgetPassword.errors.codeWrong")}}<br></span>
        <span>{{ $t("forgetPassword.errors.messageCode")}}</span>
      </p>
    </div>
    <div v-else-if="userExist && !invalidToken">
      <p class="correctID text-center">
        <span class="bold">{{ $t("forgetPassword.success.idCorrect")}}<br></span>
        <span>{{ $t("forgetPassword.success.messageID")}}</span>
      </p>
    </div>
    <div v-else-if="errorPassword">
      <p class="wrongID text-center">
        <span class="bold">
          {{ $t("forgetPassword.errors.password")}}
        </span>
        <br>
        <span>
          {{ $t("forgetPassword.errors.messagePassword")}}
        </span>
      </p>
    </div>
    <div v-if="userExist">
      <div class="my-2">
          <input class="form-control"  v-model="token"
          :placeholder="$t('forgetPassword.placeholders.code')">
      </div>
      <div class="my-2">
          <input class="form-control" type="password" autocomplete="new-password" v-model="newPassword"
          :placeholder="$t('forgetPassword.placeholders.password')">
      </div>
      <div>
        <button @click="(sendNewPassword)" class="btn newButton text-center">{{ $t("forgetPassword.buttons.change")}}</button>
      </div>
    </div>
    <div v-if="!userExist" class="my-2">
      <input class="form-control"  v-model="id" 
      :placeholder="$t('forgetPassword.placeholders.id')">
    </div>
  </div>
  <div class="card-body row" v-if="!userExist">
    <div class="col-6">
      <button @click="(openLoginPage)" class="btn buttonCancelCards text-center">{{ $t("forgetPassword.buttons.cancel")}}</button>
    </div>
    <div class="col-6">
      <button @click="(requestPasswordReset)" class="btn newButton text-center">{{ $t("forgetPassword.buttons.search")}}</button>
    </div>
  </div>
</template>


  
<script>
export default {
  emits: ['openLogin'],
  data() {
    return {
      id: '',
      token: '',
      userExist: false,
      userDontExist: false,
      newPassword: '',
      invalidToken: false,
      errorPassword: false,
    }
  },
  methods: {
    openLoginPage() {
      this.$emit("openLogin");
    },
    isValidPassword(password) {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])?[a-zA-Z\d\W_]{8,}$/;
      return re.test(String(password));
    },
    requestPasswordReset() {
      this.userDontExist = false,
      this.$store.dispatch("requestPasswordReset", this.id).then(() => {
        this.userExist = true;
      }).catch(() => {
        this.userDontExist = true;
      });
    },
    sendNewPassword() {
      if (!this.isValidPassword(this.newPassword)) {
        this.errorPassword = true;
        return;
      }
      this.errorPassword = false;
      this.$store.dispatch("sendNewPassword", { password: this.newPassword, authorization: this.token }).then(() => {
        this.invalidToken = true;
        this.openLoginPage();
      }).catch((error) => {
        console.log(error);
        this.invalidToken = true;
      });
    },
  },
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
</style>