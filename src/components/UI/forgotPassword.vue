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
    <div v-else-if="userExist && !invalidToken">
      <p class="correctID text-center">
        <span class="bold">{{ $t("forgetPassword.success.idCorrect")}}<br></span>
        <span>{{ $t("forgetPassword.success.messageID")}}</span>
      </p>
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
      <button @click="(passwordReset)" class="btn newButton text-center">{{ $t("forgetPassword.buttons.search")}}</button>
    </div>
  </div>
</template>


  
<script>
export default {
  emits: ['openLogin'],
  data() {
    return {
      id: '',
      userExist: false,
      userDontExist: false,
    }
  },
  methods: {
    openLoginPage() {
      this.$emit('openLogin');
    },
    passwordReset() {
      this.userDontExist = false,
      this.$store.dispatch("post", {
        path: "forgotPassword",
        data: {
          email: this.id
        }
      }).then(() => {
        this.userExist = true;
      }).catch(() => {
        this.userDontExist = true;
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