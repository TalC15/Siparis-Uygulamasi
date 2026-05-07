// src/services/authService.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const authService = {
  /**
   * Kayıt işlemi
   * @param {Object} credentials - { name, username, password }
   */
  async register(credentials) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include' // Cookie desteği için (backend httpOnly cookie dönerse)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Kayıt işlemi başarısız');
    }

    return data;
  },

  /**
   * Giriş işlemi
   * @param {Object} credentials - { username, password }
   */
  async login(credentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Giriş işlemi başarısız');
    }

    // Token'ı memory'e kaydet (güvenli)
    if (data.token) {
      const { tokenService } = await import('../utils/token.js');
      tokenService.setToken(data.token);
    }
    
    return data;
  },

  /**
   * Çıkış işlemi - token'ı temizle
   */
  async logout() {
    const { tokenService } = await import('../utils/token.js');
    tokenService.clearToken();
    
    // Backend'de logout endpoint'i varsa buraya fetch isteği eklenebilir
    // await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
  }
};