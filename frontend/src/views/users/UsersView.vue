<template>
  <CrudView
    title="Kullanıcılar"
    item-label="Kullanıcı"
    :fields="fields"
    :loading="loading"
    :error="error"
    @save="handleSave"
    @delete="handleDelete"
    v-slot="{ onEdit, onDelete, showDeleteModal }"
  >
    <UserTable
      :users="users"
      :show-delete-modal="showDeleteModal"
      @edit="onEdit"
      @delete="onDelete"
    />
  </CrudView>
</template>
 
<script setup>
import { ref, onMounted } from 'vue'
import CrudView    from '@/components/common/CrudView.vue'
import UserTable from '@/components/users/UserTable.vue'
import { getUsers, createUser, updateUser, deleteUser } from '@/services/userService'
 
const users = ref([])
const loading  = ref(false)
const error    = ref(null)
 
// ---------------------------------------------------------------
// Field config — sadece bu view'a özgü kısım
// ---------------------------------------------------------------
const fields = [
  { key: 'name',         label: 'Ad',           type: 'text',   required: true, maxLength: 100 },
  { key: 'username',    label: 'Kullanıcı Adı', type: 'text',   required: true, maxLength: 100},
  { key: 'password',     label: 'Şifre',        type: 'text',   required:true, maxLength: 255 },
  { key: 'role', label: 'Rol',    type: 'select', required:true,
        options: [
            {value:'1',label:'plasiyer'},
            {value:'2',label:'admin'}
        ]
    } 
]
 
// ---------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------
async function fetchUsers() {
  loading.value = true
  error.value   = null
  try {
    users.value = await getUsers()
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
      await updateUser(id, data)
    } else {
      await createUser(data)
    }
    await fetchUsers()
  } catch (err) {
    error.value = err.message
    throw err   // CrudView modalı açık tutsun
  }
}
 
async function handleDelete(id) {
  error.value = null
  try {
    await deleteUser(id)
    await fetchUsers()
  } catch (err) {
    error.value = err.message
    throw err
  }
}
 
onMounted(fetchUsers)
</script>