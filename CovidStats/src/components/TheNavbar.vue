<script setup>
import vSelect from 'vue-select'
import "vue-select/dist/vue-select.css";

import {useCovidDataStore} from "../store/index.js";
import {provide, ref, watch} from "vue";
const store = useCovidDataStore()
const countries = store.getCountryList.value
function setSelected(value){
  store.setSelectedCountry(value)
}
</script>
<template>
  <nav class="flex justify-between items-center container mx-auto mt-6">
    <div class="flex items-center">

        <p class="text-[32px] font-bold mr-20">COVIDSTATS</p>

      <router-link class="font-bold text-sm mr-6" :to="{name:'OzetPage'}">Özet Grafik</router-link>
      <router-link class="font-bold text-sm mr-6" :to="{name:'DetailPage'}">Detaylı Grafik</router-link>
      <router-link class="font-bold text-sm mr-6" :to="{name:'VaccinePage'}">Aşı Verileri</router-link>
    </div>
    <div>
      <v-select class="w-56"  v-if="store.getLoaded.value" :options="store.getCountryList.value" :v-model="store.SelectedCountry" @option:selecting="setSelected" placeholder="Lutfen Ulke Seciniz"></v-select>
    </div>
  </nav>
</template>

