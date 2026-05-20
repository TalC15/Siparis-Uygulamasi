<script setup>
import {ref,onMounted} from 'vue'
import OrderDetailReportsTable from '@/components/reports/OrderDetailReportsTable.vue'
import { getOrderDetailReports } from '@/services/reportService'
import { useReportStore } from '@/store/reportStore'
const reportStore = useReportStore()

onMounted(async() => {
   try{
     reportStore.orderDetailReports = await getOrderDetailReports()
  }catch(err){
    console.log(err)
  }
})
</script>
<template>
<OrderDetailReportsTable>
</OrderDetailReportsTable>
</template>