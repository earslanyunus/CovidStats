<script setup>
import {useCovidDataStore} from "../store/index.js";
import {ref, watch} from "vue";
import ApexCharts from 'apexcharts';
import {tr} from "date-fns/locale";
import TheNavbar from "../components/TheNavbar.vue";
const store = useCovidDataStore()


// APEX CHARTS
const series = [{
  name: 'Vaka',
  data: []
},
  {
    name: 'Ölüm',
    data: []
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
    categories: []
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy'
    }
  }

}
// APEX CHARTS
console.log(store.getSelectedCountry)

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
    <!--    <button @click="updateData('Germany')">Alamanya Veri</button>-->
  </div>
  </div>

</template>