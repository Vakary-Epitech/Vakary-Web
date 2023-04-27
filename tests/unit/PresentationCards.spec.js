import { mount } from '@vue/test-utils'
import PresentationCards from '@/components/UI/PresentationCards.vue'
import i18n from '../../src/i18n.js'
import { createRouter, createWebHistory } from 'vue-router'

const mockRouter = {
    push: jest.fn()
}

describe('PresentationCards', () => {
    let wrapper
    const router = createRouter({
        history: createWebHistory(),
        routes: [
            {
                path: '/',
                name: 'PresentationCards',
                component: PresentationCards,
            },
            {
                path: '/connexionPage',
                name: 'ConnexionPage'
            },
        ]
    })
    
    beforeEach(() => {
        wrapper = mount(PresentationCards, {
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
})