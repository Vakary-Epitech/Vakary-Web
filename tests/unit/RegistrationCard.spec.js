import { mount } from '@vue/test-utils';
import i18n from '../../src/i18n.js'
import RegistrationCard from '@/components/UI/registrationCard.vue';

describe('RegistrationCard', () => {
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
      wrapper = mount(RegistrationCard, {
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

    it('should not valid username', () => {
      expect(wrapper.vm.isValidUsername("a")).toBe(false);
    })

    it('should valid username', () => {
      expect(wrapper.vm.isValidUsername("test")).toBe(true);
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

    it('should not valid username in the CheckInformations', () => {
      wrapper.vm.checkInformations("ab", "test", "Test1234");
      expect(wrapper.vm.userNameError).toBe(true);
      expect(wrapper.vm.emailError).toBe(false);
      expect(wrapper.vm.passwordError).toBe(false);
    })

    it('should valid username in the CheckInformations', () => {
      wrapper.vm.checkInformations("test", "test", "Test1234");
      expect(wrapper.vm.userNameError).toBe(false);
      expect(wrapper.vm.emailError).toBe(true);
      expect(wrapper.vm.passwordError).toBe(false);
    })

    it('should not valid email in the CheckInformations', () => {
      wrapper.vm.checkInformations("test", "test", "Test1234");
      expect(wrapper.vm.userNameError).toBe(false);
      expect(wrapper.vm.emailError).toBe(true);
      expect(wrapper.vm.passwordError).toBe(false);
    })

    it('should valid email but not password in the CheckInformations', () => {
      wrapper.vm.checkInformations("test", "test@test.co", "test1234");
      expect(wrapper.vm.userNameError).toBe(false);
      expect(wrapper.vm.emailError).toBe(false);
      expect(wrapper.vm.passwordError).toBe(true);
    })

    it('should valid email and password in the CheckInformations', () => {
      wrapper.vm.checkInformations("test", "test@test.co", "Test1234");
      expect(wrapper.vm.userNameError).toBe(false);
      expect(wrapper.vm.emailError).toBe(false);
      expect(wrapper.vm.passwordError).toBe(false);
    })

})