<template>
  <CrudView
    title="Siparişler"
    item-label="Sipariş"
    :domain-name="'orders'"
    :fields="fields"
    :loading="loading"
    :error="error"
    @save="handleSave"
    @delete="handleDelete"
    v-slot="{ onEdit, onDelete, showDeleteModal }"
  >
    <OrderTable
      :orders="orders"
      :show-delete-modal="showDeleteModal"
      @edit="onEdit"
      @delete="onDelete"
    />
  </CrudView>
</template>
 
<script setup>
import { ref, onMounted } from 'vue'
import CrudView    from '@/components/common/CrudView.vue'
import OrderTable from '@/components/orders/OrderTable.vue'
import { getOrders,createOrder,updateOrder,deleteOrder } from '@/services/orderService'
import { getProducts } from '@/services/productService'
import { getCustomers } from '@/services/customerService'

const orders = ref([])
const loading  = ref(false)
const error    = ref(null)
const customerOptions = ref([])
const productOptions = ref([])
// ---------------------------------------------------------------
// Field config — sadece bu view'a özgü kısım
// ---------------------------------------------------------------
const fields = ref([
  { key: 'customerDefination',         label: 'Müşteri Açıklaması',           type: 'select',   required: true,
    options:customerOptions.value
  },
  { key: 'productName',    label: 'Ürün İsmi',    type: 'select', required: true,
    options:productOptions.value
  },
  { key: 'quantity',  label: 'Miktar', type: 'number', required: true, maxLength: 8 },
])
 
// ---------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------
async function fetchCustomers() {
  loading.value = true
  error.value   = null
  try {
    const customers = await getCustomers()
    customerOptions.value = customers?.map((val)=>({'value':val?.id,'label':val?.name}))
    // fields içindeki options'ı güncelle
    const customerField = fields.value.find(
      f => f.key === 'customerDefination'
    )
    if (customerField) {
      customerField.options = customerOptions.value
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
 
async function fetchProducts() {
  loading.value = true
  error.value   = null
  try {
    const products = await getProducts()
    console.log(products)
    productOptions.value = products.map((val)=>({'value':val?.id,'label':val?.name}))
    // fields içindeki options'ı güncelle
    const productField = fields.value.find(
      f => f.key === 'productName'
    )
    if (productField) {
      productField.options = productOptions.value
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function fetchOrders() {
  loading.value = true
  error.value   = null
  try {
    orders.value = await getOrders()   
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

function getUser(){
  const token = localStorage.getItem('token');

if (token) {
  const payload = JSON.parse(atob(token.split('.')[1]));

  const userId = payload.id; // veya payload.userId / payload.sub
  return userId;
}
}

async function handleSave(payload) {
  return new Promise(async (resolve) => {
    let returnedResult = null
    //customersModalError.value = null

    try {
      if (payload.isEditing) {
        returnedResult = await updateOrder(payload.id, payload.data)
      } else {
        console.log(payload.data)
        const userId = getUser()
        const {productName,quantity} = payload.data //değişcek
        payload.data['items'] = [{product_id:productName,quantity:quantity}] // değiscek
        payload.data['user_id'] = userId
        returnedResult = await createOrder(payload.data)
      }

      await fetchOrders()
      resolve({ success: returnedResult.status })
    } catch (err) {
      resolve({ success: false })
    }
    finally {
      if (!returnedResult?.status) {
        //customersModalError.value = returnedResult?.message
      }
    }
  })
}

// ---------------------------------------------------------------
// CrudView'dan gelen save/delete eventleri
// ---------------------------------------------------------------
onMounted(fetchCustomers)
onMounted(fetchProducts)
onMounted(fetchOrders)
</script>