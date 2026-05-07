<!-- src/components/auth/RegisterForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
    <!-- Name -->
    <div class="mb-3">
      <label for="name" class="form-label">Ad Soyad</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': submitted && !form.name }"
        required
        placeholder="Adınızı girin"
      />
      <div v-if="submitted && !form.name" class="invalid-feedback">
        Ad alanı zorunludur
      </div>
    </div>

    <!-- Username -->
    <div class="mb-3">
      <label for="username" class="form-label">Kullanıcı Adı</label>
      <input
        id="username"
        v-model="form.username"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': submitted && !form.username }"
        required
        placeholder="Kullanıcı adınızı girin"
      />
      <div v-if="submitted && !form.username" class="invalid-feedback">
        Kullanıcı adı alanı zorunludur
      </div>
    </div>

    <!-- Password -->
    <div class="mb-3">
      <label for="password" class="form-label">Şifre</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        class="form-control"
        :class="{ 'is-invalid': submitted && form.password.length < 6 }"
        required
        minlength="6"
        placeholder="En az 6 karakter"
      />
      <div v-if="submitted && form.password.length < 6" class="invalid-feedback">
        Şifre en az 6 karakter olmalıdır
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- Success Alert -->
    <div v-if="success" class="alert alert-success" role="alert">
      {{ success }}
    </div>

    <!-- Submit Button -->
    <button type="submit" class="btn btn-primary w-100" :disabled="loading">
      <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
      {{ loading ? 'Kaydediliyor...' : 'Kayıt Ol' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { authService } from '../../services/authService';
import { useRouter } from 'vue-router';

const router = useRouter();

// Reactive state
const form = ref({
  name: '',
  username: '',
  password: ''
});
const loading = ref(false);
const error = ref(null);
const success = ref(null);
const submitted = ref(false);

// Form submit handler
const handleSubmit = async () => {
  submitted.value = true;
  error.value = null;
  success.value = null;

  // Basit validation
  if (!form.value.name || !form.value.username || form.value.password.length < 6) {
    return;
  }

  loading.value = true;

  try {
    const response = await authService.register({
      name: form.value.name,
      username: form.value.username,
      password: form.value.password
    });
  
    success.value = response.message;
    router.push('/login');
    // Formu temizle
    form.value = { name: '', username: '', password: '' };
    
    // 2 saniye sonra login sayfasına yönlendir
   
    
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Gerekirse özel stiller buraya */
</style>