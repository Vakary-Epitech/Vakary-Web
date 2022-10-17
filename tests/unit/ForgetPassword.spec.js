import { shallowMount, mount } from '@vue/test-utils'
import ForgetPassword from '@/components/Page/ForgetPassword.vue'

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