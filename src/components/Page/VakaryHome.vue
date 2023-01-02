<template>
  <div id="app">
    <topBar class="col-12" :connected="true"/>
    <div class="containerTitle">
      <h1 class="title">Prêt à découvrir votre monde ?</h1>
      <img class="planete" :src="require('@/assets/terre.gif')" />
    </div>
    <div class="parentVakaryHome">
      <h1 class="leftTitleVakaryHome">Explorer sans limite selon vos envies</h1>
      <img class="rightPicture" :src="require('@/assets/Paris8k.jpeg')" />
      <h3 class="leftSubtitleVakaryHome">
        Vakary, c'est l'outil parfait pour maximiser l'expérience touristique
        urbaine en réduisant au maximum votre temps de préparation d'un séjour.
      </h3>
    </div>
    <div class="parentVakaryHome">
      <h1 class="rightTitleVakaryHome">Préparer votre sejour</h1>
      <img class="sizeMax" :src="require('@/assets/webPage/mapPresentation.png')" />
      <h3 class="rightSubtitleVakaryHome">
        Vakary vous donne un aperçu complet de ce que vous pouvez explorer avant
        même d'y être !
      </h3>
    </div>
    <div class="parentVakaryHome">
      <h1 class="leftTitleVakaryHome">Foncez tête baissée !!</h1>
      <img class="sizeMaxTel" :src="require('@/assets/webPage/telMap.png')" />
      <h3 class="leftSubtitleVakaryHome">
        Peut importe où vous êtes, créez un itinéraire qui vous ressemble en
        quelque click !
      </h3>
    </div>
    <div class="containerHome">
        <h1>Nous avons pensez à tout</h1>
        <h3>
          Vous trouverez toujours une activitée à faire, même si vous pensiez
          avoir fait le tour
        </h3>
    </div>
  </div>
  <div class="parentVakaryHome">
      <h1 class="leftTitleVakaryHome">Créez votre goupe</h1>
      <img class="sizeMaxTel" :src="require('@/assets/telProfil.png')" />
      <h3 class="leftSubtitleVakaryHome">
        Partager tous avec les personnes qui participe à votre expéditions.
      </h3>
    </div>
    <div class="parentVakaryHome">
      <h1 class="leftTitleVakaryHome">Partagez votre experience</h1>
      <img class="sizeMaxTel" :src="require('@/assets/telProfil.png')" />
      <h3 class="leftSubtitleVakaryHome">
        Donnez votre expérience sur chaque point d’intérêt pour aider la communauté.
      </h3>
    </div>
    <div class="parentVakaryHome">
      <h1 class="leftTitleVakaryHome">Rejoignez la communauté VIP</h1>
      <img class="sizeMaxTel" :src="require('@/assets/logoVIP.jpeg')" />
      <h3 class="leftSubtitleVakaryHome">
        Vos itinéraire seront travailler par des professionnels avec leurs avis et leurs recommendations 
      </h3>
    </div>
</template>

<script>
import TopBar from '@/components/UI/TopBar';
export default {
  name: "vakaryHome",
  components: {
    TopBar,
  },
  // créations de la méthode pour avec une fonction pour changer de page
  methods: {
    openVakaryWeb() {
      this.$router.push("/VakaryWeb");
    },
    openGroup() {
      this.$router.push("/Group");
    },
  },
};
</script>

<style scoped>

.sizeMax {
  width: 550px;
  grid-area: 1 / 1 / 5 / 5;
}

.sizeMaxTel {
  width: 200px;
  grid-area: 1 / 7 / 5 / 8;
}

.title {
  color: #C09628;
  grid-area: 2 / 3 / 3 / 8;
}

.planete {
  grid-area: 4 / 4 / 6 / 6;
  width: 500px;
}

.parentVakaryHome {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.leftTitleVakaryHome {
  grid-area: 2 / 2 / 3 / 6;
  color: black;
}

.rightPicture {
  grid-area: 2 / 7 / 4 / 8;
}

.leftSubtitleVakaryHome {
  grid-area: 3 / 2 / 4 / 6;
  color: #888888;
}

.rightTitleVakaryHome {
  grid-area: 2 / 5 / 3 / 9;
  color: black;
}

.rightSubtitleVakaryHome {
  grid-area: 3 / 5 / 5 / 9;
  color: #888888;
}

.containerTitle {
  background-color: black;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.containerHome {
  background-color: red;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>