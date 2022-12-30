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


const vaccineVeri = ref([])
const dailyPeopleVaccinatedFirstDose = ref([])
const dailyNewVaccinations = ref([])
const totalDoses = ref([])
const selectedDates = ref([])


const isLoaded = store.getLoaded


const firstLoad = (country) => {
  vaccineVeri.value = []
  dailyPeopleVaccinatedFirstDose.value = []
  const SelectedCountryArray = store.getData[country]
  const SelectedCountryVaccineArray = Vaccine.getVaccineData[country]
  SelectedCountryVaccineArray.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateA - dateB;
  });
  selectedDates.value.forEach(tarih=>{

    SelectedCountryVaccineArray.forEach((elm, i, array) => {
      if (elm.location === store.getSelectedCountry.value&&elm.date == tarih) {
        console.log(elm)
        vaccineVeri.value.push(elm)



      }
    })
    vaccineVeri.value.forEach(elm=>{
      dailyPeopleVaccinatedFirstDose.value.push(elm.daily_people_vaccinated)
      totalDoses.value.push(elm.total_vaccinations)
      dailyNewVaccinations.value.push(elm.daily_vaccinations)
    })
  })



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
const firstDoseSeries = [{
  name: 'Ilk Doz',
  data: dailyPeopleVaccinatedFirstDose
}]
const vaccinationChartOption = {
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
  colors:["#9321cc"]

}
const totalVaccinationSeries = [{
  name: 'Toplam Doz',
  data: totalDoses
}]

// // APEX CHARTS


</script>
<template>
  <div class="container mx-auto">
    <Datepicker v-model="date" range locale="tr" format="dd/MM/yyyy" @update:modelValue="handleDate"
                :enable-time-picker="false" class="w-1/3 "/>


    <div class="w-full mt-8">
      <div class="flex justify-between">
        <div>
          <h3 class="font-bold text-2xl">Ilk Asi Dozunu Alan Insan Sayisi</h3>
          <p class="font-semibold text-md text-gray-300">{{ store.getSelectedCountry.value.replace(/'/g, '') }}</p>
        </div>

        <div class="flex gap-8">
          <div class="flex text-center flex-col">
            <h4 class="font-medium">Mart 2020 Itibariyle</h4>
            <p class="text-purple-500">{{vaccineVeri[vaccineVeri.length-1]?.people_vaccinated}}</p>
          </div>
          <div class="flex text-center flex-col">
            <h4 class="font-medium">Tarih Araliginda</h4>
            <p class="text-purple-500">{{ sumArray(dailyPeopleVaccinatedFirstDose) }}</p>
          </div>

        </div>
      </div>

      <apexchart type="area" width="100%" height="350" :options="vaccinationChartOption" :series="firstDoseSeries"
                 :datetimeUTC=false></apexchart>
    </div>
    <div class="w-full mt-8">
      <div class="flex justify-between">
        <div>
          <h3 class="font-bold text-2xl">Toplam Doz Sayisi</h3>
          <p class="font-semibold text-md text-gray-300">{{ store.getSelectedCountry.value.replace(/'/g, '') }}</p>
        </div>

        <div class="flex gap-8">
          <div class="flex text-center flex-col">
            <h4 class="font-medium">Mart 2020 Itibariyle</h4>
            <p class="text-purple-500">{{vaccineVeri[vaccineVeri.length-1]?.total_vaccinations}}</p>
          </div>
          <div class="flex text-center flex-col">
            <h4 class="font-medium">Tarih Araliginda</h4>
            <p class="text-purple-500">{{ sumArray(dailyNewVaccinations) }}</p>
          </div>

        </div>
      </div>

      <apexchart type="area" width="100%" height="350" :options="vaccinationChartOption" :series="totalVaccinationSeries"
                 :datetimeUTC=false></apexchart>
    </div>


  </div>
</template>