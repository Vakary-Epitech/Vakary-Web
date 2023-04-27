import { mount } from '@vue/test-utils'
import ForgetPassword from '@/components/Page/ForgetPassword.vue'
import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../../src/i18n.js'

const mockRouter = {
    push: jest.fn()
}

describe('ForgetPassword', () => {
    let wrapper
  
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          name: 'ForgetPassword',
          component: ForgetPassword,
        },
        {
          path: '/loginPage',
          name: 'LoginPage'
        },
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
      wrapper = mount(ForgetPassword, {
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

    it('should not valid password', () => {
      expect(wrapper.vm.isValidPassword("test")).toBe(false);
    })

    it('should valid password', () => {
      expect(wrapper.vm.isValidPassword("Test1234")).toBe(true);
    })

})