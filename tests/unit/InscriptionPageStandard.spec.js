import { shallowMount, mount } from '@vue/test-utils'
import InscriptionPageStandard from '@/components/Page/InscriptionPageStandard.vue'

describe("InscriptionPageStandard", () => {
  it("renders successfully", () => {
    const wrapper = mount(InscriptionPageStandard, {
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
  }),
  test('getComponent InscriptionPageStandard', () => {
    const wrapper = shallowMount(InscriptionPageStandard, {
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
    wrapper.getComponent(InscriptionPageStandard)
  })
})


test('isVisible', () => {
  const wrapper = shallowMount(InscriptionPageStandard, {
    global: {
      mocks: {
        $t: (msg) => msg
      }
    }
  })

  expect(wrapper.isVisible()).toBe(true)
})