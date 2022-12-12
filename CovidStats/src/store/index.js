import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useCovidDataStore = defineStore('covidData', () => {
    const data = ref(null)
    const loaded = ref(false)
    const selectedCountry = ref('Turkey')

    function setData(veri) {
        data.value = veri
    }
    function setCountry(ulke) {
        selectedCountry.value = ulke
    }
    function setLoaded() {
        loaded.value = !loaded.value

    }

    const getData = computed(() => data.value)
    const getLoaded = computed(() => loaded)
    const getSelectedCountry = computed(()=>selectedCountry)
    return {data, setData, getData, setLoaded, getLoaded, loaded,selectedCountry,setCountry,getSelectedCountry}
})