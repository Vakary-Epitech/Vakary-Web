import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from "../components/Page/LandingPage.vue";
import LoginPage from "../components/Page/LoginPage.vue";
import MapPage from "../components/Page/MapPage.vue";

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
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;