import { shallowMount } from '@vue/test-utils'
import ProfilePage from '@/components/Page/ProfilePage.vue'
import LandingPage from '@/components/Page/LandingPage.vue'
import LoginPage from '@/components/Page/LoginPage.vue'
import MapPage from '@/components/Page/MapPage.vue'

test('getComponent ProfilePage', () => {
  const wrapper = shallowMount(ProfilePage)
  wrapper.getComponent(ProfilePage)
})

test('isVisible', () => {
  const wrapper = shallowMount(ProfilePage)

  expect(wrapper.isVisible()).toBe(true)
})

test('data', () => {
  const wrapper = shallowMount(ProfilePage, {
    data() {
      return {
        pseudo: 'world'
      }
    }
  })

  expect(wrapper.html()).toContain('world')
})

test('edit function', () => {
  const wrapper = shallowMount(ProfilePage)

  wrapper.find('button').trigger('click')
  expect(wrapper.vm.editMode).toBe(true)
})