<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Ad</th>
          <th>Adres</th>
          <th>Telefon</th>
          <th>Şube</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="customers.length === 0">
          <td colspan="7" class="text-center text-muted">Ürün bulunamadı</td>
        </tr>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.address }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.branch }}</td>
          <td>
            <button
              class="btn btn-sm btn-outline-primary me-2"
              @click="$emit('edit', customer)"
              :disabled="showDeleteModal"
            >
              Düzenle
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="$emit('delete', customer.id)"
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
  customers: {
    type: Array,
    default: () => [],
  },
  showDeleteModal: {
    type: Boolean
  }
})
 
defineEmits(['edit', 'delete'])
</script>