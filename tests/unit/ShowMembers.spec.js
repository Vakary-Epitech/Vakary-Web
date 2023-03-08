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
                groupInformations: {
                    name: "Vakary",
                    members: [],
                    photo: "picture.png",
                    id: "1",
                },
                editGroupName: false,
                newGroupName: "Vak",
                mailMember: 'mail@test.com',
                showMembers: true,
            }
        }
    })
    wrapper.vm.$data.groupInformations = {
        name: "Vakary",
        members: [],
        photo: "picture.png",
        id: "1",
    }
    await wrapper.vm.addMember()
    await wrapper.vm.deleteMember(0)
    await wrapper.vm.editName()
    await wrapper.vm.updateGroupName()
    await wrapper.vm.deleteGroup()

    expect(wrapper.vm.getGroups).toBe(wrapper.vm.$store.state.userStore.groups)
})

test('Error check', async () => {
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
                groupInformations: {
                    name: "Vakary",
                    members: [{mail: "mail@test.fr", status: "pending"}, {mail: "mail2@test.fr", status: "pending"}],
                    photo: "picture.png",
                    id: "1",
                },
                editGroupName: false,
                newGroupName: "Vak",
                mailMember: 'mail@test.com',
                showMembers: true,
            }
        }
    })
    wrapper.vm.$data.groupInformations = {
        name: "Vakary",
        members: [],
        photo: "picture.png",
        id: "1",
    }
    await wrapper.vm.addMember();
    await wrapper.vm.updateGroupName();
})
