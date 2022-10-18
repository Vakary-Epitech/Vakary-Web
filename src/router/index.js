import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from "../components/Page/LandingPage.vue";
import LoginPage from "../components/Page/LoginPage.vue";
import MapPage from "../components/Page/MapPage.vue";
import InscriptionPageStandard from "../components/Page/InscriptionPageStandard.vue"
import InscriptionPagePro from "../components/Page/InscriptionPagePro.vue"
import SelectAccount from "../components/Page/SelectAccount.vue"
import ForgetPassword from "../components/Page/ForgetPassword.vue"
import ProfilePage from "../components/Page/ProfilePage.vue";
import MobilePage from "../components/Page/MobilePage.vue";
import SettingsPage from "../components/Page/SettingsPage.vue"
import ItineraryPage from "../components/Page/ItineraryPage.vue"

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
        path: '/selectAccount',
        name: 'SelectAccount',
        component: SelectAccount,
    },
    {
        path: '/forgetPassword',
        name: 'ForgetPassword',
        component: ForgetPassword,
    },
    {
        path: '/profilePage',
        name: 'ProfilePage',
        component: ProfilePage,
    },
    {
        path: '/mobilePage',
        name: 'MobilePage',
        component: MobilePage,
    },
    {
        path: '/settingsPage',
        name: 'SettingsPage',
        component: SettingsPage,
    },
    {
        path: '/itineraryPage',
        name: 'ItineraryPage',
        component: ItineraryPage,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;