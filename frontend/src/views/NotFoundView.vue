<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark text-light position-relative overflow-hidden">

    <!-- Background glow -->
    <div class="position-absolute top-0 start-0 w-100 h-100 bg-gradient-blur"></div>

    <div class="text-center z-1 px-3">

      <!-- 404 -->
      <h1 class="display-1 fw-bold text-primary glow mb-3">
        404
      </h1>

      <!-- Card -->
      <div class="card bg-dark border border-secondary shadow-lg mx-auto"
           style="max-width: 520px; backdrop-filter: blur(10px);">

        <div class="card-body p-5">

          <h2 class="h3 fw-semibold mb-3">
            Sayfa bulunamadı
          </h2>

          <p class="text-secondary mb-4">
            Aradığınız sayfa kaldırılmış, taşınmış veya hiç var olmamış olabilir.
          </p>

          <!-- Buttons -->
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">

            <button class="btn btn-primary px-4" @click="goHome">
              Ana sayfaya dön
            </button>

            <button class="btn btn-outline-light px-4" @click="goBack">
              Geri dön
            </button>

          </div>

        </div>
      </div>

      <!-- Footer -->
      <p class="text-muted mt-4 small">
        Eğer bunun bir hata olduğunu düşünüyorsanız destek ekibiyle iletişime geçin.
      </p>

    </div>
  </div>
</template>

<style scoped>
.glow {
  text-shadow: 0 0 25px rgba(13, 110, 253, 0.6);
}

.bg-gradient-blur {
  background: radial-gradient(circle at 20% 30%, rgba(13,110,253,0.25), transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(108,117,125,0.2), transparent 40%);
  filter: blur(60px);
}
</style>