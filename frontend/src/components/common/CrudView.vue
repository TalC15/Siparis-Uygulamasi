<template>
  <!-- Delete Modal -->
  <div v-show="showDeleteModal" class="my-modal-body">
    <p>Silmek istediğinize emin misiniz?</p>
    <div class="my-modal-button-wrapper">
      <button class="btn btn-danger" @click="handleDelete">Evet</button>
      <button class="btn btn-primary" @click="showDeleteModal = false">Hayır</button>
    </div>
  </div>
 
  <!-- Main Content -->
  <div :style="{ opacity: showDeleteModal ? 0.3 : 1 }" class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">{{ title }}</h2>
      <button class="btn btn-primary" :disabled="showDeleteModal" @click="openCreateModal">
        + Yeni {{ itemLabel }}
      </button>
    </div>
 
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
 
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status"></div>
    </div>
 
    <!-- Table slot -->
    <slot
      v-else
      :on-edit="openEditModal"
      :on-delete="alertDeleteConfirmation"
      :show-delete-modal="showDeleteModal"
      :is-editing="isEditing"
    />
 
    <!-- Create / Edit Modal -->
    <div
      v-if="showModal"
      class="modal d-block"
      tabindex="-1"
      style="background: rgba(0,0,0,0.5)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? `${itemLabel} Düzenle` : `Yeni ${itemLabel}` }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
 
          <div class="modal-body">
             <div v-if="modalError"  class="alert alert-danger" role="alert">
                {{ modalError }}
              </div>
            <template v-for="field in fields" :key="field.key">
 
              <!-- Select -->
              <div v-if="field.type === 'select'" class="mb-3">
                <label class="form-label">{{ field.label }} <span v-if="field.required" class="text-danger">*</span></label>
                <select
                  v-model="form[field.key]"
                  class="form-select"
                  :class="{ 'is-invalid': savingAttempted && field.required && !form[field.key] }"
                >
                  <option disabled value="">Seçiniz</option>
                  <option v-for="opt in field.options" :key="opt.value" :value="domainNameController(opt)">
                    {{ opt.label }}
                  </option>
                </select>
                <div
                  v-if="savingAttempted && field.required && !form[field.key]"
                  class="invalid-feedback"
                >
                  {{ field.label }} seçmelisiniz
                </div>
              </div>
 
              <!-- Text / Number / Email vs. -->
              <div v-else class="mb-3">
                <label class="form-label">{{ field.label }} <span v-if="field.required" class="text-danger">*</span></label>
                <input
                  v-model="form[field.key]"
                  @input="onTelInput(field)"
                  :type="field.type || 'text'"
                   v-bind="field.type === 'tel'
                    ? {
                  placeholder: '5XXXXXXXXX'
                  }
                  : {placeholder: field.label}"
                  class="form-control"
                  :class="{ 'is-invalid': savingAttempted && hasFieldError(field)}"
                />
                <div v-if="savingAttempted && hasFieldError(field)" class="invalid-feedback">
                  {{ fieldErrorMessage(field) }}
                </div>
              </div>
 
            </template>
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
import { ref,computed,toRef } from 'vue'
 
// ---------------------------------------------------------------
// Props
// ---------------------------------------------------------------
const props = defineProps({
  /** Sayfa başlığı — "Ürünler", "Siparişler" vs. */
  title: { type: String, required: true },
 
  /** Tekil isim — modal başlığı ve buton için — "Ürün", "Sipariş" vs. */
  itemLabel: { type: String, required: true },
 
  /** loading / error durumu view'dan gelir */
  loading: { type: Boolean, default: false },
  error:   { type: String,  default: null },
  usersModalError: {type:String, default: null},
  productsModalError: {type:String, default: null},
  customersModalError: {type:String, default: null},
  domainName: {type:String, default: null},
  /**
   * Form alan tanımları:
   * {
   *   key:       string,           // form[key] ile bağlanır
   *   label:     string,           // input etiketi
   *   type:      string,           // 'text' | 'number' | 'email' | 'select' | ...
   *   required:  boolean,
   *   maxLength: number,           // opsiyonel, sadece text için
   *   options:   [{ value, label }] // sadece select için
   * }
   */
  fields: { type: Array, required: true},
  onSave: {type:Function,required: true},
})
 
// ---------------------------------------------------------------
// Emits
// ---------------------------------------------------------------
const emit = defineEmits(['delete','isEditing','usersModalError','productsModalError','customersModalError'])
 
// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
const showModal       = ref(false)
const showDeleteModal = ref(false)
const isEditing       = ref(false)
const saving          = ref(false)
const savingAttempted = ref(false)
const deletedItemId   = ref(null)
const editingId       = ref(null)
const modalError = toRef(props, `${props.domainName}ModalError`)
 
const buildEmptyForm = () =>
  Object.fromEntries(props.fields.map(f => [f.key, '']))
 
const form = ref(buildEmptyForm())
 
// ---------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------

function onTelInput(field) {
  if (field.type !== 'tel') return

  let val = form.value[field.key]

  val = val
    .replace(/[^0-9]/g, '')   // sadece rakam
    .replace(/^0/, '')        // baştaki 0'ı sil

  // max 10 karakter
  val = val.slice(0, 10)

  form.value[field.key] = val
}

function domainNameController(opt){
  switch (props.domainName) {
    case 'orders':
      return opt.value;

    default:
      return opt.label;
  }
};

function hasFieldError(field) {
  const val = form.value[field.key]
  if (field?.required && (!val || String(val).trim() === '')) return true
  if (field?.maxLength && String(val)?.length > field?.maxLength)  return true
  if(field?.type === 'tel' && val?.length > 0 && val?.length < 10) return true
  if(field?.positiveNumber==='mandatory' && val<0) return true
  return false
}
 
function fieldErrorMessage(field) {
  const val = form.value[field.key]
  if (field?.maxLength && String(val)?.length > field?.maxLength)
    return `En fazla ${field?.maxLength} karakter girebilirsiniz`
  if(field?.type === 'tel' && val?.length > 0 && val?.length < 10)
    return 'Telefon numarası 10 haneli olmalı'
  if(field?.positiveNumber==='mandatory' && val<0)
    return `Negatif ${field?.label} mı olur kardeşim`
  return `${field?.label} alanı zorunludur`
}
 
function formIsValid() {
  return props.fields.every(f => !hasFieldError(f))
}
 
// ---------------------------------------------------------------
// Modal controls
// ---------------------------------------------------------------
function openCreateModal() {
  isEditing.value       = false
  emit('isEditing', false) 
  editingId.value       = null
  savingAttempted.value = false
  form.value            = buildEmptyForm()
  showModal.value       = true
}
 
function openEditModal(item) {
  isEditing.value       = true
  emit('isEditing', true) 
  editingId.value       = item.id
  savingAttempted.value = false
  form.value            = Object.fromEntries(
    props.fields.map(f => [f.key, item[f.key] ?? ''])
  )
  showModal.value = true
}
 
function closeModal() {
  showModal.value       = false
  savingAttempted.value = false
  emit(`${props.domainName}ModalError`, null)
}
 
// ---------------------------------------------------------------
// Save
// ---------------------------------------------------------------
async function handleSave() {
  savingAttempted.value = true
  if (!formIsValid()) return
  saving.value = true
  try {
    const result =  await props.onSave({
    id: isEditing.value ? editingId.value : null,
    isEditing: isEditing.value,
    data: { ...form.value }
    })
  if (!result?.success) return
    closeModal()
    
  } finally {
    saving.value = false
  }
}
 
// ---------------------------------------------------------------
// Delete
// ---------------------------------------------------------------
function alertDeleteConfirmation(id) {
  deletedItemId.value  = id
  showDeleteModal.value = true
}
 
async function handleDelete() {
  try {
    await emit('delete', deletedItemId.value)
  } finally {
    deletedItemId.value   = null
    showDeleteModal.value = false
  }
}
</script>