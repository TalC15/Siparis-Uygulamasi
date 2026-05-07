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
  if (!res.ok) throw new Error('Müşteriler alınamadı')
  return res.json()
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
  if (!res.ok) {throw new Error('Müşteri oluşturulamadı')}
    return res.ok
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
  if (!res.ok) throw new Error('Müşteri güncellenemedi')
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