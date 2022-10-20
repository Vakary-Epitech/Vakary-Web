import { mount, shallowMount } from '@vue/test-utils'
import CreateGroup from '@/components/UI/CreateGroup.vue'
import Group from '@/components/Page/Group.vue'
import VakaryHome from '@/components/Page/VakaryHome.vue'
import VakaryWeb from '@/components/Page/VakaryWeb.vue'

describe('CreateGroup.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Sauvegarder'
    const wrapper = shallowMount(CreateGroup, {
      props: { msg }
    })
    expect(wrapper.text()).toContain(msg)
  })
})

describe('Group.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = mount(Group)

    expect(wrapper.vm.showModal).toEqual(false)
    expect(wrapper.vm.createGroup).toEqual(false)
  })
})

describe('VakaryHome.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Prêt à découvrir votre monde ?'
    const wrapper = shallowMount(VakaryHome, {
      props: { msg }
    })
    expect(wrapper.text()).toContain(msg)
  })
})

describe('VakaryWeb.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Vos vacances selon vos envies'
    const wrapper = shallowMount(VakaryWeb, {
      props: { msg }
    })
    expect(wrapper.text()).toContain(msg)
  })
})