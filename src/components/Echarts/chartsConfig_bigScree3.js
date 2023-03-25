import Utils from '@/commons/Utils'
import { type } from 'jquery';
import echarts from "vue-echarts";

const pieRadius = ['50%', '30%'];
const pieCenter = ['45%', '25%'];
const colors = ['#6c92fa', '#fdca5a', '#7adfa0', '#A97AF8', '#27ae60', '#ff6348', '#fdcb6e', '#fd79a8', '#b8e994', '#da77f2', '#fff100', '#d4380d', '#7cb305', '#00cec9', '#d980fa', '#eb3b5a', '#c44569', '#227093', '#cd6133', '#f8efba', '#38d9a9', '#12b886', '#d81b60', '#27ae60', '#e84393', '#bdc3c7', '#f6e58d', '#c23616', '#badc58', '#7bed9f', '#eb3b5a', '#ffa000', '#7efff5', '#9254de', '#0097e6', '#48dbfb', '#d29200', '#ffb900', '#fff100', '#d83b01', '#ea4300', '#ea4300', '#a4262c', '#d13438', '#5c005c', '#32145a', '#b4a0ff', '#00188f', '#0078d4', '#00bcf2', '#004b50', '#004b1c', '#b4009e', '#5c005c', '#00b294',];
const BarColor = ['#BFE8A3', '#F78959']

function convertDate(dateStr, timeBefore, timeAfter) {
  if (!dateStr) return '';

  return Utils.date.convert(dateStr, timeBefore, timeAfter);
}
/**
 * @msg: 
 * @param {Array} datas 时间数组
 * @param {*} timeString 时间格式
 * @param {*} isTime true/false
 * @return {*}
 */
function getXdata(datas, timeString, isTime = true) {
  if (!isTime) { // 不是日期不需要转换，直接返回
    return datas
  }
  const xdata = [];
  for (let i = 0; i < datas.length; i++) {
    let date = datas[i];
    date = convertDate(date, timeString[0], timeString[1]);
    xdata.push(date);
  }
  return xdata;
}

const chartsConfig = {
  /**
   * 饼图
   */
  pie: (legendData, seriesData, pieCenterText, tipTitle) => {
    const option = {
      title: {
        show: true,
        top: pieCenter[1],
        left: pieCenter[0],
        top: 'middle',
        text: ``,
        padding: 0,
        textAlign: 'center',
        textStyle: {
          rich: {
            name: {
              fontSize: 14,
              fontWeight: '700',
              color: '#FFF'
            },
            total: {
              fontSize: 14,
              fontWeight: '700',
              color: '#FFF'
            }
          }
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 30,
        bottom: 20,
        // top: 'middle',
        // padding: 0,
        textStyle: {
          padding: [1, 0, 1, 0],
          rich: {
            name: {
              color: '#fff',
              fontSize: 14
            },
            target: {
              color: '#FFF',
              width: 30,
              fontSize: 14
            }
          }
        },
        data: legendData,
        formatter: (name) => {
          let target;
          seriesData.map((list) => {
            if (list.name === name) {
              target = list.value;
            }
          });
          return `{name|${name} }  {target|${target}}`;
        }
      },
      color: colors,
      series: [
        {

          name: tipTitle,
          type: 'pie',
          radius: pieRadius,
          center: pieCenter,
          hoverAnimation: false,
          hoverOffset: 3,
          data: seriesData
        },
        {

          type: 'pie',
          hoverAnimation: false,
          radius: [`${parseFloat(pieRadius[1]) + 4}%`, `${parseFloat(pieRadius[1]) + 5}%`],
          center: pieCenter,
          tooltip: {
            show: false
          },
          itemStyle: {
            borderWidth: 0
          },
          labelLine: {
            show: false
          },
          data: [{
            value: 0,
            name: '',
            itemStyle: {
              color: '#282b33'
            }
          }]
        }
      ],
      grid: {
        top: '10',
        left: '0',
        bottom: 0,
        right: 0,
        containLabel: true
      }
    };
    return option;
  },
  /**
   * 折线图
   * info:
   * xdata: x轴数据(固定是时间)
   * ydata: y轴数据
   * lineColor：线颜色
   * areaColor：区域颜色 【起始颜色，结束颜色】
   * isShowDataZoom: 是否显示放大的条
   * isShowArea： 区域是否显示 0/1
   * isSmooth: 是否平滑曲线 :如果是 boolean 类型，则表示是否开启平滑处理。如果是 number 类型（取值范围 0 到 1），表示平滑程度，越小表示越接近折线段，反之则反。设为 true 时相当于设为 0.5。
   * symbol: '', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
   * title: '标题',
   * isShowTitle: 是否显示标题
  
   * isTime: 是否是时间格式
   */
  lineOptions: (info, timeString, isTime) => {
    var option = {
      title: {
        show: info.isShowTitle,
        text: info.title,
        left: 0,
        top: 0,
        textStyle: {
          fontSize: 16,
          color: '#000',
        },
      },
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: getXdata(info.xdata, timeString, isTime),
        axisLabel: {
          textStyle: {
            color: "#8D9093",
          },
          margin: 12,
          padding: [0, 0, 0, 15],
        },
        axisLine: {
          lineStyle: {
            color: '#dedede',
          }
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        axisLabel: {
          textStyle: {
            align: "right",
            color: "#8D9093"
          }
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: '#dedede',
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
        }
      },
      series: [
        {
          // name: '模拟数据',
          type: 'line',
          smooth: info.isSmooth,
          symbol: info.symbol || 'none',
          sampling: 'average',
          itemStyle: {
            normal: {
              color: info.lineColor,
              areaStyle: {
                opacity: info.isShowArea,
                type: 'default',
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: info.areaColor && info.areaColor.length > 0 ? info.areaColor[0] : '',
                }, {
                  offset: 1,
                  color: info.areaColor && info.areaColor.length > 0 ? info.areaColor[1] : '',
                }], false)
              }
            }
          },
          data: info.ydata
        },
      ],
      grid: {
        top: '16',
        left: '0',
        bottom: '50',
        right: 40,
        containLabel: true
      },
    };
    return option
  },
  /**
   * 折线图-多线
    info: {
      xdata: [],              // x轴数据
      yDatas: [{name：'线的名称',ydata: [], lineColor：'', lineWidth:'', areaColor: []}], // y轴数据，以及每个线的颜色、粗细、区域颜色
      isShowDataZoom: false,  // 是否显示放大的条
      isShowArea: 0,          // 区域是否显示 0/1
      isSmooth: false,        // 是否平滑曲线 :如果是 boolean 类型，则表示是否开启平滑处理。如果是 number 类型（取值范围 0 到 1），表示平滑程度，越小表示越接近折线段，反之则反。设为 true 时相当于设为 0.5。
      isShowLegend: false,    // 是否显示图例
      symbol: '',             // 线上面的点形状 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
    },
   * isTime: 是否是时间格式
   * timeString: [当前时间格式，待转换的时间格式]
   * isShowTitle:是否展示标题
   */
  linesOptions: (info, timeString, isTime, percentage) => {
    // Y轴的展示方式
    // console.log('>>>>>>++', info);
    let agile_yAxis = {}
    let activemin = 0
    let activemax = 0
    let activeinterval = 0
    switch (info.BigName) {
      case 'CPU usage':
        activemin = 0.01;
        activemax = 1;
        activeinterval = 0.25;
        break;
      case 'Memory usage':
        activemin = 1,
          activemax = 100,
          activeinterval = 25
        break;
      case 'Filesystem usage':
        activemin = 1,
          activemax = 100,
          activeinterval = 25
        console.log('赋值完毕');
        break;
    }
    if (percentage == false) {

      agile_yAxis = {
        min: activemin,
        max: activemax,
        interval: activeinterval,
        type: 'value',
        boundaryGap: [0, '10%'],
        axisLabel: {
          textStyle: {
            // color: "#687b99"
            color: "#fff"
          }
        },
        splitLine: {
          lineStyle: {
            type: "dotted",
            color: 'rgba(103,125,177,0.20)',
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
        }
      }
    } else {
      agile_yAxis = {
        type: 'value',
        boundaryGap: [0, '10%'],
        axisLabel: { //y轴设置为%
          textStyle: {
            // color: "#687b99"
            color: "#fff"
          },
          show: true,

          // formatter: '{value} %',
        },
        // max: 1.25,  //最大值
        // min: 0,
        // minInterval: 0.25,
        splitLine: {
          lineStyle: {
            type: "dotted",
            color: 'rgba(103,125,177,0.20)',
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
        }
      }
    }

    // 数据处理
    const seriesArr = [], legendArr = [];
    for (let i = 0; i < info.yDatas.length; i++) {
      const item = info.yDatas[i];
      const series = {
        name: item.name,
        type: 'line',
        smooth: info.isSmooth,
        symbol: info.symbol || 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
            color: item.lineColor,
          }
        },
        lineStyle: {
          width: item.lineWidth || 2
        },
        data: item.ydata
      }
      // console.log(series, item);
      if (info.isShowArea == 1) {
        series.itemStyle.normal.areaStyle = {
          opacity: info.isShowArea,
          type: 'default',
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: item.areaColor && item.areaColor.length > 0 ? item.areaColor[0] : '',
          }, {
            offset: 1,
            color: item.areaColor && item.areaColor.length > 0 ? item.areaColor[1] : '',
          }], false)
        }
      }
      seriesArr.push(series);
      legendArr.push(item.name);
    }

    // console.log('//////', seriesArr, legendArr);
    let item = {}
    info.yDatas.forEach(element => {
      item[element.name] = true;
    });

    var option = {
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      color: colors,
      dataZoom: [{
        show: false,
        type: "inside",
        xAxisIndex: 0,
        start: 99,
        end: 100,
        // start: dataZoom.dataZoomStart,
        height: 16,
       
      }],
      tooltip: {
        trigger: 'axis',
        // position: function (pt) {
        //   return [pt[0], '10%'];
        // }
      },
      legend: {
        selected: item,
        right: 0,
        top: 12,
        show: false,
        // margin: 2,
        // bottom: 0,
        icon: 'rect',
        data: legendArr,
        itemWidth: 10,//图标宽
        itemHeight: 2,
        textStyle: {
          padding: [1, 0, 1, 0],
          rich: {
            name: {
              color: '#fff',
              fontSize: 14
            },
            target: {
              color: '#FFF',
              width: 30,
              fontSize: 14
            }
          }
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: getXdata(info.xdata, timeString, isTime),
        axisLabel: {
          textStyle: {
            // color: "#687b99"
            color: "#fff"
          },
          margin: 12,
        },
        axisLine: {
          lineStyle: {
            // color: '#dedede',
            type: "solid",
            color: 'rgba(103,125,177,0.20)',
          }
        },
      },
      yAxis: agile_yAxis,
      series: seriesArr,
      grid: {
        bottom: 0,
        left: 0,
        right: '20',
        containLabel: true,
        height: '80%'
      },
    };
    // console.log('option********************', option);
    return option
  },

  /**
     * 折柱混合图  （单线多柱）
     */
  lineBarOption: (info, timeString, isTime, dataZoom) => {
    // console.log('>>>>>>>>>>>>', dataZoom);
    // console.log(111);
    let seriesArr = [], legendArr = [];
    // 循环的是数据类的个数
    for (let i = 0; i < info.yDatas.length; i++) {
      let item = info.yDatas[i];
      // console.log('>>>>>>>>>>>>>>>>>>', info, item);
      if (item.type == 'bar') {
        // console.log('我进来了1');
        // 构造series
        let series = {
          symbol: "none", //去掉圆点
          data: item.data,
          type: item.type,
          name: item.name,
          // colorBy:`data`,
          color: item.Color,
          shadowOffsetX: 20
        }
        seriesArr.push(series);
        legendArr.push(item.name);
      } else {
        // console.log('我进来了2');
        let series = {
          symbol: "none", //去掉圆点
          itemStyle: {
            normal: {
              color: item.Color,
              shadowOffsetX: 20
            }
          },
          data: item.data,
          type: item.type,
          name: item.name,
        }
        seriesArr.push(series);
        legendArr.push(item.name);
      }

    }
    // console.log(seriesArr);


    var option = {
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      tooltip: {
        trigger: 'axis',

      },
      dataZoom: [
        {
          type: "inside",
          xAxisIndex: 0,
          start: dataZoom.dataZoomStart,
          height: 8,
          end: dataZoom.dataZoomEnd
        },
        { 
          type: "slider",
          xAxisIndex: 0,
          height: 8,
          start: dataZoom.dataZoomStart,
          end: dataZoom.dataZoomEnd,
          fillerColor: 'rgba(255,255,255,0.40)',
          bottom: 16,
          backgroundColor: ' rgba(255,255,255,0.20)'
        }
      ],
      legend: {
        show: info.isShowLegend,
        bottom: -5,
        icon: 'rect',
        data: legendArr,
        itemWidth: 10,//图标宽
        itemHeight: 2,
        textStyle: {
          padding: [1, 0, 1, 0],
          rich: {
            name: {
              color: '#fff',
              fontSize: 14,
            },
            target: {
              color: '#FFF',
              width: 30,
              fontSize: 14,
            }
          }
        },
      },
      xAxis: [
        {
          boundaryGap: ['5%', '5%'],
          type: 'category',
          data: getXdata(info.xdata, timeString, isTime),
          axisLabel: {
            textStyle: {
              color: "#8D9093",
            },
            margin: 12,
            padding: [0, 0, 0, 15],
          },
          axisPointer: {
            type: 'line'
          },
          // axisLine: {
          //   lineStyle: {
          //     // color: '#dedede',
          //     type: "solid",
          //     color: 'rgba(103,125,177,0.20)',
          //   }
          // },
        }
      ],
      yAxis: {
        // onZero:false,
        offset: 2,
        type: 'value',

        boundaryGap: [0, '10%'],
        axisLabel: {
          textStyle: {
            // color: "#687b99"
            color: "#fff"
          }
        },
        splitLine: {
          lineStyle: {
            type: "dotted",
            color: 'rgba(103,125,177,0.20)',
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
        }
      },

      series: seriesArr,
      grid: {
        top: 10,
        left: '10',
        bottom: '30',
        height: '85%',
        width: '95%',
        containLabel: true
      },
    }
    return option
  },
  /**
   * 柱状图
  * info:
   * xdata: x轴数据
   * ydata: y轴数据
   * areaColor：区域颜色 【起始颜色，结束颜色】
   * isTime: 是否是时间格式
   */
  barOptions: (info, timeString, isTime) => {
    const option = {
      // title: {
      //   subtext: info.subtext,
      //   subtextStyle: {
      //     color: "#687b99",
      //     fontSize: 14,
      //   },
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      xAxis: [{
        data: getXdata(info.xdata, timeString, isTime),
        axisLabel: {
          textStyle: {
            color: "#8D9093"
          },
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#dedede',
          }
        },
      }, {
        show: false,
        data: getXdata(info.xdata, timeString, isTime),
      }],
      dataZoom: [
        {
          show: true,
          type: "slider",
          xAxisIndex: [0],
          height: "20",
          start: 0,
          end: 100,
          fillerColor: 'rgba(5,134,142,0.15)',
        }
      ],
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        axisLabel: {
          textStyle: {
            color: "#8D9093"
          }
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: '#dedede',
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
        }
      },
      series: [
        {
          type: 'bar',
          data: info.ydata,
          barWidth: 20,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: info.areaColor && info.areaColor.length > 0 ? info.areaColor[0] : '',
              }, {
                offset: 1,
                color: info.areaColor && info.areaColor.length > 0 ? info.areaColor[1] : '',
              }], false)
            }
          }
        }
      ],
      grid: {
        top: '0',
        left: '0',
        bottom: 0,
        right: 40,
        containLabel: true
      },
    };

    return option;
  },
};

export default chartsConfig;
