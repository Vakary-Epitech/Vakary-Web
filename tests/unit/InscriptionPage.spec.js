import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../../src/i18n.js'
import InscriptionPage from '@/components/Page/InscriptionPage.vue';

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

    it('should not valid email', () => {
      expect(wrapper.vm.isValidEmail("test")).toBe(false);
    })

    it('should valid email', () => {
      expect(wrapper.vm.isValidEmail("test@test.co")).toBe(true);
    })

    it('should not valid password', () => {
      expect(wrapper.vm.isValidPassword("test")).toBe(false);
    })

    it('should valid password', () => {
      expect(wrapper.vm.isValidPassword("Test1234")).toBe(true);
    })

    it('should not valid email in the CheckInformations', () => {
      wrapper.vm.checkInformations("test", "Test1234");
      expect(wrapper.vm.emailError).toBe(true);
      expect(wrapper.vm.passwordError).toBe(false);
    })

    it('should valid email but not password in the CheckInformations', () => {
      wrapper.vm.checkInformations("test@test.co", "test1234");
      expect(wrapper.vm.emailError).toBe(false);
      expect(wrapper.vm.passwordError).toBe(true);
    })

    it('should valid email and password in the CheckInformations', () => {
      wrapper.vm.checkInformations("test@test.co", "Test1234");
      expect(wrapper.vm.emailError).toBe(false);
      expect(wrapper.vm.passwordError).toBe(false);
    })

})