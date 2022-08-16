<template>
  <div>Inscription</div>
  <button v-if="!pro" v-on:click="pro = false" style="background: #959595"> Connexion Standard</button>
  <button v-if="!pro" v-on:click="pro = true"> Connexion Professionelle</button>
  <button v-if="pro" v-on:click="pro = false" > Connexion Standard</button>
  <button v-if="pro" v-on:click="pro = true"  style="background: #959595"> Connexion Professionelle</button>
  
  <br>
  <form v-show="pro">
    <div style="text-align: center;">Cet espace est destiner est reserves aux professionelles qui souhaitent nous rejoindre pour optimiser au mieux l'expérience de nos utilisateurs. </div>
  </form>

  <form v-show="!pro">
    <div style="text-align: center;">Commencer à decouvrir des maintenant et sans limite !</div>
  </form>

</template>

<script>
export default {
  data () {
    return {
      pro: false
    }
  }
}
</script>

<style>
  form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
  label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    /* text-transform: uppercase; */
    letter-spacing: 1px;
    font-weight: bold;
  }
  input, select {
    background-color: withe;;
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    border-radius: 200px;
    border: 2px solid rgb(192, 150, 40);
    color: #959595;
  }
  input[type="checkbox"] {
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
  }
  .pill {
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #777;
    cursor: pointer;
  }
  button {
    background: white;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: black;
    border-radius: 200px;
    border: 2px solid rgb(192, 150, 40);
  }
  .submit {
    text-align: center;
  }
  .error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
  }
</style>