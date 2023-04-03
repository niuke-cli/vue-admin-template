  <template>
  <v-chart class="chart" :option="pieData" autoresize v-if="type === 'pie'" />
  <v-chart class="chart" :option="barData" autoresize v-if="type === 'bar'" />
  <!-- <v-chart class="chart" :option="lineData" autoresize v-if="type === 'line'" /> -->
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

import theme from './them.json';
provide(THEME_KEY, theme);
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
  if (value !== undefined && value !== null && value !== {}) {
    pieData.value = chartsConfig.pie(value);
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
  if (value !== undefined && value !== null && value !== {}) {
    if ( value.series) {
      value.series.forEach(element => {
      element['type'] = 'bar'
    });
    }
    barData.value = chartsConfig.bar(value);
  }
};
const linesOption = (value) => {
  if (value.series !== undefined && value !== null && value !== {}) {
        if ( value.series.length > 0) {
          value.series.forEach(element => {
          element['type'] = 'line'
        });
    }
    linesData.value = chartsConfig.lines(value);
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

</script>
  
  <style scoped>
.chart {
  height: 100% !important;
  width: 100% !important;
}
</style>
  