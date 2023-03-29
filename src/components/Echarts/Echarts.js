
const chartsConfig = {
/**
   * 饼图
   */
pie: (pieOption) => {
  console.log(pieOption);
    const pieRadius = ['50%', '30%'];
    const pieCenter = ['45%', '25%'];


    // 标题校验  是否存在标题关键字
    const titleCheck = (Obj) => {
     if(Obj.hasOwnProperty('title')){
      return Obj.title
     }else {
      return ''
     }
    }
    
    const option = {
      title: {
        text:titleCheck(pieOption),
        left: 'center',
        top:'30px'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        // orient: 'vertical',
        left: 'left',
        // data: pieOption.legend,
    },
      series: [
        {   top:'100px',
            name: titleCheck(pieOption),
            type: 'pie',
            radius: pieRadius,
            center: pieCenter,
            // Arr
            data: pieOption.series,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
        },
      ],
      grid: {
        height:'100%'
      }
    };
    return option;
  },
bar: (barOption) => {
 // 标题校验  是否存在标题关键字
 const titleCheck = (Obj) => {
  if(Obj.hasOwnProperty('title')){
   return Obj.title
  }else {
   return ''
  }
 }
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      calculable: true,
      legend: {
        data: titleCheck(barOption),
        itemGap: 5
      },
      grid: {
        top: '12%',
        left: '1%',
        right: '10%',
        containLabel: true,
        // width:'100%',
        // height:'50%'
      },
      xAxis: [
        {
          type: 'category',
          data: barOption.time
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: titleCheck(barOption),
          // axisLabel: {
          //   formatter: function (a) {
          //     a = +a;
          //     return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
          //   }
          // }
        }
      ],
      dataZoom: [
        {
          show: true,
          start: 94,
          end: 100
        },
        {
          type: 'inside',
          start: 94,
          end: 100
        },
        {
          show: true,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 30,
          height: '80%',
          showDataShadow: false,
          left: '93%'
        }
      ],
      series: barOption.series
    };
    return option;
  },
lines: (linesOption) => {
  
  const legendArr = (linesOption) => {
    const legend= []
    linesOption.series.forEach(element => {
      legend.push(element.name) 
    });
    return legend
  }
    const option = { 
    title: {
      text: 'Stacked Area Chart'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data:legendArr(linesOption)
    },
    grid: {
      top: '12%',
      left: '1%',
      right: '8%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: linesOption.time
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series:linesOption.series
    };
    return option;
  },  
line: (pieOption) => {
  console.log(pieOption);
    const pieRadius = ['50%', '30%'];
    const pieCenter = ['45%', '25%'];
    const option = {
      title: {
        text: pieOption.title,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        // orient: 'vertical',
        left: 'left',
        // data: pieOption.legend,
    },
      series: [
        {
            name: pieOption.title,
            type: 'pie',
            radius: pieRadius,
            center: pieCenter,
            // Arr
            data: pieOption.CompanyHeadcount,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
        },
      ],
      grid: {
      }
    };
    return option;
  },  
}


export default chartsConfig;