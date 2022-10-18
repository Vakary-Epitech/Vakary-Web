import { createRouter, createWebHistory } from 'vue-router';
import VakaryHome from "../components/VakaryHome.vue";
import VakaryWeb from "../components/VakaryWeb.vue";
import Group from "../components/Group.vue";
import LoginPage from "../components/Page/LoginPage.vue";
import MapPage from "../components/Page/MapPage.vue";
import InscriptionPageStandard from "../components/Page/InscriptionPageStandard.vue"
import InscriptionPagePro from "../components/Page/InscriptionPagePro.vue"
import SelectAccount from "../components/Page/SelectAccount.vue"
import ForgetPassword from "../components/Page/ForgetPassword.vue"
import ProfilePage from "../components/Page/ProfilePage.vue";
import MobilePage from "../components/Page/MobilePage.vue";
import SettingsPage from "../components/Page/SettingsPage.vue"

const routes = [
    {
        path: '/',
        name: 'VakaryHome',
        component: VakaryHome,
    },
    {
        path: '/VakaryWeb',
        name: 'VakaryWeb',
        component: VakaryWeb,
    },
    {
        path: '/Group',
        name: 'Group',
        component: Group,
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
        path: '/loginPage',
        name: 'LoginPage',
        component: LoginPage,
    },
    {
        path: '/mapPage',
        name: 'MapPage',
        component: MapPage,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;