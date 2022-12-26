<script setup>
import {useCovidDataStore, VaccineStore} from "../store/index.js";
import {onMounted, ref, watch} from "vue";
const store = useCovidDataStore()
const Vaccine = VaccineStore()
const ulke = store.getSelectedCountry
watch(ulke, (value, oldValue, onCleanup) => {
  if (value !== oldValue) {
    const StoreSelectedCountry = store.getSelectedCountry.value
    firstLoad(StoreSelectedCountry)
  }

})
import {
  Currentdate,
  getPastDays,
  ConvertedDaysForTr,
  TurkeyDate,
  ConvertedDays,
  OriginalJsDates
} from "../composables/DateFunctions.js";
import {Store} from "vuex";
import VaccineCard from "../components/VaccineCard.vue";

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
  legend: {
    position: 'top'
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
// // APEX CHARTS


const firstLoad = (country) => {
  LastData.value = {}
  vaccineVeri.value = null
  covidVeriVaka.value = []
  covidVeriOlum.value = []
  const SelectedCountryArray = store.getData[country]

  const SelectedCountryVaccineArray = Vaccine.getVaccineData[country]
  console.log(SelectedCountryVaccineArray)
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
  ConvertedDays.forEach((tarih) => {


    SelectedCountryArray.forEach((elm, i, array) => {
      if (elm.date === tarih && elm.location === store.getSelectedCountry.value) {
        if (i === array.length - 1) {
          LastData.value = elm

        }
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

// number dot formatter
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


</script>

<template>
  <div class="container mx-auto mt-24">


    <div v-if="isLoaded">
      <h3 class="font-bold text-2xl">Son 14 Gün Verileri</h3>
      <p class="font-semibold text-xl text-gray-300">{{store.getSelectedCountry.value.replace(/'/g, '')}}</p>
      <div class="flex justify-between mt-5">
        <div class="w-1/3">
          <p class="font-medium text-lg text-gray-500">Vaka</p>
          <p class="font-bold text-[1.75rem]">{{ VakaSayi }}</p>
        </div>
        <div class="w-1/3">
          <p class="font-medium text-lg text-gray-500">Ölüm</p>
          <p class="font-bold text-[1.75rem]">{{ OlumSayi }}</p>
        </div>
      </div>
      <div id="myChart"></div>
      <v-chart :option="options"/>
            <apexchart type="area" width="100%" height="350" :options="chartOptions" :series="series"></apexchart>
      <div class="flex flex-col">
        <div class="flex justify-between items-center w-full  border-b-2 pb-2">
          <div class="flex flex-col">
            <p class="text-sm text-gray-500">Toplam Vaka</p>
            <p class="text-[0.5rem] text-gray-500">Mart 2020 itibariyle</p>
          </div>
          <div>
            <p class="text-base">{{ Number(covidToplamVaka[0]) }}</p>
          </div>
        </div>
        <div class="flex justify-between items-center w-full  border-b-2 pb-2 mt-2">
          <div class="flex flex-col">
            <p class="text-sm text-gray-500">Toplam Ölüm</p>
            <p class="text-[0.5rem] text-gray-500">Mart 2020 itibariyle</p>
          </div>
          <div>
            <p class="text-base">{{ Number(covidToplamOlum[0]) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-16">
      <h3 class="font-bold text-2xl">Aşılama</h3>
      <p class="font-semibold text-sm text-gray-300">Son Veriler</p>
      <div class="flex gap-3">
        <div class="w-1/3 drop-shadow-md rounded p-8 bg-white">
          <h3 class="font-bold text-2xl mb-6">Aşılama Sureci Tamamlananlar</h3>
          <p class=" text-sm font-light">Uygulanan Kisi sayisi<span class="font-bold ml-4">{{numberWithCommas(Number(vaccineVeri.people_fully_vaccinated))}}</span></p>
          <p class=" mt-4 text-sm font-light">Uygulanma Orani<span class="font-bold ml-4">{{Number(vaccineVeri.people_fully_vaccinated_per_hundred)}}%</span></p>
          <div class="mt-2 w-full h-[12px] rounded bg-blue-300">
            <div :style="{'width':`${(Number(vaccineVeri.people_fully_vaccinated_per_hundred))}%`}" class=" h-full rounded bg-blue-600"></div>
          </div>

        </div>
        <div class="w-1/3 drop-shadow-md rounded p-8 bg-white">
          <h3 class="font-bold text-2xl mb-6">En Az 1 Doz Asi Olanlar</h3>
          <p class=" text-sm font-light">Uygulanan Kisi sayisi<span class="font-bold ml-4">{{numberWithCommas(Number(vaccineVeri.people_vaccinated))}}</span></p>
          <p class=" mt-4 text-sm font-light">Uygulanma Orani<span class="font-bold ml-4">{{Number(vaccineVeri.people_vaccinated_per_hundred)}}%</span></p>
          <div class="mt-2 w-full h-[12px] rounded bg-blue-300">
            <div :style="{'width':`${(Number(vaccineVeri.people_vaccinated_per_hundred))}%`}" class=" h-full rounded bg-blue-600"></div>
          </div>

        </div>
        <div class="w-1/3 drop-shadow-md rounded p-8 bg-white flex flex-col justify-between">
          <h3 class="font-bold text-2xl mb-6">Toplam Doz Sayisi</h3>
          <p class="font-bold text-3xl">{{numberWithCommas(Number(vaccineVeri.total_vaccinations))}}</p>


        </div>
<!--        <vaccine-card
            :data="{
        value1: vaccineVeri.people_fully_vaccinated,
            value2: vaccineVeri.people_fully_vaccinated_per_hundred
        }"
            :text="{
                        heading:'Aşılama Sureci Tamamlananlar',
                        countText:'Uygulanan Kisi sayisi',
                        rateText:'Uygulanma Orani'
                      }"
        />
        <vaccine-card
            :data="{
        value1: vaccineVeri.people_vaccinated,
            value2: vaccineVeri.people_vaccinated_per_hundred
        }"
            :text="{
                        heading:'En az 1 Doz Aşı Olanlar',
                        countText:'Uygulanan Kisi sayisi',
                        rateText:'Uygulanma Orani'
                      }"
        />-->

      </div>
    </div>
  </div>

</template>