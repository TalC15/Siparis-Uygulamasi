<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Ad</th>
          <th>Birim Türü</th>
          <th>Birim Ağırlık</th>
          <th>Kutu Adedi</th>
          <th>Kutu Ağırlığı</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="products.length === 0">
          <td colspan="7" class="text-center text-muted">Ürün bulunamadı</td>
        </tr>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.unit_type }}</td>
          <td>{{ product.unit_weight }}</td>
          <td>{{ product.box_quantity }}</td>
          <td>{{ product.box_weight }}</td>
          <td>
            <button
              class="btn btn-sm btn-outline-primary me-2"
              @click="$emit('edit', product)"
              :disabled="showDeleteModal"
            >
              Düzenle
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="$emit('delete', product.id)"
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
  products: {
    type: Array,
    default: () => [],
  },
  showDeleteModal: {
    type: Boolean
  }
})
 
defineEmits(['edit', 'delete'])
</script>