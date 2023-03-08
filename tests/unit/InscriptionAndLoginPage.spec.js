import { shallowMount, mount } from '@vue/test-utils'
import LoginPage from '@/components/Page/LoginPage.vue'
import InscriptionPage from '@/components/Page/InscriptionPage.vue'
import Vuex from 'vuex'
import store from '../../src/store/store.js'
import i18 from '../../src/i18n.js'
import router from '../../src/router/index.js'

test('Basic Information verifier LoginPage', async () => {
    const wrapper = shallowMount(LoginPage, {
        global: {
            mocks: {
                $store: store,
                $t: (msg) => msg,
                $router: router,
            }
        },
        data() {
            return {
                pro: false,
                password: "",
                code: "",
                userDontExist: false,
            }
        }
    })
    try {
        await wrapper.vm.openForgetPassword();
        await wrapper.vm.openRegistrationSelection();
        await wrapper.vm.checkIfUserIsAuthorizeToConnect();
    } catch (error) {
        console.log(error);
    }
    await new Promise((r) => setTimeout(r, 1000));
})

test('wrong password InscriptionPage', async () => {
    const wrapper = shallowMount(InscriptionPage, {
        global: {
            mocks: {
                $store: store,
                $t: (msg) => msg,
                $router: {
                    params: {
                        type: "user",
                    }
                },
            }
        },
        data() {
            return {
                password: "az",
                passwordConfirm: "re",
                postalCode: "",
                passwordAreNotTheSame: false,
            }
        }
    })
    try {
        await wrapper.vm.confirmInscription();
        expect(wrapper.vm.passwordAreNotTheSame).toBe(true)
    } catch (error) {
        console.log(error);
    }
    await new Promise((r) => setTimeout(r, 1000));
})

test('correct password InscriptionPage', async () => {
    const wrapper = shallowMount(InscriptionPage, {
        global: {
            mocks: {
                $store: store,
                $t: (msg) => msg,
                $router: {
                    params: {
                        type: "user",
                    }
                },
            }
        },
        data() {
            return {
                password: "Oui",
                passwordConfirm: "Oui",
                postalCode: "",
                passwordAreNotTheSame: false,
            }
        }
    })
    try {
        await wrapper.vm.confirmInscription();
        expect(wrapper.vm.passwordAreNotTheSame).toBe(false)
    } catch (error) {
        console.log (error);
    }
    await new Promise((r) => setTimeout(r, 1000));
})