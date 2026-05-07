<template>
  <div class="app-shell" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
 
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="1" y="1" width="9" height="9" rx="2.5" fill="currentColor" opacity="0.9"/>
            <rect x="12" y="1" width="9" height="9" rx="2.5" fill="currentColor" opacity="0.55"/>
            <rect x="1" y="12" width="9" height="9" rx="2.5" fill="currentColor" opacity="0.55"/>
            <rect x="12" y="12" width="9" height="9" rx="2.5" fill="currentColor" opacity="0.25"/>
          </svg>
        </div>
        <span class="brand-name">Nexus</span>
      </div>
 
      <nav class="sidebar-nav">
        <p class="nav-section-label">Ana Menü</p>
 
        <router-link to="/" class="nav-item active">
          <span class="nav-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </span>
          <span class="nav-label">Ana Sayfa</span>
        </router-link>
 
        <router-link to="/products" class="nav-item">
          <span class="nav-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </span>
          <span class="nav-label">Ürünler</span>
          <span class="nav-badge">24</span>
        </router-link>
 
        <router-link to="/customers" class="nav-item">
          <span class="nav-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </span>
          <span class="nav-label">Müşteriler</span>
        </router-link>
 
        <p class="nav-section-label" style="margin-top: 2rem;">Raporlar</p>
 
        <router-link to="/analytics" class="nav-item">
          <span class="nav-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </span>
          <span class="nav-label">Analitik</span>
        </router-link>
 
        <router-link to="/settings" class="nav-item">
          <span class="nav-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>
    </aside>
 
    <!-- Main Content -->
    <div class="main-area">
 
      <!-- Header -->
      <header class="topbar">
        <div class="topbar-left">
          <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div class="breadcrumb">
            <span class="breadcrumb-root">Nexus</span>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current">Ana Sayfa</span>
          </div>
        </div>
        <div class="topbar-right">
          <div class="search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Ara..." />
          </div>
          <button class="icon-btn notif-btn">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
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
            <p class="page-subtitle">İşte bugünkü özet — her şey yolunda görünüyor.</p>
          </div>
          <div class="page-date">{{ currentDate }}</div>
        </div>
 
        <!-- Stat Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">Toplam Gelir</span>
              <span class="stat-icon stat-icon--green">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </span>
            </div>
            <div class="stat-value">24</div>
            <div class="stat-change stat-change--neutral">2 yeni ürün bekliyor</div>
          </div>
 
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">Bekleyen Siparişler</span>
              <span class="stat-icon stat-icon--red">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </span>
            </div>
            <div class="stat-value">7</div>
            <div class="stat-change stat-change--down">3 acil işlem gerekiyor</div>
          </div>
        </div>
 
        <!-- Quick Actions + Recent Activity -->
        <div class="bottom-grid">
          <div class="card quick-actions">
            <h2 class="card-title">Hızlı Erişim</h2>
            <div class="action-list">
              <button class="action-item" @click="$router.push('/products')">
                <div class="action-icon action-icon--purple">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <div class="action-text">
                  <span class="action-name">Ürün Yönetimi</span>
                  <span class="action-desc">Stok ve fiyatları düzenle</span>
                </div>
                <svg class="action-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
 
              <button class="action-item" @click="$router.push('/customers')">
                <div class="action-icon action-icon--teal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div class="action-text">
                  <span class="action-name">Müşteri Listesi</span>
                  <span class="action-desc">Kayıtlı müşterileri görüntüle</span>
                </div>
                <svg class="action-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
 
              <button class="action-item" @click="$router.push('/analytics')">
                <div class="action-icon action-icon--amber">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
                <div class="action-text">
                  <span class="action-name">Raporlar</span>
                  <span class="action-desc">Satış analitiğini incele</span>
                </div>
                <svg class="action-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
 
          <div class="card recent-activity">
            <h2 class="card-title">Son Aktiviteler</h2>
            <ul class="activity-list">
              <li class="activity-item" v-for="item in activities" :key="item.id">
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
export default {

  //burası composition API ye çevrilecek
  name: 'HomePage',
  data() { //composition API
    return {
      sidebarCollapsed: false,
      activities: [
        { id: 1, type: 'success', text: 'Yeni müşteri kaydı: Zeynep K.', time: '2 dk önce' },
        { id: 2, type: 'info',    text: '14 sipariş onaylandı', time: '18 dk önce' },
        { id: 3, type: 'warning', text: '"Laptop Pro" stok azaldı (3 adet)', time: '1 sa önce' },
        { id: 4, type: 'success', text: 'Aylık rapor oluşturuldu', time: '3 sa önce' },
        { id: 5, type: 'info',    text: 'Fiyat güncellemesi uygulandı', time: 'Dün 17:30' },
      ]
    }
  },
  computed: {
    currentDate() {
      return new Date().toLocaleDateString('tr-TR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })
    }
  },
  methods: {
    logout() {
      if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
        this.$router.push('/login')
      }
    }
  }
}
</script>
 
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700&display=swap');
 
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
.app-shell {
  display: flex;
  min-height: 100vh;
  font-family: 'DM Sans', sans-serif;
  background: #F5F4F1;
  color: #1a1a1a;
}
 
/* ─── SIDEBAR ─────────────────────────────────────────── */
.sidebar {
  width: 240px;
  min-height: 100vh;
  background: #111110;
  display: flex;
  flex-direction: column;
  padding: 0;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 100;
  transition: width 0.25s cubic-bezier(.4,0,.2,1), transform 0.25s cubic-bezier(.4,0,.2,1);
  overflow: hidden;
}
 
.sidebar-collapsed .sidebar { width: 64px; }
 
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 22px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  white-space: nowrap;
}
 
.brand-icon {
  color: #C8B8F5;
  flex-shrink: 0;
  width: 24px;
}
 
.brand-name {
  font-family: 'Syne', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.02em;
  transition: opacity 0.2s;
}
.sidebar-collapsed .brand-name { opacity: 0; pointer-events: none; }
 
.sidebar-nav {
  flex: 1;
  padding: 20px 12px;
  overflow-y: auto;
  overflow-x: hidden;
}
 
.nav-section-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
  padding: 0 8px;
  margin-bottom: 6px;
  white-space: nowrap;
  transition: opacity 0.2s;
}
.sidebar-collapsed .nav-section-label { opacity: 0; }
 
.nav-item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 9px 10px;
  border-radius: 8px;
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
  position: relative;
  margin-bottom: 2px;
  cursor: pointer;
}
.nav-item:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.85); }
.nav-item.active { background: rgba(200,184,245,0.12); color: #C8B8F5; }
.nav-item.active .nav-icon { color: #C8B8F5; }
 
.nav-icon { flex-shrink: 0; width: 17px; display: flex; align-items: center; justify-content: center; }
.nav-label { transition: opacity 0.2s; }
.sidebar-collapsed .nav-label { opacity: 0; }
 
.nav-badge {
  margin-left: auto;
  background: rgba(200,184,245,0.18);
  color: #C8B8F5;
  font-size: 11px;
  font-weight: 500;
  padding: 1px 7px;
  border-radius: 20px;
  transition: opacity 0.2s;
}
.sidebar-collapsed .nav-badge { opacity: 0; }
 
.sidebar-footer {
  padding: 14px 12px;
  border-top: 1px solid rgba(255,255,255,0.07);
  display: flex;
  align-items: center;
  gap: 10px;
}
 
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  overflow: hidden;
}
 
.user-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9B7FE8, #6C52C5);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 600; color: #fff;
  flex-shrink: 0;
}
 
.user-details {
  display: flex; flex-direction: column;
  overflow: hidden;
  transition: opacity 0.2s;
}
.sidebar-collapsed .user-details { opacity: 0; }
 
.user-name { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-role  { font-size: 11px; color: rgba(255,255,255,0.35); }
 
.logout-btn {
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.35);
  padding: 7px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}
.logout-btn:hover { background: rgba(255,80,80,0.12); color: #ff6b6b; }
 
/* ─── MAIN AREA ───────────────────────────────────────── */
.main-area {
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.25s cubic-bezier(.4,0,.2,1);
}
.sidebar-collapsed .main-area { margin-left: 64px; }
 
/* ─── TOPBAR ──────────────────────────────────────────── */
.topbar {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #ECEAE4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  position: sticky; top: 0; z-index: 90;
}
 
.topbar-left { display: flex; align-items: center; gap: 16px; }
 
.collapse-btn {
  background: none; border: none; cursor: pointer;
  color: #888; padding: 6px; border-radius: 6px;
  display: flex; align-items: center;
  transition: background 0.15s, color 0.15s;
}
.collapse-btn:hover { background: #F5F4F1; color: #111; }
 
.breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; }
.breadcrumb-root  { color: #aaa; }
.breadcrumb-sep   { color: #d0cec8; }
.breadcrumb-current { color: #111; font-weight: 500; }
 
.topbar-right { display: flex; align-items: center; gap: 10px; }
 
.search-box {
  display: flex; align-items: center; gap: 8px;
  background: #F5F4F1; border: 1px solid #ECEAE4;
  border-radius: 8px; padding: 7px 12px;
  color: #999;
}
.search-box input {
  border: none; background: none; outline: none;
  font-size: 13px; color: #333; font-family: 'DM Sans', sans-serif;
  width: 160px;
}
.search-box input::placeholder { color: #bbb; }
 
.icon-btn {
  background: none; border: 1px solid #ECEAE4;
  border-radius: 8px; padding: 7px;
  cursor: pointer; color: #666;
  display: flex; align-items: center;
  position: relative;
  transition: background 0.15s;
}
.icon-btn:hover { background: #F5F4F1; }
 
.notif-dot {
  position: absolute; top: 6px; right: 6px;
  width: 6px; height: 6px; border-radius: 50%;
  background: #EF4444; border: 1.5px solid #fff;
}
 
.avatar-sm {
  width: 32px; height: 32px; border-radius: 50%;
  background: linear-gradient(135deg, #9B7FE8, #6C52C5);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 600; color: #fff;
  cursor: pointer;
}
 
/* ─── PAGE CONTENT ────────────────────────────────────── */
.page-content { padding: 36px 32px; }
 
.page-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 32px;
}
.page-title {
  font-family: 'Syne', sans-serif;
  font-size: 26px; font-weight: 700; color: #111;
  margin-bottom: 5px;
}
.page-subtitle { font-size: 14px; color: #888; }
.page-date { font-size: 13px; color: #aaa; margin-top: 4px; }
 
/* ─── STAT CARDS ──────────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
 
.stat-card {
  background: #fff;
  border: 1px solid #ECEAE4;
  border-radius: 12px;
  padding: 20px 20px 18px;
  transition: box-shadow 0.2s, transform 0.2s;
}
.stat-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.06); transform: translateY(-1px); }
 
.stat-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 12px;
}
.stat-label { font-size: 12px; font-weight: 500; color: #999; text-transform: uppercase; letter-spacing: 0.06em; }
 
.stat-icon {
  width: 28px; height: 28px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
}
.stat-icon--green  { background: #ECFDF5; color: #10B981; }
.stat-icon--blue   { background: #EFF6FF; color: #3B82F6; }
.stat-icon--amber  { background: #FFFBEB; color: #F59E0B; }
.stat-icon--red    { background: #FEF2F2; color: #EF4444; }
 
.stat-value { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 700; color: #111; margin-bottom: 6px; }
 
.stat-change { font-size: 12px; font-weight: 500; }
.stat-change--up      { color: #10B981; }
.stat-change--down    { color: #EF4444; }
.stat-change--neutral { color: #F59E0B; }
 
/* ─── BOTTOM GRID ─────────────────────────────────────── */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
 
.card {
  background: #fff;
  border: 1px solid #ECEAE4;
  border-radius: 12px;
  padding: 24px;
}
 
.card-title {
  font-family: 'Syne', sans-serif;
  font-size: 15px; font-weight: 600; color: #111;
  margin-bottom: 20px;
}
 
/* ─── QUICK ACTIONS ───────────────────────────────────── */
.action-list { display: flex; flex-direction: column; gap: 4px; }
 
.action-item {
  display: flex; align-items: center; gap: 14px;
  padding: 12px 10px; border-radius: 10px;
  background: none; border: none; cursor: pointer;
  text-align: left; width: 100%;
  transition: background 0.15s;
}
.action-item:hover { background: #F9F8F5; }
 
.action-icon {
  width: 38px; height: 38px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.action-icon--purple { background: #F3EFFF; color: #7C3AED; }
.action-icon--teal   { background: #ECFDF5; color: #059669; }
.action-icon--amber  { background: #FFFBEB; color: #D97706; }
 
.action-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.action-name { font-size: 14px; font-weight: 500; color: #1a1a1a; }
.action-desc { font-size: 12px; color: #999; }
.action-arrow { color: #ccc; flex-shrink: 0; }
 
/* ─── ACTIVITY ────────────────────────────────────────── */
.activity-list { list-style: none; display: flex; flex-direction: column; }
 
.activity-item {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid #F3F2EE;
}
.activity-item:last-child { border-bottom: none; }
 
.activity-dot {
  width: 8px; height: 8px; border-radius: 50%;
  margin-top: 5px; flex-shrink: 0;
}
.dot--success { background: #10B981; }
.dot--info    { background: #3B82F6; }
.dot--warning { background: #F59E0B; }
.dot--danger  { background: #EF4444; }
 
.activity-body { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.activity-text { font-size: 13.5px; color: #333; line-height: 1.4; }
.activity-time { font-size: 11.5px; color: #bbb; }
 
/* ─── RESPONSIVE ──────────────────────────────────────── */
@media (max-width: 1100px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
 
@media (max-width: 820px) {
  .sidebar { transform: translateX(-100%); }
  .sidebar-collapsed .sidebar { transform: translateX(0); width: 240px; }
  .main-area { margin-left: 0 !important; }
  .bottom-grid { grid-template-columns: 1fr; }
  .page-date { display: none; }
}
 
@media (max-width: 520px) {
  .stats-grid { grid-template-columns: 1fr; }
  .search-box { display: none; }
  .page-content { padding: 24px 16px; }
  .topbar { padding: 0 16px; }
}
</style>