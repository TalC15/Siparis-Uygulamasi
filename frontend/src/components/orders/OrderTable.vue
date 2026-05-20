<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Müşteri</th>
          <th>Sipariş Tarihi</th>
          <th>Durum</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="orders.length === 0">
          <td colspan="5" class="text-center text-muted">Sipariş bulunamadı</td>
        </tr>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ formatDate(order.orderDate) }}</td>
          <td>
            <span
              :class="order.status === 'delivered' ? 'badge bg-success' : 'badge bg-warning text-dark'"
            >
              {{ order.status === 'delivered' ? 'Teslim Edildi' : 'Beklemede' }}
            </span>
          </td>
          <td>
            <button
              class="btn btn-sm btn-outline-info me-1"
              :disabled="showDeleteModal"
              @click="$emit('detail', order)"
              title="Detay"
            >
              Detay
            </button>
            <button
              class="btn btn-sm btn-outline-primary me-1"
              :disabled="showDeleteModal"
              @click="$emit('edit', order)"
            >
              Düzenle
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              :disabled="showDeleteModal"
              @click="$emit('delete', order.id)"
            >
              Sil
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
 
<script setup>
defineProps({
  orders:          { type: Array,   default: () => [] },
  showDeleteModal: { type: Boolean, default: false },
})
 
defineEmits(['edit', 'delete', 'detail'])
 
function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('tr-TR')
}
</script>