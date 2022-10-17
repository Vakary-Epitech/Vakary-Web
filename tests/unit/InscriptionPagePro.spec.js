import { shallowMount, mount } from '@vue/test-utils'
import InscriptionPagePro from '@/components/Page/InscriptionPagePro.vue'

describe("InscriptionPagePro", () => {
  it("renders successfully", () => {
    const wrapper = mount(InscriptionPagePro, {
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
  }),
  test('getComponent InscriptionPagePro', () => {
    const wrapper = shallowMount(InscriptionPagePro, {
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
    wrapper.getComponent(InscriptionPagePro)
  })
})


test('isVisible', () => {
  const wrapper = shallowMount(InscriptionPagePro, {
    global: {
      mocks: {
        $t: (msg) => msg
      }
    }
  })

  expect(wrapper.isVisible()).toBe(true)
})