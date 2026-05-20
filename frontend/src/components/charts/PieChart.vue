<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  chartItems: {
    type: Array,
    required: true
  }
})

const COLORS = [
  '#42A5F5',
  '#66BB6A',
  '#FFA726',
  '#AB47BC',
  '#EF5350',
  '#26C6DA',
  '#EC407A',
  '#8D6E63'
]

const shortLabel = (musteri) => {
  if (!musteri) return '—'
  return musteri.split('/')[0].trim()
}

const chartData = computed(() => ({
  labels: props.chartItems.map(item => item.musteri),
  datasets: [{
    data: props.chartItems.map(item => item.siparisSayisi),
    backgroundColor: props.chartItems.map((_, i) => COLORS[i % COLORS.length]),
    hoverBackgroundColor: props.chartItems.map((_, i) => COLORS[i % COLORS.length]),
    borderColor: '#16181f',
    borderWidth: 3,
    hoverBorderColor: '#ffffff',
    hoverBorderWidth: 2,
    hoverOffset: 8
  }]
}))

const total = computed(() =>
  props.chartItems.reduce((sum, item) => sum + item.siparisSayisi, 0)
)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '68%',
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
      bodyFont: { size: 14, weight: '700', family: "'Inter', sans-serif" },
      displayColors: false,
      callbacks: {
        title: (items) => items[0].label,
        label: (item) => {
          const pct = ((item.parsed / total.value) * 100).toFixed(1)
          return `${item.parsed} sipariş  ·  %${pct}`
        }
      }
    }
  }
}
</script>

<template>
  <div v-if="chartItems && chartItems.length" class="pie-wrapper">

    <div class="donut-area">
      <div class="chart-container">
        <Doughnut
          :data="chartData"
          :options="chartOptions"
          :style="{ width: '260px', height: '260px' }"
        />
      </div>
      <div class="center-label">
        <span class="center-total">{{ total }}</span>
        <span class="center-sub">toplam sipariş</span>
      </div>
    </div>

    <div class="legend">
      <div
        v-for="(item, i) in chartItems"
        :key="item.musteri"
        class="legend-item"
      >
        <span class="legend-dot" :style="{ background: COLORS[i % COLORS.length] }"></span>
        <div class="legend-info">
          <span class="legend-name">{{ shortLabel(item.musteri) }}</span>
          <span class="legend-sub">{{ item.musteri?.split('/')?.[1]?.trim() ?? '' }}</span>
        </div>
        <div class="legend-right">
          <span class="legend-count">{{ item.siparisSayisi }}</span>
          <span class="legend-pct">%{{ ((item.siparisSayisi / total) * 100).toFixed(1) }}</span>
        </div>
      </div>
    </div>

  </div>

  <div v-else class="pie-empty">
    <span>Veri yükleniyor...</span>
  </div>
</template>

<style scoped>
.pie-wrapper {
  display: flex;
  align-items: center;
  gap: 3rem;
  width: 100%;
}

.donut-area {
  position: relative;
  flex-shrink: 0;
  width: 260px;
  height: 260px;
}

.chart-container {
  width: 260px;
  height: 260px;
}

.center-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.center-total {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: #e2e8f0;
  line-height: 1;
  letter-spacing: -0.02em;
}

.center-sub {
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: #4a5270;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 6px;
}

.legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  background: #0f1117;
  border: 1px solid #1e2130;
  transition: border-color 0.2s;
}

.legend-item:hover {
  border-color: #2a2f45;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-info {
  flex: 1;
  min-width: 0;
}

.legend-name {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #c8d0e7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.legend-sub {
  display: block;
  font-size: 11px;
  color: #4a5270;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.legend-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
}

.legend-count {
  font-size: 15px;
  font-weight: 700;
  color: #e2e8f0;
  line-height: 1;
}

.legend-pct {
  font-size: 11px;
  color: #4a5270;
  margin-top: 2px;
}

.pie-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 260px;
  color: #4a5270;
  font-size: 13px;
  letter-spacing: 0.06em;
}
</style>