import { mount, shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../../src/i18n.js'
import store from '../../src/store/store.js'
import LoginPage from '@/components/Page/LoginPage.vue';

const mockRouter = {
    push: jest.fn()
}

describe('LoginPage', () => {
    let wrapper
  
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          name: 'LoginPage',
          component: LoginPage,
        },
        {
          path: '/InscriptionPage',
          name: 'InscriptionPage'
        },
        {
          path: '/forgetPassword',
          name: 'ForgetPassword'
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
      wrapper = mount(LoginPage, {
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
  
   
  it('navigates to the sign up page when the openSignUpPage method is called', async () => {
    wrapper.vm.openInscription()
    expect(mockRouter.push).toHaveBeenCalledWith('/InscriptionPage')
  })

  it('navigates to the forget password page when the openForgetPassword method is called', async () => {
    wrapper.vm.openForgetPassword()
    expect(mockRouter.push).toHaveBeenCalledWith('/forgetPassword')
  })

  it('navigates to the map page when the openMap method is called and user is authorized', async () => {
    mockStore.dispatch.mockResolvedValueOnce();
    await wrapper.vm.openMap();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      'checkIfUserIsAuthorizedToConnect',
      wrapper.vm.password,
    );
    expect(wrapper.vm.$store.state.userStore.userIsLoggedIn).toBe(true);
    expect(mockRouter.push).toHaveBeenCalledWith('/mapPage');
  });


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

test('wrong password loginPage', async () => {
    const wrapper = shallowMount(LoginPage, {
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
                passwordAreNotTheSame: false,
                userDontExist: false,
            }
        }
    })
    try {
        await wrapper.vm.checkIfUserIsAuthorizeToConnect();
        expect(wrapper.vm.passwordAreNotTheSame).toBe(true)
        expect(wrapper.vm.userDontExist).toBe(true)
    } catch (error) {
        console.log(error);
    }
    await new Promise((r) => setTimeout(r, 1000));
})


});