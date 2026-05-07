<!-- src/views/auth/LoginView.vue -->
<template>
  <div class="container py-5">
    <div class="row justify-content-center fullwidth">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow">
          <div class="card-body p-4">
            <h3 class="card-title text-center mb-4">Giriş Yap</h3>
            <LoginForm />
            <div class="text-center mt-3">
              <small>Hesabınız yok mu? <router-link to="/register">Kayıt Ol</router-link></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '../../components/auth/LoginForm.vue';
</script>