import { shallowMount } from '@vue/test-utils'
import itineraryExplanation from '@/components/UI/itineraryExplanation.vue'
// import i18n from '../../src/i18n.js'

const mockStore = {
  dispatch: jest.fn().mockResolvedValue(),
  state: {
    userStore: {
      userIsLoggedIn: false,
    },
  },
};

describe('itineraryExplanation', () => {
  test('should render the component', () => {
    const wrapper = shallowMount(itineraryExplanation, {
      global: {
        mocks: {
          $store: mockStore,

        }
      }
    });

    expect(wrapper.exists()).toBe(true);
  });
});