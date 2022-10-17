<template>
  <div class="forgetPassword">
    <span>Vous avez oublié votre mot de passe ? <br> Pas de panique ! Répondez à la question secrete de votre choix <br> et confirmez-nous votre adresse mail et nous vous permettrons <br> d´en créer un nouveau !</span>
    <span>
      Repondez a la question de votre choix
        <select class="inputForgetPassword" v-model="selected">
          <option disabled value="">Questions</option>
          <option>Quel est le nom de votre animal de compagnie ?</option>
          <option>Quel est le nom de votre mère ?</option>
          <option>Quel est la marque de votre première voiture ?</option>
        </select>
        Quel est votre reponse?
        <input class="inputForgetPassword" v-model="mysteryQuestionAnswer" placeholder="ex: Nancy"/>
        Quel est votre mail?
        <input v-model="email" placeholder="Email"/>
        <button class="inputForgetPassword" @click="(openLoginPage)">Revenir sur la page de connexion</button>
    </span>
  </div>
</template>

  
  <script>
  export default {
    data () {
      return {
        mysteryQuestionAnswer: '',
        email: '',
      }
    },
    methods: {
      openLoginPage() {
        this.$router.push("/loginPage");
      },
    },
  }
  </script>
  
<style>

button {
    background: white;
    background-color: white;
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

.inputForgetPassword {
  width: 20%; 
  text-align: center; 
  align-items: center; 
  margin-left: 40%;
}

.forgetPassword {
  display: flex;
  flex-direction: column;
  background-color: var(--background-color-primary);
  align-items: center;
  text-align: center;
}

.forgetPassword button {
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


.forgetPassword input {
  background-color: var(--background-color-secondary);
  border-color: var(--text-primary-color);
  margin: 10px auto;
}

.forgetPassword span {
  color: var(--text-primary-color);
}


</style>