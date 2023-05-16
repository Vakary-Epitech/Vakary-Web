<template>
    <div class="background">
        <img @click="changeLanguage()" class="buttonLanguage" :src="geti18n() == 'en' ? require('@/assets/badges/flags/french-flag.svg') : require('@/assets/badges/flags/gb-flag.svg')">
        <div class="centered-svg">
        <img src="@/assets/logo_long_vect.svg">
        </div>
        <div class="card mx-auto my-auto mt-3">
            <div class="card-header">
                <h4 class="text-center mt-3">{{ $t("resetPassword.title")}}</h4>
            </div>
            <div v-if="this.isTokenVerified" class="card-body row">
                <div v-if="errorPassword">
                    <p class="wrongID text-center">
                        <span class="bold">
                            {{ $t("resetPassword.errors.password")}}
                        </span>
                        <br>
                        <span>
                            {{ $t("resetPassword.errors.messagePassword")}}
                        </span>
                    </p>
                </div>
                <div v-else-if="error">
                    <p class="wrongID text-center">
                        <span class="bold">
                            {{ $t("resetPassword.errors.error")}}
                        </span>
                        <br>
                        <span>
                            {{ $t("resetPassword.errors.messageError")}}
                        </span>
                    </p>
                </div>
                <div class="my-2">
                    <input class="form-control" type="password" autocomplete="new-password" v-model="newPassword"
                    :placeholder="$t('forgetPassword.placeholders.password')">
                </div>
                <div>
                    <button @click="(sendNewPassword)" class="btn newButton text-center">{{ $t("resetPassword.button")}}</button>
                </div>
            </div>
            <div v-else>
                <div>
                    <p class="wrongID text-center">
                        <span class="bold">
                            {{ $t("resetPassword.errors.error")}}
                        </span>
                        <br>
                        <span>
                            {{ $t("resetPassword.errors.messageError")}}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isTokenVerified: true,
            newPassword: "",
            errorPassword: false,
            error: false,
        }
    },
    mounted() {
        this.$store.dispatch("verifyTokenPasswordReset", this.$route?.params?.id).then(() => {
            this.isTokenVerified = true;
        });
    },
    methods: {
        isValidPassword(password) {
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])?[a-zA-Z\d\W_]{8,}$/;
            return re.test(String(password));
        },
        sendNewPassword() {
            if (!this.isValidPassword(this.newPassword)) {
                this.errorPassword = true;
                return;
            }
            this.errorPassword = false;
            this.$store.dispatch("sendNewPassword", { password: this.newPassword, token: this.$route.params.id }).then(() => {
                this.$router.push("/connexionPage");
            }).catch((error) => {
                this.error = true;
                console.log(error);
            });
        },
        geti18n() {
            return this.$i18n.locale;
        },
        changeLanguage() {
            if (this.geti18n() == "en") {
                this.$i18n.locale = "fr";
            } else {
                this.$i18n.locale = "en";
            }
        }
    },
}
</script>

<style scoped lang="scss">
.bold {
  font-weight: 600;
}


.wrongID {
  background-color: #FFE4E1;
  padding: 5px;
  border: 1px solid #dd3c10;
}

.buttonLanguage {
  cursor: pointer;
  border-radius: 6px;
  width: 30px;
  right: 20px;
  position: fixed; 
  top: 20px; 
  z-index: 2;  
}

input {
  border: 1px solid rgb(192, 150, 40);
  height: 40px;
}

.background {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #f0f2f5;
}

.centered-svg {
  display: block;
  margin: 5% auto 10px;
  width: 300px;
}

.card {
  background-color: #fff;
  min-width: 300px;
  max-width: 400px;
  position: relative;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

</style>