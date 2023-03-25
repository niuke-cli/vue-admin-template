  <template>
  <v-chart class="chart" :option="pieData" autoresize v-if="type === 'pie'" />
  <v-chart class="chart" :option="barData" autoresize v-if="type === 'bar'" />
  <v-chart class="chart" :option="lineData" autoresize v-if="type === 'line'" />
  <v-chart
    class="chart"
    :option="linesData"
    autoresize
    v-if="type === 'lines'"
  />
</template>
<script setup>

import chartsConfig from "./Echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart, LineChart } from "echarts/charts";
import {ToolboxComponent,GridComponent,DataZoomComponent,TitleComponent,TooltipComponent,LegendComponent,} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";
use([ToolboxComponent,GridComponent,DataZoomComponent,CanvasRenderer,PieChart,BarChart,LineChart,TitleComponent,TooltipComponent,LegendComponent,]);
provide(THEME_KEY, "dark");

const pieData = ref({});
const barData = ref({});
const lineData = ref({});
const linesData = ref({});
/**
   * Echarts图表组件
   * @type  图表类型
   * pie   饼图   
     bar   柱状图  
     line  折线图  
     lines 折线图-多条线  待新增
     lineBar折柱图        待新增
   */
const props = defineProps({
  // 图表类型
  type: {
    type: String,
    default: "",
  },
  // 传递的数据
  Option: {
    type: Object,
    default: function () {
      return {};
    },
  },
  // Y轴是否以1%-100%的形式展示
  percentage: {
    type: Boolean,
    defalut: false,
  },
});

/**
 * @param pie图数据结构
 * {
    "title": "天争之称观",
    "series": [
        {
            "value": 75,
            "name": "林"
        },
        {
            "value": 97,
            "name": "七"
        },
        {
            "value": 86,
            "name": "比"
        }
    ]
}
*/
const pieOption = (value) => {
  if (value !== undefined) {
    console.log(value);
    pieData.value = chartsConfig.pie(value);
    console.log(pieData);
  }
};
/**
 * @param bar图接收数据结构
 * {
  "data": {
    "time": [
      "string",
      "string"
    ],
    "series": [
      {
        "name": "string",
        "type": "bar",
        "data": [
          0,
          0
        ]
      },
      {
        "name": "string",
        "type": "bar",
        "data": [
          0,
          0
        ]
      }
    ]
  }
}
*/
const barOption = (value) => {
  if (value !== undefined) {
    console.log(value);
    barData.value = chartsConfig.bar(value.data);
    console.log(barData);
  }
};
const lineOption = (value) => {
  if (value !== undefined) {
    console.log(value);
    lineData.value = chartsConfig.line(value);
    console.log(lineData);
  }
};
const linesOption = (value) => {
  if (value !== undefined) {
    console.log(value);
    linesData.value = chartsConfig.lines(value);
    console.log(linesData);
  }
};

// 监听传入的图表类型
watch(
  () => props.Option,
  (newVal, oldVal) => {
    switch (props.type) {
      case "pie":
        pieOption(newVal);
        break;
      case "bar":
        barOption(newVal);
        break;
      case "line":
        lineOption(newVal);
        break;
      case "lines":
        linesOption(newVal);
        break;
    }
  },
  {
    immediate: true, // 立即执行
    deep: true, // 深度监听
  }
);

// const option = ref({
//   title: {
//     text: 'Traffic Sources',
//     left: 'center',
//   },
//   tooltip: {
//     trigger: 'item',
//     formatter: '{a} <br/>{b} : {c} ({d}%)',
//   },
//   legend: {
//     orient: 'vertical',
//     left: 'left',
//     data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
//   },
//   series: [
//     {
//       name: 'Traffic Sources',
//       type: 'pie',
//       radius: '55%',
//       center: ['50%', '60%'],
//       data: [
//         { value: 335, name: 'Direct' },
//         { value: 310, name: 'Email' },
//         { value: 234, name: 'Ad Networks' },
//         { value: 135, name: 'Video Ads' },
//         { value: 1548, name: 'Search Engines' },
//       ],
//       emphasis: {
//         itemStyle: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: 'rgba(0, 0, 0, 0.5)',
//         },
//       },
//     },
//   ],
// });
</script>
  
  <style scoped>
.chart {
  height: 100% !important;
  width: 100% !important;
}
</style>
  