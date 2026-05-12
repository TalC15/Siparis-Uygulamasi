<template>
  <CrudView
    :title="'Kullanıcılar'"
    :item-label="'Kullanıcı'"
    :fields="fields"
    :loading="loading"
    :error="error"
    :modal-error="modalError"
    @modalError="modalError = $event"
    @isEditing="isEditing = $event"
    @save="handleSave"
    @delete="handleDelete"
    v-slot="{ onEdit, onDelete, showDeleteModal,isEditing }"
  >
    <UserTable
      :users="users"
      :show-delete-modal="showDeleteModal"
      @editPassword = "editPassword"
      @edit="onEdit"
      @delete="onDelete"
    />
  </CrudView>
  <ChangePasswordModal
   :selectedUserId="selectedUserId"
   @close="closePasswordModal"
   @save="handleSavePassword"
  >

  </ChangePasswordModal>
</template>
 
<script setup>
import { ref, onMounted,computed } from 'vue'
import CrudView    from '@/components/common/CrudView.vue'
import UserTable from '@/components/users/UserTable.vue'
import { getUsers, createUser, updateUser, deleteUser, updateUserPassword } from '@/services/userService'
import ChangePasswordModal from '@/components/common/ChangePasswordModal.vue'
 
const users = ref([])
const loading  = ref(false)
const error    = ref(null)
const modalError = ref(null)
const isEditing = ref(false)
const selectedUserId = ref(null)

// ---------------------------------------------------------------
// Field config — sadece bu view'a özgü kısım
// ---------------------------------------------------------------
const fields =computed(()=> [
  { key: 'name',         label: 'Ad',           type: 'text',   required: true, maxLength: 100 },
  { key: 'username',    label: 'Kullanıcı Adı', type: 'text',   required: true, maxLength: 100},
  isEditing.value ? null : { key: 'password',     label: 'Şifre',        type: 'text',   required:true, maxLength: 255 } ,
  { key: 'role', label: 'Rol',    type: 'select', required:true,
        options: [
            {value:'1',label:'plasiyer'},
            {value:'2',label:'admin'},
            {value:'3',label:'sales manager'}
        ]
    } 
].filter(Boolean))
 
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
 
async function handleSavePassword(data){
  const {id,newPassword} = data
  var returnedResult = null  
  try {
    returnedResult = await updateUserPassword(id, {newPassword})
    selectedUserId.value = null
  } catch (err) {
    throw err 
  }
}

// ---------------------------------------------------------------
// CrudView'dan gelen save/delete eventleri
// ---------------------------------------------------------------
 async function handleSave(payload) {
  return new Promise(async (resolve) => {
    let returnedResult = null
    modalError.value = null

    try {
      if (payload.isEditing) {
        returnedResult = await updateUser(payload.id, payload.data)
      } else {
        returnedResult = await createUser(payload.data)
      }

      await fetchUsers()

      resolve({ success: true })

    } catch (err) {
      resolve({ success: false })
    }
    finally {
      if (!returnedResult?.status) {
        modalError.value = returnedResult?.message
      }
    }
  })
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
 
function closePasswordModal(){
  selectedUserId.value = null
}

function editPassword(id){
  selectedUserId.value = id
}

onMounted(fetchUsers)
</script>