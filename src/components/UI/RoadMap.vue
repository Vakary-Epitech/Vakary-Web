<template>
    <div class="timeline">
        <div class="container left">
            <div class="date">30 JUN 2023</div>
            <i class="icon fa fa-check"></i>
            <div class="content">
                <h2>Sortie de la bêta Vakary</h2>
                <p>
                    La bêta Vakary est devenu disponible est ouverte au public, permettant aux utilisateurs
                    au travers de la plateforme Web de créer un itinéraire ainsi que de le partager
                </p>
            </div>
        </div>
        <div class="container right">
            <div class="date">1 SEP 2023</div>
            <i class="icon fa fa-check"></i>
            <div class="content">
                <h2>Correction et amélioration</h2>
                <p>
                    Vakary vous a écouté et s'améliore grâce au retour de ses bêta-testeurs !
                </p>
            </div>
        </div>
        <div class="container left">
            <div class="date">30 NOV 2023</div>
            <i class="icon fa fa-heart"></i>
            <div class="content">
                <h2>Ajout de la sauvegarde des préfèrences</h2>
                <p>
                    Vakary vous permettra de renseigner vos préférences de point d'intérêt dans votre profil. Ainsi
                    vous n'aurez plus besoin à chaque fois de sélectionner vos préférences.
                </p>
            </div>
        </div>
        <div class="container right">
            <div class="date">30 DEC 2023</div>
            <i class="icon fa fa-magnifying-glass"></i>
            <div class="content">
                <h2>Ajout de la visite des profils Vakary</h2>
                <p>
                    Vous pourrez visiter les profils des autres utilisateurs et ainsi voir ce que vos amis préférés visiter.
                </p>
            </div>
        </div>
        <div class="container left">
            <div class="date">30 JAN 2024</div>
            <i class="icon fa fa-user"></i>
            <div class="content">
                <h2>Communication et Business</h2>
                <p>
                    Vakary a pour objectif de s'étendre donc nos réseaux sociaux deviendront beaucoup plus actifs.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {

    },
}
</script>

<style scoped>
*,
*::before,
*::after {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: #ffffff;
}

.timeline {
    position: relative;
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
    padding: 15px 0;
}

.timeline::after {
    content: '';
    position: absolute;
    width: 2px;
    background: rgb(192, 150, 40);
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -1px;
}

.container {
    padding: 15px 30px;
    position: relative;
    background: inherit;
    width: 50%;
}

.container.left {
    left: -25%;
}

.container.right {
    left: 25%;
}

.container::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    top: calc(50% - 8px);
    right: -8px;
    background: #ffffff;
    border: 2px solid rgb(192, 150, 40);
    border-radius: 16px;
    z-index: 1;
}

.container.right::after {
    left: -8px;
}

.container::before {
    content: '';
    position: absolute;
    width: 50px;
    height: 2px;
    top: calc(50% - 1px);
    right: 8px;
    background: rgb(192, 150, 40);
    z-index: 1;
}

.container.right::before {
    left: 8px;
}

.container .date {
    position: absolute;
    display: inline-block;
    top: calc(50% - 8px);
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: rgb(192, 150, 40);
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 1;
}

.container.left .date {
    right: -120px;
}

.container.right .date {
    left: -120px;
}

.container .icon {
    position: absolute;
    display: inline-block;
    width: 40px;
    height: 40px;
    padding: 9px 0;
    top: calc(50% - 20px);
    background: white;
    border: 2px solid rgb(192, 150, 40);
    border-radius: 40px;
    text-align: center;
    font-size: 18px;
    color: rgb(192, 150, 40);
    z-index: 1;
}

.container.left .icon {
    right: 56px;
    margin: auto;
    transform: translate(0px, -7px);
    padding: 7px;
}

.container.right .icon {
    left: 56px;
    margin: auto;
    transform: translate(0px, -7px);
    padding: 7px;
}

.container .content {
    padding: 30px 90px 30px 30px;
    background: #000642;
    position: relative;
    border-radius: 0 500px 500px 0;
}

.container.right .content {
    padding: 30px 30px 30px 90px;
    border-radius: 500px 0 0 500px;
}

.container .content h2 {
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: normal;
    color: rgb(192, 150, 40);
}

.container .content p {
    margin: 0;
    font-size: 16px;
    line-height: 22px;
    color: white;
}

@media (max-width: 767.98px) {
    .timeline::after {
        left: 90px;
    }

    .container {
        width: 100%;
        padding-left: 120px;
        padding-right: 30px;
    }

    .container.right {
        left: 0%;
    }

    .container.left::after,
    .container.right::after {
        left: 82px;
    }

    .container.left::before,
    .container.right::before {
        left: 100px;
        border-color: transparent rgb(192, 150, 40) transparent transparent;
    }

    .container.left .date,
    .container.right .date {
        right: auto;
        left: 15px;
    }

    .container.left .icon,
    .container.right .icon {
        right: auto;
        left: 146px;
    }

    .container.left .content,
    .container.right .content {
        padding: 30px 30px 30px 90px;
        border-radius: 500px 0 0 500px;
    }
}
</style>