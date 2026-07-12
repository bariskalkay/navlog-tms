"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Truck,
  Route,
  Factory,
  Building2,
  UserRound,
  WalletCards,
  BarChart3,
  Settings,
  Search,
  Bell,
  Plus,
  AlertTriangle,
  Clock3,
  CheckCircle2,
  ChevronRight,
  MoreHorizontal,
  MapPin,
  ArrowRight,
  X,
  Menu,
  TrendingUp,
  CircleDollarSign,
  Navigation,
  RefreshCw,
  FileText,
  Users,
  LogOut,
} from "lucide-react";

const initialLoads = [
  {
    id: "NV-2026-001",
    factory: "Oğuz Gıda",
    origin: "Konya Ereğli OSB",
    destination: "Çorum + Tokat",
    vehicle: "13.60 Tır",
    plate: "42 ABC 123",
    carrier: "Anadolu Nakliyat",
    status: "Yolda",
    statusType: "blue",
    price: "38.500 ₺",
    updated: "8 dk önce",
  },
  {
    id: "NV-2026-002",
    factory: "Oğuz Gıda",
    origin: "Konya Ereğli OSB",
    destination: "Elmadağ + Akyurt",
    vehicle: "13.60 Tır",
    plate: "06 NVR 145",
    carrier: "Başkent Lojistik",
    status: "Yüklemede",
    statusType: "purple",
    price: "27.000 ₺",
    updated: "14 dk önce",
  },
  {
    id: "NV-2026-003",
    factory: "Oğuz Gıda",
    origin: "Konya Ereğli OSB",
    destination: "Tekkeköy",
    vehicle: "13.60 Tır",
    plate: "Araç Bekleniyor",
    carrier: "—",
    status: "Araç Bekliyor",
    statusType: "orange",
    price: "31.500 ₺",
    updated: "21 dk önce",
  },
  {
    id: "NV-2026-004",
    factory: "Oğuz Gıda",
    origin: "Konya Ereğli OSB",
    destination: "Döşemealtı + Serik",
    vehicle: "13.60 Tır",
    plate: "33 BK 2026",
    carrier: "Akdeniz Transport",
    status: "Teslim Edildi",
    statusType: "green",
    price: "42.000 ₺",
    updated: "36 dk önce",
  },
];

const menuItems = [
  { name: "Kontrol Merkezi", icon: LayoutDashboard },
  { name: "Yükler", icon: Package, count: 12 },
  { name: "Araçlar", icon: Truck },
  { name: "Seferler", icon: Route },
  { name: "Fabrikalar", icon: Factory },
  { name: "Nakliyeciler", icon: Building2 },
  { name: "Şoförler", icon: UserRound },
  { name: "Teklifler", icon: FileText, count: 5 },
  { name: "Finans", icon: WalletCards },
  { name: "Raporlar", icon: BarChart3 },
];

const statusClass = {
  blue: "status blue",
  purple: "status purple",
  orange: "status orange",
  green: "status green",
};

export default function Dashboard({ onLogout }) {
  const [activeMenu, setActiveMenu] = useState("Kontrol Merkezi");
  const [search, setSearch] = useState("");
  const [loads, setLoads] = useState(initialLoads);
  const [showNewLoad, setShowNewLoad] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredLoads = loads.filter((load) =>
    Object.values(load).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const addLoad = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const newLoad = {
      id: `NV-2026-${String(loads.length + 1).padStart(3, "0")}`,
      factory: form.get("factory") || "Yeni Fabrika",
      origin: form.get("origin") || "Konya Ereğli OSB",
      destination: form.get("destination") || "Belirtilmedi",
      vehicle: form.get("vehicle") || "13.60 Tır",
      plate: "Araç Bekleniyor",
      carrier: "—",
      status: "Araç Bekliyor",
      statusType: "orange",
      price: form.get("price") ? `${form.get("price")} ₺` : "—",
      updated: "Şimdi",
    };

    setLoads((current) => [newLoad, ...current]);
    setShowNewLoad(false);
  };

  return (
    <div className="navlog-app">
      <aside className={`sidebar ${mobileMenu ? "mobile-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="navlog-symbol">N</div>
          <div>
            <div className="navlog-word">
              NAVLOG <span>TMS</span>
            </div>
            <small>LOGISTICS CONTROL TOWER</small>
          </div>
          <button
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
          >
            <X />
          </button>
        </div>

        <div className="sidebar-section-title">OPERASYON</div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activeMenu === item.name ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu(item.name);
                  setMobileMenu(false);
                }}
              >
                <Icon />
                <span>{item.name}</span>
                {item.count && <b>{item.count}</b>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <Settings />
            <span>Ayarlar</span>
          </button>

          <div className="system-live">
            <span className="live-dot"></span>
            <div>
              <strong>Sistem Aktif</strong>
              <small>Tüm servisler çalışıyor</small>
            </div>
          </div>
        </div>
      </aside>

      <div className="app-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="menu-toggle"
              onClick={() => setMobileMenu(true)}
            >
              <Menu />
            </button>

            <div>
              <h1>{activeMenu}</h1>
              <p>
                Operasyonlarınızı gerçek zamanlı olarak yönetin ve takip edin.
              </p>
            </div>
          </div>

          <div className="topbar-actions">
            <div className="global-search">
              <Search />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Yük, plaka, rota veya firma ara..."
              />
              <kbd>⌘ K</kbd>
            </div>

            <button
              className="icon-button notification-button"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell />
              <span className="notification-dot">3</span>
            </button>

            <div className="profile">
              <div className="avatar">BK</div>
              <div>
                <strong>Barış Kalkay</strong>
                <small>Sistem Yöneticisi</small>
              </div>
            </div>

            {onLogout && (
              <button className="logout-button" onClick={onLogout}>
                <LogOut />
              </button>
            )}
          </div>

          {showNotifications && (
            <div className="notification-panel">
              <div className="notification-header">
                <strong>Bildirim Merkezi</strong>
                <span>3 yeni</span>
              </div>

              <div className="notification-item critical">
                <AlertTriangle />
                <div>
                  <strong>3 yük için araç bekleniyor</strong>
                  <small>Operasyon müdahalesi gerekli</small>
                </div>
              </div>

              <div className="notification-item warning">
                <Clock3 />
                <div>
                  <strong>2 teklif yanıt bekliyor</strong>
                  <small>Son güncelleme 12 dakika önce</small>
                </div>
              </div>

              <div className="notification-item success">
                <CheckCircle2 />
                <div>
                  <strong>NV-2026-004 teslim edildi</strong>
                  <small>Döşemealtı + Serik operasyonu tamamlandı</small>
                </div>
              </div>
            </div>
          )}
        </header>

        <main className="dashboard-main">
          <section className="welcome-row">
            <div>
              <div className="eyebrow">
                <span className="live-dot"></span>
                CANLI OPERASYON MERKEZİ
              </div>
              <h2>İyi akşamlar, Barış.</h2>
              <p>
                Bugün <strong>12 aktif yük</strong> yönetiliyor.{" "}
                <strong className="warning-text">3 operasyon</strong> müdahale
                bekliyor.
              </p>
            </div>

            <div className="quick-buttons">
              <button className="secondary-action">
                <RefreshCw />
                Verileri Yenile
              </button>
              <button
                className="primary-action"
                onClick={() => setShowNewLoad(true)}
              >
                <Plus />
                Yeni Yük Oluştur
              </button>
            </div>
          </section>

          <section className="kpi-grid">
            <article className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-icon blue-icon">
                  <Package />
                </div>
                <span className="trend positive">
                  <TrendingUp /> %18
                </span>
              </div>
              <strong className="kpi-number">{loads.length}</strong>
              <span className="kpi-label">Aktif Yük</span>
              <small>Geçen haftaya göre artış</small>
            </article>

            <article className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-icon green-icon">
                  <Truck />
                </div>
                <span className="mini-status success-text">● Aktif</span>
              </div>
              <strong className="kpi-number">8</strong>
              <span className="kpi-label">Aktif Araç</span>
              <small>5 yolda · 3 yüklemede</small>
            </article>

            <article className="kpi-card attention">
              <div className="kpi-top">
                <div className="kpi-icon orange-icon">
                  <AlertTriangle />
                </div>
                <span className="mini-status warning-text">Müdahale</span>
              </div>
              <strong className="kpi-number">3</strong>
              <span className="kpi-label">Araç Bekleyen</span>
              <small>Ortalama bekleme: 47 dk</small>
            </article>

            <article className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-icon purple-icon">
                  <FileText />
                </div>
                <span className="mini-status">5 açık</span>
              </div>
              <strong className="kpi-number">5</strong>
              <span className="kpi-label">Bekleyen Teklif</span>
              <small>2 teklif bugün sonuçlanıyor</small>
            </article>

            <article className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-icon cyan-icon">
                  <CircleDollarSign />
                </div>
                <span className="trend positive">
                  <TrendingUp /> %12
                </span>
              </div>
              <strong className="kpi-number">139K ₺</strong>
              <span className="kpi-label">Aktif Operasyon Hacmi</span>
              <small>4 açık operasyondan</small>
            </article>
          </section>

          <section className="workspace-grid">
            <div className="operations-panel">
              <div className="panel-header">
                <div>
                  <div className="panel-title-line">
                    <h3>Aktif Operasyonlar</h3>
                    <span>{filteredLoads.length} kayıt</span>
                  </div>
                  <p>Devam eden ve müdahale bekleyen sevkiyatlar</p>
                </div>

                <button className="text-action">
                  Tümünü Gör <ChevronRight />
                </button>
              </div>

              <div className="table-tools">
                <div className="table-search">
                  <Search />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Operasyonlarda ara..."
                  />
                </div>

                <div className="filter-pills">
                  <button className="active">Tümü</button>
                  <button>Yolda</button>
                  <button>Yüklemede</button>
                  <button>Araç Bekliyor</button>
                </div>
              </div>

              <div className="table-wrapper">
                <table className="operations-table">
                  <thead>
                    <tr>
                      <th>YÜK NO</th>
                      <th>FABRİKA / ROTA</th>
                      <th>ARAÇ / NAKLİYECİ</th>
                      <th>NAVLUN</th>
                      <th>DURUM</th>
                      <th>GÜNCELLEME</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredLoads.map((load) => (
                      <tr key={load.id}>
                        <td>
                          <strong className="load-id">{load.id}</strong>
                        </td>

                        <td>
                          <strong>{load.factory}</strong>
                          <div className="route-line">
                            <MapPin />
                            {load.origin}
                            <ArrowRight />
                            {load.destination}
                          </div>
                        </td>

                        <td>
                          <strong>{load.plate}</strong>
                          <small>{load.carrier}</small>
                        </td>

                        <td>
                          <strong>{load.price}</strong>
                          <small>{load.vehicle}</small>
                        </td>

                        <td>
                          <span className={statusClass[load.statusType]}>
                            <span></span>
                            {load.status}
                          </span>
                        </td>

                        <td>
                          <span className="updated-time">{load.updated}</span>
                        </td>

                        <td>
                          <button className="more-button">
                            <MoreHorizontal />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="right-column">
              <div className="alerts-card">
                <div className="panel-header compact">
                  <div>
                    <div className="panel-title-line">
                      <h3>Kritik Uyarılar</h3>
                      <span className="alert-count">3</span>
                    </div>
                    <p>Operasyon müdahalesi bekleyen işler</p>
                  </div>
                </div>

                <div className="alert-item danger-alert">
                  <div className="alert-icon">
                    <AlertTriangle />
                  </div>
                  <div className="alert-content">
                    <strong>3 yük için araç bekleniyor</strong>
                    <p>En uzun bekleme süresi 1 saat 24 dakika.</p>
                    <button>Araçları Gör <ChevronRight /></button>
                  </div>
                </div>

                <div className="alert-item warning-alert">
                  <div className="alert-icon">
                    <Clock3 />
                  </div>
                  <div className="alert-content">
                    <strong>2 teklif yanıt bekliyor</strong>
                    <p>Nakliyeci teklifleri henüz sonuçlandırılmadı.</p>
                    <button>Teklifleri Gör <ChevronRight /></button>
                  </div>
                </div>

                <div className="alert-item info-alert">
                  <div className="alert-icon">
                    <Navigation />
                  </div>
                  <div className="alert-content">
                    <strong>Bir araç rotadan saptı</strong>
                    <p>NV-2026-001 için rota kontrolü öneriliyor.</p>
                    <button>Seferi İncele <ChevronRight /></button>
                  </div>
                </div>
              </div>

              <div className="quick-actions-card">
                <div className="panel-header compact">
                  <div>
                    <h3>Hızlı İşlemler</h3>
                    <p>Sık kullanılan operasyon araçları</p>
                  </div>
                </div>

                <div className="action-grid">
                  <button onClick={() => setShowNewLoad(true)}>
                    <Package />
                    <span>Yeni Yük</span>
                  </button>

                  <button>
                    <Truck />
                    <span>Araç Ata</span>
                  </button>

                  <button>
                    <FileText />
                    <span>Teklif Oluştur</span>
                  </button>

                  <button>
                    <Users />
                    <span>Nakliyeci Ekle</span>
                  </button>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>

      {showNewLoad && (
        <div className="modal-backdrop" onClick={() => setShowNewLoad(false)}>
          <div className="load-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span>YENİ OPERASYON</span>
                <h3>Yeni Yük Oluştur</h3>
                <p>Yeni taşıma operasyonunun temel bilgilerini girin.</p>
              </div>

              <button onClick={() => setShowNewLoad(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={addLoad}>
              <div className="form-grid">
                <label>
                  Fabrika / Müşteri
                  <input
                    name="factory"
                    defaultValue="Oğuz Gıda"
                    required
                  />
                </label>

                <label>
                  Yükleme Noktası
                  <input
                    name="origin"
                    defaultValue="Konya Ereğli OSB"
                    required
                  />
                </label>

                <label className="full-width">
                  Teslimat Noktası / Rota
                  <input
                    name="destination"
                    placeholder="Örn: Çorum + Tokat"
                    required
                  />
                </label>

                <label>
                  Araç Tipi
                  <select name="vehicle" defaultValue="13.60 Tır">
                    <option>13.60 Tır</option>
                    <option>Kamyon</option>
                    <option>Kırkayak</option>
                    <option>Frigo</option>
                  </select>
                </label>

                <label>
                  Navlun
                  <input name="price" type="number" placeholder="38500" />
                </label>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowNewLoad(false)}
                >
                  Vazgeç
                </button>

                <button type="submit" className="primary-action">
                  <Plus />
                  Yükü Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        :root {
          --navy: #0a2347;
          --navy-2: #102d57;
          --blue: #087df5;
          --blue-soft: #eaf4ff;
          --bg: #f5f8fc;
          --white: #ffffff;
          --border: #e3eaf2;
          --text: #14233b;
          --muted: #6f7f95;
          --green: #15a96b;
          --orange: #f18b22;
          --red: #e54b4b;
          --purple: #7856d8;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: var(--bg);
        }

        button,
        input,
        select {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .navlog-app {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: Inter, Arial, Helvetica, sans-serif;
        }

        .sidebar {
          position: fixed;
          inset: 0 auto 0 0;
          z-index: 50;
          width: 250px;
          display: flex;
          flex-direction: column;
          background:
            radial-gradient(circle at 20% 5%, rgba(26, 116, 220, 0.18), transparent 25%),
            linear-gradient(180deg, #0b2850 0%, #081e3c 100%);
          color: white;
          box-shadow: 10px 0 40px rgba(12, 37, 70, 0.08);
        }

        .sidebar-brand {
          height: 84px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .navlog-symbol {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          color: #38a2ff;
          font-size: 34px;
          font-weight: 900;
          font-style: italic;
        }

        .navlog-word {
          font-size: 19px;
          font-weight: 900;
          letter-spacing: 0.5px;
        }

        .navlog-word span {
          margin-left: 4px;
          color: #55b3ff;
          font-size: 10px;
        }

        .sidebar-brand small {
          display: block;
          margin-top: 4px;
          color: #8ca7c7;
          font-size: 7px;
          letter-spacing: 0.8px;
        }

        .sidebar-section-title {
          padding: 23px 22px 9px;
          color: #6f8bae;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.3px;
        }

        .sidebar-nav {
          padding: 0 11px;
          overflow-y: auto;
        }

        .nav-item {
          width: 100%;
          height: 45px;
          margin-bottom: 3px;
          padding: 0 13px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: none;
          border-radius: 8px;
          color: #b8c9dc;
          background: transparent;
          font-size: 13px;
          text-align: left;
          transition: 0.18s ease;
        }

        .nav-item:hover {
          color: white;
          background: rgba(255, 255, 255, 0.06);
        }

        .nav-item.active {
          color: white;
          background: linear-gradient(90deg, #087df5, #116bd0);
          box-shadow: 0 8px 20px rgba(8, 125, 245, 0.2);
        }

        .nav-item svg {
          width: 18px;
          height: 18px;
        }

        .nav-item span {
          flex: 1;
        }

        .nav-item b {
          min-width: 23px;
          height: 20px;
          padding: 0 6px;
          display: grid;
          place-items: center;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.13);
          color: white;
          font-size: 10px;
        }

        .sidebar-bottom {
          margin-top: auto;
          padding: 10px 11px 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .system-live {
          margin: 10px 5px 0;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.035);
        }

        .live-dot {
          width: 8px;
          height: 8px;
          flex: 0 0 8px;
          border-radius: 50%;
          background: #22c983;
          box-shadow: 0 0 0 4px rgba(34, 201, 131, 0.12);
        }

        .system-live strong,
        .system-live small {
          display: block;
        }

        .system-live strong {
          font-size: 11px;
        }

        .system-live small {
          margin-top: 3px;
          color: #7895b7;
          font-size: 9px;
        }

        .app-content {
          min-height: 100vh;
          margin-left: 250px;
        }

        .topbar {
          height: 84px;
          position: sticky;
          top: 0;
          z-index: 40;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.96);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(16px);
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .topbar h1 {
          margin: 0;
          font-size: 19px;
          letter-spacing: -0.4px;
        }

        .topbar p {
          margin: 4px 0 0;
          color: var(--muted);
          font-size: 11px;
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .global-search {
          width: 315px;
          height: 42px;
          padding: 0 12px;
          display: flex;
          align-items: center;
          gap: 9px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: #f9fbfd;
        }

        .global-search svg,
        .table-search svg {
          width: 16px;
          color: #8b9aaf;
        }

        .global-search input,
        .table-search input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: var(--text);
          font-size: 12px;
        }

        .global-search kbd {
          padding: 3px 6px;
          border: 1px solid #dce4ee;
          border-radius: 5px;
          background: white;
          color: #8391a5;
          font-size: 9px;
        }

        .icon-button,
        .logout-button,
        .menu-toggle,
        .mobile-close {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: white;
          color: #53657c;
        }

        .icon-button svg,
        .logout-button svg,
        .menu-toggle svg,
        .mobile-close svg {
          width: 18px;
        }

        .notification-button {
          position: relative;
        }

        .notification-dot {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 18px;
          height: 18px;
          display: grid;
          place-items: center;
          border: 2px solid white;
          border-radius: 50%;
          background: #e84e4e;
          color: white;
          font-size: 8px;
          font-weight: 800;
        }

        .profile {
          padding-left: 5px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: white;
          background: linear-gradient(135deg, #087df5, #164a91);
          font-size: 11px;
          font-weight: 800;
        }

        .profile strong,
        .profile small {
          display: block;
        }

        .profile strong {
          font-size: 11px;
        }

        .profile small {
          margin-top: 3px;
          color: var(--muted);
          font-size: 9px;
        }

        .notification-panel {
          position: absolute;
          top: 70px;
          right: 145px;
          width: 340px;
          padding: 8px;
          border: 1px solid var(--border);
          border-radius: 13px;
          background: white;
          box-shadow: 0 22px 55px rgba(25, 54, 90, 0.16);
        }

        .notification-header {
          padding: 11px 10px 14px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }

        .notification-header span {
          color: var(--blue);
          font-size: 10px;
        }

        .notification-item {
          padding: 12px 10px;
          display: flex;
          gap: 10px;
          border-radius: 9px;
        }

        .notification-item:hover {
          background: #f7f9fc;
        }

        .notification-item svg {
          width: 18px;
        }

        .notification-item strong,
        .notification-item small {
          display: block;
        }

        .notification-item strong {
          font-size: 11px;
        }

        .notification-item small {
          margin-top: 4px;
          color: var(--muted);
          font-size: 9px;
        }

        .critical svg {
          color: var(--red);
        }

        .warning svg {
          color: var(--orange);
        }

        .success svg {
          color: var(--green);
        }

        .dashboard-main {
          width: 100%;
          max-width: 1700px;
          margin: 0 auto;
          padding: 28px;
        }

        .welcome-row {
          margin-bottom: 22px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
        }

        .eyebrow {
          margin-bottom: 9px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--green);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .welcome-row h2 {
          margin: 0;
          font-size: 25px;
          letter-spacing: -0.7px;
        }

        .welcome-row p {
          margin: 7px 0 0;
          color: var(--muted);
          font-size: 12px;
        }

        .welcome-row p strong {
          color: var(--text);
        }

        .warning-text {
          color: var(--orange) !important;
        }

        .success-text {
          color: var(--green) !important;
        }

        .quick-buttons {
          display: flex;
          gap: 9px;
        }

        .primary-action,
        .secondary-action {
          height: 42px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 750;
        }

        .primary-action {
          border: none;
          color: white;
          background: linear-gradient(90deg, #087df5, #086bd8);
          box-shadow: 0 8px 20px rgba(8, 125, 245, 0.2);
        }

        .secondary-action {
          border: 1px solid var(--border);
          color: #506078;
          background: white;
        }

        .primary-action svg,
        .secondary-action svg {
          width: 15px;
        }

        .kpi-grid {
          margin-bottom: 20px;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
        }

        .kpi-card {
          min-height: 145px;
          padding: 17px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: white;
          box-shadow: 0 4px 16px rgba(20, 55, 90, 0.025);
        }

        .kpi-card.attention {
          border-color: #f4d5b3;
          background: linear-gradient(135deg, #fff, #fffaf5);
        }

        .kpi-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .kpi-icon {
          width: 37px;
          height: 37px;
          display: grid;
          place-items: center;
          border-radius: 9px;
        }

        .kpi-icon svg {
          width: 18px;
        }

        .blue-icon {
          color: #087df5;
          background: #eaf4ff;
        }

        .green-icon {
          color: #16a86c;
          background: #e9f8f1;
        }

        .orange-icon {
          color: #ed8721;
          background: #fff3e7;
        }

        .purple-icon {
          color: #7458d6;
          background: #f1edff;
        }

        .cyan-icon {
          color: #1598b3;
          background: #e8f8fb;
        }

        .trend,
        .mini-status {
          font-size: 9px;
          font-weight: 750;
        }

        .trend {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .trend svg {
          width: 11px;
        }

        .positive {
          color: var(--green);
        }

        .kpi-number,
        .kpi-label,
        .kpi-card small {
          display: block;
        }

        .kpi-number {
          margin-top: 15px;
          font-size: 25px;
          letter-spacing: -0.6px;
        }

        .kpi-label {
          margin-top: 3px;
          font-size: 11px;
          font-weight: 750;
        }

        .kpi-card small {
          margin-top: 7px;
          color: var(--muted);
          font-size: 9px;
        }

        .workspace-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 310px;
          gap: 15px;
          align-items: start;
        }

        .operations-panel,
        .alerts-card,
        .quick-actions-card {
          border: 1px solid var(--border);
          border-radius: 12px;
          background: white;
          box-shadow: 0 4px 18px rgba(20, 55, 90, 0.025);
        }

        .panel-header {
          min-height: 72px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
        }

        .panel-header.compact {
          min-height: auto;
          border-bottom: none;
        }

        .panel-title-line {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .panel-header h3 {
          margin: 0;
          font-size: 13px;
        }

        .panel-title-line > span {
          padding: 3px 7px;
          border-radius: 20px;
          color: #55708f;
          background: #eef3f8;
          font-size: 8px;
          font-weight: 750;
        }

        .panel-title-line .alert-count {
          color: white;
          background: var(--red);
        }

        .panel-header p {
          margin: 5px 0 0;
          color: var(--muted);
          font-size: 9px;
        }

        .text-action {
          display: flex;
          align-items: center;
          gap: 3px;
          border: none;
          background: transparent;
          color: var(--blue);
          font-size: 10px;
          font-weight: 750;
        }

        .text-action svg {
          width: 13px;
        }

        .table-tools {
          padding: 10px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1px solid var(--border);
        }

        .table-search {
          width: 235px;
          height: 35px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          gap: 7px;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: #fafbfd;
        }

        .filter-pills {
          display: flex;
          gap: 5px;
        }

        .filter-pills button {
          height: 30px;
          padding: 0 10px;
          border: 1px solid transparent;
          border-radius: 6px;
          color: #68798f;
          background: transparent;
          font-size: 9px;
        }

        .filter-pills button.active {
          color: var(--blue);
          border-color: #cfe5fb;
          background: #edf6ff;
          font-weight: 750;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .operations-table {
          width: 100%;
          border-collapse: collapse;
          white-space: nowrap;
        }

        .operations-table th {
          padding: 11px 14px;
          text-align: left;
          color: #8492a5;
          background: #f9fbfd;
          border-bottom: 1px solid var(--border);
          font-size: 8px;
          letter-spacing: 0.4px;
        }

        .operations-table td {
          padding: 14px;
          border-bottom: 1px solid #edf1f5;
          font-size: 10px;
          vertical-align: middle;
        }

        .operations-table tbody tr:hover {
          background: #fbfdff;
        }

        .operations-table td strong,
        .operations-table td small {
          display: block;
        }

        .operations-table td strong {
          font-size: 10px;
        }

        .operations-table td small {
          margin-top: 4px;
          color: var(--muted);
          font-size: 8px;
        }

        .load-id {
          color: var(--blue);
        }

        .route-line {
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--muted);
          font-size: 8px;
        }

        .route-line svg {
          width: 10px;
          height: 10px;
        }

        .status {
          width: fit-content;
          padding: 5px 8px;
          display: flex;
          align-items: center;
          gap: 5px;
          border-radius: 20px;
          font-size: 8px;
          font-weight: 750;
        }

        .status > span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
        }

        .status.blue {
          color: #087df5;
          background: #eaf4ff;
        }

        .status.purple {
          color: #7356d5;
          background: #f1edff;
        }

        .status.orange {
          color: #e77e18;
          background: #fff1e3;
        }

        .status.green {
          color: #149a63;
          background: #e8f8f0;
        }

        .updated-time {
          color: var(--muted);
          font-size: 8px;
        }

        .more-button {
          width: 29px;
          height: 29px;
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: white;
          color: #75869b;
        }

        .more-button svg {
          width: 14px;
        }

        .right-column {
          display: grid;
          gap: 15px;
        }

        .alert-item {
          margin: 0 13px 9px;
          padding: 12px;
          display: flex;
          gap: 10px;
          border: 1px solid;
          border-radius: 9px;
        }

        .danger-alert {
          border-color: #f3c9c9;
          background: #fff8f8;
        }

        .warning-alert {
          border-color: #f4dbb9;
          background: #fffbf5;
        }

        .info-alert {
          border-color: #cce3f8;
          background: #f7fbff;
        }

        .alert-icon {
          width: 30px;
          height: 30px;
          flex: 0 0 30px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: white;
        }

        .alert-icon svg {
          width: 15px;
        }

        .danger-alert .alert-icon {
          color: var(--red);
        }

        .warning-alert .alert-icon {
          color: var(--orange);
        }

        .info-alert .alert-icon {
          color: var(--blue);
        }

        .alert-content strong {
          font-size: 10px;
        }

        .alert-content p {
          margin: 5px 0 7px;
          color: var(--muted);
          font-size: 8px;
          line-height: 1.5;
        }

        .alert-content button {
          padding: 0;
          display: flex;
          align-items: center;
          gap: 3px;
          border: none;
          background: transparent;
          color: var(--blue);
          font-size: 8px;
          font-weight: 750;
        }

        .alert-content button svg {
          width: 11px;
        }

        .quick-actions-card {
          padding-bottom: 13px;
        }

        .action-grid {
          padding: 0 13px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .action-grid button {
          min-height: 72px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          border: 1px solid var(--border);
          border-radius: 9px;
          color: #43556d;
          background: #fbfcfe;
          font-size: 9px;
          font-weight: 750;
          text-align: left;
          transition: 0.18s;
        }

        .action-grid button:hover {
          border-color: #b9d9fa;
          background: #f5faff;
          transform: translateY(-1px);
        }

        .action-grid svg {
          width: 18px;
          color: var(--blue);
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          padding: 20px;
          display: grid;
          place-items: center;
          background: rgba(8, 27, 53, 0.48);
          backdrop-filter: blur(5px);
        }

        .load-modal {
          width: 100%;
          max-width: 650px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 16px;
          background: white;
          box-shadow: 0 30px 90px rgba(10, 35, 71, 0.25);
        }

        .modal-header {
          padding: 23px 25px 18px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
        }

        .modal-header > div > span {
          color: var(--blue);
          font-size: 8px;
          font-weight: 850;
          letter-spacing: 1px;
        }

        .modal-header h3 {
          margin: 6px 0 0;
          font-size: 21px;
        }

        .modal-header p {
          margin: 6px 0 0;
          color: var(--muted);
          font-size: 10px;
        }

        .modal-header > button {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: white;
          color: #64758b;
        }

        .modal-header > button svg {
          width: 17px;
        }

        .load-modal form {
          padding: 22px 25px 24px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .form-grid label {
          color: #35465e;
          font-size: 10px;
          font-weight: 750;
        }

        .form-grid .full-width {
          grid-column: 1 / -1;
        }

        .form-grid input,
        .form-grid select {
          width: 100%;
          height: 44px;
          margin-top: 7px;
          padding: 0 12px;
          border: 1px solid #dbe4ee;
          border-radius: 8px;
          outline: none;
          color: var(--text);
          background: #fbfcfe;
          font-size: 11px;
        }

        .form-grid input:focus,
        .form-grid select:focus {
          border-color: var(--blue);
          box-shadow: 0 0 0 3px rgba(8, 125, 245, 0.09);
        }

        .modal-footer {
          margin-top: 22px;
          padding-top: 18px;
          display: flex;
          justify-content: flex-end;
          gap: 9px;
          border-top: 1px solid var(--border);
        }

        .cancel-button {
          height: 42px;
          padding: 0 16px;
          border: 1px solid var(--border);
          border-radius: 8px;
          color: #5f7086;
          background: white;
          font-size: 11px;
          font-weight: 700;
        }

        .menu-toggle,
        .mobile-close {
          display: none;
        }

        @media (max-width: 1350px) {
          .kpi-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .workspace-grid {
            grid-template-columns: 1fr;
          }

          .right-column {
            grid-template-columns: repeat(2, 1fr);
          }

          .global-search {
            width: 230px;
          }
        }

        @media (max-width: 1000px) {
          .sidebar {
            transform: translateX(-100%);
            transition: 0.25s ease;
          }

          .sidebar.mobile-open {
            transform: translateX(0);
          }

          .app-content {
            margin-left: 0;
          }

          .menu-toggle,
          .mobile-close {
            display: grid;
          }

          .mobile-close {
            margin-left: auto;
            width: 32px;
            height: 32px;
            border-color: rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.05);
            color: white;
          }

          .global-search {
            display: none;
          }
        }

        @media (max-width: 720px) {
          .topbar {
            height: 72px;
            padding: 0 14px;
          }

          .topbar-left p,
          .profile > div:not(.avatar),
          .logout-button {
            display: none;
          }

          .dashboard-main {
            padding: 17px 12px;
          }

          .welcome-row {
            align-items: flex-start;
            flex-direction: column;
          }

          .quick-buttons {
            width: 100%;
          }

          .quick-buttons button {
            flex: 1;
          }

          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .right-column {
            grid-template-columns: 1fr;
          }

          .filter-pills {
            display: none;
          }

          .table-search {
            width: 100%;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-grid .full-width {
            grid-column: auto;
          }
        }

        @media (max-width: 460px) {
          .kpi-grid {
            grid-template-columns: 1fr;
          }

          .secondary-action {
            display: none;
          }

          .welcome-row h2 {
            font-size: 22px;
          }

          .notification-panel {
            position: fixed;
            top: 75px;
            left: 10px;
            right: 10px;
            width: auto;
          }
        }
      `}</style>
    </div>
  );
}
