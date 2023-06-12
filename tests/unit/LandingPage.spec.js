import { mount } from '@vue/test-utils'
import LandingPage from '@/components/Page/LandingPage.vue'
import i18n from '../../src/i18n.js'
import { createRouter, createWebHistory } from 'vue-router'

const mockRouter = {
    push: jest.fn()
}

describe('LandingPage', () => {
  let wrapper
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
      },
      {
        path: '/connexionPage',
        name: 'ConnexionPage'
      },
      {
        path: '/learnMorePage',
        name: 'LearnMorePage'
      }
    ]
  })
  
  beforeEach(() => {
    wrapper = mount(LandingPage, {
      global: {
        plugins: [i18n, router],
        mocks: {
            $router: mockRouter
        }
      }
    })
  })
  
  afterEach(() => {
    wrapper.unmount()
  })



  it('navigates to the sign up page when the openConnexionPage method is called', async () => {
    wrapper.vm.openConnexionPage()
    expect(mockRouter.push).toHaveBeenCalledWith('/connexionPage')
  })

  it('navigates to the learn more page when the openLearnMorePage method is called', async () => {
    wrapper.vm.openLearnMorePage()
    expect(mockRouter.push).toHaveBeenCalledWith('/learnMorePage')
  })
})
