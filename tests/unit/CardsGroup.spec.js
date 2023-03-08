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
                group: {
                    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Temple_Thionville.jpg/800px-Temple_Thionville.jpg",
                },
                exists: true,
                keyShowGroup: 0,
                showMembers: false,
            }
        }
    })
    await wrapper.vm.showGroupe(0);
    expect(wrapper.isVisible()).toBe(true)
})