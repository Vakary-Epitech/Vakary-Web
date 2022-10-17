import { shallowMount, mount } from '@vue/test-utils'
import MobilePage from '@/components/Page/MobilePage.vue'

describe("MobilePAge", () => {
  it("renders successfully", () => {
    const wrapper = mount(MobilePage, {
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
  }),
  it("getComponent MobilePage", () => {
    const wrapper = shallowMount(MobilePage, {
        global: {
          mocks: {
            $t: (msg) => msg
          }
        }
      })
      wrapper.getComponent(MobilePage)
  }),
  it('isVisible', () => {
    const wrapper = shallowMount(MobilePage, {
        global: {
            mocks: {
                $t: (msg) => msg
            }
        }
      })
    })
})