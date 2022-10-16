import { createRouter, createWebHistory } from 'vue-router';
import VakaryHome from "../components/VakaryHome.vue";
import VakaryWeb from "../components/VakaryWeb.vue";
import Group from "../components/Group.vue";
// import App from "../App.vue";

const routes = [
    {
        path: '/',
        name: 'VakaryHome',
        component: VakaryHome,
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
    {
        path: '/Group',
        name: 'Group',
        component: Group,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;