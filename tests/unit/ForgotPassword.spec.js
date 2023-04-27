import { mount } from '@vue/test-utils'
import ForgotPassword from '@/components/UI/forgotPassword.vue'
import i18n from '../../src/i18n.js'

describe('ForgotPassword', () => {
    let wrapper
  
    const mockStore = {
        dispatch: jest.fn().mockResolvedValue(),
        state: {
          userStore: {
            userIsLoggedIn: false,
          },
        },
      };
  
    beforeEach(() => {
      wrapper = mount(ForgotPassword, {
        global: {
          plugins: [i18n],
          mocks: {
            $store: mockStore,
            $t: (msg) => msg,
          }
        }
      })
    })
  
    afterEach(() => {
      wrapper.unmount()
    })

    it('should emit openLogin event when openLoginPage is called', () => {
      wrapper.vm.openLoginPage();
      expect(wrapper.emitted().openLogin).toBeTruthy();
    });

    it('should not valid password', () => {
      expect(wrapper.vm.isValidPassword("test")).toBe(false);
    })

    it('should valid password', () => {
      expect(wrapper.vm.isValidPassword("Test1234")).toBe(true);
    })

})