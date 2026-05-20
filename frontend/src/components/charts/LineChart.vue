<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  LineElement, PointElement, CategoryScale, LinearScale, Filler
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

const props = defineProps({
  chartItems: { type: Array, required: true }
})

const chartData = computed(() => ({
  labels: props.chartItems.map(item => item.tarih),
  datasets: [{
    label: 'Sipariş Sayısı',
    data: props.chartItems.map(item => item.siparişSayısı),
    borderColor: '#42A5F5',
    borderWidth: 2.5,
    pointBackgroundColor: '#42A5F5',
    pointBorderColor: '#0f1117',
    pointBorderWidth: 2,
    pointRadius: 5,
    pointHoverRadius: 8,
    pointHoverBackgroundColor: '#ffffff',
    pointHoverBorderColor: '#42A5F5',
    pointHoverBorderWidth: 2.5,
    backgroundColor: (ctx) => {
      const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 360)
      gradient.addColorStop(0, 'rgba(66,165,245,0.25)')
      gradient.addColorStop(0.6, 'rgba(66,165,245,0.04)')
      gradient.addColorStop(1, 'rgba(66,165,245,0)')
      return gradient
    },
    tension: 0.45,
    fill: true
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
      grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
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
      border: { display: false, dash: [4, 4] },
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
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  height: 340px;
  width: 100%;
}
</style>