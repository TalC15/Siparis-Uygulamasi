<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  chartItems: { type: Array, required: true }
})

const chartData = computed(() => ({
  labels: props.chartItems.map(item => item.tarih),
  datasets: [{
    label: 'Sipariş Sayısı',
    data: props.chartItems.map(item => item.siparişSayısı),
    backgroundColor: (ctx) => {
      const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 340)
      gradient.addColorStop(0, 'rgba(102,187,106,0.9)')
      gradient.addColorStop(1, 'rgba(102,187,106,0.15)')
      return gradient
    },
    hoverBackgroundColor: 'rgba(102,187,106,1)',
    borderRadius: 8,
    borderSkipped: false,
    borderWidth: 0,
    barPercentage: 0.55,
    categoryPercentage: 0.7
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1a1d2e',
      borderColor: '#2a2f45',
      borderWidth: 1,
      titleColor: '#8892b0',
      bodyColor: '#e2e8f0',
      padding: 14,
      cornerRadius: 10,
      titleFont: { size: 11, weight: '600', family: "'Inter', sans-serif" },
      bodyFont: { size: 15, weight: '700', family: "'Inter', sans-serif" },
      displayColors: false,
      callbacks: {
        title: (items) => items[0].label,
        label: (item) => `${item.formattedValue} sipariş`
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: {
        color: '#4a5270',
        font: { size: 11, family: "'Inter', sans-serif" },
        maxRotation: 0
      }
    },
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
      border: { display: false },
      ticks: {
        color: '#4a5270',
        font: { size: 11, family: "'Inter', sans-serif" },
        padding: 12
      }
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  height: 340px;
  width: 100%;
}
</style>