import { mount, shallowMount } from '@vue/test-utils'
import CreateGroup from '@/components/CreateGroup.vue'
import Group from '@/components/Group.vue'
import VakaryHome from '@/components/VakaryHome.vue'
import VakaryWeb from '@/components/VakaryWeb.vue'

describe('CreateGroup.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Sauvegarder'
    const wrapper = shallowMount(CreateGroup, {
      props: { msg }
    })
    expect(wrapper.text()).toContain(msg)
  })
})


describe('CreateGroupe.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = mount(CreateGroup)

    wrapper.find('button').trigger("click")

    expect(wrapper.vm.showModal).toEqual(false)
  })
})

describe('Group.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = mount(Group)

    expect(wrapper.vm.showModal).toEqual(false)
    expect(wrapper.vm.createGroup).toEqual(false)
  })
})



describe('Group.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = mount(Group)

    wrapper.find('#show').trigger("click")

    expect(wrapper.vm.showModal).toEqual(true)
  })
})

describe('Group.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Vakary Home'
    const wrapper = shallowMount(Group, {
      props: { msg }
    })
    expect(wrapper.text()).toContain(msg)
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