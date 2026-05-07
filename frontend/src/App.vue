<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- Navbar (opsiyonel, auth durumuna göre güncellenebilir) -->
    <nav v-if="false" class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container">
        <router-link class="navbar-brand" to="/">MyApp</router-link>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
// İleride auth state yönetimi buraya eklenebilir
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>