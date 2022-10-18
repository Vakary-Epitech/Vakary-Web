<template>
    <div id="app">
        <!-- transition pour afficher la modal de la création d'un nouveau groupe -->
        <transition name="fade" appear>
            <div class="modal-overlay" v-if="CreateGroup" @click="CreateGroup = false"></div>
        </transition>
        <!-- modal de la création de groupe
        -ajouter le back
        -modifier le design si besoin
         -->
        <transition name="pop" appear>
            <div class="modalCreateGroup" role="dialog" v-if="CreateGroup">
                <h1>Créer votre nouveau groupe</h1>
                <div>
                    <h4>Nom du groupe</h4>
                    <input placeholder="Vacances Famille" class="inputFormCreateGroupe" type="text" v-model="firstName" />
                </div>
                <div>
                    <h4>Adresse mail des membres</h4>
                    <input class="inputFormCreateGroupe" placeholder="exemple@exemple.com" type="text" @keydown.enter="addMembers" v-model="mailMember" />                    
                    <h6 v-for="member in listMembers" :key="member.mail">
                        {{member.mail}}
                    </h6>
                </div>
                <div>
                    <h4>Photo du groupe</h4>
                    <input type="file" accept="image/*" class="form-control-file"
                        @change="updatePhoto($event.target.name, $event.target.files)">
                </div>
                <br />
                <button @click="sendMessage" class="buttonSave">Sauvegarder</button>

            </div>
        </transition>
    </div>
</template>
  
<script>

export default {

    name: "createGroup",
    methods: {
        sendMessage() {
            this.emitter?.emit("modalshow");
            this.showModal = false;
        },
        addMembers() {
            this.listMembers.push({ mail: this.mailMember })
            this.mailMember = "";
        }
    },
    data() {
        return {
            CreateGroup: true,
            mailMember: "",
            firstName: "",
            listMembers: []
        }
    },
    updated() {
        console.log(this.mailMember)

    },

    watch: {
        mailMember(mail) {
            console.log(mail)
        }
    }
};
</script>

<style scoped>
.html {
    height: 100%;
    background: #FFF;
    color: #000;
}

body {
    min-height: 100%;
    margin: 0;
    display: grid;
    place-items: center;
}

.buttonSave {
    border: none;
    color: #FFF;
    background: #000642;
    appearance: none;
    font: inherit;
    font-size: 1.8rem;
    padding: .5em 1em;
    border-radius: .3em;
    cursor: pointer;
}

.inputFormCreateGroupe {
    border-color: #000642;
    border-radius: 5px;
    height: 20px;
    width: 70%;
    font-size: 10px;
}

.modalCreateGroup {
    position: absolute;
    position: fixed;
    background: #e4e4e4;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    text-align: center;
    width: 40%;
    height: 80%;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    z-index: 999;
    transform: none;
}
.modal-overlay {
    content: '';
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background: #2c3e50;
    opacity: 0.6;
    cursor: pointer;
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
    transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
    opacity: 0;
    transform: scale(0.3) translateY(-50%);
}
</style>