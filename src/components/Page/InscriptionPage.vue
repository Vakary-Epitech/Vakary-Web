<template>
  <div class="selectionContainer">
    <div class="selectionFrame">
      <img src="@/assets/Logo_vect.svg" class="logoSize elementBasicMargin elementHorizontalyCentered" />
      <b class="mediumTitle">Inscription</b>
      <div v-if="this.$route.params.type == 0" class="selectionDisplayForm">
        <label>Votre Nom:</label>
        <input required v-model="$store.state.userStore.username" placeholder="ex: Martin">
        <label>Email:</label>
        <input required type="mail" v-model="$store.state.userStore.mail" placeholder="ex: martin@gmail.com">
        <label>Mot de passe:</label>
        <input required type="password" v-model="password" placeholder="********">
        <label>Confirmer le mot de passe:</label>
        <input required type="password" v-model="passwordConfirm" placeholder="********">
        <label v-if="this.passwordAreNotTheSame" class="wrongInputText">Password are not the same</label>
      </div>
      <div v-else class="selectionDisplayForm">
        <label>Nom de la ville:</label>
        <input required v-model="$store.state.userStore.username" placeholder="ex: Nancy">
        <label>Code Postal:</label>
        <input required v-model="postalCode" placeholder="ex: 54000">
        <label>Email:</label>
        <input required v-model="$store.state.userStore.mail" placeholder="contact@destination-nancy.com">
        <label>Mot de passe:</label>
        <input required type="password" v-model="password" placeholder="********">
        <label>Confirmer le mot de passe:</label>
        <input required type="password" v-model="passwordConfirm" placeholder="********">
        <label v-if="this.passwordAreNotTheSame" class="wrongInputText">Password are not the same</label>
      </div>
      <button @click="(confirmInscription)" class="basicVakaryButton elementBasicMargin">Confirm</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      passwordConfirm: "",
      postalCode: "",
      passwordAreNotTheSame: false,
    }
  },
  created() {
    this.typeOfInscription = this.$route.params.type;
  },
  methods: {
    confirmInscription() {
      if (this.password == this.passwordConfirm) {
        this.$store.dispatch("checkIfAccountCanBeCreated", this.password).then(() => {
          this.$store.state.userStore.userIsLoggedIn = true;
          this.$router.push("/mapPage");
        }).catch(() => {
          this.$store.state.userStore.userIsLoggedIn = true;
          this.$router.push("/mapPage");
          this.userDontExist = true;
        })
      } else {
        this.passwordAreNotTheSame = true;
      }
    }
  }
}
</script>

<style scoped>
@import "@/components/Style/Button.scss";
@import "@/components/Style/Position.scss";

.selectionFrame {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border: 4px solid rgb(192, 150, 40);
  border-radius: 15px;
  padding: 5px;
  width: 450px;
  margin: auto 50px;
}

.selectionContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.selectionDisplayForm {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

label {
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
