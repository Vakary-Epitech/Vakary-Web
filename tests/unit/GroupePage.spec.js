import { mount, shallowMount } from '@vue/test-utils'
import CreateGroup from '@/components/UI/CreateGroup.vue'
import GroupPage from '@/components/Page/GroupPage.vue'

describe('CreateGroup.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Sauvegarder'
    const wrapper = shallowMount(CreateGroup, {
      props: { msg }
    })
    expect(wrapper.text()).toContain(msg)
  })
})

describe('GroupPage.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = mount(GroupPage)

    expect(wrapper.vm.showModal).toEqual(false)
    expect(wrapper.vm.createGroup).toEqual(false)
  })
})