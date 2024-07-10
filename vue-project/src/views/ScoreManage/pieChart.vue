<template>
  <div class="echarts-container">
    <div ref="echartsRef" class="echarts-chart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
const props = defineProps({
  dataList: {
    type: Array,
    default: () => []
  }
})
const echartsRef = ref(null)
let chartInstance = null

// 初始化echarts图表
const initChart = () => {
  if (!echartsRef.value) return
  chartInstance = echarts.init(echartsRef.value)
  renderChart()
  // 监听窗口大小变化，调整图表大小
  window.addEventListener('resize', resizeChart)
}

// 绘制图表
const renderChart = () => {
  const dataList = props.dataList // 假设 props.dataList 是您的数据数组

  const option = {
    title: {
      text: '成绩分析',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          {
            value: dataList.filter(
              (item) => item.score >= 0 && item.score <= 59
            ).length,
            name: '不及格(0-59)'
          },
          {
            value: dataList.filter(
              (item) => item.score >= 60 && item.score <= 69
            ).length,
            name: '及格(60-69)'
          },
          {
            value: dataList.filter(
              (item) => item.score >= 70 && item.score <= 79
            ).length,
            name: '良好(70-79)'
          },
          {
            value: dataList.filter(
              (item) => item.score >= 80 && item.score <= 89
            ).length,
            name: '优秀(80-89)'
          },
          {
            value: dataList.filter(
              (item) => item.score >= 90 && item.score <= 100
            ).length,
            name: '非常优秀(90-100)'
          }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  // 在这里添加您的图表实例化逻辑 chartInstance
  if (chartInstance) {
    chartInstance.setOption(option)
  }
}

// 调整图表大小
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

onMounted(() => {
  initChart()
})

onBeforeUnmount(() => {
  // 移除窗口大小变化的监听器
  window.removeEventListener('resize', resizeChart)
  // 销毁echarts实例
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>

<style>
.echarts-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.echarts-chart {
  width: 500px;
  height: 400px;
}
</style>
