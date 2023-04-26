<template>
  <div class="background">
    <div class="centered-svg">
        <img src="@/assets/logo_long_vect.svg">
    </div>
    <div class="card mx-auto my-auto mt-3">
      <div class="card-header">
        <h4 class="text-center mt-3">Trouvez votre compte</h4>
      </div>
      <div class="card-body row">
        <div v-if="userDontExist" >
          <p class="wrongID text-center">
            <span class="bold">Aucun résultat de recherche<br></span>
            <span>Votre recherche ne donne aucun résultat. Veuillez réessayer avec d'autres informations.</span>
          </p>
        </div>
        <div v-else-if="invalidToken" >
          <p class="wrongID text-center">
            <span class="bold">Code incorrect<br></span>
            <span>Le code entré est incorrect. Veuillez vérifier vos emails.</span>
          </p>
        </div>
        <div v-else-if="userExist">
          <p class="correctID text-center">
            <span class="bold">Compte trouvé<br></span>
            <span>Veuillez entrer le code reçu par mail.</span>
          </p>
          <div class="my-2">
              <input type="text" class="form-control"  v-model="token"
              placeholder="Code d'authentification">
          </div>
          <div class="my-2">
              <input type="password" class="form-control"  v-model="newPassword"
              placeholder="Nouveau mot de passe">
          </div>
          <div>
            <button @click="(requestPasswordReset)" class="btn buttonCards text-center">Changer mon mot de passe</button>
          </div>
        </div>
        <!-- <div class="my-2">
          <input type="text" class="form-control"  v-model="$store.state.userStore.username" 
          :placeholder="$t('inscriptionPage.username')">
        </div> -->
        
        <div v-if="!userExist" class="my-2">
          <input type="text" class="form-control"  v-model="id" 
          placeholder="Adresse email ou nom d'utilisateur">
        </div>
      </div>
      <div class="card-body row" v-if="!userExist">
        <div class="col-6">
          <button @click="(openLoginPage)" class="btn buttonCancelCards text-center">Annuler</button>
        </div>
        <div class="col-6">
          <button @click="(requestPasswordReset)" class="btn buttonCards text-center">Rechercher</button>
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