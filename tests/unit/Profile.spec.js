import { mount  } from '@vue/test-utils'
import Profile from '@/components/UI/profileModal.vue'
import i18n from '../../src/i18n.js'
import { createRouter, createWebHistory } from 'vue-router'

describe('Profile', () => {
  let wrapper
  const mockStore = {
    dispatch: jest.fn().mockResolvedValue(),
    state: {
      userStore: {
        userIsLoggedIn: true,
        user: {
          id: '123',
          name: 'John Doe',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et commodo justo.',
          email: 'john.doe@example.com',
          image: 'https://via.placeholder.com/150'
        }
      }
    },
  };
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Profile',
        component: Profile,
      },
      {
        path: '/landingPage',
        name: 'landingPage'
      }
    ]
  })
  
  beforeEach(() => {
    wrapper = mount (Profile, {
      global: {
        plugins: [i18n, router],
        mocks: {
            $router: router,
            $store: mockStore,
        }
      }
    })
  });
  
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  }
  );

  
})
