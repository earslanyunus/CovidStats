<script setup>
import {useCovidDataStore, VaccineStore} from "../store/index.js";
import {ref, watch} from "vue";

const store = useCovidDataStore()
const Vaccine = VaccineStore()
const ulke = store.getSelectedCountry
import Datepicker from '@vuepic/vue-datepicker'


import {
  Currentdate,
  getPastDays,
  ConvertedDaysForTr,
  TurkeyDate,
  ConvertedDays,
  OriginalJsDates
} from "../composables/DateFunctions.js";


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
const vaccineVeri = ref(null)
const LastData = ref()
const selectedDates = ref([])


const isLoaded = store.getLoaded


const firstLoad = (country) => {
  LastData.value = {}
  vaccineVeri.value = null
  covidVeriVaka.value = []
  covidVeriOlum.value = []
  const SelectedCountryArray = store.getData[country]
  const SelectedCountryVaccineArray = Vaccine.getVaccineData[country]
  SelectedCountryVaccineArray.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateA - dateB;
  });
  SelectedCountryVaccineArray.forEach((elm, i, array) => {
    if (elm.location === store.getSelectedCountry.value) {
      if (i === array.length - 1) {
        vaccineVeri.value = elm
      }

    }
  })
  selectedDates.value.forEach((tarih) => {


    SelectedCountryArray.forEach((elm, i, array) => {
      if (elm.date === tarih && elm.location === store.getSelectedCountry.value) {
        console.log(elm)
        if (i === array.length - 1) {
          console.log(elm)
          LastData.value = elm

        }
        covidVeriVaka.value.push(Number(elm.new_cases))
        covidVeriOlum.value.push(Number(elm.new_deaths))
        covidToplamOlum.value.push(Number(elm.total_deaths))
        covidToplamVaka.value.push(Number(elm.total_cases))

      }

    })

  })

  VakaSayi.value = sumArray(covidVeriVaka.value)
  OlumSayi.value = sumArray(covidVeriOlum.value)

}
firstLoad(store.getSelectedCountry.value)

// number dot formatter
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


const date = ref()

function getDateRange(startDate, endDate) {
  const dateArray = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate = new Date(currentDate).setDate(new Date(currentDate).getDate() + 1);
  }
  return dateArray;
}

const handleDate = (modelData) => {


}

watch(date, () => {
  selectedDates.value = []
  const convertedDays = []
  date.value.forEach(elm => {
    const formattedDate = `${elm.getFullYear()}-${(elm.getMonth()).toString().padStart(2, '0')}-${elm.getDate().toString().padStart(2, '0')}`;
    convertedDays.push(formattedDate)

  })
  const startDate = new Date(convertedDays[0].slice(0, 4), convertedDays[0].slice(5, 7), convertedDays[0].slice(8, 10))
  const endDate = new Date(convertedDays[1].slice(0, 4), convertedDays[1].slice(5, 7), convertedDays[1].slice(8, 10))
  const dateRange = getDateRange(startDate, endDate)
  dateRange.forEach(elm => {

    const formattedDate = `${elm.getFullYear()}-${(elm.getMonth() + 1).toString().padStart(2, '0')}-${elm.getDate().toString().padStart(2, '0')}`
    selectedDates.value.push(formattedDate)
  })
  const StoreSelectedCountry = store.getSelectedCountry.value
  firstLoad(StoreSelectedCountry)

})


watch(ulke, (value, oldValue, onCleanup) => {
  if (value !== oldValue) {
    const StoreSelectedCountry = store.getSelectedCountry.value
    firstLoad(StoreSelectedCountry)
  }

})

// APEX CHARTS
const vakaSeries = [{
  name: 'Vaka',
  data: covidVeriVaka
}]
const vakaChartOptions = {
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
  legend: {
    position: 'top'
  },
  xaxis: {
    tickPlacement: 'on',
    type: 'category',
    categories: selectedDates
  },

}
const olumSeries = [{
  name: 'Ölüm',
  data: covidVeriOlum
}]
const olumChartOptions = {
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
  legend: {
    position: 'top'
  },
  xaxis: {
    tickPlacement: 'on',
    type: 'category',
    categories: selectedDates
  },
  colors:['#EF5858', '#ae3f3f']
}
// // APEX CHARTS


</script>
<template>
  <div class="container mx-auto">
    <Datepicker v-model="date" range locale="tr" format="dd/MM/yyyy" @update:modelValue="handleDate"
                :enable-time-picker="false" class="w-1/3 "/>


      <div class="w-full mt-8">
        <div class="flex justify-between">
          <div>
            <h3 class="font-bold text-2xl">Vaka</h3>
            <p class="font-semibold text-md text-gray-300">{{ store.getSelectedCountry.value.replace(/'/g, '') }}</p>
          </div>

        <div class="flex gap-8">
          <div class="flex text-center flex-col">
            <h4 class="font-medium">Mart 2020 Itibariyle</h4>
            <p class="text-blue-500">{{ covidToplamVaka[covidVeriVaka.length - 1]}}</p>
          </div>
          <div class="flex text-center flex-col">
            <h4 class="font-medium">Tarih Araliginda</h4>
            <p class="text-blue-500">{{ VakaSayi.toLocaleString() }}</p>
          </div>

        </div>
        </div>
        <apexchart type="area" width="100%" height="350" :options="vakaChartOptions" :series="vakaSeries"
                   :datetimeUTC=false></apexchart>
      </div>
      <div class="w-full mt-8">
        <div class="flex justify-between">
          <div>
            <h3 class="font-bold text-2xl">Ölüm</h3>
            <p class="font-semibold text-md text-gray-300">{{ store.getSelectedCountry.value.replace(/'/g, '') }}</p>
          </div>

        <div class="flex gap-8">
          <div class="flex text-center flex-col">
            <h4 class="font-medium">Mart 2020 Itibariyle</h4>
            <p class="text-red-500">{{ covidToplamOlum[covidVeriVaka.length - 1]}}</p>
          </div>
          <div class="flex text-center flex-col">
            <h4 class="font-medium">Tarih Araliginda</h4>
            <p class="text-red-500">{{ OlumSayi.toLocaleString() }}</p>
          </div>

        </div>
        </div>
        <apexchart type="area" width="100%" height="350" :options="olumChartOptions" :series="olumSeries"
                   :datetimeUTC=false></apexchart>
      </div>



  </div>
</template>