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
        path: '/InscriptionPage',
        name: 'InscriptionPage'
      },
      {
        path: '/mobilePage',
        name: 'MobilePage'
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

  it('changes the language when the changeLanguage method is called', () => {
    const initialLocale = wrapper.vm.geti18n()
    wrapper.vm.changeLanguage()
    const newLocale = wrapper.vm.geti18n()
    expect(initialLocale).not.toEqual(newLocale)
  })
  
  it('changes the language to "en" if the current language is "fr"', () => {
    wrapper.vm.$i18n.locale = 'fr';
    wrapper.vm.changeLanguage();
    expect(wrapper.vm.$i18n.locale).toBe('en');
  });
  

  it('navigates to the sign up page when the openSignUpPage method is called', async () => {
    wrapper.vm.openSignUpPage()
    expect(mockRouter.push).toHaveBeenCalledWith('/InscriptionPage')
  })

  it('navigates to the mobile page when the openMobilePage method is called', async () => {
    wrapper.vm.openMobilePage()
    expect(mockRouter.push).toHaveBeenCalledWith('/mobilePage')
  })

  it('navigates to the learn more page when the openLearnMorePage method is called', async () => {
    wrapper.vm.openLearnMorePage()
    expect(mockRouter.push).toHaveBeenCalledWith('/learnMorePage')
  })
})
