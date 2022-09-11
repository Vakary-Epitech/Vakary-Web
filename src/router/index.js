import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from "../components/Page/LandingPage.vue";
import LoginPage from "../components/Page/LoginPage.vue";
import MapPage from "../components/Page/MapPage.vue";
import InscriptionPageStandard from "../components/Page/InscriptionPageStandard.vue"
import InscriptionPagePro from "../components/Page/InscriptionPagePro.vue"
import ChoiceCreation from "../components/Page/ChoiceCreation.vue"
import ForgetPassword from "../components/Page/ForgetPassword.vue"

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
    },
    {
        path: '/loginPage',
        name: 'LoginPage',
        component: LoginPage,
    },
    {
        path: '/mapPage',
        name: 'MapPage',
        component: MapPage,
    },
    {
        path: '/inscriptionPageStandard',
        name: 'InscriptionPageStandard',
        component: InscriptionPageStandard,
    },
    {
        path: '/inscriptionPagePro',
        name: 'InscriptionPagePro',
        component: InscriptionPagePro,
    },
    {
        path: '/choiceCreation',
        name: 'ChoiceCreation',
        component: ChoiceCreation,
    },
    {
        path: '/forgetPassword',
        name: 'ForgetPassword',
        component: ForgetPassword,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;