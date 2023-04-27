import { mount } from '@vue/test-utils';
import i18n from '../../src/i18n.js'
import LoginCard from '@/components/UI/LoginCard.vue';

describe('LoginCard', () => {
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
      wrapper = mount(LoginCard, {
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
  
   
  it('navigates to the sign up page when the openSignUpPage method is called', async () => {
    wrapper.vm.openRegistration()
    expect(wrapper.emitted().openRegistration).toBeTruthy();
  })

  it('navigates to the forget password page when the openForgetPassword method is called', async () => {
    wrapper.vm.openForgetPassword()
    expect(wrapper.emitted().openForgetPassword).toBeTruthy();
  })

  it('navigates to the map page when the openMap method is called and user is authorized', async () => {
    mockStore.dispatch.mockResolvedValueOnce();
    await wrapper.vm.openMap();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      'checkIfUserIsAuthorizedToConnect',
      wrapper.vm.password,
    );
    expect(wrapper.vm.$store.state.userStore.userIsLoggedIn).toBe(true);
    expect(wrapper.emitted().loginDone).toBeTruthy();
  });
  
});