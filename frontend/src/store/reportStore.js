import {defineStore} from 'pinia'
import { ref,computed } from 'vue'

export const useReportStore = defineStore('reports', ()=>{

    const productReports = ref([])
    const orderDetailReports = ref([])
    return {
        productReports,
        orderDetailReports,
    }
})