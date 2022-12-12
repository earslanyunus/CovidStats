<script setup>
import {
  getFullData,
  ConvertedDays,
  getPastDays,
  Currentdate,
  TurConvertedDays, TurkeyDate, SelectedDays
} from "./composables/CovidDataFunctions.js";
import {useCovidDataStore} from "./store/index.js";
import {DotLoader} from "vue-spinner/src"
import {ref} from "vue";
import ApexCharts from 'apexcharts';
import {tr} from "date-fns/locale";

getPastDays(TurkeyDate, 14)
const TurConvertedTableData = ref([])
TurConvertedDays.forEach((elm) => {
  TurConvertedTableData.value.push(elm.slice(0, 13))
})
const covidVeriVaka = ref([])
const covidVeriOlum = ref([])
const store = useCovidDataStore()
const veri = async (ulke) => {
  const data = await getFullData()

  if (data) {


    ConvertedDays.forEach((tarih) => {
      data.forEach(elm => {
        if (elm.date === tarih && elm.location === ulke) {
          covidVeriVaka.value.push(elm.new_cases)
          covidVeriOlum.value.push(elm.new_deaths)
        }
      })

    })
    store.setData(data)
    store.setLoaded()
  }
}

const isLoaded = store.getLoaded
veri('Turkey')
// APEX CHARTS
const series = [{
  name: 'Vaka',
  data: covidVeriVaka.value
},
  {
    name: 'Ölüm',
    data: covidVeriOlum.value
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
  xaxis: {
    tickPlacement: 'on',
    type: 'category',
    categories: TurConvertedTableData.value
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy'
    }
  }

}
// APEX CHARTS
const updateData = (ulke) => {
  console.log('covidveriolum',covidVeriOlum.value)

  console.log('covidveriolum',covidVeriOlum.value)
  ConvertedDays.forEach((tarih) => {
    store.getData.forEach(elm => {
      if (elm.date === tarih && elm.location === ulke) {
        console.log(elm.new_cases)
        covidVeriVaka.value.push(elm.new_cases)
        covidVeriOlum.value.push(elm.new_deaths)
      }
    })
  })

  series[0].data = covidVeriVaka.value
  series[1].data = covidVeriOlum.value
}

console.log(SelectedDays)
console.log(TurConvertedDays)
console.log(ConvertedDays)
</script>

<template>
  <div v-if="!isLoaded" class="w-screen h-screen flex items-center justify-center flex-col">
    <dot-loader :color="color" :size="'150px'"></dot-loader>
    <p class="mt-8">Veriler Yuklenirken Lutfen Bekleyin...</p>
  </div>
  <div>
    <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
<!--    <button @click="updateData('Germany')">Alamanya Veri</button>-->
  </div>

</template>