const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
import { tokenService } from "@/utils/token";

export async function getProductReports() {
  const res = await fetch(`${API_URL}/reports/product-reports`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error('Ürün Raporları alınamadı')
  return data
}

export async function getOrderDetailReports() {
  const res = await fetch(`${API_URL}/reports/order-detail-reports`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error('Sipariş Detayı Raporları alınamadı')
  return data
}

