<template>
  <div class="b">
    <!-- <div class="a">
    <ECharts :type="'pie'" :Option="result"/>
  </div> -->
  <div class="a">
    <ECharts :type="'bar'" :Option="result2"/>
  </div>
  <!-- <div class="a">
    <ECharts :type="'pie'" :Option="result"/>
  </div>
  <div class="a">
    <ECharts :type="'pie'" :Option="result"/>
  </div> -->
  </div>
  
  
</template>

<script setup>
import { getPieData,getBarData,getLineData,getLinesData } from '@/api/EchartsMock';
import ECharts from '@/components/Echarts/Echarts.vue';

const result = ref({})
const result2 = ref({})

getPieData().then(res =>{
    result.value = res
    console.log(result.value);
})

getBarData().then(res =>{
  result2.value = res
    console.log(result2.value);
})
</script>

<style>
/* .b{
  display: flex;
} */
.a{
  width: 800px;
  height: 500px;
}
</style>