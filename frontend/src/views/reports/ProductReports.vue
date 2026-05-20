<script setup>
import {ref,onMounted} from 'vue'
import ProductReportsTable from '@/components/reports/ProductReportsTable.vue';
import { getProductReports } from '@/services/reportService'
import { useReportStore } from '@/store/reportStore'
const reportStore = useReportStore()

onMounted(async() => {
   try{
     reportStore.productReports = await getProductReports()
  }catch(err){
    console.log(err)
  }
})
</script>
<template>
<ProductReportsTable>
    
</ProductReportsTable>
</template>