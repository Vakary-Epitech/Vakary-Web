<template>
    <div class="card" :style="cardStyle" :key="currentCardIndex" v-if="!endList && likedPOI.length < 7 && !skip"
        @mousedown="startDrag"
        @mousemove="dragCard"
        @mouseup="stopDrag">
        <div class="card-header">
            <div class="col-10">
                {{ cardsTest[currentCardIndex].name }}
            </div>
            <div class="col-2">
                {{ likedPOI.length }} / 7
            </div>
        </div>
        
        <div class="card-body" :class="{ expanded: expandedCardContent }" :style="{ backgroundImage: `url(${cardsTest[currentCardIndex].pic})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
            <div class="card-body-overlay"></div>
            <div class="card-body-content">
                <div class="row">
                    <div class="col-8">
                        <p class="ms-2"><i class="fa-regular fa-clock custom-size"></i>{{ cardsTest[currentCardIndex].sch }}</p>
                    </div>
                    <div class="col-4 text-end mt-2">
                        <button v-if="!expandedCardContent" @click="toggleCardContent" class="toggle-button me-2"><i class="fa-solid fa-info custom-size"></i></button>
                        <button v-if="expandedCardContent" @click="toggleCardContent" class="toggle-button me-2"><i class="fa-solid fa-arrow-down custom-size"></i></button>
                    </div>
                    <div class="col-12" v-if="expandedCardContent">
                        <p class="ms-2"><i class="fa-solid fa-euro-sign custom-size"></i>{{ cardsTest[currentCardIndex].price }}</p>
                        <p class="ms-2"><i class="fa-solid fa-circle-info custom-size"></i>{{ cardsTest[currentCardIndex].desc }}</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card-footer">
            <div class="row">
                <div class="col text-start">
                    <button @click="disliked()" class="button-custom"><i class="fa-solid fa-xmark fa-xl custom-size xmark-icon"></i></button>
                </div>
                <div class="col text-center">
                    <button @click="skip = true" class="button-custom"><i class="fa-solid fa-forward custom-size"></i></button>
                </div>   
                <div class="col text-end">
                    <button @click="liked()" class="button-custom"><i class="fa-solid fa-heart fa-xl custom-size heart-icon"></i></button>
                </div>
            </div>
        </div>
    </div>
    <div class="text-center" v-if="likedPOI.length ===  7 || skip">
        <loadingSpinner text="loadingSpin.loadingItinerary"/>
    </div>
    <div class="text-center" v-if="endList">
        <loadingSpinner text="loadingSpin.loadMore"/>
    </div>
</template>
  
<script>
import loadingSpinner from "../UI/loadingSpin.vue";
export default {
    props: {
      index: Number,
    },
    components: {
        loadingSpinner,
    },
    data() {
      return {
        cardsTest: [
            {
                name: "Parc Chappeau Rouge",
                pic: "https://upload.wikimedia.org/wikipedia/commons/7/74/Paris_parc_chapeau_rouge6.jpg",
                desc: "Le musée lorrain, au cœur de la Ville Vieille, témoigne de la remarquable vie artistique et culturelle régionale. Au sein du palais ducal, collections archéologiques et médiévales manifestent cet éclat au même titre que les toiles de Georges de La Tour et les gravures de Jacques Callot. Et dans l’ancien couvent des Cordeliers, des intérieurs lorrains reconstitués évoquent le cadre de la vie rurale en Lorraine au XIXème siècle. FERMETURE POUR RÉNOVATION Dans le cadre du projet de rénovation du Musée Lorrain - palais des ducs de Lorraine, les espaces d’exposition du palais ducal sont fermés au public. Seule l’église des Cordeliers reste ouverte à la visite.",
                sch: "Lundi-Vendredi : 10h-18h Samedi-Dimanche : 10h-19h Fermé le mardi et les 1er janvier, 1er mai, 1er novembre et 25 décembre. Fermeture des caisses 45 minutes avant la fermeture du musée.",
                price: "10€",
            },
            {
                name: "Tour Eiffel",
                pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/1200px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
                desc: "Découvrez Metz d'une façon originale et unique avec une balade sur notre bateau électro solaire. Chauffé ou climatisé selon les saisons, Il navigue sans bruit, pour votre plus grand plaisir. Nous vous ferons découvrir des paysages insoupçonnés. Trois environnements différents, la Moselle et ses bateaux marchands puis une partie beaucoup plus sauvage méconnue, même pour les messins, une faune et une flore variées tout au long de cette croisière. Enfin nous arriverons dans un environnement chargé d'histoire en plein cœur de Metz avec la Cathédrale Saint Etienne, le plan d'eau et les remparts, le Pont Moyen et le Temple neuf. 3 balades vous sont proposées : la Balade au fil de l'eau (départ à côté du Moyen-Pont, tous les jours à 14h30 et 16h00, sauf en cas de privatisation du bateau), le Repas au fil de l'eau (départ au 512 Promenade de la Goulotte à Longeville-lès-Metz) et l'Apéro'Boat (départ à côté du Moyen-Pont). Réservation par téléphone ou sur le site internet.",
                sch: "Lundi-Vendredi : 10h-18h Samedi-Dimanche : 10h-19h Fermé le mardi et les 1er janvier, 1er mai, 1er novembre et 25 décembre. Fermeture des caisses 45 minutes avant la fermeture du musée.",
                price: "Gratuit",
            },
            {
                name: "Parc Monceau",
                pic: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Parc_Monceau_20060812_35.jpg",
                desc: "Sensation forte, équilibre et sport, bienvenue au club motonautique de Thionville ! Le vent qui glisse sur votre visage, les gouttes d'eau qui explosent à votre passage, la rapidité de votre conducteur. Ou votre rapidité si vous êtes diplômé ! Ski nautique, Wakeboard, Wakesurf, Wakeskate ,kneeboard,bouée autant d'activités nautiques qui vous en feront voir de toutes les couleurs et vous donneront envie de revenir la session suivante pour toujours se dépasser ! Nous vous accueillons dans un cadre verdoyant et convivial pour des initiations avec nos pilotes et moniteurs.",
                sch: "Lundi-Vendredi : 10h-18h Samedi-Dimanche : 10h-19h Fermé le mardi et les 1er janvier, 1er mai, 1er novembre et 25 décembre. Fermeture des caisses 45 minutes avant la fermeture du musée.",
                price: "Gratuit",
            },
            {
                name: "Musée Rodin",
                pic: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Musee_Rodin.jpg",
                desc: "SITE FERMÉ EN 2023 POUR CAUSE DE TRAVAUX D'ENVERGURE. Dans son cadre de bois, elle compte les visiteurs passer. C’est la petite benjamine du groupe. Née à la fin du 18ème siècle, le pinceau a immortalisé son trait à tout jamais. Et quel pinceau ! Celui, délicat et émouvant, de la peintre officielle de la reine. La petite Louise Reine repense avec nostalgie à toute son enfance dans ce château. Son salon bleu, son salon rouge. Qu’elle y a couru dans ces escaliers de marbre. Combien de fois s’est-elle cachée derrière ces lourdes draperies ? Mais sa pièce préférée reste la bibliothèque. Ces murs rouge sang, ses milliers de livres parfaitement alignés. Cette cheminée monumentale où trônent les insignes familiaux. Ici elle pouvait rêver et vagabonder librement. Son esprit s’envolait dans ses lectures. Au loin, elle entend le doux son de la harpe qui résonne depuis le salon bleu. Les délicieuses odeurs de la cuisine chatouillent ses narines. Ça s’active là-bas. Elle adorait voir cuire les grosses marmites dans l’énorme conduit de cheminée. Venait ensuite le défilée des serveurs qui installaient délicatement les mets dans la grande salle à manger. On y trouve toute sorte de vaisselle ! Attention à ne rien casser Reinette, ne cessait de répéter sa maman. Le soleil entre dans la grande fenêtre. Le printemps arrive et déjà le buis reprend bel allure. Vous aussi vous pouvez marcher dans les pas de Louise Reine. Le château de la Grange se visite tous les jours à partir du weekend de Paques et jusqu’au 30 septembre.",
                sch: "Lundi-Vendredi : 10h-18h Samedi-Dimanche : 10h-19h Fermé le mardi et les 1er janvier, 1er mai, 1er novembre et 25 décembre. Fermeture des caisses 45 minutes avant la fermeture du musée.",
                price: "Gratuit",
            },            {
                name: "Parc Chappeau Rouge",
                pic: "https://upload.wikimedia.org/wikipedia/commons/7/74/Paris_parc_chapeau_rouge6.jpg",
                desc: "Le musée lorrain, au cœur de la Ville Vieille, témoigne de la remarquable vie artistique et culturelle régionale. Au sein du palais ducal, collections archéologiques et médiévales manifestent cet éclat au même titre que les toiles de Georges de La Tour et les gravures de Jacques Callot. Et dans l’ancien couvent des Cordeliers, des intérieurs lorrains reconstitués évoquent le cadre de la vie rurale en Lorraine au XIXème siècle. FERMETURE POUR RÉNOVATION Dans le cadre du projet de rénovation du Musée Lorrain - palais des ducs de Lorraine, les espaces d’exposition du palais ducal sont fermés au public. Seule l’église des Cordeliers reste ouverte à la visite.",
                sch: "Lundi-Vendredi : 10h-18h Samedi-Dimanche : 10h-19h Fermé le mardi et les 1er janvier, 1er mai, 1er novembre et 25 décembre. Fermeture des caisses 45 minutes avant la fermeture du musée.",
                price: "10€",
            },
            {
                name: "Tour Eiffel",
                pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/1200px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
                desc: "Découvrez Metz d'une façon originale et unique avec une balade sur notre bateau électro solaire. Chauffé ou climatisé selon les saisons, Il navigue sans bruit, pour votre plus grand plaisir. Nous vous ferons découvrir des paysages insoupçonnés. Trois environnements différents, la Moselle et ses bateaux marchands puis une partie beaucoup plus sauvage méconnue, même pour les messins, une faune et une flore variées tout au long de cette croisière. Enfin nous arriverons dans un environnement chargé d'histoire en plein cœur de Metz avec la Cathédrale Saint Etienne, le plan d'eau et les remparts, le Pont Moyen et le Temple neuf. 3 balades vous sont proposées : la Balade au fil de l'eau (départ à côté du Moyen-Pont, tous les jours à 14h30 et 16h00, sauf en cas de privatisation du bateau), le Repas au fil de l'eau (départ au 512 Promenade de la Goulotte à Longeville-lès-Metz) et l'Apéro'Boat (départ à côté du Moyen-Pont). Réservation par téléphone ou sur le site internet.",
                sch: "Lundi-Vendredi : 10h-18h Samedi-Dimanche : 10h-19h Fermé le mardi et les 1er janvier, 1er mai, 1er novembre et 25 décembre. Fermeture des caisses 45 minutes avant la fermeture du musée.",
                price: "Gratuit",
            },
            {
                name: "Parc Monceau",
                pic: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Parc_Monceau_20060812_35.jpg",
                desc: "Sensation forte, équilibre et sport, bienvenue au club motonautique de Thionville ! Le vent qui glisse sur votre visage, les gouttes d'eau qui explosent à votre passage, la rapidité de votre conducteur. Ou votre rapidité si vous êtes diplômé ! Ski nautique, Wakeboard, Wakesurf, Wakeskate ,kneeboard,bouée autant d'activités nautiques qui vous en feront voir de toutes les couleurs et vous donneront envie de revenir la session suivante pour toujours se dépasser ! Nous vous accueillons dans un cadre verdoyant et convivial pour des initiations avec nos pilotes et moniteurs.",
                sch: "Lundi-Vendredi : 10h-18h Samedi-Dimanche : 10h-19h Fermé le mardi et les 1er janvier, 1er mai, 1er novembre et 25 décembre. Fermeture des caisses 45 minutes avant la fermeture du musée.",
                price: "Gratuit",
            },
            {
                name: "Musée Rodin",
                pic: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Musee_Rodin.jpg",
                desc: "SITE FERMÉ EN 2023 POUR CAUSE DE TRAVAUX D'ENVERGURE. Dans son cadre de bois, elle compte les visiteurs passer. C’est la petite benjamine du groupe. Née à la fin du 18ème siècle, le pinceau a immortalisé son trait à tout jamais. Et quel pinceau ! Celui, délicat et émouvant, de la peintre officielle de la reine. La petite Louise Reine repense avec nostalgie à toute son enfance dans ce château. Son salon bleu, son salon rouge. Qu’elle y a couru dans ces escaliers de marbre. Combien de fois s’est-elle cachée derrière ces lourdes draperies ? Mais sa pièce préférée reste la bibliothèque. Ces murs rouge sang, ses milliers de livres parfaitement alignés. Cette cheminée monumentale où trônent les insignes familiaux. Ici elle pouvait rêver et vagabonder librement. Son esprit s’envolait dans ses lectures. Au loin, elle entend le doux son de la harpe qui résonne depuis le salon bleu. Les délicieuses odeurs de la cuisine chatouillent ses narines. Ça s’active là-bas. Elle adorait voir cuire les grosses marmites dans l’énorme conduit de cheminée. Venait ensuite le défilée des serveurs qui installaient délicatement les mets dans la grande salle à manger. On y trouve toute sorte de vaisselle ! Attention à ne rien casser Reinette, ne cessait de répéter sa maman. Le soleil entre dans la grande fenêtre. Le printemps arrive et déjà le buis reprend bel allure. Vous aussi vous pouvez marcher dans les pas de Louise Reine. Le château de la Grange se visite tous les jours à partir du weekend de Paques et jusqu’au 30 septembre.",
                sch: "Lundi-Vendredi : 10h-18h Samedi-Dimanche : 10h-19h Fermé le mardi et les 1er janvier, 1er mai, 1er novembre et 25 décembre. Fermeture des caisses 45 minutes avant la fermeture du musée.",
                price: "Gratuit",
            },            {
                name: "Parc Chappeau Rouge",
                pic: "https://upload.wikimedia.org/wikipedia/commons/7/74/Paris_parc_chapeau_rouge6.jpg",
                desc: "Le musée lorrain, au cœur de la Ville Vieille, témoigne de la remarquable vie artistique et culturelle régionale. Au sein du palais ducal, collections archéologiques et médiévales manifestent cet éclat au même titre que les toiles de Georges de La Tour et les gravures de Jacques Callot. Et dans l’ancien couvent des Cordeliers, des intérieurs lorrains reconstitués évoquent le cadre de la vie rurale en Lorraine au XIXème siècle. FERMETURE POUR RÉNOVATION Dans le cadre du projet de rénovation du Musée Lorrain - palais des ducs de Lorraine, les espaces d’exposition du palais ducal sont fermés au public. Seule l’église des Cordeliers reste ouverte à la visite.",
                sch: "Lundi-Vendredi : 10h-18h Samedi-Dimanche : 10h-19h Fermé le mardi et les 1er janvier, 1er mai, 1er novembre et 25 décembre. Fermeture des caisses 45 minutes avant la fermeture du musée.",
                price: "10€",
            },
            {
                name: "Tour Eiffel",
                pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/1200px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
                desc: "Découvrez Metz d'une façon originale et unique avec une balade sur notre bateau électro solaire. Chauffé ou climatisé selon les saisons, Il navigue sans bruit, pour votre plus grand plaisir. Nous vous ferons découvrir des paysages insoupçonnés. Trois environnements différents, la Moselle et ses bateaux marchands puis une partie beaucoup plus sauvage méconnue, même pour les messins, une faune et une flore variées tout au long de cette croisière. Enfin nous arriverons dans un environnement chargé d'histoire en plein cœur de Metz avec la Cathédrale Saint Etienne, le plan d'eau et les remparts, le Pont Moyen et le Temple neuf. 3 balades vous sont proposées : la Balade au fil de l'eau (départ à côté du Moyen-Pont, tous les jours à 14h30 et 16h00, sauf en cas de privatisation du bateau), le Repas au fil de l'eau (départ au 512 Promenade de la Goulotte à Longeville-lès-Metz) et l'Apéro'Boat (départ à côté du Moyen-Pont). Réservation par téléphone ou sur le site internet.",
                sch: "Lundi-Vendredi : 10h-18h Samedi-Dimanche : 10h-19h Fermé le mardi et les 1er janvier, 1er mai, 1er novembre et 25 décembre. Fermeture des caisses 45 minutes avant la fermeture du musée.",
                price: "Gratuit",
            },
            {
                name: "Parc Monceau",
                pic: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Parc_Monceau_20060812_35.jpg",
                desc: "Sensation forte, équilibre et sport, bienvenue au club motonautique de Thionville ! Le vent qui glisse sur votre visage, les gouttes d'eau qui explosent à votre passage, la rapidité de votre conducteur. Ou votre rapidité si vous êtes diplômé ! Ski nautique, Wakeboard, Wakesurf, Wakeskate ,kneeboard,bouée autant d'activités nautiques qui vous en feront voir de toutes les couleurs et vous donneront envie de revenir la session suivante pour toujours se dépasser ! Nous vous accueillons dans un cadre verdoyant et convivial pour des initiations avec nos pilotes et moniteurs.",
                sch: "Lundi-Vendredi : 10h-18h Samedi-Dimanche : 10h-19h Fermé le mardi et les 1er janvier, 1er mai, 1er novembre et 25 décembre. Fermeture des caisses 45 minutes avant la fermeture du musée.",
                price: "Gratuit",
            },
            {
                name: "Musée Rodin",
                pic: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Musee_Rodin.jpg",
                desc: "SITE FERMÉ EN 2023 POUR CAUSE DE TRAVAUX D'ENVERGURE. Dans son cadre de bois, elle compte les visiteurs passer. C’est la petite benjamine du groupe. Née à la fin du 18ème siècle, le pinceau a immortalisé son trait à tout jamais. Et quel pinceau ! Celui, délicat et émouvant, de la peintre officielle de la reine. La petite Louise Reine repense avec nostalgie à toute son enfance dans ce château. Son salon bleu, son salon rouge. Qu’elle y a couru dans ces escaliers de marbre. Combien de fois s’est-elle cachée derrière ces lourdes draperies ? Mais sa pièce préférée reste la bibliothèque. Ces murs rouge sang, ses milliers de livres parfaitement alignés. Cette cheminée monumentale où trônent les insignes familiaux. Ici elle pouvait rêver et vagabonder librement. Son esprit s’envolait dans ses lectures. Au loin, elle entend le doux son de la harpe qui résonne depuis le salon bleu. Les délicieuses odeurs de la cuisine chatouillent ses narines. Ça s’active là-bas. Elle adorait voir cuire les grosses marmites dans l’énorme conduit de cheminée. Venait ensuite le défilée des serveurs qui installaient délicatement les mets dans la grande salle à manger. On y trouve toute sorte de vaisselle ! Attention à ne rien casser Reinette, ne cessait de répéter sa maman. Le soleil entre dans la grande fenêtre. Le printemps arrive et déjà le buis reprend bel allure. Vous aussi vous pouvez marcher dans les pas de Louise Reine. Le château de la Grange se visite tous les jours à partir du weekend de Paques et jusqu’au 30 septembre.",
                sch: "Lundi-Vendredi : 10h-18h Samedi-Dimanche : 10h-19h Fermé le mardi et les 1er janvier, 1er mai, 1er novembre et 25 décembre. Fermeture des caisses 45 minutes avant la fermeture du musée.",
                price: "Gratuit",
            }
        ],
        skip: false,
        dragging: false,
        xOffset: 0,
        yOffset: 0,
        swiped: false,
        currentCardIndex: 0,
        likedPOI: [],
        endList: false,
        swipeThreshold: 100,
        initialX: 0,
        initialY: 0,
        expandedCardContent: false,
      };
    },
    computed: {
      cardStyle() {
        return {
            transform: `translate(${this.xOffset}px, ${this.yOffset}px)`,
            opacity: this.swiped ? 0 : 1,
        };
      },
    },
    methods: {
        liked() {
            this.xOffset = 500;
            this.swiped = true;
            setTimeout(() => {
                this.currentCardIndex === this.cardsTest.length - 1 ? this.endList = true : this.currentCardIndex++;
                this.xOffset = 0;
                this.swiped = false;
            }, 300);
            this.likedPOI.push(this.cardsTest[this.currentCardIndex]);
            if (this.likedPOI.length === 7) {
                // this.$store.commit("sendLikedPOI", { likedPOI: this.likedPOI }).catch((err) => {
                //     console.log(err);
                // })
            }
        },
        disliked() {  
            this.xOffset = -500;
            this.swiped = true;
            setTimeout(() => {
                this.currentCardIndex === this.cardsTest.length - 1 ? this.endList = true : this.currentCardIndex++;
                this.xOffset = 0;
                this.swiped = false;
            }, 300);
            if (this.endList) {
                // this.$store.dispatch("getNewCards").then(() => {
                //     this.endList = false;
                //     this.currentCardIndex = 0;
                //     this.cardsTest = this.$store.state.cards;
                // }).catch((err) => {
                //     console.log(err);
                // });
            }
        },
        toggleCardContent() {
            this.expandedCardContent = !this.expandedCardContent;
        },
        startDrag(event) {
            this.dragging = true;
            this.initialX = event.clientX;
            this.initialY = event.clientY;
            this.maxDragX = 500;
            this.maxDragY = 200;
        },
        dragCard(event) {
            if (this.dragging) {
                const offsetX = event.clientX - this.initialX;
                const offsetY = event.clientY - this.initialY;

                this.xOffset = Math.min(Math.max(offsetX, -this.maxDragX), this.maxDragX);
                this.yOffset = Math.min(Math.max(offsetY, -this.maxDragY), this.maxDragY);

                if (offsetX > this.maxDragX || offsetX < -this.maxDragX) {
                    this.stopDrag();
                }
            }
        },
        stopDrag() {
            if (this.dragging) {
                const swipeThreshold = 100;
                if (Math.abs(this.xOffset) > swipeThreshold) {
                    const swipeDirection = this.xOffset > 0 ? "right" : "left";
                    
                    this.handleSwipe(swipeDirection);
                }
                else {
                    this.resetCardPosition();
                }
                this.dragging = false;
            }
        },
        handleSwipe(direction) {
            if (direction === "right") {
                this.liked();
            } else if (direction === "left") {
                this.disliked();
            }
            this.resetCardPosition()
        },
        resetCardPosition() {
            this.xOffset = 0;
            this.yOffset = 0;
        }
    },
};
</script>
  
<style scoped>
.card {
    position: absolute;
    width: 30%;
    height: 80%;
    background-color: #fff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    cursor: grab;
    transition: transform 0.2s ease-out, opacity 0.3s ease-in-out;
}

.card-header {
    background-color: #fff;
    border: 0;
}

.card-footer {
    background-color: rgba(0, 0, 0, 0.04);
    border: 0;
}

.card-body {
    position: relative;
}

.card-body-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
}

.card-body-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 20%;
    height: auto;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-in-out;
    background-color: #fff;
}

.card-body.expanded .card-body-content {
    height: 50%;
    max-height: 500px;
    overflow: auto;
}

::-webkit-scrollbar {
  width: 0 !important;
}

.card:active {
    cursor: grabbing;
}

.button-custom {
    background-color: #fff;
    border: none;
    border-radius: 100%;
    padding: 10px;
    cursor: pointer;
}

.xmark-icon {
    color: green;
}

.heart-icon {
    color: red;
}

.toggle-button {
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 100%;
    padding: 10px;
    cursor: pointer;
}

.custom-size {
    width: 1.5rem;
}

</style>