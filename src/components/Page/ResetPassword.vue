<template>
    <div>
        reset password:
        {{ $route.params.id }}
        <br />

        isTokenVerified:
        {{ this.isTokenVerified }}
        <br />
        <div v-if="isTokenVerified">
            <input type="text" class="form-control" v-model="password" placeholder="New password">
            <button @click="sendNewPassword">Send New Password</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isTokenVerified: false,
            password: "",
        }
    },
    mounted() {
        this.$store.dispatch("verifyTokenPasswordReset", this.$route.params.id).then(() => {
            this.isTokenVerified = true;
        });
    },
    methods: {
        sendNewPassword() {
            this.$store.dispatch("sendNewPassword", { password: this.password, token: this.$route.params.id }).then(() => {
                console.log("Password is reset")
                this.$router.push("/connexionPage");
            }).catch((error) => {
                console.log(error);
            });
        }
    },
}
</script>

<style scoped></style>