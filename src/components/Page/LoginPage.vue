<template>
  <div class="background">
    <div class="centered-svg">
        <img src="@/assets/logo_long_vect.svg">
    </div>
    <div class="card mx-auto my-auto mt-3">
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
          <button @click="(openMap)" class="btn buttonCards text-center">{{ $t("loginPage.connect") }}</button>
        </div>
        <div class="mt-2">
          <button @click="openForgetPassword()" class="redirectButton">{{ $t("loginPage.forgot") }}</button> <i class="fa fa-circle smallCircle mb-1"></i> <button @click="openInscription()" class="redirectButton" >{{ $t("loginPage.register") }}</button>
        </div>
        <div class="mt-2 text-center">
          <span><a href="https://vakary.pro.smartbazaar.app/" target="_blank">{{ $t("loginPage.pro") }}</a></span>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      password: "",
      userDontExist: false,
    }
  },
  methods: {
    openInscription() {
      this.$router.push("/InscriptionPage");
    },
    openForgetPassword() {
      this.$router.push("/forgetPassword")
    },
    openMap() {
      this.checkIfUserIsAuthorizeToConnect();
    },
    checkIfUserIsAuthorizeToConnect() {
      this.$store.dispatch("checkIfUserIsAuthorizedToConnect", this.password).then(() => {
        this.$store.dispatch("retrieveUserInformation", this.password).then(() => {
          this.$store.state.userStore.userIsLoggedIn = true;
          this.$router.push("/mapPage");
        }).catch(() => {
          this.userDontExist = true;
        })
      }).catch(() => {
        this.userDontExist = true;
        console.log(this.$store.state.userStore.username);

      })
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

.smallCircle {
  font-size: 1px;
  color: #000642;
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
  --bs-card-border-width: none;
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