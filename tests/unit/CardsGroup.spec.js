import { shallowMount, mount } from '@vue/test-utils'
import CardsGroup from '@/components/UI/CardsGroup.vue'
import Vuex from 'vuex'
import store from '../../src/store/store.js'
import i18 from '../../src/i18n.js'

test('Basic Information verifier', async () => {
    const wrapper = shallowMount(CardsGroup, {
        global: {
            mocks: {
                $store: store,
                $t: (msg) => msg,
            }
        },
        data() {
            return {
                indexGroup: 0,
                groups: [{
                    photo: "@/assets/Logo_vect.svg",
                    name: "Vakary",
                    members: [{
                        index: 0,
                        mail: "mail.test@test.com",
                    }]
                },
                {
                    photo: "@/assets/Logo_vect.svg",
                    name: "Vakary",
                    members: [{
                        index: 0,
                        mail: "mail.test@test.com",
                    }]
                }],
                keyShowGroup: 0,
                showMembers: false,
            }
        }
    })
    await wrapper.vm.showGroupe(0);
    expect(wrapper.isVisible()).toBe(true)
})