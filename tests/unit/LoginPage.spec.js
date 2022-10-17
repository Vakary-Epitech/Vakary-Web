import { shallowMount, mount } from '@vue/test-utils'
import LoginPage from '@/components/Page/LoginPage.vue'

describe("LoginPage", () => {
  it("renders successfully", () => {
    const wrapper = mount(LoginPage, {
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
  }),
  test('getComponent LoginPage', () => {
    const wrapper = shallowMount(LoginPage, {
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
    wrapper.getComponent(LoginPage)
  })
})


test('isVisible', () => {
  const wrapper = shallowMount(LoginPage, {
    global: {
      mocks: {
        $t: (msg) => msg
      }
    }
  })

  expect(wrapper.isVisible()).toBe(true)
})