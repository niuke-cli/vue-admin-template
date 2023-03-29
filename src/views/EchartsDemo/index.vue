<template>
  <div class="b">
    <div class="a">
    <ECharts :type="'pie'" :Option="result"/>
  </div>
  <div class="a">
    <ECharts :type="'bar'" :Option="result2"/>
  </div>
  <div class="a">
    <ECharts :type="'lines'" :Option="result3"/>
  </div>
  <!-- <div class="a">
    <ECharts :type="'pie'" :Option="result"/>
  </div> -->
  </div>
  
  
</template>

<script setup>
import { getPieData,getBarData,getLineData,getLinesData } from '@/api/EchartsMock';
import ECharts from '@/components/Echarts/Echarts.vue';

const result = ref({})
const result2 = ref({})
const result3 = ref({})

getPieData().then(res =>{
    result.value = res.data
    console.log(result.value);
})

getBarData().then(res =>{
  result2.value = res.data
    console.log(result2.value);
})

getLinesData().then(res =>{
  result3.value = res.data
    console.log(result3.value);
})
</script>

<style>
.b{
  display: flex;
}
.a{
  width: 700px;
  height: 500px;
}
</style>