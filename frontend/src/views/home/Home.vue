<template>
  <div class="app-shell" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <!-- Sidebar -->
    <aside class="sidebar">
     <a href="#"  class="text-decoration-none"> 
      <div class="sidebar-brand">
        <div class="brand-icon">
          <svg
            width="40"
            height="33"
            viewBox="0 0 29 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M16.5 18C17.3284 18 18 18.6716 18 19.5C18 20.3284 17.3284 21 16.5 21C15.6716 21 15 20.3284 15 19.5C15 18.6716 15.6716 18 16.5 18Z"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M11 10.8L12.1429 12L15 9"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <span
          class="brand-name" style="color: #a055aa"
          >Sipariş Uygulaması</span
        >
      </div>
     </a> 

      <nav class="sidebar-nav">
        <p class="nav-section-label">Ana Menü</p>

        <router-link to="/" class="nav-item active">
          <span class="nav-icon">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          <span class="nav-label">Ana Sayfa</span>
        </router-link>

        <router-link to="/products" class="nav-item">
          <span class="nav-icon">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </span>
          <span class="nav-label">Ürünler</span>
        </router-link>

        <router-link to="/customers" class="nav-item">
          <span class="nav-icon">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          <span class="nav-label">Müşteriler</span>
        </router-link>

        <router-link to="/orders" class="nav-item">
          <span class="nav-icon">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </span>
          <span class="nav-label">Siparişler</span>
        </router-link>

        <router-link to="/users" class="nav-item">
          <span class="nav-icon">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </span>
          <span class="nav-label">Kullanıcılar</span>
        </router-link>

        <p class="nav-section-label" style="margin-top: 2rem">Raporlar</p>

        <router-link to="/reports" class="nav-item">
          <span class="nav-icon">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </span>
          <span class="nav-label">Analitik</span>
        </router-link>

        <router-link to="/settings" class="nav-item">
          <span class="nav-icon">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
              />
            </svg>
          </span>
          <span class="nav-label">Ayarlar</span>
        </router-link>
        
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-avatar">AY</div>
          <div class="user-details">
            <span class="user-name">Ahmet Yılmaz</span>
            <span class="user-role">Yönetici</span>
          </div>
        </div>
        <button class="logout-btn" @click="logout" title="Çıkış Yap">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="main-area">
      <!-- Header -->
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="collapse-btn"
            @click="sidebarCollapsed = !sidebarCollapsed"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div class="breadcrumb">
            <span class="breadcrumb-root">Sipariş Uygulaması</span>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current">Ana Sayfa</span>
          </div>
        </div>
        <div class="topbar-right">
          <div class="search-box">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Ara..." />
          </div>
          <button class="icon-btn notif-btn">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span class="notif-dot"></span>
          </button>
          <div class="avatar-sm">AY</div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="page-content">
        <div class="page-header">
          <div>
            <h1 class="page-title">Hoş geldin, Ahmet 👋</h1>
            <p class="page-subtitle">
              İşte bugünkü özet — her şey yolunda görünüyor.
            </p>
          </div>
          <div class="page-date">{{ currentDate }}</div>
        </div>

        <!-- Stat Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">Toplam Gelir</span>
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

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">Aktif Müşteriler</span>
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

        <!-- Quick Actions + Recent Activity -->
        <div class="bottom-grid">
          <div class="card quick-actions">
            <h2 class="card-title">Hızlı Erişim</h2>
            <div class="action-list">
              <button class="action-item" @click="$router.push('/order-count-chart')">
                <div class="action-icon action-icon--purple">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                    />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <div class="action-text">
                  <span class="action-name">Sipariş Sayısı</span>
                  
                </div>
                <svg
                  class="action-arrow"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <button class="action-item" @click="$router.push('/customers')">
                <div class="action-icon action-icon--teal">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div class="action-text">
                  <span class="action-name">Müşteri Listesi</span>
                  <span class="action-desc">Kayıtlı müşterileri görüntüle</span>
                </div>
                <svg
                  class="action-arrow"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <button class="action-item" @click="$router.push('/analytics')">
                <div class="action-icon action-icon--amber">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <div class="action-text">
                  <span class="action-name">Raporlar</span>
                  <span class="action-desc">Satış analitiğini incele</span>
                </div>
                <svg
                  class="action-arrow"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          <div class="card recent-activity">
            <h2 class="card-title">Son Aktiviteler</h2>
            <ul class="activity-list">
              <li
                class="activity-item"
                v-for="item in activities"
                :key="item.id"
              >
                <div class="activity-dot" :class="'dot--' + item.type"></div>
                <div class="activity-body">
                  <span class="activity-text">{{ item.text }}</span>
                  <span class="activity-time">{{ item.time }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import '../../../public/customStyle.css'
export default {
  //burası composition API ye çevrilecek
  name: "HomePage",
  data() {
    //composition API
    return {
      sidebarCollapsed: false,
      activities: [
        {
          id: 1,
          type: "success",
          text: "Yeni müşteri kaydı: Zeynep K.",
          time: "2 dk önce",
        },
        {
          id: 2,
          type: "info",
          text: "14 sipariş onaylandı",
          time: "18 dk önce",
        },
        {
          id: 3,
          type: "warning",
          text: '"Laptop Pro" stok azaldı (3 adet)',
          time: "1 sa önce",
        },
        {
          id: 4,
          type: "success",
          text: "Aylık rapor oluşturuldu",
          time: "3 sa önce",
        },
        {
          id: 5,
          type: "info",
          text: "Fiyat güncellemesi uygulandı",
          time: "Dün 17:30",
        },
      ],
    };
  },
  computed: {
    currentDate() {
      return new Date().toLocaleDateString("tr-TR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  methods: {
    logout() {
      if (confirm("Çıkış yapmak istediğinize emin misiniz?")) {
        this.$router.push("/login");
      }
    },
  },
};
</script>


