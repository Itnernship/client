<template>
  <div class="chart-container">
    <div class="chart-left">
      <pieChart :dataList="dataList" />
    </div>
    <div class="chart-right">
      <BarChart :dataList="dataList" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getGradeService } from '@/api/grade'
import pieChart from './pieChart.vue'
import BarChart from './BarChart.vue'
const dataList = ref([])

const getGradeList = async () => {
  const res = await getGradeService()
  console.log(res.data.data)
  dataList.value = res.data.data
  // console.log(dataList.value)
}

onMounted(() => {
  getGradeList()
})
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: space-between; /* 使两个图表左右分布 */
  align-items: flex-start; /* 可以根据需要调整对齐方式 */
}

.chart-left,
.chart-right {
  width: 45%; /* 调整宽度比例 */
}

@media (max-width: 768px) {
  .chart-container {
    flex-direction: column; /* 在较小的屏幕上，垂直堆叠图表 */
  }

  .chart-left,
  .chart-right {
    width: 100%; /* 在较小的屏幕上，使每个图表占据整个宽度 */
  }
}
</style>
