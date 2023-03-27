import { shallowMount, mount } from '@vue/test-utils'
import TopBar from '@/components/UI/TopBar.vue'
import router from '../../src/router/index.js'
import i18 from '../../src/i18n.js'

describe("TopBar", () => {
  it("renders successfully", () => {
    const wrapper = mount(TopBar, {
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
  }),
  it("getComponent TopBar", () => {
    const wrapper = shallowMount(TopBar, {
        global: {
          mocks: {
            $t: (msg) => msg
          }
        }
      })
      wrapper.getComponent(TopBar)
  }),
  it('isVisible', () => {
    const wrapper = shallowMount(TopBar, {
        global: {
            mocks: {
                $t: (msg) => msg
            }
        }
      })
    })
})

test('openLandingPage', async () => {
  const wrapper = shallowMount(TopBar, {
    global: {
      mocks: {
        $t: (msg) => msg,
        $router: router,
      }
    },
  })
  await wrapper.vm.openLandingPage();
})

test('openLoginPage', async () => {
  const wrapper = shallowMount(TopBar, {
    global: {
      mocks: {
        $t: (msg) => msg,
        $router: router,
      }
    },
  })
  await wrapper.vm.openLoginPage();
})

test('openRegisterPage', async () => {
  const wrapper = shallowMount(TopBar, {
    global: {
      mocks: {
        $t: (msg) => msg,
        $router: router,
      }
    },
  })
  await wrapper.vm.openRegisterPage();
})

test('openMapPage', async () => {
  const wrapper = shallowMount(TopBar, {
    global: {
      mocks: {
        $t: (msg) => msg,
        $router: router,
      }
    },
  })
  await wrapper.vm.openMapPage();
})

test('openProfilePage', async () => {
  const wrapper = shallowMount(TopBar, {
    global: {
      mocks: {
        $t: (msg) => msg,
        $router: router,
      }
    },
  })
  await wrapper.vm.openProfilePage();
})

test('openMobilePage', async () => {
  const wrapper = shallowMount(TopBar, {
    global: {
      mocks: {
        $t: (msg) => msg,
        $router: router,
      }
    },
  })
  await wrapper.vm.openMobilePage();
})

test('openWebPage', async () => {
  const wrapper = shallowMount(TopBar, {
    global: {
      mocks: {
        $t: (msg) => msg,
        $router: router,
      }
    },
  })
  await wrapper.vm.openWebPage();
})

test('openGroupePage', async () => {
  const wrapper = shallowMount(TopBar, {
    global: {
      mocks: {
        $t: (msg) => msg,
        $router: router,
      }
    },
  })
  await wrapper.vm.openGroupePage();
})

test('engLanguage', async () => {
  const wrapper = shallowMount(TopBar, {
    global: {
      mocks: {
        $t: (msg) => msg,
        $router: router,
        $i18n: i18
      }
    },
  })
  await wrapper.vm.engLanguage();
})

test('frenchLanguage', async () => {
  const wrapper = shallowMount(TopBar, {
    global: {
      mocks: {
        $t: (msg) => msg,
        $router: router,
        $i18n: i18
      }
    },
  })
  await wrapper.vm.frenchLanguage();
})

test('openHomePageNotConnected', async () => {
  const wrapper = shallowMount(TopBar, {
    global: {
      mocks: {
        $t: (msg) => msg,
        $router: router,
      }
    },
    data() {
      return {
        connected: false,
      }
    }
  })
  await wrapper.vm.openHomePage();
})

test('openHomePageConnected', async () => {
  const wrapper = shallowMount(TopBar, {
    global: {
      mocks: {
        $t: (msg) => msg,
        $router: router,
      }
    },
    data() {
      return {
        connected: true,
      }
    }
  })
  await wrapper.vm.openHomePage();
})