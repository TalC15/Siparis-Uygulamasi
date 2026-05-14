<template>
  <CrudView
    :title="'Müşteriler'"
    :item-label="'Müşteri'"
    :domain-name="'customers'"
    :customers-modal-error="customersModalError"
    :fields="fields"
    :loading="loading"
    :error="error"
    @customersModalError="customersModalError = $event"
    @save="handleSave"
    @delete="handleDelete"
    v-slot="{ onEdit, onDelete, showDeleteModal }"
  >
    <CustomerTable
      :customers="customers"
      :show-delete-modal="showDeleteModal"
      @edit="onEdit"
      @delete="onDelete"
    />
  </CrudView>
</template>
 
<script setup>
import { ref, onMounted } from 'vue'
import CrudView    from '@/components/common/CrudView.vue'
import CustomerTable from '@/components/customers/CustomerTable.vue'
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '@/services/customerService'
 
const customers = ref([])
const loading  = ref(false)
const error    = ref(null)
const customersModalError = ref(null)
// ---------------------------------------------------------------
// Field config — sadece bu view'a özgü kısım
// ---------------------------------------------------------------
const fields = [
  { key: 'name',         label: 'Ad',           type: 'text',   required: true, maxLength: 255 },
  { key: 'address',    label: 'Adres',    type: 'text', required: true, maxLength: 255},
  { key: 'phone',  label: 'Telefon', type: 'tel', required: true, maxLength: 10 },
  { key: 'branch', label: 'Şube',    type: 'text',required: true, maxLength: 255 }
]
 
// ---------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------
async function fetchCustomers() {
  loading.value = true
  error.value   = null
  try {
    customers.value = await getCustomers()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
 
// ---------------------------------------------------------------
// CrudView'dan gelen save/delete eventleri
// ---------------------------------------------------------------
 
async function handleDelete(id) {
  error.value = null
  try {
    await deleteCustomer(id)
    await fetchCustomers()
  } catch (err) {
    error.value = err.message
    throw err
  }
}
 
async function handleSave(payload) {
  return new Promise(async (resolve) => {
    let returnedResult = null
    customersModalError.value = null

    try {
      if (payload.isEditing) {
        returnedResult = await updateCustomer(payload.id, payload.data)
      } else {
        returnedResult = await createCustomer(payload.data)
      }
      await fetchCustomers()
      resolve({ success: returnedResult.status })
    } catch (err) {
      resolve({ success: false })
    }
    finally {
      if (!returnedResult?.status) {
        customersModalError.value = returnedResult?.message
      }
    }
  })
}

onMounted(fetchCustomers)
</script>