import { shallowMount, mount } from '@vue/test-utils'
import ForgetPassword from '@/components/Page/ForgetPassword.vue'
import Vuex from 'vuex'
import store from '../../src/store/store.js'
import router from '../../src/router/index.js'

describe("ForgetPassword", () => {
  it("renders successfully", () => {
    const wrapper = mount(ForgetPassword, {
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
  }),
    test('getComponent ForgetPassword', () => {
      const wrapper = shallowMount(ForgetPassword, {
        global: {
          mocks: {
            $t: (msg) => msg
          }
        }
      })
      wrapper.getComponent(ForgetPassword)
    })
})


test('isVisible', () => {
  const wrapper = shallowMount(ForgetPassword, {
    global: {
      mocks: {
        $t: (msg) => msg
      }
    }
  })

  expect(wrapper.isVisible()).toBe(true)
})

test('mailReceived', async () => {
  const wrapper = shallowMount(ForgetPassword, {
    global: {
      mocks: {
        $store: store,
        $t: (msg) => msg
      }
    },
    data() {
      return {
        email: "test@test.com",
        serverHasSendMail: true,
        token: "testToken",
      }
    }
  })
  await wrapper.vm.requestPasswordReset()
  await wrapper.vm.sendNewPassword()
})