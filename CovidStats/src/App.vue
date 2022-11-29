<script setup>
import {getFullData} from "./composables/CovidDataFunctions.js";
import {useCovidDataStore} from "./store/index.js";
import {DotLoader} from "vue-spinner/src"

const store = useCovidDataStore()
const veri = async () => {
  const data = await getFullData()
  if (data) {
    store.setData(data)
    store.setLoaded()
  }
}
const isLoaded = store.getLoaded
veri()
</script>

<template>
  <div v-if="!isLoaded" class="w-screen h-screen flex items-center justify-center flex-col">
  <dot-loader  :color="color" :size="'150px'"></dot-loader>
    <p class="mt-8">Veriler Yuklenirken Lutfen Bekleyin...</p>
  </div>
</template>