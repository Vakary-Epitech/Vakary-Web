import { mount, shallowMount } from '@vue/test-utils'
import GroupPage from '@/components/Page/GroupPage.vue'

describe("GroupPage", () => {
  it("renders successfully", () => {
    const wrapper = mount(GroupPage, {
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
  }),
  it("getComponent GroupPage", () => {
    const wrapper = shallowMount(GroupPage, {
        global: {
          mocks: {
            $t: (msg) => msg
          }
        }
      })
      wrapper.getComponent(GroupPage)
  }),
  it('isVisible', () => {
    const wrapper = shallowMount(GroupPage, {
        global: {
            mocks: {
                $t: (msg) => msg
            }
        }
      })
    })
})