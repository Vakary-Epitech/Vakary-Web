<template>
    <div id="app" v-if="showMembers">
        <!-- transition pour afficher la modal de la liste des membres -->
        <transition name="fade" appear>
            <div class="modal-overlay"  @click="showMembers = false"></div>
        </transition>
        <transition name="pop" appear>
            <!-- modal de la liste des membres
            -ajouter le back
            -retravailler le design si possible
             -->
            <div class="modalshowMembers">
                <div>
                    <h4>Membres du groupe</h4>
                    <div class="parentMembers">
                            <span class="mailMembers">{{listMembers[0]}}</span>
                            <font-awesome-icon class="crossDeleteMembers" icon="fa-solid fa-xmark" />
                    </div>
                    <div class="parentMembers">
                            <span class="mailMembers">{{listMembers[1]}}</span>
                            <font-awesome-icon class="crossDeleteMembers" icon="fa-solid fa-xmark" />
                    </div>
                    <div class="parentMembers">
                            <span class="mailMembers">{{listMembers[2]}}</span>
                            <font-awesome-icon class="crossDeleteMembers" icon="fa-solid fa-xmark" />
                    </div>
                    <div class="parentMembers">
                            <span class="mailMembers">{{listMembers[3]}}</span>
                            <font-awesome-icon class="crossDeleteMembers" icon="fa-solid fa-xmark" />
                    </div>
                    <div>
                        <div>
                            <button @click="addMember = true" class="buttonAddMembers" >Ajouter un membre</button>
                        </div>
                    </div>
                    <!-- bouton pour ajouter un membre à un groupe qui existe deja -->
                    <div v-if="addMember">
                        <h4>Ajouter un membre</h4>
                        <input class="inputFormShowMembers" placeholder="exemple@exemple.com" type="text" v-model="mailMember" />
                        <button @click="addMember = false" accesskey="s">sauvegarder</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
  
<script>

export default {

    name: "createGroup",
    methods: {
        sendMessage() {
            this.emitter?.emit("showMembers");
            this.showMembers = false;
        }
    },
    watch :{
        showMembers(){
            console.log(this.showMembers)
        }
    },
    data() {
        return {
            showMembers: true,
            addMember: false,
            listMembers: ['exemple.exemple@epitech.eu', 'test.test@epitech.eu', 'membre.membre@epitech.eu', 'temporaire.temporaire@epitech.eu']
        }
    },
};
</script>

<style scoped>
.html {
    height: 100%;
    background: #FFF;
    color: #000;
    /* font-size: 62.5%; */
}

.parent {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}

.listMemberCard {
    height: 30px;
    background-color: #FFF;
    border-radius: 10px;
}

.buttonAddMembers {
    border: none;
    color: #FFF;
    background: #000642;
    margin-top: 20px;
    appearance: none;
    font: inherit;
    font-size: 0.7rem;
    padding: .5em 1em;
    border-radius: .3em;
    cursor: pointer;
}

.parentMembers {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(9, 1fr);
    margin-top: 5px;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    height: 30px;
    background-color: #FFF;
    border-radius: 10px;
}

.mailMembers {
    grid-area: 1 / 2 / 2 / 5;
}

.crossDeleteMembers {
    grid-area: 1 / 9 / 2 / 10;
}

body {
    min-height: 100%;
    margin: 0;
    display: grid;
    place-items: center;
    /* font-size: 1.4rem; */
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

.inputFormShowMembers {
    border-color: #000642;
    border-radius: 5px;
    height: 20px;
    width: 70%;
    font-size: 10px;
}

.modalshowMembers {
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
    height: 65%;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    z-index: 999;
    transform: none;
}

/* .modal h1 {
    margin: 0 0 1rem;
} */

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