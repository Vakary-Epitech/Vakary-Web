<template>
    <img data-bs-toggle="modal" data-bs-target="#exampleModal" class="button-language" :src="currentFlag"/>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ $t("languagesModal.selectLanguage") }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-for="pair in getPair()" :key="pair.id" class="row">
                        <div class="col-6">
                            <button @click="setLanguage(pair[0])" class="btn btn-language"><img class="me-2 flags-language" :src="pair[0]?.img" alt="pair[0].name"/>{{ pair[0]?.name }}</button>
                        </div>
                        <div class="col-6" v-if="pair[1]">
                            <button @click="setLanguage(pair[1])" class="btn btn-language"><img class="me-2 flags-language" :src="pair[1]?.img" alt="pair[1].name"/>{{ pair[1]?.name }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false,
            languages: [
                { code: "en", name: 'English', img: require('@/assets/badges/en/flag.svg') },
                { code: "fr", name: 'Français', img: require('@/assets/badges/fr/flag.svg') },
                { code: "de", name: 'Deutsch', img: require('@/assets/badges/de/flag.svg') },
                { code: "es", name: 'Español', img: require('@/assets/badges/es/flag.svg') },
            ],
            currentLanguage: this.$i18n.locale,
            currentFlag: null
        };
    },
    created() {
        this.getCurrentLanguage();
    },
    methods: {
        getCurrentLanguage() {
            this.currentLanguage = this.$i18n.locale;
            switch (this.currentLanguage) {
                case 'en':
                    this.currentFlag = require('@/assets/badges/en/flag.svg');
                    break;
                case 'fr':
                    this.currentFlag = require('@/assets/badges/fr/flag.svg');
                    break;
                case 'de':
                    this.currentFlag = require('@/assets/badges/de/flag.svg');
                    break;
                case 'es':
                    this.currentFlag = require('@/assets/badges/es/flag.svg');
                    break;
                default:
                    this.currentFlag = require('@/assets/badges/en/flag.svg');
                    break;
            }
        },
        setLanguage(language) {
            this.$i18n.locale = language.code;
            this.getCurrentLanguage();
        },
        getPair() {
            let pair = [];
            for (let i = 0; i < this.languages.length; i += 2) {
                if (this.languages.length % 2 === 1 && i === this.languages.length - 1) {
                    pair.push([this.languages[i], null]);
                    break;
                }
                pair.push([this.languages[i], this.languages[i + 1]]);
            }
            return pair;
        }
    }
};

</script>

<style scoped>

.button-language {
  cursor: pointer;
  border-radius: 6px;
  width: 30px;
  right: 90px;
  position: fixed; 
  top: 20px; 
  z-index: 2;  
}

.btn-language {
    width: 100%;
    border-radius: 6px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    padding: 10px 20px;
    margin-bottom: 10px;
}

.btn-language:hover {
    background-color: #e5e5e5;
}

.flags-language {
    width: 30px;
    height: 30px;
    border-radius: 6px;
}

</style>