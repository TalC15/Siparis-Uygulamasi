<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Müşteri</th>
          <th>Sipariş Tarihi</th>
          <th>Satıcılar</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="orders.length === 0">
          <td colspan="6" class="text-center text-muted">Sipariş bulunamadı</td>
        </tr>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ order.users }}</td>
          <td>
            <button
              class="btn btn-sm btn-outline-primary me-2"
              @click="$emit('edit', order)"
              :disabled="showDeleteModal"
            >
              Düzenle
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="$emit('delete', order.id)"
              :disabled="showDeleteModal"
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
  orders: {
    type: Array,
    default: () => [],
  },
  showDeleteModal: {
    type: Boolean
  }
})
 
defineEmits(['edit', 'delete'])
</script>