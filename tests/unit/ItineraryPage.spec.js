import { shallowMount, mount } from '@vue/test-utils'
import ItineraryModal from '@/components/UI/ItineraryModal.vue'
import Vuex from 'vuex'
import store from '../../src/store/store.js'
import i18 from '../../src/i18n.js'
import router from '../../src/router/index.js'
import { waitFor } from '@testing-library/vue'


test('wrong password ItineraryModal', async () => {
    const wrapper = shallowMount(ItineraryModal, {
        global: {
            mocks: {
                $store: store,
                $t: (msg) => msg,
                $route: router
            }
        },
        data() {
            return {
                date: "",
                timeOfStart: "00:00",
                timeOfEnd: "00:00",
                budget: 0,
                people: 1,
                days: 1,
                city: "",
                children: 0,
                indexOfGroup: 0,
                possibleType: [
                    { id: 1, POIType: "Sites culturel" },
                    { id: 2, POIType: "Points d'intérêt" },
                    { id: 3, POIType: "Bâtiments remarquable" },
                    { id: 4, POIType: "Sites religieux" },
                    { id: 5, POIType: "Places intéressante" },
                    { id: 6, POIType: "Parcs et jardins" },
                    { id: 7, POIType: "Lieux de mémoire" },
                    { id: 8, POIType: "Cimetières militaire" },
                    { id: 9, POIType: "Sites archéologique" },
                    { id: 10, POIType: "Evenements sportif" },
                    { id: 11, POIType: "Evenements divertissant" }
                ],
            }
        }
    })

    await wrapper.vm.setIndex(0);
    await wrapper.vm.next();    
    await wrapper.vm.prev();

    await wrapper.vm.generateItinerary();

    await wrapper.vm.setIndex(0);
    await wrapper.vm.prev();
    await wrapper.vm.next();


    await wrapper.vm.setIndex(-8);
    await wrapper.vm.next();    
    await wrapper.vm.prev();

    await wrapper.vm.setIndex(4);
    await wrapper.vm.prev();
    await wrapper.vm.next();

    await new Promise((r) => setTimeout(r, 2000));
})