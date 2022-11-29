import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useCovidDataStore = defineStore('covidData', () => {
    let data = null

    let loaded = ref(false)

    function setData(veri) {
        data = veri
    }

    function setLoaded() {
        loaded.value = !loaded.value

    }

    const getData = computed(() => data)
    const getLoaded = computed(() => loaded)
    return {data, setData, getData, setLoaded, getLoaded, loaded}
})