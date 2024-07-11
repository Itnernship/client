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
  const option = {
    xAxis: {
      type: 'category',
      data: props.dataList.map((item) => item.studentName)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.dataList.map((item) => item.score),
        type: 'bar'
      }
    ]
  }

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
  console.log('条形图')
  console.log(props.dataList)
  setTimeout(() => {
    initChart()
  }, 2000)
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
