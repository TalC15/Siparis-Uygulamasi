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
          <th>Müşteri Adı</th>
          <th>Ürünler</th>
          <th>Miktar</th>
          <th>Birim Türü</th>
          <th>Sipariş No</th>
          <th>Adres</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="reportStore.orderDetailReports?.length === 0">
          <td colspan="7" class="text-center text-muted">Sipariş Detayı Raporları Bulunamadı</td>
        </tr>
        <tr v-for="detailReport in reportStore?.orderDetailReports" :key="detailReport.name">
          <td>{{ detailReport?.customer_no }}</td>
          <td>{{ detailReport?.customer }}</td>
          <td>{{ detailReport?.products }}</td>
          <td>{{ detailReport?.quantity }}</td>
          <td>{{ detailReport?.unit_type }}</td>
          <td>{{ detailReport?.order_no }}</td>
          <td>{{ detailReport?.address }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { useReportStore } from '@/store/reportStore';
const reportStore = useReportStore()
</script>


