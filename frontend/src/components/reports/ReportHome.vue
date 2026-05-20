<template>
<div class="stats-grid">
        <RouterLink to="/reports/product-reports">
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">Sipariş Analizi</span>
              <span class="stat-icon stat-icon--green">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </span>
            </div>
            <div class="stat-value">₺142.580</div>
            <div class="stat-change stat-change--up">+12.4% geçen aya göre</div>
          </div>
        </RouterLink>

        <RouterLink to="/reports/order-detail-reports">
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">Sipariş Analiz Detayı</span>
              <span class="stat-icon stat-icon--blue">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
            </div>
            <div class="stat-value">1.284</div>
            <div class="stat-change stat-change--up">+38 bu hafta</div>
          </div>
        </RouterLink>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">Ürün Sayısı</span>
              <span class="stat-icon stat-icon--amber">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                  />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </span>
            </div>
            <div class="stat-value">24</div>
            <div class="stat-change stat-change--neutral">
              2 yeni ürün bekliyor
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">Bekleyen Siparişler</span>
              <span class="stat-icon stat-icon--red">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
            </div>
            <div class="stat-value">7</div>
            <div class="stat-change stat-change--down">
              3 acil işlem gerekiyor
            </div>
          </div>
        </div>

<div>
</div>
</template>
<script setup>
import '../../../public/customStyle.css'

</script>