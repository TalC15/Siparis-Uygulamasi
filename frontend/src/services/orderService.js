const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
import { tokenService } from "@/utils/token";
 
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${tokenService.getToken()}`
});
 
export async function getOrders() {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'GET',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Siparişler alınamadı');
  return res.json();
}
 
export async function getOrderItems(id) {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Sipariş detayı alınamadı');
  return res.json();
}
 
export async function createOrder(data) {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Sipariş oluşturulamadı');
  return res.json();
}
 
export async function updateOrder(id, data) {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Sipariş bilgisi güncellenemedi');
  return res.json();
}
 
export async function updateOrderStatus(id, status) {
  const res = await fetch(`${API_URL}/orders/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Sipariş durumu güncellenemedi');
  return res.json();
}
 
export async function deleteOrder(id) {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Sipariş silinemedi');
  return res.json();
}