import { shallowMount, mount } from '@vue/test-utils'
import TopBar from '@/components/UI/TopBar.vue'

describe("TopBar", () => {
  it("renders successfully", () => {
    const wrapper = mount(TopBar, {
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
  }),
  it("getComponent TopBar", () => {
    const wrapper = shallowMount(TopBar, {
        global: {
          mocks: {
            $t: (msg) => msg
          }
        }
      })
      wrapper.getComponent(TopBar)
  }),
  it('isVisible', () => {
    const wrapper = shallowMount(TopBar, {
        global: {
            mocks: {
                $t: (msg) => msg
            }
        }
      })
    })
})