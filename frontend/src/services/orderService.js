const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
import { tokenService } from "@/utils/token";

export async function getOrders() {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error('Siparişler alınamadı')
  return data
}

export async function createOrder(data) {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Sipariş oluşturulamadı')
  return res.json()
}
 
export async function updateOrder(id, data) {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Sipariş bilgisi güncellenemedi')
  return res.json()
}
 
export async function deleteOrder(id) {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
  })
  if (!res.ok) throw new Error('Sipariş silinemedi')
  return res.json()
}