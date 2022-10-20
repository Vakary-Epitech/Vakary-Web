<template>
  <div class="selectionContainer">
    <div class="selectionFrame">
      <img src="@/assets/Logo_vect.svg" class="logoSize elementBasicMargin elementHorizontalyCentered" />
      <b class="mediumTitle">Inscription</b>
      <div v-if="this.$route.params.type == 0" class="selectionDisplayForm">
        <label>Votre Nom:</label>
        <input required v-model="name" placeholder="ex: Martin">
        <label>Email:</label>
        <input required type="mail" v-model="email" placeholder="ex: martin@gmail.com">
        <label>Mot de passe:</label>
        <input required type="code" v-model="password" placeholder="********">
        <label>Confirmer le mot de passe:</label>
        <input required type="code" v-model="passwordConfirm" placeholder="********">
      </div>
      <div v-else class="selectionDisplayForm">
        <label>Nom Ville</label>
        <input required v-model="name">
        <label>Code Postal</label>
        <input required v-model="postalCode">
        <label>Mail</label>
        <input required v-model="email">
        <label>Mdp</label>
        <input required v-model="password">
        <label>MdpConfirm</label>
        <input required v-model="passwordConfirm">
      </div>
      <button @click="(confirmInscription)" class="basicVakaryButton elementBasicMargin">Confirm</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      postalCode: "",
    }
  },
  created() {
    this.typeOfInscription = this.$route.params.type;
  },
  methods: {
    confirmInscription() {
      this.$router.push("/vakaryHome");
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