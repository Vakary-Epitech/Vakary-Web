import { mount } from '@vue/test-utils'
import ConnexionPage from '@/components/Page/ConnexionPage.vue'
import i18n from '../../src/i18n.js'
import { createRouter, createWebHistory } from 'vue-router'

const mockRouter = {
    push: jest.fn()
}

describe('ConnexionPage', () => {
  let wrapper
  const mockStore = {
    dispatch: jest.fn().mockResolvedValue(),
    state: {
      userStore: {
        userIsLoggedIn: false,
      },
    },
  };
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'ConnexionPage',
        component: ConnexionPage,
      },
      {
        path: '/mapPage',
        name: 'mapPage'
      }
    ]
  })
  
  beforeEach(() => {
    wrapper = mount(ConnexionPage, {
      global: {
        plugins: [i18n, router],
        mocks: {
            $router: mockRouter,
            $store: mockStore,
        }
      }
    })
  })
  
  afterEach(() => {
    wrapper.unmount()
  })

    it('sets registration to true when the registrationIsDone method is called', () => {
        wrapper.vm.registrationIsDone()
        expect(wrapper.vm.registration).toBe(true)
    })

    it('navigates to /mapPage when the pageIsDone method is called', async () => {
        wrapper.vm.pageIsDone()
        expect(mockRouter.push).toHaveBeenCalledWith('/mapPage')
    })

    it('sets registration to false and login to true when the openLogin method is called', () => {
        wrapper.vm.openLogin()
        expect(wrapper.vm.registration).toBe(false)
        expect(wrapper.vm.login).toBe(true)
    })

    it('sets registration to true and login to false when the openRegister method is called', () => {
        wrapper.vm.openRegister()
        expect(wrapper.vm.registration).toBe(true)
        expect(wrapper.vm.login).toBe(false)
    })

    it('sets forgetPassword to true and login to false when the openPassword method is called', () => {
        wrapper.vm.openPassword()
        expect(wrapper.vm.login).toBe(false)
        expect(wrapper.vm.forgetPassword).toBe(true)
    })

})

    