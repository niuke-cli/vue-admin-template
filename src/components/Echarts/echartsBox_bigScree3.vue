<template>
  <div class="charts-box">
    <div v-if="type == 'pie'" class="charts-item">
      <ECharts class="echarts" :options="pie" :theme="theme" autoresize />
    </div>
    <!-- <div v-if="type == 'line'" class="charts-item">
      <ECharts class="echarts" :options="line" :theme="theme" autoresize />
    </div> -->
    <div v-if="type == 'lines'" class="charts-item">
      <!-- 选择框 -->
      <div class="chart-item-legend">

        <el-select class="screen-select screen-select-multiple" popper-class="screen-select" v-model="selectList"
          multiple collapse-tags @change="changeselect">
          <el-option v-for="item in selectArr" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>

      </div>
      <ECharts class="echarts-lines" :options="lines" :theme="theme" autoresize />
    </div>

    <div v-if="type == 'lineBar'" class="charts-item">
      <ECharts class="echarts-lines" :options="lineBar" :theme="theme" autoresize @datazoom="onDataZoom($event)" />
    </div>
  </div>
</template>

<script>
/**
 * 图表组件

 * @property {String}	 	  theme       主题,默认深色 (深色：dark-theme， 浅色：default-theme)
 * @property {Array}	 	  type        类型 
    pie   饼图
    bar   柱状图  TODO 待新增
    line  折线图  TODO 待新增
    lines 折线图-多条线

 * @property {Object}	 	  pieOption   饼图传的数据 
   pieOption: {
    legendData: [],
    seriesData: [],
    pieCenterText: '',
    tipTitle: ''
   }

 * @property {Object}	 	  linesOption  折线图-多线传的数据 
   linesOption: {
    info: {
      xdata: [],              // x轴数据
      yDatas: [{name：'线的名称',ydata: [], lineColor：'', areaColor: []}], // y轴数据，以及每个线的颜色区域颜色
      isShowDataZoom: false,  // 是否显示放大的条
      isShowArea: 0,          // 区域是否显示 0/1
      isSmooth: false,        // 是否平滑曲线 :如果是 boolean 类型，则表示是否开启平滑处理。如果是 number 类型（取值范围 0 到 1），表示平滑程度，越小表示越接近折线段，反之则反。设为 true 时相当于设为 0.5。
      symbol: '',             // 线上面的点形状 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
    },
    isTime: true,             // 是否是时间格式
    timeString: [],           // [当前时间格式，待转换的时间格式]
  }
 * @example  <EchartsBox :type="'lines'" :linesOption="linesOption" class="echarts-line" />
 */
import ECharts from 'vue-echarts';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/pie';
import "echarts/lib/component/dataZoom";
// import theme from '@/assets/echartsStyle/default-theme.json';
// import themeDark from '@/assets/echartsStyle/dark-theme.json';

import theme from "@/assets/echarts-data/default-theme.json";
import themeDark from "@/assets/echarts-data/dark-theme.json";
import chartsConfig from './chartsConfig_bigScree3.js';

ECharts.registerTheme('default-theme', theme);
ECharts.registerTheme('dark-theme', themeDark);

export default {
  name: 'EchartsBox',
  components: {
    ECharts
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    pieOption: {
      type: Object,
      default: function () {
        return {}
      }
    },
    lineOption: {
      type: Object,
      default: function () {
        return {}
      }
    },
    linesOption: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 折柱图
    lineBarOption: {
      type: Object,
      default: function () {
        return {}
      }
    },
    theme: {
      type: String,
      default: 'dark-theme'
    },
    // Y轴是否以1%-100%的形式展示
    percentage: {
      type: Boolean,
      defalut: false
    },
    selectArr: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  data() {
    return {
      value1: [],
      selectList: [],
      contrast: [],
      arrBoolean: [],
      legendArr: [],
      pie: null,
      line: null,
      lines: null,
      lineBar: null,
      ZOOM: {
        dataZoomStart: 85,
        dataZoomEnd: 100,
      }
    }
  },
  created() {
  },
  methods: {
    changeselect() {
      for (let item in this.lines.legend.selected) {
        this.lines.legend.selected[item] = this.selectList.indexOf(item) === -1 ? false : true
      }
    },
    onDataZoom(event) {
      // console.log(event);
      if (event.batch) {
        // 在图表内使用鼠标滚轮缩放
        this.ZOOM.dataZoomStart = event.batch[0].start
        this.ZOOM.dataZoomEnd = event.batch[0].end
        this.$emit('dataZoom', this.ZOOM)
        // console.log(this.ZOOM);
      } else {
        // 使用滑块缩放
        this.ZOOM.dataZoomStart = event.start
        this.ZOOM.dataZoomEnd = event.end
        this.$emit('dataZoom', this.ZOOM)
        // console.log(this.ZOOM);
      }
    }
  },
  watch: {
    pieOption: {
      handler(obj) {

        if (JSON.stringify(obj) !== '{}') {
          this.pie = chartsConfig.pie(obj.legendData, obj.seriesData, obj.pieCenterText, obj.tipTitle);
        }
      },
      immediate: true,
      deep: true,
    },
    linesOption: {
      handler(obj) {
        console.log('>>>>>>>>>>', obj);
        if (JSON.stringify(obj) !== '{}') {
          console.log('echartsBox_bigScree3数据正常:', obj);
          this.lines = chartsConfig.linesOptions(obj.info, obj.timeString, obj.isTime, this.percentage);
        }
      },
      immediate: true,
      deep: true,
    },
    lineBarOption: {
      handler(obj) {
        if (JSON.stringify(obj) !== '{}') {
          // console.log('echartsBox_bigScree3数据正常:', obj);
          this.lineBar = chartsConfig.lineBarOption(obj.info, obj.timeString, obj.isTime, obj.dataZoom);
        }
      },
      immediate: true,
      deep: true,
    },
    selectArr: {
      handler(n, o) {
        // 当前选择是否有变
        console.log('nnnnnnnnnnnnnnnnnnnnnn', n);
        console.log('ooooooooooooooooooooooo', o);
        if (n.length !== 0 && o !== undefined) {
          this.selectList = n.toString() === o.toString() ? this.selectList : n
          // this.selectList = n
          // 更新展示的线
          this.changeselect()
        }
      },
      immediate: true,
      deep: true,
    }
  }
}
</script>

<style lang="less" scoped>
.charts-box {
  position: relative;
  height: 100%;
  width: 100%;

  .charts-item {
    height: 100%;
    position: relative;

    .chart-item-legend {
      position: absolute;

      // right: 0;
      /deep/ .el-select {
        .el-select__tags {
          height: 100%;
        }
      }
    }

    .echarts {
      width: 100%;
      height: 100%;
    }

    .echarts-lines {
      width: 100%;
      height: 100%;

    }
  }
}
</style>
