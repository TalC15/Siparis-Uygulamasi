<!-- ChangePasswordModal.vue -->
<template>
  <div
    v-if="selectedUserId"
    class="modal d-block"
    tabindex="-1"
    style="background: rgba(0,0,0,0.5)"
  >
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title">Şifre Değiştir</h5>

          <button
            type="button"
            class="btn-close"
            @click="closeModal"
          ></button>
        </div>

        <!-- Body -->
        <div class="modal-body">

          <!-- Error -->
          <div
            v-if="props.usersModalErrorForPassword"
            class="alert alert-danger"
            role="alert"
          >
            {{ usersModalErrorForPassword }}
          </div>

          <!-- New Password -->
          <div class="mb-3">
            <label class="form-label">Yeni Şifre</label>

            <input
              v-model="form.newPassword"
              type="password"
              class="form-control"
              :class="{
                'is-invalid':
                  saveAttempted &&
                  (!form.newPassword || form.newPassword.length < 6)
              }"
            />

            <div
              v-if="saveAttempted && !form.newPassword"
              class="invalid-feedback"
            >
              Yeni şifre zorunludur
            </div>

            <div
              v-else-if="
                saveAttempted &&
                form.newPassword &&
                form.newPassword.length < 6
              "
              class="invalid-feedback"
            >
              Şifre en az 6 karakter olmalıdır
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="mb-3">
            <label class="form-label">Yeni Şifre Tekrar</label>

            <input
              v-model="form.confirmPassword"
              type="password"
              class="form-control"
              :class="{
                'is-invalid':
                  saveAttempted &&
                  form.newPassword !== form.confirmPassword
              }"
            />

            <div
              v-if="
                saveAttempted &&
                form.newPassword !== form.confirmPassword
              "
              class="invalid-feedback"
            >
              Şifreler eşleşmiyor
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            @click="closeModal"
          >
            İptal
          </button>

          <button
            class="btn btn-primary"
            :disabled="saving"
            @click="submit"
          >
            {{ saving ? 'Kaydediliyor...' : 'Şifreyi Güncelle' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  selectedUserId: {
    type: Number,
    default: null
  },
  usersModalErrorForPassword: {
    type: String,
    default: null
  },
  onSave: {
    type:Function,
    required: true
  },
})

const emit = defineEmits([
  'close',
  'usersModalErrorForPassword',
])

const saving = ref(false)
const saveAttempted = ref(false)

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

watch(
  () => props.selectedUserId,
  (val) => {
    if (val) {
      resetForm()
    }
  }
)

function closeModal() {
  resetForm()
  emit('usersModalErrorForPassword',null)
  emit('close')
}

function resetForm() {
  saveAttempted.value = false
  form.newPassword = ''
  form.confirmPassword=''
 
}

async function submit() {
  saveAttempted.value = true

  if (
    !form.newPassword ||
    form.newPassword.length < 6 ||
    form.newPassword !== form.confirmPassword
  ) {
    return
  }
  saving.value = true
 try {
    const result =  await props.onSave({
      id: props.selectedUserId,
      newPassword: form.newPassword
    })

  if (!result?.success) return
    closeModal()
    
  } finally {
    saving.value = false
  }
}
</script>