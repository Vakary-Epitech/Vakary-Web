<template>
    <div id="app">

        <!-- boutton pour changer de page -->
      <button @click="(openVakaryHome)">Vakary Home</button>
      
      <!-- début de l'html/css pour la création de la page Web de Vakary -->
      <h1 class="VakaryTitle">VAKARY</h1>
      <h3 class="Subtitle">Vos vacances selon vos envies</h3>
      <img class="action" :src="require('./../assets/presentation_vakary.png')" />
      <h2 class="Title">Dites nous quelles sont vos hobbies et passions parmis nos nombreuses propositions</h2>
      
      <!-- utilisation du component product, dans le but d'afficher les 3 cards dans la page -->
      <section class="products">
        <Product v-for="product in products" :key="product.title" :product="product" />
      </section>
      <h1 class="Title">Organisé votre journée à l'avance sur notre application web</h1>
      <img class="action" :src="require('./../assets/mapPresentation.png')" />
      <div>
        <div class="parentVakaryWeb">
          <h1 class="leftTitleVakaryWeb">Ne perdez plus de temps</h1>
          <img class="rightPhoneVakaryWeb" :src="require('./../assets/telMap.png')" />
          <h3 class="leftSubtitleVakaryWeb">Profitez de votre journée avec notre itinéraire personnalisé</h3>
        </div>
        <div class="parentVakaryWeb">
          <h1 class="rightTitleVakaryWeb">Visite guidée</h1>
          <img class="leftPhoneVakaryWeb" :src="require('./../assets/telPlaceStan.png')" />
          <h3 class="rightSubtitleVakaryWeb">Notre partenariat avec nos guides touristiques nous permettent d'avoir les meilleurs
            résumés</h3>
        </div>
      </div>
      <h1 class="Title">Découvrez les monuments les plus visités</h1>
      <img class="action" :src="require('./../assets/parisPresentation.png')" />
      <h1 class="Title">Et les moins connus</h1>
      <img class="action" :src="require('./../assets/chateauPasConnu.png')" />
      <div class="parentQrCodeVakaryWeb">
        <h1 class="rightTitleQrCodeVakaryWeb">QR Code</h1>
        <img class="leftQrCodeVakaryWeb" :src="require('./../assets/qrcode.jpeg')" />
        <h3 class="rightSubtitleVakaryWeb">Téléchargez directement notre application pour l'essayer</h3>
      </div>
    </div>
  </template>
  
  <script>
import Product from './Product';
  export default {
    name: 'vakaryWebPresentation',
    components: {
      Product
    },
    data() {
      return {
        // creations du products ou on ajoute les cards avec leurs titres, images, ...
        products: [
          {
            title: 'Parc & Jardin',
            color: 'green',
            bgtext: 'PARC',
            src: require('./../assets/parc.jpg'),
            desc: 'Pour le côté Nature et découverte'
          },
          {
            title: 'Evenement',
            color: 'blue',
            bgtext: 'EVENEMENT',
            src: require('./../assets/marcheNoel.jpg'),
            desc: 'Profiter des événements temporaires'
          },
          {
            title: 'Musée',
            color: 'pink',
            bgtext: 'MUSEE',
            src: require('./../assets/musee.jpg'),
            desc: 'Pour la culture et histoire'
          }
        ]
      }
    },
    // créations de la méthode pour avec une fonction pour changer de page
    methods: {
      openVakaryHome() {
        this.$router.push("/VakaryHome");
      },
    },
  };
  </script>
  
  <style lang="css">
  
  .products {
    display: flex;
    max-width: 1280px;
    padding: 25px;
    margin: 10 auto;
  }
  
  .action {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .Subtitle {
    color: #888888;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .VakaryTitle {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #BA7F08;
  }
  .Title {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
  }

.parentVakaryWeb {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: black;
}

.parentQrCodeVakaryWeb {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.rightPhoneVakaryWeb {
  grid-area: 1 / 7 / 5 / 8;
  max-width: 300px;
  margin-top: 20px;
}

.rightTitleVakaryWeb {
  grid-area: 2 / 5 / 3 / 9;
  color: white;
}

.rightTitleQrCodeVakaryWeb {
  grid-area: 2 / 5 / 3 / 9;
}

.rightSubtitleVakaryWeb {
  grid-area: 3 / 5 / 5 / 9;

  color: #888888;
}

.leftTitleVakaryWeb {
  grid-area: 2 / 2 / 3 / 6;
  color: white;
  margin-top: 20px;
}

.leftSubtitleVakaryWeb {
  grid-area: 3 / 2 / 4 / 7;
  color: #888888;
  margin-top: 20px;
}

.leftPhoneVakaryWeb {
  grid-area: 1 / 2 / 5 / 5;
  max-width: 300px;
}

.leftQrCodeVakaryWeb {
  grid-area: 1 / 2 / 5 / 5;
  max-width: 300px;
}

</style>