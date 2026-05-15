<template>
  <div
    class="modal d-block"
    tabindex="-1"
    style="background: rgba(0,0,0,0.5)"
    @click.self="$emit('close')"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
 
        <div class="modal-header">
          <div>
            <h5 class="modal-title mb-0">
              Sipariş #{{ order.id }} — Detay
            </h5>
            <small class="text-muted">
              {{ order.customerName }} · {{ formatDate(order.orderDate) }}
            </small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <!-- Status badge -->
            <span :class="statusBadgeClass">{{ statusLabel }}</span>
            <!-- Toggle status button -->
            <button
              class="btn btn-sm"
              :class="order.status === 'delivered' ? 'btn-outline-warning' : 'btn-outline-success'"
              :disabled="togglingStatus"
              @click="$emit('toggle-status', order)"
            >
              <span v-if="togglingStatus" class="spinner-border spinner-border-sm me-1"></span>
              {{ order.status === 'delivered' ? 'Teslim Edilmedi Yap' : 'Teslim Edildi İşaretle' }}
            </button>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
        </div>
 
        <div class="modal-body">
          <div v-if="loading" class="text-center py-4">
            <div class="spinner-border" role="status"></div>
          </div>
          <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
          <div v-else>
            <table class="table table-bordered table-hover align-middle mb-0">
              <thead class="table-dark">
                <tr>
                  <th>#</th>
                  <th>Ürün</th>
                  <th>Miktar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!items.length">
                  <td colspan="3" class="text-center text-muted">Ürün bulunamadı</td>
                </tr>
                <tr v-for="(item, idx) in items" :key="item.id">
                  <td>{{ idx + 1 }}</td>
                  <td>{{ item.productName }}</td>
                  <td>{{ item.quantity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
 
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="$emit('close')">Kapat</button>
        </div>
 
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { computed } from 'vue'
 
const props = defineProps({
  order:         { type: Object,  required: true },
  items:         { type: Array,   default: () => [] },
  loading:       { type: Boolean, default: false },
  error:         { type: String,  default: null },
  togglingStatus:{ type: Boolean, default: false },
})
 
defineEmits(['close', 'toggle-status'])
 
const statusLabel = computed(() =>
  props.order.status === 'delivered' ? 'Teslim Edildi' : 'Beklemede'
)
 
const statusBadgeClass = computed(() =>
  props.order.status === 'delivered'
    ? 'badge bg-success'
    : 'badge bg-warning text-dark'
)
 
function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('tr-TR')
}
</script>