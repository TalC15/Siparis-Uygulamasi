<template>
<button class="back-btn" @click="$router.back()">
  <span class="back-icon">←</span>
  <span>Geri</span>
</button>
  <div class="table-responsive d-flex flex-row align-items-center justify-content-center m-5">
    <table class="table table-bordered table-hover align-middle" style="width: 95%;">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Ad</th>
          <th>Toplam Sipariş Miktarı</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="reportStore.productReports?.length === 0">
          <td colspan="7" class="text-center text-muted">Sipariş Raporu Bulunamadı</td>
        </tr>
        <tr v-for="product in reportStore?.productReports" :key="product.name">
          <td>{{ product?.id }}</td>
          <td>{{ product?.name }}</td>
          <td>{{ product?.total_amount_sold }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { useReportStore } from '@/store/reportStore';
import { useRouter } from 'vue-router';
const reportStore = useReportStore()
const router = useRouter()
</script>
<style>
  .back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 10px 14px;
  margin-left: 15px;
  margin-top:10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;

  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

.back-btn:hover {
  background: #f9fafb;
  transform: translateX(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.back-btn:active {
  transform: translateX(-1px) scale(0.98);
}

.back-icon {
  font-size: 16px;
  transition: transform 0.2s ease;
}

.back-btn:hover .back-icon {
  transform: translateX(-3px);
}
</style>
