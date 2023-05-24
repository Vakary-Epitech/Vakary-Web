import { mount } from '@vue/test-utils'
import ResetPassword from '@/components/Page/ResetPassword.vue'
import i18n from '../../src/i18n.js'

describe('ResetPassword', () => {
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
      wrapper = mount(ResetPassword, {
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

    it('should not valid password', () => {
      expect(wrapper.vm.isValidPassword("test")).toBe(false);
    })

    it('should valid password', () => {
      expect(wrapper.vm.isValidPassword("Test1234")).toBe(true);
    })

})