<template>
  <div
    class="modal d-block"
    tabindex="-1"
    style="background: rgba(0,0,0,0.5)"
    @click.self="closeModal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
 
        <div class="modal-header">
          <h5 class="modal-title">
            {{ isEditing ? 'Siparişi Düzenle' : 'Yeni Sipariş' }}
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
 
        <div class="modal-body">
          <div v-if="modalError" class="alert alert-danger">{{ modalError }}</div>
 
          <!-- Customer searchable select -->
          <div class="mb-3" ref="customerDropdownRef">
            <label class="form-label fw-semibold">Müşteri <span class="text-danger">*</span></label>
            <div class="position-relative">
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': attempted && !form.customer_id }"
                v-model="customerSearch"
                placeholder="Müşteri ara..."
                @focus="showCustomerDropdown = true"
                @input="showCustomerDropdown = true"
                autocomplete="off"
              />
              <ul
                v-if="showCustomerDropdown && filteredCustomers.length"
                class="dropdown-menu show w-100 overflow-auto"
                style="max-height:200px; position:absolute; z-index:1055;"
              >
                <li
                  v-for="c in filteredCustomers"
                  :key="c.value"
                  class="dropdown-item cursor-pointer"
                  @mousedown.prevent="selectCustomer(c)"
                >
                  {{ c.label }}
                </li>
              </ul>
              <ul
                v-else-if="showCustomerDropdown && customerSearch && !filteredCustomers.length"
                class="dropdown-menu show w-100"
                style="position:absolute; z-index:1055;"
              >
                <li class="dropdown-item text-muted">Sonuç bulunamadı</li>
              </ul>
            </div>
            <div v-if="attempted && !form.customer_id" class="invalid-feedback d-block">
              Müşteri seçmelisiniz
            </div>
          </div>
 
          <!-- Order items -->
          <label class="form-label fw-semibold">Sipariş Ürünleri <span class="text-danger">*</span></label>
 
          <div
            v-for="(item, idx) in form.items"
            :key="idx"
            class="border rounded p-3 mb-3 position-relative"
            style="background:#f8f9fa"
          >
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-semibold text-secondary small">Ürün {{ idx + 1 }}</span>
              <button
                v-if="form.items.length > 1"
                type="button"
                class="btn btn-sm btn-outline-danger"
                @click="removeItem(idx)"
              >
                &times; Kaldır
              </button>
            </div>
 
            <!-- Product searchable select -->
            <div class="mb-2" :ref="el => setProductDropdownRef(el, idx)">
              <label class="form-label small">Ürün <span class="text-danger">*</span></label>
              <div class="position-relative">
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': attempted && !item.product_id }"
                  v-model="item.productSearch"
                  placeholder="Ürün ara..."
                  @focus="item.showDropdown = true"
                  @input="item.showDropdown = true"
                  autocomplete="off"
                />
                <ul
                  v-if="item.showDropdown && filteredProducts(item.productSearch).length"
                  class="dropdown-menu show w-100 overflow-auto"
                  style="max-height:200px; position:absolute; z-index:1055;"
                >
                  <li
                    v-for="p in filteredProducts(item.productSearch)"
                    :key="p.value"
                    class="dropdown-item cursor-pointer"
                    @mousedown.prevent="selectProduct(item, p)"
                  >
                    {{ p.label }}
                  </li>
                </ul>
                <ul
                  v-else-if="item.showDropdown && item.productSearch && !filteredProducts(item.productSearch).length"
                  class="dropdown-menu show w-100"
                  style="position:absolute; z-index:1055;"
                >
                  <li class="dropdown-item text-muted">Sonuç bulunamadı</li>
                </ul>
              </div>
              <div v-if="attempted && !item.product_id" class="invalid-feedback d-block">
                Ürün seçmelisiniz
              </div>
            </div>
 
            <!-- Quantity -->
            <div>
              <label class="form-label small">Miktar <span class="text-danger">*</span></label>
              <input
                type="number"
                class="form-control"
                :class="{ 'is-invalid': attempted && !isQuantityValid(item.quantity) }"
                v-model.number="item.quantity"
                placeholder="Miktar giriniz"
                min="1"
              />
              <div v-if="attempted && !isQuantityValid(item.quantity)" class="invalid-feedback">
                Geçerli bir miktar giriniz (min: 1)
              </div>
            </div>
          </div>
 
          <!-- Add item button -->
          <button
            type="button"
            class="btn btn-outline-secondary btn-sm"
            @click="addItem"
          >
            + Ürün Ekle
          </button>
        </div>
 
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">İptal</button>
          <button
            class="btn btn-primary"
            :disabled="saving"
            @click="handleSave"
          >
            <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
            {{ saving ? 'Kaydediliyor...' : 'Kaydet' }}
          </button>
        </div>
 
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
 
// ---------------------------------------------------------------
// Props & Emits
// ---------------------------------------------------------------
const props = defineProps({
  isEditing:       { type: Boolean, default: false },
  existingOrder:   { type: Object,  default: null },   // düzenleme modunda dolu gelir
  customerOptions: { type: Array,   default: () => [] }, // [{ value: id, label: name }]
  productOptions:  { type: Array,   default: () => [] }, // [{ value: id, label: name }]
  saving:          { type: Boolean, default: false },
  modalError:      { type: String,  default: null },
})
 
const emit = defineEmits(['save', 'close'])
 
// ---------------------------------------------------------------
// Reactive state
// ---------------------------------------------------------------
const attempted        = ref(false)
const customerSearch   = ref('')
const showCustomerDropdown = ref(false)
const customerDropdownRef  = ref(null)
 
const buildEmptyItem = () => ({
  product_id:    null,
  productSearch: '',
  quantity:      null,
  showDropdown:  false,
})
 
const form = ref({
  customer_id: null,
  items: [buildEmptyItem()],
})
 
// ---------------------------------------------------------------
// Prefill when editing
// ---------------------------------------------------------------
onMounted(() => {
  if (props.isEditing && props.existingOrder) {
    const o = props.existingOrder
    form.value.customer_id = o.customer_id
    customerSearch.value   = o.customerName ?? ''
 
    if (o.items && o.items.length) {
      form.value.items = o.items.map(it => ({
        product_id:    it.product_id,
        productSearch: it.productName ?? '',
        quantity:      it.quantity,
        showDropdown:  false,
      }))
    }
  }
})
 
// ---------------------------------------------------------------
// Customer search & select
// ---------------------------------------------------------------
const filteredCustomers = computed(() => {
  const q = customerSearch.value.toLowerCase().trim()
  if (!q) return props.customerOptions.slice(0, 50)
  return props.customerOptions
    .filter(c => c.label.toLowerCase().includes(q))
    .slice(0, 50)
})
 
function selectCustomer(c) {
  form.value.customer_id = c.value
  customerSearch.value   = c.label
  showCustomerDropdown.value = false
}
 
// ---------------------------------------------------------------
// Product search & select
// ---------------------------------------------------------------
function filteredProducts(search) {
  const q = (search ?? '').toLowerCase().trim()
  if (!q) return props.productOptions.slice(0, 50)
  return props.productOptions
    .filter(p => p.label.toLowerCase().includes(q))
    .slice(0, 50)
}
 
function selectProduct(item, p) {
  item.product_id    = p.value
  item.productSearch = p.label
  item.showDropdown  = false
}
 
// ---------------------------------------------------------------
// Item management
// ---------------------------------------------------------------
function addItem() {
  form.value.items.push(buildEmptyItem())
}
 
function removeItem(idx) {
  form.value.items.splice(idx, 1)
}
 
function setProductDropdownRef() {
  // placeholder — Vue otomatik yönetiyor, dışarı tıklama global listener'da
}
 
// ---------------------------------------------------------------
// Validation
// ---------------------------------------------------------------
function isQuantityValid(qty) {
  return qty !== null && qty !== '' && Number(qty) >= 1
}
 
function formIsValid() {
  if (!form.value.customer_id) return false
  if (!form.value.items.length) return false
  return form.value.items.every(
    it => it.product_id && isQuantityValid(it.quantity)
  )
}
 
// ---------------------------------------------------------------
// Save
// ---------------------------------------------------------------
function handleSave() {
  attempted.value = true
  if (!formIsValid()) return
 
  const payload = {
    customer_id: form.value.customer_id,
    items: form.value.items.map(it => ({
      product_id: it.product_id,
      quantity:   Number(it.quantity),
    })),
  }
 
  emit('save', payload)
}
 
// ---------------------------------------------------------------
// Close helpers
// ---------------------------------------------------------------
function closeModal() {
  emit('close')
}
 
// Dışarı tıklayınca dropdown'ları kapat
function handleClickOutside(e) {
  if (customerDropdownRef.value && !customerDropdownRef.value.contains(e.target)) {
    showCustomerDropdown.value = false
  }
  // Ürün dropdown'ları — item üzerinde flag tutuyoruz,
  // mousedown.prevent ile select yapılıyor, blur mantığı dışarı tıklamada
  form.value.items.forEach(item => {
    item.showDropdown = false
  })
}
 
onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))
</script>