<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Ad</th>
          <th>Kullanıcı Adı</th>
          <th>Şifre</th>
          <th>Rol</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="users.length === 0">
          <td colspan="6" class="text-center text-muted">Ürün bulunamadı</td>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button
              class="btn btn-sm btn-outline-primary me-2"
              @click="$emit('edit', user)"
              :disabled="showDeleteModal"
            >
              Düzenle
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="$emit('delete', user.id)"
              :disabled="showDeleteModal"
            >
              Sil
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
 
<script setup>
defineProps({
  users: {
    type: Array,
    default: () => [],
  },
  showDeleteModal: {
    type: Boolean
  }
})
 
defineEmits(['edit', 'delete'])
</script>