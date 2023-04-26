import { mount, shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../../src/i18n.js'
import InscriptionPage from '@/components/Page/InscriptionPage.vue';
import store from '../../src/store/store.js'

const mockRouter = {
    push: jest.fn()
}

describe('InscriptionPage', () => {
    let wrapper
  
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          name: 'InscriptionPage',
          component: InscriptionPage,
        },
        {
          path: '/loginPage',
          name: 'LoginPage'
        },
        {
          path: '/mapPage',
          name: 'MapPage'
        }
      ]
    })
    const mockStore = {
        dispatch: jest.fn().mockResolvedValue(),
        state: {
          userStore: {
            userIsLoggedIn: false,
          },
        },
      };
  
    beforeEach(() => {
      wrapper = mount(InscriptionPage, {
        global: {
          plugins: [i18n, router],
          mocks: {
            $store: mockStore,
            $t: (msg) => msg,
            $router: mockRouter
          }
        }
      })
    })
  
    afterEach(() => {
      wrapper.unmount()
    })
  
   

    it('navigates to the login page when the openLoginPage method is called', async () => {
        wrapper.vm.openLoginPage()
        expect(mockRouter.push).toHaveBeenCalledWith('/loginPage')
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

})