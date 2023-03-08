import { shallowMount, mount } from '@vue/test-utils'
import CreateGroup from '@/components/UI/CreateGroup.vue'
import Vuex from 'vuex'
import store from '../../src/store/store.js'
import i18 from '../../src/i18n.js'
import router from '../../src/router/index.js'

test('Basic Information verifier', async () => {
    const wrapper = shallowMount(CreateGroup, {
        global: {
            mocks: {
                $store: store,
                $t: (msg) => msg,
                $router: router,
            }
        },
        data() {
            return {
                CreateGroup: true,
                mailMember: "",
                firstName: "",
                listMembers: [],
                groupInformations : {
                    name: "",
                    members: [],
                    photo: "",
                    id: ""
                },
            }
        }
    })
    await wrapper.vm.sendMessage();
    await wrapper.vm.addMembers();
    await wrapper.vm.deleteMember(0);
})