import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useCovidDataStore = defineStore('covidData', () => {
    let data = null
    const loaded = ref(false)
    const CountryList = ref('Turkey')
    const SelectedCountry = ref('')

    function setData(veri) {
        data = veri
    }
    function setCountryList(ulke) {
        CountryList.value = ulke
    }
    function setLoaded() {
        loaded.value = !loaded.value

    }
    function setSelectedCountry(country) {
        SelectedCountry.value = country
    }
    const getData = computed(() => data)
    const getLoaded = computed(() => loaded)
    const getCountryList = computed(()=>CountryList)
    const getSelectedCountry = computed(()=>SelectedCountry)
    return {data,SelectedCountry, setData, getData, setLoaded, getLoaded,  CountryList, setCountryList,getSelectedCountry, getCountryList, setSelectedCountry}
})


// import {createStore} from "vuex";
// import createPersistedState from "vuex-persistedstate";


// export default createStore({
//     state: {
//         data: null,
//
//
//     },
//     getters: {
//         _getData: state => state.data,
//
//
//     },
//     mutations: {
//         setData(state, data) {
//             state.data = data
//         }
//
//     },
//     plugins: [createPersistedState()]
// })