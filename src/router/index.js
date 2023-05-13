import { createRouter, createWebHashHistory } from 'vue-router';
import MapPage from "@/components/Page/MapPage.vue";
import LandingPage from "@/components/Page/LandingPage.vue"
import store from '@/store/store';
import LearnMorePage from "@/components/Page/LearnMorePage.vue";
import ConnexionPage from "@/components/Page/ConnexionPage.vue";
import resetPasswordPage from "@/components/Page/ResetPassword.vue";

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
    },
    {
        path: '/connexionPage',
        name: 'ConnexionPage',
        component: ConnexionPage,
    },
    {
        path: '/learnMorePage',
        name: 'LearnMorePage',
        component: LearnMorePage,
    },
    {
        path: '/mapPage',
        name: 'MapPage',
        component: MapPage,
    },
    {
        path: '/resetPasswordPage/:id',
        name: 'resetPasswordPage',
        component: resetPasswordPage,
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (store.state.userStore.userIsLoggedIn)
        next();
    else if (to.name == "ConnexionPage" || to.name == "LandingPage" || to.name == "LearnMorePage")
        next();
    else {
        next({ name: 'ConnexionPage' });
    }
})

export default router;