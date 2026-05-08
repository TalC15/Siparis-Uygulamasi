<template>
  <CrudView
    title="Ürünler"
    item-label="Ürün"
    :fields="fields"
    :loading="loading"
    :error="error"
    @save="handleSave"
    @delete="handleDelete"
    v-slot="{ onEdit, onDelete, showDeleteModal }"
  >
    <ProductTable
      :products="products"
      :show-delete-modal="showDeleteModal"
      @edit="onEdit"
      @delete="onDelete"
    />
  </CrudView>
</template>
 
<script setup>
import { ref, onMounted } from 'vue'
import CrudView    from '@/components/common/CrudView.vue'
import ProductTable from '@/components/products/ProductTable.vue'
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/services/productService'
 
const products = ref([])
const loading  = ref(false)
const error    = ref(null)
 
// ---------------------------------------------------------------
// Field config — sadece bu view'a özgü kısım
// ---------------------------------------------------------------
const fields = [
  { key: 'name',         label: 'Ad',           type: 'text',   required: true, maxLength: 255 },
  { key: 'unit_type',    label: 'Birim Türü',    type: 'select', required: true,
    options: [
      { value: '1', label: 'kg'    },
      { value: '2', label: 'gram'  },
      { value: '3', label: 'litre' },
      { value: '4', label: 'mL'   },
      { value: '5', label: 'adet' },
    ]
  },
  { key: 'unit_weight',  label: 'Birim Ağırlık', type: 'number', maxLength: 9 },
  { key: 'box_quantity', label: 'Kutu Adedi',    type: 'number', maxLength: 9 },
  { key: 'box_weight',   label: 'Kutu Ağırlığı', type: 'number', maxLength: 9 },
]
 
// ---------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------
async function fetchProducts() {
  loading.value = true
  error.value   = null
  try {
    products.value = await getProducts()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
 
// ---------------------------------------------------------------
// CrudView'dan gelen save/delete eventleri
// ---------------------------------------------------------------
async function handleSave({ id, isEditing, data }) {
  error.value = null
  try {
    if (isEditing) {
      await updateProduct(id, data)
    } else {
      await createProduct(data)
    }
    await fetchProducts()
  } catch (err) {
    error.value = err.message
    throw err   // CrudView modalı açık tutsun
  }
}
 
async function handleDelete(id) {
  error.value = null
  try {
    await deleteProduct(id)
    await fetchProducts()
  } catch (err) {
    error.value = err.message
    throw err
  }
}
 
onMounted(fetchProducts)
</script>