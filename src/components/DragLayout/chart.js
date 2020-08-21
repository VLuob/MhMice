export const MapChart = {
  title: {
    text: '新闻趋势分析',
    textStyle: {
      fontSize: 18,
      color: '#333'                             // 主标题文字颜色
    },
  },
  tooltip: {
    trigger: 'item'
  },
  visualMap: {
    min: 0,
    max: 2500,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'],           // 文本，默认为数值文本
    calculable: true,
    inRange: {
      color: ['#e0ffff', '#006edd']
    },
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: '区域',
      type: 'map',
      mapType: 'china',
      roam: true,
      zoom: 1.1, //缩放比例
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: [
      ]
    }
  ]
}

export const PieChart = {
  title: {
    text: '新闻趋势分析',
  },
  color: ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF'],
  tooltip: {
    trigger: 'item'
  },
  series: [{
    type: 'pie',
    center: ['50%', '50%'],
    radius: ['48%', '70%'],
    clockwise: true,
    avoidLabelOverlap: true,
    hoverOffset: 15,
    label: {
      show: true,
      position: 'outside',
      formatter: '{a|{b}：{d}%}\n{hr|}',
      rich: {
        hr: {
          backgroundColor: 't',
          borderRadius: 3,
          width: 3,
          height: 3,
          padding: [3, 3, 0, -12]
        },
        a: {
          padding: [-10, 15, -10, 15]
        }
      }
    },
    labelLine: {
      normal: {
        length: 20,
        length2: 30,
        lineStyle: {
          width: 1
        }
      }
    },
    data: [
    ],
  }]
}

export const WordChart = {
  title: {
    text: '新闻趋势分析',
    textStyle: {
      fontSize: 18,
      color: '#333'                             // 主标题文字颜色
    },
  },
  tooltip: {
    position: 'top',
    textStyle: {
      fontSize: 18
    }
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: {
    type: "wordCloud",
    // 网格大小，各项之间间距
    gridSize: 20,
    // 形状 circle 圆，cardioid  心， diamond 菱形，
    // triangle-forward 、triangle 三角，star五角星
    shape: 'circle',
    // 字体大小范围
    sizeRange: [12, 50],
    // 文字旋转角度范围
    rotationRange: [0, 90],
    // 旋转步值
    rotationStep: 90,
    // 自定义图形
    // maskImage: maskImage,
    left: 'center',
    top: 'center',
    right: null,
    bottom: null,
    // 画布宽
    width: '98%',
    // 画布高
    height: '98%',
    // 是否渲染超出画布的文字
    drawOutOfBound: false,
    textStyle: {
      normal: {
        color: function () {
          return 'rgb(' + [
            Math.round(Math.random() * 200 + 55),
            Math.round(Math.random() * 200 + 55),
            Math.round(Math.random() * 200 + 55)
          ].join(',') + ')';
        }
      },
      //  emphasis: {
      //    shadowBlur: 10,//字体阴影背景
      //    shadowColor: '#2ac'
      //  }
    },
    data: [
    ]
  }
}
export const LineChart = {
  title: {
    text: '新闻趋势分析',
  },
  legend: {
    show: true,
    icon: 'circle',
    top: '13%',
    itemWidth: 6,
    itemHeight: 6,
    itemGap: 25,
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: [{
    type: 'category',
    data: [],
    axisLine: {
      lineStyle: {
        color: '#ddd'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      interval: 0,
      rotate: 45,
      textStyle: {
        color: '#333',
        fontSize: 10
      },
      margin: 15
    },
    boundaryGap: false
  }],
  yAxis: [{
    type: 'value',
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#ddd'
      }
    },
    axisLabel: {
      textStyle: {
        color: '#333'
      }
    },
    splitLine: {
      show: false
    }
  }],
  series: [{
    name: '',
    type: 'line',
    data: [],
    symbolSize: 6,
    symbol: 'circle',
    smooth: true,
    lineStyle: {
      color: '#22A6EA'
    },
    itemStyle: {
      normal: {
        color: '#22A6EA',
        borderColor: '#22A6EA'
      }
    },
    emphasis: {
      itemStyle: {
        color: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.5,
          colorStops: [{
            offset: 0,
            color: '#fe9a8b'
          },
          {
            offset: 0.4,
            color: '#fe9a8b'
          },
          {
            offset: 0.5,
            color: '#fff'
          }, {
            offset: 0.7,
            color: '#fff'
          }, {
            offset: 0.8,
            color: '#fff'
          }, {
            offset: 1,
            color: '#fff'
          }
          ]
        },
        borderColor: '#fe9a8b',
        borderWidth: 2
      }
    }
  }, {
    name: '',
    type: 'line',
    data: [],
    symbolSize: 6,
    symbol: 'circle',
    smooth: true,
    lineStyle: {
      color: '#19D77B'
    },
    itemStyle: {
      normal: {
        color: '#19D77B',
        borderColor: '#19D77B'
      }
    },
    emphasis: {
      itemStyle: {
        color: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.5,
          colorStops: [{
            offset: 0,
            color: '#9E87FF'
          },
          {
            offset: 0.4,
            color: '#9E87FF'
          },
          {
            offset: 0.5,
            color: '#fff'
          }, {
            offset: 0.7,
            color: '#fff'
          }, {
            offset: 0.8,
            color: '#fff'
          }, {
            offset: 1,
            color: '#fff'
          }
          ]
        },
        borderColor: '#9E87FF',
        borderWidth: 2
      }
    }
  }
  ]
}
const data = {
  "name": "flare",
  "children": [
    {
      "name": "analytics",
      "children": [
        {
          "name": "cluster",
          "children": [
            { "name": "AgglomerativeCluster", "value": 3938 },
            { "name": "CommunityStructure", "value": 3812 },
            { "name": "HierarchicalCluster", "value": 6714 },
            { "name": "MergeEdge", "value": 743 }
          ]
        },
      ]
    },
    {
      "name": "display",
      "children": [
        { "name": "DirtySprite", "value": 8833 },
        { "name": "LineSprite", "value": 1732 },
        { "name": "RectSprite", "value": 3623 },
        { "name": "TextSprite", "value": 10066 }
      ]
    },
    {
      "name": "flex",
      "children": [
        { "name": "FlareVis", "value": 4116 }
      ]
    },
  ]
}
export const TreeChart = {
  title: {
    text: '新闻趋势分析',
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: [
    {
      type: 'tree',
      roam: true,
      zoom: 1.1, //缩放比例
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: [data],
      top: '1%',
      left: '7%',
      bottom: '1%',
      right: '20%',

      symbolSize: 7,

      label: {
        normal: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 9
        }
      },

      leaves: {
        label: {
          normal: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        }
      },

      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750
    }
  ]
}