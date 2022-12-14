<script setup>

</script>
<template>
  <nav class="flex justify-between items-center container mx-auto mt-6">
    <div class="flex items-center">
      <router-link to="/">
        <p class="text-[32px] font-bold mr-20">COVIDSTATS</p>
      </router-link>
      <router-link class="font-bold text-sm mr-6" :to="{name:'OzetPage'}">Özet Grafik</router-link>
      <router-link class="font-bold text-sm mr-6" :to="{name:'DetailPage'}">Detaylı Grafik</router-link>
      <router-link class="font-bold text-sm mr-6" :to="{name:'VaccinePage'}">Aşı Verileri</router-link>
    </div>
  </nav>
</template>