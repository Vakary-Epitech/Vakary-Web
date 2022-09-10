<!-- <template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" :key="this.$route.path"></component>
      </transition>
    </router-view>
    <button @click="(openLandingPage)">Landing</button>
    <button @click="(openLoginPage)">Login</button>
    <button @click="(openMapPage)">Map</button>
  </div>
</template>

<script>
export default {
  beforeCreate() {
      this.$router.push("/");
  },
  methods: {
    openLandingPage() {
      this.$router.push("/");
    },
    openLoginPage() {
      this.$router.push("/loginPage");
    },
    openMapPage() {
      this.$router.push("/mapPage");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->

<template>
  <div id="app">
    <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component" :key="this.$route.path"></component>
        </transition>
      </router-view>
    <button @click="(openVakaryHome)">Vakary</button>
    <!-- <h1 class="center">VAKARY</h1>
    <h3 class="center">Vos vacances selon vos envies</h3>
    <button class="center">Inscription</button>
    <img class="action" :src="require('./assets/presentation_vakary.png')" />
    <h3 class="center">Dites nous quelles sont vos hobbies et passions parmis nos nombreuses propositions</h3>
    <section class="products">
      <Product v-for="product in products" :key="product.title" :product="product" />
    </section>
    <h3 class="center">Organisé votre journée à l'avance sur notre application web</h3>
    <img class="action" :src="require('./assets/mapPresentation.png')" />
    <div>
      <div class="test">
        <img class="telleft" :src="require('./assets/telMap.png')" />
        <h1 class="whitetext">Ne perdez plus de temps</h1><br />
        <h3 class="sous-titre">Profitez de votre journée avec notre itinéraire personnalisé</h3><br />
      </div>
      <div class="test">
        <h1 class="whitetext">Visite guidée</h1>
        <h3 class="sous-titre">Notre partenariat avec nos guides touristiques nous permettent d'avoir les meilleurs
          résumés</h3>
        <img class="telright" :src="require('./assets/telPlaceStan.png')" />
      </div>
    </div>
    <h1 class="center">Découvrez les monuments les plus visités</h1>
    <img class="action" :src="require('./assets/parisPresentation.png')" /><br /><br /><br />
    <h1 class="center">Et les moins connus</h1>
    <img class="action" :src="require('./assets/chateauPasConnu.png')" />
    <div>
      <img class="qrcode" :src="require('./assets/qrcode.jpeg')" />
      <h1>QR Code</h1>
      <h3 class="sous-titre">Téléchargez directement notre application pour l'essayer</h3>
    </div> -->
  </div>
</template>

<script>
import Product from './components/Product';
export default {
  name: 'app',
  components: {
    Product
  },
  data() {
    return {
      products: [
        {
          title: 'Parc & Jardin',
          color: 'green',
          bgtext: 'PARC',
          src: require('./assets/parc.jpg'),
          desc: 'Pour le côté Nature et découverte'
        },
        {
          title: 'Evenement',
          color: 'blue',
          bgtext: 'EVENEMENT',
          src: require('./assets/marcheNoel.jpg'),
          desc: 'Profiter des événements temporaires'
        },
        {
          title: 'Musée',
          color: 'pink',
          bgtext: 'MUSEE',
          src: require('./assets/musee.jpg'),
          desc: 'Pour la culture et histoire'
        }
      ]
    }
  },
  methods: {
    openVakaryHome() {
      this.$router.push("/VakaryHome");
    },
  },
};
</script>

<style lang="css">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'montseratt', sans-serif;
}

main {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #EEE;
  display: flex;
  justify-content: center;
  align-items: center;
}

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

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.telright {
  float: right;
  height: 100vh;
  margin: 0 15px 15px 0;
}

.telleft {
  float: left;
  height: 100vh;
  margin: 0 15px 15px 0;
}

.test {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
}

.whitetext {
  color: white;
}

.sous-titre {
  color: #888888;
}

.qrcode {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
}
</style>