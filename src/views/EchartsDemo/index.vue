<template>
  <div class="b">
    <div class="a">
    <ECharts :type="'pie'" :Option="result"/>
  </div>
  <div class="a">
    <ECharts :type="'pie'" :Option="result"/>
  </div>
  <div class="a">
    <ECharts :type="'pie'" :Option="result"/>
  </div>
  <div class="a">
    <ECharts :type="'pie'" :Option="result"/>
  </div>
  </div>
  
  
</template>

<script setup>
import { getPieData } from '@/api/EchartsMock';
import ECharts from '@/components/Echarts/Echarts.vue';

const result = ref({})



getPieData().then(res =>{
    result.value = res
    console.log(result.value);
})

</script>

<style>
.b{
  display: flex;
}
.a{
  width: 500px;
  height: 400px;
  
}
</style>