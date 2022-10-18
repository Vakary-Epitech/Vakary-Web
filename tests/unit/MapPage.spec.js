import { shallowMount, mount } from '@vue/test-utils'
import MapPage from '@/components/Page/MapPage.vue'

describe("MapPage", () => {
  it("renders successfully", () => {
    const wrapper = mount(MapPage, {
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
  }),
  it("getComponent MapPage", () => {
    const wrapper = shallowMount(MapPage, {
        global: {
          mocks: {
            $t: (msg) => msg
          }
        }
      })
      wrapper.getComponent(MapPage)
  }),
  it('isVisible', () => {
    const wrapper = shallowMount(MapPage, {
        global: {
            mocks: {
                $t: (msg) => msg
            }
        }
      })
    })
})