<script setup>
import Papa from "papaparse";
// import store from "../store/index.js";
// store.commit('setData',null)
// import {
//   ConvertedDays,
//   getFullData,
//   getPastDays,
//   TurConvertedDays,
//   TurkeyDate
// } from "../composables/CovidDataFunctions.js";
// import {ref} from "vue";
import {useCovidDataStore} from "../store/index.js";
//
// function sumArray(arr) {
//   let sum = 0;
//
//   for (let i = 0; i < arr.length; i++) {
//     sum += Number(arr[i])
//   }
//
//   return sum;
// }
// getPastDays(TurkeyDate, 14)
// const TurConvertedTableData = ref([])
// TurConvertedDays.forEach((elm) => {
//   TurConvertedTableData.value.push(elm.slice(0, 13))
// })
// const VakaSayi = ref(null)
// const OlumSayi = ref(null)
// const covidVeriVaka = ref([])
// const covidVeriOlum = ref([])
// const covidToplamVaka = ref([])
// const covidToplamOlum = ref([])
const store = useCovidDataStore()
// const veri = async (ulke) => {
//   const data = await getFullData()
//
//   if (data) {
//
//
//     ConvertedDays.forEach((tarih) => {
//       data.forEach(elm => {
//         if (elm.date === tarih && elm.location === ulke) {
//           console.log(elm)
//           covidVeriVaka.value.push(elm.new_cases)
//           covidVeriOlum.value.push(elm.new_deaths)
//           covidToplamVaka.value.push(elm.total_cases)
//           covidToplamOlum.value.push(elm.total_deaths)
//         }
//       })
//
//     })
//     covidVeriVaka.value.reverse()
//     covidVeriOlum.value.reverse()
//     VakaSayi.value = sumArray(covidVeriVaka.value)
//     OlumSayi.value = sumArray(covidVeriOlum.value)
//     store.setData(data)
//     store.setLoaded()
//   }
// }
//
// const isLoaded = store.getLoaded
// veri('Turkey')


  Papa.parse("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv", {
    download: true,
    header: true,
      worker: true,

    complete: function(results) {
      const groupedByLocation = results.data.reduce((acc, obj) => {
        if (!acc[obj.location]) {
          acc[obj.location] = [];
        }
        acc[obj.location].push(obj);
        return acc;
      }, {});
      store.setCountryList(Object.keys(groupedByLocation))
      store.setData(groupedByLocation)
      store.setLoaded()

    }

  })

</script>

<template>
<p>Herhangi bir yavaslik durumunda sekmeyi kapatip yeniden acmaniz durumu cozecektir</p>
</template>