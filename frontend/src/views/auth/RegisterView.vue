<!-- src/views/auth/RegisterView.vue -->
<template>
  <div class="container py-5">
    <div class="row justify-content-center fullwidth">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow">
          <div class="card-body p-4">
            <h3 class="card-title text-center mb-4">Kayıt Ol</h3>
            <RegisterForm />
            <div class="text-center mt-3">
              <small>Zaten hesabınız var mı? <router-link to="/login">Giriş Yap</router-link></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RegisterForm from '../../components/auth/RegisterForm.vue';
</script>