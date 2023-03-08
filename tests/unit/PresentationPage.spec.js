import { shallowMount, mount } from '@vue/test-utils'
import VakaryWeb from '@/components/Page/VakaryWeb.vue'
import MobilePage from '@/components/Page/MobilePage.vue'
import LandingPage from '@/components/Page/LandingPage.vue'

import Vuex from 'vuex'
import store from '../../src/store/store.js'
import i18 from '../../src/i18n.js'
import router from '../../src/router/index.js'

test('Vakary web test', async () => {
    const wrapper = shallowMount(VakaryWeb, {
        global: {
            mocks: {
                $store: store,
                $t: (msg) => msg,
                $router: router,
                $i18n: i18
            }
        },
        data() {
            return {
                products: [
                    {
                        title: 'Park',
                        color: 'green',
                        bgtext: 'PARC',
                        src: require('@/assets/parc.jpg'),
                        desc: 'Pour le côté Nature et découverte'
                    },
                    {
                        title: 'Event',
                        color: 'blue',
                        bgtext: 'EVENEMENT',
                        src: require('@/assets/marcheNoel.jpg'),
                        desc: 'Pour les événements et fêtes',

                    },
                    {
                        title: 'Museum',
                        color: 'pink',
                        bgtext: 'MUSEE',
                        src: require('@/assets/musee.jpg'),
                        desc: 'Pour la culture et histoire'
                    }
                ],
                productsEn: [
                    {
                        title: 'Park & Garden',
                        color: 'green',
                        bgtext: 'PARC',
                        src: require('@/assets/parc.jpg'),
                        desc: 'For the Nature and discovery side'
                    },
                    {
                        title: 'Evenement',
                        color: 'blue',
                        bgtext: 'EVENEMENT',
                        src: require('@/assets/marcheNoel.jpg'),
                        desc: 'For events and parties',

                    },
                    {
                        title: 'Museum',
                        color: 'pink',
                        bgtext: 'MUSEE',
                        src: require('@/assets/musee.jpg'),
                        desc: 'For culture and history'
                    }
                ]
            }
        },
    })
    await wrapper.vm.seti18n("fr");
})

test('Landing Page', async() => {
    const wrapper = shallowMount(LandingPage, {
        global: {
            mocks: {
                $t: (msg) => msg,
                $router: router,
                $i18n: i18,
            }
        },
    })
    await wrapper.vm.changeLanguage();
    await wrapper.vm.openSignUpPage();
    await wrapper.vm.openMobilePage();
})

test('Mobile Page', async() => {
    const wrapper = shallowMount(MobilePage, {
        global: {
            mocks: {
                $t: (msg) => msg,
                $router: router,
                $i18n: i18,
            }
        },
    })
    expect(wrapper.vm.geti18n).toBe("en");
    await wrapper.vm.seti18n("fr");
})