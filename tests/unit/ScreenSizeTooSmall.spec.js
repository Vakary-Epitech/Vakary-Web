import { mount } from '@vue/test-utils';
import i18n from '../../src/i18n.js'
import ScreenSizeTooSmall from '@/components/UI/ScreenSizeTooSmall.vue';
import { createRouter, createWebHistory } from 'vue-router'

const mockRouter = {
    push: jest.fn()
}

describe('ScreenSizeTooSmall', () => {
  let wrapper
  const mockStore = {
    dispatch: jest.fn().mockResolvedValue(),
    state: {
      userStore: {
        userIsLoggedIn: false,
      },
    },
  };
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'ScreenSizeTooSmall',
        component: ScreenSizeTooSmall,
      },
      {
        path: '/landingPage',
        name: 'landingPage'
      }
    ]
  })
  
  beforeEach(() => {
    wrapper = mount(ScreenSizeTooSmall, {
      global: {
        plugins: [i18n, router],
        mocks: {
            $router: mockRouter,
            $store: mockStore,
        }
      }
    })
  })
  
  afterEach(() => {
    wrapper.unmount()
  })


  it('returns the current locale when geti18n() method is called', async () => {
    i18n.locale = 'fr';
    const locale = wrapper.vm.geti18n();
    expect(locale).toBe('fr');
  })

  it('navigates to the landing page when goBackToLandingPage() method is called', async () => {
    wrapper.vm.goBackToLandingPage();
    expect(wrapper.vm.$route.path).toBe('/');
  })
});