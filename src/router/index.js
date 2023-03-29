import { createRouter, createWebHistory } from 'vue-router';
import VakaryWeb from "@/components/Page/VakaryWeb.vue";
import LoginPage from "@/components/Page/LoginPage.vue";
import MapPage from "@/components/Page/MapPage.vue";
import InscriptionPage from "@/components/Page/InscriptionPage.vue"
import ForgetPassword from "@/components/Page/ForgetPassword.vue"
import ProfilePage from "@/components/Page/ProfilePage.vue";
import MobilePage from "@/components/Page/MobilePage.vue";
import LandingPage from "@/components/Page/LandingPage.vue"
import RegistrationType from "@/components/Page/RegistrationType.vue"
import store from '@/store/store';

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
    },
    {
        path: '/VakaryWeb',
        name: 'VakaryWeb',
        component: VakaryWeb,
    },
    {
        path: '/RegistrationType',
        name: 'RegistrationType',
        component: RegistrationType,
    },
    {
        path: '/inscriptionPage',
        name: 'InscriptionPage',
        component: InscriptionPage,
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
        path: '/loginPage',
        name: 'LoginPage',
        component: LoginPage,
    },
    {
        path: '/mapPage',
        name: 'MapPage',
        component: MapPage,
    },
    { path: '/redirect', redirect: 'https://www.google.com' }


];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (store.state.userStore.userIsLoggedIn)
        next();
    else if (to.name == "LoginPage" || to.name == "ForgetPassword" || to.name == "InscriptionPage" || to.name == "RegistrationType" || to.name == "LandingPage" || to.name == "VakaryWeb" || to.name == "MobilePage")
        next();
})

export default router;