<template>
  <div class="login">
    <div>Connexion</div>
    <button v-if="!pro" v-on:click="pro = false" class="buttonSelectLogin"> Connexion Standard</button>
    <button v-if="!pro" v-on:click="pro = true"> Connexion Professionelle</button>
    <button v-if="pro" v-on:click="pro = false" > Connexion Standard</button>
    <button v-if="pro" v-on:click="pro = true"  class="buttonSelectLogin"> Connexion Professionelle</button>
    <form v-show="pro">
      <label>Code d'authentification:</label>
      <input type="code" required v-model="code">
      <label>Code authentification oublie ?</label>
      <label>Email ou Nom d'utilisateur:</label>
      <input type="email" required v-model="email">
      <label>Mot de passe:</label>
      <input type="password" required v-model="password">
      <label>Mot de passe oublie ?</label>
    </form>
  
    <form v-show="!pro">
      <label>Email ou Nom d'utilisateur:</label>
      <input type="email" required v-model="email">
      <label>Mot de passe:</label>
      <input type="password" required v-model="password">
      <button @click="(openForgetPassword)">Mot de passe oublie ?</button>
    </form>
  
    <button> Connexion</button>
    <button>
      <img src="../../assets/google.png" width="100" height="100">
    </button>
    <label>ou</label>
    <button @click="(openSelectAccount)">Inscription</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pro: false
    }
  },
  methods: {
    openSelectAccount() {
      this.$router.push("/selectAccount");
    },
    openForgetPassword() {
      this.$router.push("/forgetPassword")
    }
  },
}
</script>

<style>

.buttonSelectLogin {
  background: #959595;
}
.login {
  background-color: var(--background-color-primary);
}

.login button {
    display: flex; 
    flex-direction: column;
    text-align: center; 
    align-items: center;
    background: white;
    margin: 10px auto;
    border: 0;
    color: black;
    background-color: var(--background-color-secondary);
    color: var(--text-primary-color);
    border: 2px solid rgb(192, 150, 40);
    border-radius: 20px;
}

.login input {
    background-color: var(--background-color-secondary);
    border-color: var(--text-primary-color);
    margin: 10px auto;
}

.login label {
  color: var(--text-primary-color);
}


</style>