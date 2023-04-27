import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../../src/i18n.js'
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
  
});