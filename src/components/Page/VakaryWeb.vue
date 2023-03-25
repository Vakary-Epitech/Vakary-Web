<template>
  <topBar :connected="false" />
  <main>
    <section class="section blue-bg text-center">
      <div class="section__content container orange-text">
        <div class="section__title">
          <h1>{{ $t("webPage.organize") }}</h1>
        </div>
        <div class="section__screenshots">
          <img src="@/assets/webPage/mapPresentation.png" alt="Screenshot of the map">
        </div>
      </div>
    </section>
    <section class="section grey-bg text-center">
      <div class="section__content container">
        <div class="section__title">
          <h1>{{ $t("webPage.waste") }}</h1>
          <h3>{{ $t("webPage.enjoy") }}</h3>
        </div>
        <div class="section__screenshots">
          <img src="@/assets/mobilePage/pointmap.png" alt="Screenshot of the map">
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
export default {
  name: 'vakaryWebPresentation',
  components: {
    TopBar,
  },
  data() {
    return {
      // creations du products ou on ajoute les cards avec leurs titres, images, ...
      products: [
        {
          title: 'Park',
          color: 'green',
          bgtext: 'PARC',
          src: require('@/assets/parc.jpg'),
          desc: 'Pour le côté Nature et découverte'
        },
        {
          title: 'Event',
          color: 'blue',
          bgtext: 'EVENEMENT',
          src: require('@/assets/marcheNoel.jpg'),
          desc: 'Pour les événements et fêtes',
          
        },
        {
          title: 'Museum',
          color: 'pink',
          bgtext: 'MUSEE',
          src: require('@/assets/musee.jpg'),
          desc: 'Pour la culture et histoire'
        }
      ],
      productsEn: [
        {
          title: 'Park & Garden',
          color: 'green',
          bgtext: 'PARC',
          src: require('@/assets/parc.jpg'),
          desc: 'For the Nature and discovery side'
        },
        {
          title: 'Evenement',
          color: 'blue',
          bgtext: 'EVENEMENT',
          src: require('@/assets/marcheNoel.jpg'),
          desc: 'For events and parties',
          
        },
        {
          title: 'Museum',
          color: 'pink',
          bgtext: 'MUSEE',
          src: require('@/assets/musee.jpg'),
          desc: 'For culture and history'
        }
      ]
    }
  },
  // créations de la méthode pour avec une fonction pour changer de page
  methods: {
    openVakaryHome() {
      this.$router.push("/vakaryHome");
    },
    geti18n() {
      return this.$i18n.locale;
    },
    seti18n(lang) {
      this.$i18n.locale = lang;
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