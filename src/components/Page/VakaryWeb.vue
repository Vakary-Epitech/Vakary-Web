<template>
  <topBar :connected="false" />
  <main>
    <section class="section grey-bg text-center">
      <div class="section__content container">
        <div class="section__title">
          <h1>VAKARY</h1>
          <h2>Vos vacances selon vos envies</h2>
          <h3>VAKARY est aussi disponible sur votre smartphone !</h3>
        </div>
        <div class="section__screenshots">
          <img src="@/assets/mobilePage/default.png" alt="Screenshot of the home page of the VAKARY app">
        </div>
      </div>
    </section>
    <section class="section orange-bg text-center">
      <div class="section__content container">
        <div class="section__title">
          <h1>Dites-nous quelles sont vos hobbies et passions</h1>
        </div>
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4" v-for="product in products" :key="product.title">
            <Product  :product="product" />
          </div>
        </div>
      </div>
    </section>
    <section class="section blue-bg text-center">
      <div class="section__content container orange-text">
        <div class="section__title">
          <h1>Organisez votre journée à l'avance</h1>
        </div>
        <div class="section__screenshots">
          <img src="@/assets/webPage/mapPresentation.png" alt="Screenshot of">
        </div>
      </div>
    </section>
    <!-- <section class="section green-bg text-center">
      <div class="section__content container">
        <div class="section__title">
          <h1>Visite guidée</h1>
          <h3>Notre partenariat avec nos guides touristiques nous permettent d'avoir les meilleurs résumés</h3>
        </div>
        <div class="section__screenshots">
          <img src="@/assets/webPage/qrcode.jpeg" alt="Screenshot of the tour page of the VAKARY app">
        </div>
      </div>
    </section> -->
    <section class="section purple-bg text-center">
      <div class="section__content container">
        <div class="section__title">
          <h1>Découvrez les monuments les plus visités</h1>
        </div>
        <div class="section__screenshots">
          <img src="@/assets/webPage/parisPresentation.png" alt="Screenshot of the popular places page of the VAKARY app">
        </div>
      </div>
    </section>
    <section class="section yellow-bg text-center">
      <div class="section__content container">
        <div class="section__title">
          <h1>Et les moins connus</h1>
        </div>
        <div class="section__screenshots">
          <img src="@/assets/webPage/chateauPasConnu.png" alt="Screenshot of the lesser-known places page of the VAKARY app">
        </div>
      </div>
    </section>
    <section class="section grey-bg text-center">
      <div class="section__content container">
        <div class="section__title">
          <h1>QR Code</h1>
          <h3>Téléchargez directement notre application pour l'essayer</h3>
        </div>
        <div class="section__screenshots">
          <img src="@/assets/webPage/qrcode.jpeg" alt="Screenshot of the QR code for the VAKARY app">
        </div>
        <div class="section__screenshots">
          <img class="badges" src="@/assets/badges/google-play-badge.png" alt="Google Play badge">
          <img class="badges" src="@/assets/badges/app-store-badge.svg" alt="App Store badge">
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
  .section {
    padding: 5rem 0;
  }

  .section__title {
    margin-bottom: 3rem;
  }

  .section__screenshots {
    display: flex;
    justify-content: center;
  }

  .section__screenshots img {
    max-width: 100%;
    height: auto;
  }
</style>

<script>
import TopBar from '@/components/UI/TopBar';
import Product from '@/components/UI/Product';
export default {
  name: 'vakaryWebPresentation',
  components: {
    Product,
    TopBar,
  },
  data() {
    return {
      // creations du products ou on ajoute les cards avec leurs titres, images, ...
      products: [
        {
          title: 'Parc & Jardin',
          color: 'green',
          bgtext: 'PARC',
          src: require('@/assets/parc.jpg'),
          desc: 'Pour le côté Nature et découverte'
        },
        {
          title: 'Evenement',
          color: 'blue',
          bgtext: 'EVENEMENT',
          src: require('@/assets/marcheNoel.jpg'),
          desc: 'Profiter des événements temporaires'
        },
        {
          title: 'Musée',
          color: 'pink',
          bgtext: 'MUSEE',
          src: require('@/assets/musee.jpg'),
          desc: 'Pour la culture et histoire'
        }
      ]
    }
  },
  // créations de la méthode pour avec une fonction pour changer de page
  methods: {
    openVakaryHome() {
      this.$router.push("/vakaryHome");
    },
  },
};
</script>
  
<style scoped>

.products {
  display: flex;
  max-width: 1280px;
  padding: 25px;
  margin: 10 auto;
}


.orange-bg {
    background-color: #ecb61c;
}
.orange-text {
    color: #ecb61c;
}

.blue-bg {
  background-color: #1d1a38;
}

.blue-text {
  color: #1d1a38;
}
.light-blue-bg {
  background-color: #6d6c9a;
}

.light-blue-text {
  color: #6d6c9a;
}

.grey-bg {
  background-color: #e8e8e8;
}

.purple-bg {
  background-color: #6d6c9a;
}

.purple-text {
  color: #6d6c9a;
}

.green-bg {
  background-color: #00b894;
}

.green-text {
  color: #00b894;
}

.yellow-bg {
  background-color: #f9ca24;
}

.yellow-text {
  color: #f9ca24;
}


.image {
    width: 30vw;
    height: 100vh;
}
.qrcode {
    width: 20vw;
    height: auto;
}

.badges {
    width: 200px;
    height: auto;
}
.logo  {
    width: 150px;
    height: auto;
}
.screenshots {
    width: 20vw !important;
    height: auto !important;
}

.row {
    margin-right: 0 !important;
}

.section {
  padding: 5rem 0;
}
.section__title {
  margin-bottom: 3rem;
}
.section__screenshots {
  display: flex;
  justify-content: center;
}
.section__screenshots img {
  max-width: 100%;
  height: auto;
}


</style>