<template>
<div v-show="showDeleteModal" class=" my-modal-body">
  <p>silmek istediğinize emin misiniz?</p>
  <div class="my-modal-button-wrapper">
    <button class="btn btn-danger" @click="handleDelete()">evet</button>
    <button class="btn btn-primary" @click="showDeleteModal=false">hayır</button>
  </div>
</div>

  <div :style="{ opacity: showDeleteModal ? 0.3 : 1 }" class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Ürünler</h2>
      <button class="btn btn-primary" :disabled="showDeleteModal" @click="openCreateModal">+ Yeni Ürün</button>
    </div>
 


    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status"></div>
    </div>
 
    

      <CustomerTable
      v-else
      :customers="customers"
      :showDeleteModal = "showDeleteModal"
      @edit="openEditModal"
      @delete="alertDeleteConfirmation"
    />
 
    <!-- Modal -->
    <div
      v-if="showModal"
      class="modal d-block"
      tabindex="-1"
      style="background: rgba(0,0,0,0.5)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Ürünü Düzenle' : 'Yeni Ürün' }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Ad</label>
              <input v-model="form.name" type="text" class="form-control" :class="{'is-invalid' : savingInputEmpty && (!form.name || form.name.length>255 || form?.name?.trim()==='')}"/>
            </div>
            <div v-if="savingInputEmpty && (!form?.name || form?.name?.length>255 || form?.name?.trim()==='')" class="invalid-feedback" role="alert">
                <p>{{ form.name.length>255 ? 'çok uzun müşteri adı' :'Müşteriniz için bir ad yazmalısınız'}}</p>
            </div>
            <div class="mb-3">
              <label class="form-label">Adres</label>
                <input v-model="form.address" type="string" class="form-control"/>
              <div v-if="savingInputEmpty" class="invalid-feedback" role="alert">
                <p>müşterinin adresini yazmalısınız</p>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Birim Ağırlık</label>
              <input v-model="form.phone" type="number" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Kutu Adedi</label>
              <input v-model="form.branch" type="string" class="form-control" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">İptal</button>
            <button class="btn btn-primary" :disabled="saving" @click="handleSave">
              {{ saving ? 'Kaydediliyor...' : 'Kaydet' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref, onMounted } from 'vue'
import CustomerTable from '@/components/customers/CustomerTable.vue'
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '@/services/customerService'
 
const customers = ref([])
const loading = ref(false)
const saving = ref(false)
const error = ref(null)
const showModal = ref(false)
const isEditing = ref(false)
const showDeleteModal = ref(false)
const deletedItemId = ref(null) 
const savingInputEmpty = ref(false)
 
const emptyForm = () => ({
  name: '',
  address: '',
  phone: '',
  branch: '',
})
 
const form = ref(emptyForm())
let editingId = null
 
async function fetchCustomers() {
  loading.value = true
  error.value = null
  try {
    customers.value = await getCustomers()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
 
function openCreateModal() {
  isEditing.value = false
  editingId = null
  form.value = emptyForm()
  showModal.value = true
}
 
function openEditModal(customer) {
  isEditing.value = true
  editingId = customer.id
  form.value = {
    name: customer.name,
    address: customer.address,
    phone: customer.phone,
    branch: customer.branch,
    box_weight: customer.box_weight,
  }
  showModal.value = true
}
 
function closeModal() {
  showModal.value = false
  savingInputEmpty.value = false
}

async function savingTerminator(){
      closeModal()
      saving.value = false
      await fetchCustomers()
}

async function handleSave() {
  saving.value = true
  error.value = null
  try {
    const customerName = form?.value.name
    if(!customerName || customerName?.trim()==='' || customerName.length>255 ){
      savingInputEmpty.value = true
      saving.value = false
    }
    if (isEditing.value) {
      if(!!customerName && customerName?.trim()!='' && customerName.length<=255 ){
        savingInputEmpty.value = false
        await updateCustomer(editingId, form?.value)
        savingTerminator()
      }
    } else {
      if(!!customerName && customerName?.trim()!='' && customerName.length<=255 ){
        savingInputEmpty.value = false
        await createCustomer(form?.value)
        savingTerminator()
      }
    }
    saving.value = false
    
  } catch (err) {
    error.value = err.message
  }
}
 
function alertDeleteConfirmation(id){
  deletedItemId.value = id
  showDeleteModal.value = true

}
// on focus on bullur(for js),
async function handleDelete() {
  //if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return
  //error.value = null
  try {
    await deleteCustomer(deletedItemId.value)
    await fetchCustomers()

  } catch (err) {
    error.value = err.message
  }
  finally{
    deletedItemId.value = null
    showDeleteModal.value = false
  }
}
 
onMounted(fetchCustomers)
</script>