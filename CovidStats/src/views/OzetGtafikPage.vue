<script setup>
import {useCovidDataStore} from "../store/index.js";
import {inject, ref, watch} from "vue";
import {tr} from "date-fns/locale";
import TheNavbar from "../components/TheNavbar.vue";
const store = useCovidDataStore()

const ulke = store.getSelectedCountry
watch(ulke,(value, oldValue, onCleanup)=>{
  if (value !==oldValue){
   const StoreSelectedCountry = store.getSelectedCountry.value
  firstLoad(StoreSelectedCountry)}

})
import {Currentdate, getPastDays, ConvertedDaysForTr, TurkeyDate,ConvertedDays,OriginalJsDates} from "../composables/DateFunctions.js";
import {Store} from "vuex";
function sumArray(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += Number(arr[i])
  }

  return sum;
}
getPastDays(Currentdate, 14)
const TurConvertedTableData = ref([])
ConvertedDaysForTr.forEach((elm) => {
  TurConvertedTableData.value.push(elm.slice(0, 13))
})

const VakaSayi = ref(null)
const OlumSayi = ref(null)
const covidVeriVaka = ref([])
const covidVeriOlum = ref([])
const covidToplamVaka = ref([])
const covidToplamOlum = ref([])


const isLoaded = store.getLoaded

// APEX CHARTS
const series = [{
  name: 'Vaka',
  data: covidVeriVaka
},
  {
    name: 'Ölüm',
    data: covidVeriOlum
  }]
const chartOptions = {
  chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
    legend:{
    position:'top'
    },
  xaxis: {
    tickPlacement: 'on',
    type: 'category',
    categories:[]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy'
    }
  }

}
// APEX CHARTS


const firstLoad = (country)=>{
  covidVeriVaka.value=[]
  covidVeriOlum.value=[]
  const SelectedCountryArray = store.getData[country]
  ConvertedDays.forEach((tarih) => {
    SelectedCountryArray.forEach(elm => {
      if (elm.date === tarih && elm.location === store.getSelectedCountry.value) {
        covidVeriVaka.value.push(Number(elm.new_cases))
        covidVeriOlum.value.push(Number(elm.new_deaths))
        covidToplamOlum.value.push(Number(elm.total_deaths))
        covidToplamVaka.value.push(Number(elm.total_cases))

      }

    })

  })
  covidVeriVaka.value.reverse()
  covidVeriOlum.value.reverse()
  covidToplamVaka.value.reverse()
  covidToplamOlum.value.reverse()
  VakaSayi.value = sumArray(covidVeriVaka.value)
  OlumSayi.value = sumArray(covidVeriOlum.value)
}
firstLoad(store.getSelectedCountry.value)


</script>

<template>
  <div class="container mx-auto mt-24">




  <div v-if="isLoaded">
    <h3 class="font-bold text-2xl">Son 14 Gün Verileri</h3>
    <p class="font-semibold text-xl text-gray-300">TÜRKİYE</p>
    <div class="flex justify-between mt-5">
      <div class="w-1/3">
        <p  class="font-medium text-lg text-gray-500">Vaka</p>
        <p class="font-bold text-[1.75rem]">{{VakaSayi}}</p>
      </div>
      <div class="w-1/3">
        <p  class="font-medium text-lg text-gray-500">Ölüm</p>
        <p class="font-bold text-[1.75rem]">{{OlumSayi}}</p>
      </div>
    </div>
    <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
    <div class="flex flex-col">
      <div class="flex justify-between items-center w-full  border-b-2 pb-2">
        <div class="flex flex-col">
          <p class="text-sm text-gray-500">Toplam Vaka</p>
          <p class="text-[0.5rem] text-gray-500">Mart 2020 itibariyle</p>
        </div>
        <div>
          <p class="text-base">{{Number(covidToplamVaka[0])}}</p>
        </div>
      </div>
      <div class="flex justify-between items-center w-full  border-b-2 pb-2 mt-2">
        <div class="flex flex-col">
          <p class="text-sm text-gray-500">Toplam Ölüm</p>
          <p class="text-[0.5rem] text-gray-500">Mart 2020 itibariyle</p>
        </div>
        <div>
          <p class="text-base">{{Number(covidToplamOlum[0])}}</p>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>