const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
import { tokenService } from "@/utils/token";

export async function getCustomers() {
  const res = await fetch(`${API_URL}/customers`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error('Ürünler alınamadı')
  return data
}

export async function createCustomer(data) {
  const res = await fetch(`${API_URL}/customers`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Müşteri oluşturulamadı')
    return res.json()
}
 
export async function updateCustomer(id, data) {
  const res = await fetch(`${API_URL}/customers/${id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Müşteri bilgisi güncellenemedi')
  return res.json()
}
 
export async function deleteCustomer(id) {
  const res = await fetch(`${API_URL}/customers/${id}`, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
  })
  if (!res.ok) throw new Error('Müşteri silinemedi')
  return res.json()
}

export async function getCustomerOrders() {
  const res = await fetch(`${API_URL}/customers/chart/customer-order-count`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
  })
  if (!res.ok) throw new Error('Müşteri Sipariş Bilgisi alınamadı')
  return res.json()
}