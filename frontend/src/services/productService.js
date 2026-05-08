const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
import { tokenService } from "@/utils/token";

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`, {
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

export async function createProduct(data) {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Ürün oluşturulamadı')
  return res.json()
}
 
export async function updateProduct(id, data) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Ürün bilgisi güncellenemedi')
  return res.json()
}
 
export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
  })
  if (!res.ok) throw new Error('Ürün silinemedi')
  return res.json()
}