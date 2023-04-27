import { shallowMount, mount } from '@vue/test-utils'
import ForgetPassword from '@/components/Page/ForgetPassword.vue'
import store from '../../src/store/store.js'
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

  
test('wrong id ForgetPassword', async () => {
  const wrapper = shallowMount(ForgetPassword, {
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
              mail: "Oui",
              userDontExist: false,
              userExist: false,
          }
      }
  })
  try {
      await wrapper.vm.requestPasswordReset();
  } catch (error) {
      console.log(error);
  }
  await new Promise((r) => setTimeout(r, 1000));
})

test('correct id ForgetPassword', async () => {
  const wrapper = shallowMount(ForgetPassword, {
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
            mail: "test@test.com",
            userDontExist: false,
            userExist: false,
          }
      }
  })
  try {
      await wrapper.vm.requestPasswordReset();
  } catch (error) {
      console.log(error);
  }
  await new Promise((r) => setTimeout(r, 1000));
})

test('wrong token ForgetPassword', async () => {
  const wrapper = shallowMount(ForgetPassword, {
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
              token: 'wrongToken',
              invalidToken: false
          }
      }
  })
  try {
      await wrapper.vm.sendNewPassword();
  } catch (error) {
      console.log(error);
  }
  await new Promise((r) => setTimeout(r, 1000));
})

test('correct token ForgetPassword', async () => {
  const wrapper = shallowMount(ForgetPassword, {
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
            token: 'goodToken',
            invalidToken: false
          }
      }
  })
  try {
      await wrapper.vm.sendNewPassword();
  } catch (error) {
      console.log(error);
  }
  await new Promise((r) => setTimeout(r, 1000));
})

})