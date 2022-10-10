<template>
  <div>
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

</style>