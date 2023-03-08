import { shallowMount, mount } from '@vue/test-utils'
import ShowMembers from '@/components/UI/ShowMembers.vue'
import Vuex from 'vuex'
import store from '../../src/store/store.js'
import i18 from '../../src/i18n.js'
import router from '../../src/router/index.js'

test('Basic Information verifier', async () => {
    const wrapper = shallowMount(ShowMembers, {
        global: {
            mocks: {
                $store: store,
                $t: (msg) => msg,
                $router: router,
            }
        },
        data() {
            return {
                indexGroup: 0,
                groups: [],
                keyShowGroup: 0,
                showMembers: false,
            }
        }
    })
})