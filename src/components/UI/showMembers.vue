<template>
    <div id="app" v-if="showMembers">
        <!-- transition pour afficher la modal de la liste des membres -->
        <transition name="fade" appear>
            <div class="modal-overlay" v-if="showMembers"></div>
        </transition>
        <transition name="pop" appear>
            <!-- modal de la liste des membres
            -ajouter le back
            -retravailler le design si possible
             -->
             <div class="modalshowMembers">
                <div class="row">
                    <div class="col-12 text-end">
                        <font-awesome-icon class="plusCreateGroup" @click="showMembers = false;" icon="fa-solid fa-xmark" />
                    </div>
                </div>
                <h4 v-show="groupInformations?.members?.length > 0">Membres du groupe</h4>
                <div class="row mt-3" v-for="(member, index) in groupInformations.members" :key="index">
                    <div class="col-8 text-start">
                        <p>{{member.mail}}</p>
                    </div>
                    <div class="col-2">
                        <p class="status" :class="getStatus(index)">{{member.status}}</p>
                    </div>
                    <div class="col-2">
                        <font-awesome-icon class="trashIcon" @click="deleteMember(index)" icon="fa-solid fa-trash" />
                    </div>
                </div>
                <!-- bouton pour ajouter un membre à un groupe qui existe deja -->
                <div class="row">
                    <div class="col-12">
                        <h4>Ajouter un membre</h4>
                    </div>
                    <div class="col-12">
                        <input @blur="v$.mailMember.$touch" class="inputFormShowMembers" placeholder="exemple@exemple.com" type="text" v-model="mailMember" />
                        <div v-if="v$.mailMember.$error" class="text-danger">Incorrect email</div>
                    </div>
                    <div class="col-12">
                        <button class="buttonAddMembers" @click="addMember" >Ajouter un membre</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
  
<script>
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
export default {

    name: "createGroup",
    setup() {
        return { v$: useVuelidate() }
    },
    computed: {
        
    },
    methods: {
        getStatus(index) {
            return this.groupInformations.members[index].status;
        },
        update() {
            this.groupInformations = this.groups;
        },
        addMember() {
            if (this.v$.$invalid) {
                return;
            }
            this.v$.mailMember.$reset();
            this.groupInformations.members.push({ mail: this.mailMember, status: "pending" })
            this.mailMember = "";
        },
        sendMessage() {
            this.emitter?.emit("showMembers");
            this.showMembers = false;
        },
        deleteMember(index) {
            this.groupInformations.members.splice(index, 1);
        },
    },
    watch :{
        showMembers(){
        }
    },
    props: {
        groups: {
            type: Object,
            default: () => ({})
        },
    },
    created() {
        this.update();
    },
    data() {
        return {
            groupInformations: {
                name: "",
                members: [],
                photo: ""
            },
            mailMember: '',
            showMembers: true,
        }
    },
    validations() {
        return {
            mailMember: {
                required, email
            },
        }
    }
};
</script>

<style scoped>
.listMemberCard {
    height: 30px;
    background-color: #FFF;
    border-radius: 10px;
}
.plusCreateGroup {
    font-size: 2rem;
    color: #000;
    cursor: pointer;
}

.pending {
    border: 1px grey solid;
    background-color: #C4C4C4;
}

.denied {
    background-color: #FFBABA;
    border: 1px red solid;
}

.accepted {
    background-color: #B6FBB2;
    border: 1px green solid;
}

.status {
    border-radius: 1em;
}

.trashIcon {
    font-size: 1rem;
    color: red;
    cursor: pointer;
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
    background-color: #FFF;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    margin: auto;
    text-align: center;
    width: 40%;
    height: 80%;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transform: none;
}

/* create the same modal but with width and height at 100% if the media query is small */
@media screen and (max-width: 900px) {
    .modalshowMembers {
        width: 100%;
        height: 100%;
    }
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
    z-index: 999;
    background: #2c3e50;
    opacity: 0.6;
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