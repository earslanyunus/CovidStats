<script>
import {ref, toRefs, watch} from "vue";

export default {
  props:{
    data: Object,
    text: Object
  },

  setup(props) {

    const {value1,value2} = toRefs(props.data)
    const {heading,countText,rateText} = props.text
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    console.log(props.data)
    watch(props.data, (value, oldValue, onCleanup) => {
      console.log(props.data)
    })
    return {
      value1,
      value2,
      numberWithCommas,
      heading,
      countText,
      rateText
    }
  }
}
</script>

<template>
  <div class="w-1/3 drop-shadow-md rounded p-8 bg-white">
    <h3 class="font-bold text-2xl mb-6">{{ heading }}</h3>
    <p class=" text-sm font-light">{{countText}}<span class="font-bold ml-4">{{numberWithCommas(Number(value1))}}</span></p>
    <p class=" mt-4 text-sm font-light">{{ rateText }}<span class="font-bold ml-4">{{Number(value2)}}%</span></p>
    <div class="mt-2 w-full h-[12px] rounded bg-blue-300">
      <div :style="{'width':`${(Number(value2))}%`}" class=" h-full rounded bg-blue-600"></div>
    </div>

  </div>

</template>


