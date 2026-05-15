<template>
  <!-- Delete confirmation overlay -->
  <div v-show="showDeleteModal" class="my-modal-body">
    <p>Bu siparişi silmek istediğinize emin misiniz?</p>
    <div class="my-modal-button-wrapper">
      <button class="btn btn-danger" @click="handleDelete">Evet</button>
      <button class="btn btn-primary" @click="showDeleteModal = false">Hayır</button>
    </div>
  </div>
 
  <!-- Main content -->
  <div :style="{ opacity: showDeleteModal ? 0.3 : 1 }" class="container py-4">
 
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Siparişler</h2>
      <button
        class="btn btn-primary"
        :disabled="showDeleteModal"
        @click="openCreateModal"
      >
        + Yeni Sipariş
      </button>
    </div>
 
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
 
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status"></div>
    </div>
 
    <OrderTable
      v-else
      :orders="orders"
      :show-delete-modal="showDeleteModal"
      @edit="openEditModal"
      @delete="confirmDelete"
      @detail="openDetailModal"
    />
 
  </div>
 
  <!-- Create / Edit Modal -->
  <OrderFormModal
    v-if="showFormModal"
    :is-editing="isEditing"
    :existing-order="editingOrder"
    :customer-options="customerOptions"
    :product-options="productOptions"
    :saving="saving"
    :modal-error="formModalError"
    @save="handleSave"
    @close="closeFormModal"
  />
 
  <!-- Detail Modal -->
  <OrderDetailModal
    v-if="showDetailModal && selectedOrder"
    :order="selectedOrder"
    :items="detailItems"
    :loading="detailLoading"
    :error="detailError"
    :toggling-status="togglingStatus"
    @close="showDetailModal = false"
    @toggle-status="handleToggleStatus"
  />
</template>
 
<script setup>
import { ref, onMounted } from 'vue'
import OrderTable       from '@/components/orders/OrderTable.vue'
import OrderFormModal   from '@/components/orders/OrderFormModal.vue'
import OrderDetailModal from '@/components/orders/OrderDetailModal.vue'
 
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderItems,   // /orders/:id/items  — backend'den order item'ları çeker
  updateOrderStatus, // /orders/:id/status — status günceller
} from '@/services/orderService'
import { getProducts }  from '@/services/productService'
import { getCustomers } from '@/services/customerService'
import { tokenService } from '@/utils/token'
 
// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
const orders          = ref([])
const loading         = ref(false)
const error           = ref(null)
 
const customerOptions = ref([])
const productOptions  = ref([])
 
// Form modal
const showFormModal   = ref(false)
const isEditing       = ref(false)
const editingOrder    = ref(null)
const saving          = ref(false)
const formModalError  = ref(null)
 
// Delete
const showDeleteModal = ref(false)
const deletingId      = ref(null)
 
// Detail modal
const showDetailModal = ref(false)
const selectedOrder   = ref(null)
const detailItems     = ref([])
const detailLoading   = ref(false)
const detailError     = ref(null)
const togglingStatus  = ref(false)
 
// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function getUserId() {
  const token = tokenService.getToken()
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.id ?? payload.userId ?? payload.sub ?? null
  } catch {
    return null
  }
}
 
// ---------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------
async function fetchAll() {
  loading.value = true
  error.value   = null
  try {
    const [fetchedOrders, customers, products] = await Promise.all([
      getOrders(),
      getCustomers(),
      getProducts(),
    ])
    orders.value = fetchedOrders
 
    customerOptions.value = customers.map(c => ({ value: c.id, label: c.name }))
    productOptions.value  = products.map(p => ({ value: p.id, label: p.name }))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
 
// ---------------------------------------------------------------
// Create / Edit Modal
// ---------------------------------------------------------------
function openCreateModal() {
  isEditing.value    = false
  editingOrder.value = null
  formModalError.value = null
  showFormModal.value  = true
}
 
function openEditModal(order) {
  isEditing.value      = true
  editingOrder.value   = order   // detay item'ları varsa already populated
  formModalError.value = null
  showFormModal.value  = true
}
 
function closeFormModal() {
  showFormModal.value  = false
  formModalError.value = null
}
 
// ---------------------------------------------------------------
// Save (create or update)
// ---------------------------------------------------------------
async function handleSave(payload) {
  saving.value = true
  formModalError.value = null
  try {
    if (isEditing.value) {
      await updateOrder(editingOrder.value.id, payload)
    } else {
      const userId = getUserId()
      await createOrder({ ...payload, user_id: userId })
    }
    await fetchAll()   // listeyi yenile (orders + options birlikte)
    closeFormModal()
  } catch (err) {
    formModalError.value = err.message
  } finally {
    saving.value = false
  }
}
 
// ---------------------------------------------------------------
// Delete
// ---------------------------------------------------------------
function confirmDelete(id) {
  deletingId.value    = id
  showDeleteModal.value = true
}
 
async function handleDelete() {
  try {
    await deleteOrder(deletingId.value)
    await fetchAll()
  } catch (err) {
    error.value = err.message
  } finally {
    deletingId.value    = null
    showDeleteModal.value = false
  }
}
 
// ---------------------------------------------------------------
// Detail Modal
// ---------------------------------------------------------------
async function openDetailModal(order) {
  selectedOrder.value  = order
  showDetailModal.value = true
  detailItems.value    = []
  detailError.value    = null
  detailLoading.value  = true
  try {
    // GET /orders/:id/items — backend bu endpointi sağlamalı
    // Her item'da { id, order_id, product_id, productName, quantity } bekleniyor
    const items = await getOrderItems(order.id)
    detailItems.value = items
  } catch (err) {
    detailError.value = err.message
  } finally {
    detailLoading.value = false
  }
}
 
// ---------------------------------------------------------------
// Toggle status
// ---------------------------------------------------------------
async function handleToggleStatus(order) {
  togglingStatus.value = true
  try {
    const newStatus = order.status === 'delivered' ? 'pending' : 'delivered'
    await updateOrderStatus(order.id, newStatus)
    // Lokal state'i güncelle — yeni fetch'e gerek yok
    const idx = orders.value.findIndex(o => o.id === order.id)
    if (idx !== -1) orders.value[idx].status = newStatus
    selectedOrder.value = { ...order, status: newStatus }
  } catch (err) {
    detailError.value = err.message
  } finally {
    togglingStatus.value = false
  }
}
 
// ---------------------------------------------------------------
// Init
// ---------------------------------------------------------------
onMounted(fetchAll)
</script>