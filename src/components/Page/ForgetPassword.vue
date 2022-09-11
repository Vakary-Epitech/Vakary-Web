<template>
    <div>Vous avez oublié votre mot de passe ? <br> Pas de panique ! Répondez à la question secrete de votre choix <br> et confirmez-nous votre adresse mail et nous vous permettrons <br> d´en créer un nouveau !</div>
    <br>
    <div>
      Repondez a la question de votre choix
        <select style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" v-model="selected">
          <option disabled value="">Questions</option>
          <option>Quel est le nom de votre animal de compagnie ?</option>
          <option>Quel est le nom de votre mère ?</option>
          <option>Quel est la marque de votre première voiture ?</option>
        </select>
        <br>
        Quel est votre reponse?
        <input v-model="answer"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="ex: Nancy"/>
        Quel est votre mail?
        <input v-model="email"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="Email"/>

        <button @click="(openLoginPage)">Revenir sur la page de connexion</button>
    </div>
 </template>
  
  <script>
  export default {
    methods: {
      openLoginPage() {
        this.$router.push("/loginPage");
      },

    },
    data () {
      return {
        pro: false,
        answer: '',
        email: '',
      }
    }
  }
  </script>
  
<style>

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