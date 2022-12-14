import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useCovidDataStore = defineStore('covidData', () => {
    let data = null
    const loaded = ref(false)
    const selectedCountry = ref('Turkey')

    function setData(veri) {
        data = veri
    }
    function setCountry(ulke) {
        selectedCountry.value = ulke
    }
    function setLoaded() {
        loaded.value = !loaded.value

    }

    const getData = computed(() => data)
    const getLoaded = computed(() => loaded)
    const getSelectedCountry = computed(()=>selectedCountry)
    return {data, setData, getData, setLoaded, getLoaded, loaded,selectedCountry,setCountry,getSelectedCountry}
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