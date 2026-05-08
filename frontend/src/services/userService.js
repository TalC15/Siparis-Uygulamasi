const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
import { tokenService } from "@/utils/token";

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error('Kullanıcılar alınamadı')
  return data
}

export async function createUser(data) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Kullanıcı oluşturulamadı')
  return res.json()
}
 
export async function updateUser(id, data) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Kullanıcı bilgisi güncellenemedi')
  return res.json()
}
 
export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`
    },
  })
  if (!res.ok) throw new Error('Kullanıcı silinemedi')
  return res.json()
}