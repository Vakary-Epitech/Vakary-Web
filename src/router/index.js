import { createRouter, createWebHistory } from 'vue-router';
import VakaryHome from "../components/VakaryHome.vue";
import VakaryWeb from "../components/VakaryWeb.vue";
import App from "../App.vue";

const routes = [
    {
        path: '/',
        name: 'App',
        component: App,
    },
    {
        path: '/VakaryHome',
        name: 'VakaryHome',
        component: VakaryHome,
    },
    {
        path: '/VakaryWeb',
        name: 'VakaryWeb',
        component: VakaryWeb,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;