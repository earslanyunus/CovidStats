<script setup>
import DotLoader from "vue-spinner/src/DotLoader.vue"
import TheNavbar from "./components/TheNavbar.vue";
import TheFooter from "./components/TheFooter.vue";
import {useCovidDataStore} from "./store/index.js";
const store = useCovidDataStore()

</script>
<template>
  <div v-if="!store.getLoaded.value" class="w-screen bg-white h-screen absolute top-0 left-0 flex items-center justify-center flex-col">
    <dot-loader :color="color" :size="'150px'"></dot-loader>
    <p class="mt-8">Veriler Yuklenirken Lutfen Bekleyin...</p>
  </div>
  <TheNavbar/>
  <router-view >
  </router-view>
  <the-footer/>
</template>