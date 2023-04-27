<template>
  <h4 class="text-center mt-3">{{ $t("loginPage.signin")}} </h4>
  <div class="card-body row">
    <div v-if="userDontExist" >
      <p class="wrongID text-center">
        <span class="bold">{{ $t("loginPage.wrong") }}<br></span>
        <span>{{ $t("loginPage.wrong2") }}</span>
      </p>
    </div>
    <div class="my-2">
      <input type="text" class="form-control"  v-model="$store.state.userStore.mail" 
      :placeholder="$t('loginPage.email')">
    </div>
    <div class="mt-3">
      <input v-model="password" type="password" class="form-control" :placeholder="$t('loginPage.password')">
    </div>
    <div>
      <button @click="(openMap)" class="btn newButton text-center">{{ $t("loginPage.connect") }}</button>
    </div>
    <div class="mt-2">
      <button @click="openForgetPassword()" class="redirectButton">{{ $t("loginPage.forgot") }}</button> <i class="fa fa-circle smallCircle mb-1"></i> <button @click="openRegistration()" class="redirectButton" >{{ $t("loginPage.register") }}</button>
    </div>
    <div class="mt-2 text-center">
      <span><a href="https://vakary.pro.smartbazaar.app/" target="_blank">{{ $t("loginPage.pro") }}</a></span>
    </div>
  </div>
</template>
  
<script>
export default {
  emits: ['openRegistration', 'openForgetPassword', 'loginDone'],
  data() {
    return {
      password: "",
      userDontExist: false,
    }
  },
  methods: {
    openRegistration() {
      this.$emit("openRegistration");
    },
    openForgetPassword() {
      this.$emit("openForgetPassword");
    },
    openMap() {
      this.checkIfUserIsAuthorizeToConnect();
    },
    checkIfUserIsAuthorizeToConnect() {
      this.userDontExist = false;
      this.$store.dispatch("checkIfUserIsAuthorizedToConnect", this.password).then(() => {
        this.$store.state.userStore.userIsLoggedIn = true;
        this.$emit("loginDone");
      }).catch(() => {
        this.userDontExist = true;
      })
    },
  },
}
</script>

<style scoped lang="scss">
.smallCircle {
  font-size: 1px;
  color: #000642;
}

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

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.redirectButton {
  background-color: #fff;
  border: none;
  color: #0d6efd;
}

.redirectButton:hover {
  text-decoration: underline;
}

</style>