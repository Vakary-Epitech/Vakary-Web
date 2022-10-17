<template>
    <div class="settings">
        <div>Paramètres</div>
        <theme-button />
        <button @click="showChange = 1">Changer votre nom d'utilisateur</button>
        <input v-if="showChange === 1" v-model="text">
        <div>Jyzo</div>
        <button @click="showChange = 2">Changer votre mot de passe</button>
        <input v-if="showChange === 2" v-model="text">
        <button>Deconnexion</button>
    </div>
</template>

<script>
import themeButton from "../Theme/ThemeButton.vue";
export default {
    data() {
        return {
            showChange: 0,
            changeUsername: 0,
            changePassword: 0,
        }
    },
    components: { themeButton },
};
</script>

<style>
:root {
    --background-color-primary: white;
    --accent-color: #cacaca;
    --text-primary-color: #222;
}

:root.dark-theme {
    --background-color-primary: #504e4e;
    --accent-color: #5d5c5c;
    --text-primary-color: #ddd;
}

.settings {
    display: flex;
    flex-direction: column;
    background-color: var(--background-color-primary);
    align-items: center;
    text-align: center;
}

.settings button {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    background: white;
    margin: 10px auto;
    border: 0;
    color: black;
    background-color: var(--background-color-secondary);
    color: var(--text-primary-color);
    border: 2px solid rgb(192, 150, 40);
    border-radius: 20px;
}

.settings div {
    color: var(--text-primary-color);
    margin: 10px auto;
}

.settings input {
    background-color: var(--background-color-secondary);
    border-color: var(--text-primary-color);
    margin: 10px auto;
}
</style>