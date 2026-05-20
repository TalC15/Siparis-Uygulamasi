<template>
  <div class="dashboard-wrapper">

    <div class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        <span class="tab-dot" :style="{ background: tab.color }"></span>
        {{ tab.label }}
      </button>
    </div>

    <Transition name="chart-fade" mode="out-in">

      <div class="chart-section" :key="activeTab">
        <div class="section-label">
          <span class="label-dot" :style="activeMeta.dotStyle"></span>
          {{ activeMeta.title }}
        </div>

        <LineChart v-if="activeTab === 'line'" :chart-items="chartData" />
        <BarChart  v-else-if="activeTab === 'bar'"  :chart-items="chartData" />
        <PieChart  v-else-if="activeTab === 'pie'"  :chart-items="pieData"   />

      </div>

    </Transition>

  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import LineChart from '@/components/charts/LineChart.vue'
import BarChart  from '@/components/charts/BarChart.vue'
import PieChart  from '@/components/charts/PieChart.vue'
import { getOrderCounts }    from '@/services/orderService'
import { getCustomerOrders } from '@/services/customerService'   // pie verisini dönen servis

const chartData = ref([])
const pieData   = ref([])
const activeTab = ref('line')

const tabs = [
  { key: 'line', label: 'Sipariş Trendi',    color: '#42A5F5' },
  { key: 'bar',  label: 'Günlük Dağılım',    color: '#66BB6A' },
  { key: 'pie',  label: 'Müşteri Dağılımı',  color: '#FFA726' }
]

const tabMeta = {
  line: { title: 'Sipariş Trendi',   dotStyle: { background: '#42A5F5', boxShadow: '0 0 8px #42A5F5' } },
  bar:  { title: 'Günlük Dağılım',   dotStyle: { background: '#66BB6A', boxShadow: '0 0 8px #66BB6A' } },
  pie:  { title: 'Müşteri Dağılımı', dotStyle: { background: '#FFA726', boxShadow: '0 0 8px #FFA726' } }
}

const activeMeta = computed(() => tabMeta[activeTab.value])

onMounted(async () => {
  chartData.value = await getOrderCounts()
  pieData.value   = await getCustomerOrders()
})
</script>

<style scoped>
.dot-pie { background: #FFA726; box-shadow: 0 0 8px #FFA726; }

.dashboard-wrapper {
  background: #0f1117;
  min-height: 100vh;
  padding: 3rem 2.5rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

/* ── Tab bar ── */
.tab-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;
  background: #16181f;
  border: 1px solid #1e2130;
  border-radius: 14px;
  padding: 6px;
  width: fit-content;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: #4a5270;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

.tab-btn:hover {
  background: #1e2130;
  color: #8892b0;
}

.tab-btn.active {
  background: #1e2130;
  color: #e2e8f0;
  border: 1px solid #2a2f45;
}

.tab-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.tab-btn.active .tab-dot {
  opacity: 1;
  filter: brightness(1.3);
}

/* ── Chart card ── */
.chart-section {
  background: #16181f;
  border: 1px solid #1e2130;
  border-radius: 20px;
  padding: 2rem 2.5rem 2.5rem;
  position: relative;
  overflow: hidden;
}

.chart-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(66,165,245,0.35), transparent);
}

.section-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #4a5270;
  margin-bottom: 1.5rem;
}

.label-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

/* ── Transition ── */
.chart-fade-enter-active,
.chart-fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.chart-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.chart-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>