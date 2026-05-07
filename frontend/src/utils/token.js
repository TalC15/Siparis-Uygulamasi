// src/utils/token.js

// Module scope'da private variable (global erişilemez)

export const tokenService = {
  /**
   * Token'ı memory'e kaydeder
   * @param {string} newToken 
   */
  setToken(newToken) {
    localStorage.setItem('token', newToken)
  },

  /**
   * Memory'deki token'ı döner
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('token');
  },

  /**
   * Token'ı memory'den temizler
   */
  clearToken() {
    localStorage.removeItem('token')
  },

  /**
   * Token var mı kontrolü
   * @returns {boolean}
   */

};