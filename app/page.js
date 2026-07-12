"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Factory,
  Truck,
  UserRound,
  LockKeyhole,
  Eye,
  BarChart3,
  Clock3,
  Network,
  ArrowRight,
  CircleCheck,
} from "lucide-react";

const roles = [
  {
    id: "admin",
    name: "Yönetici",
    icon: ShieldCheck,
    description: "Operasyon, finans, kullanıcı ve sistem yönetimi",
  },
  {
    id: "factory",
    name: "Fabrika",
    icon: Factory,
    description: "Sevkiyat oluşturma ve operasyon takibi",
  },
  {
    id: "carrier",
    name: "Nakliyeci",
    icon: Truck,
    description: "Yük, araç ve taşıma operasyonları",
  },
  {
    id: "driver",
    name: "Şoför",
    icon: UserRound,
    description: "Sefer, konum ve teslimat süreçleri",
  },
];

export default function Home() {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [loggedIn, setLoggedIn] = useState(false);
if (loggedIn) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        fontFamily: "Arial, sans-serif",
        color: "#0b2545",
      }}
    >
      {/* ÜST MENÜ */}
      <header
        style={{
          height: "72px",
          background: "#ffffff",
          borderBottom: "1px solid #e5eaf0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
        }}
      >
        <div>
          <strong style={{ fontSize: "25px", letterSpacing: "1px" }}>
            NAVLOG
          </strong>
          <span
            style={{
              color: "#0787f8",
              fontSize: "12px",
              fontWeight: "700",
              marginLeft: "5px",
            }}
          >
            TMS
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "#64748b", fontSize: "14px" }}>
            Yönetici Paneli
          </span>

          <button
            type="button"
            onClick={() => setLoggedIn(false)}
            style={{
              border: "1px solid #dbe3ec",
              background: "#fff",
              borderRadius: "8px",
              padding: "9px 15px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Çıkış Yap
          </button>
        </div>
      </header>

      <div style={{ display: "flex", minHeight: "calc(100vh - 72px)" }}>
        {/* SOL MENÜ */}
        <aside
          style={{
            width: "240px",
            background: "#0b2545",
            padding: "25px 15px",
            color: "#fff",
          }}
        >
          {[
            "Genel Bakış",
            "Aktif Yükler",
            "Araçlar",
            "Seferler",
            "Fabrikalar",
            "Nakliyeciler",
            "Şoförler",
            "Finans",
          ].map((item, index) => (
            <div
              key={item}
              style={{
                padding: "14px 16px",
                marginBottom: "6px",
                borderRadius: "8px",
                background: index === 0 ? "#087ff5" : "transparent",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: index === 0 ? "700" : "500",
              }}
            >
              {item}
            </div>
          ))}
        </aside>

        {/* ANA İÇERİK */}
        <section style={{ flex: 1, padding: "32px" }}>
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ margin: 0, fontSize: "28px" }}>
              Operasyon Merkezi
            </h1>

            <p
              style={{
                color: "#64748b",
                marginTop: "8px",
                marginBottom: 0,
              }}
            >
              NAVLOG TMS lojistik operasyonlarınızın güncel durumu.
            </p>
          </div>

          {/* İSTATİSTİK KARTLARI */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(180px, 1fr))",
              gap: "18px",
              marginBottom: "28px",
            }}
          >
            {[
              ["12", "Aktif Yük"],
              ["8", "Aktif Araç"],
              ["5", "Bekleyen Teklif"],
              ["3", "Bugünkü Teslimat"],
            ].map(([number, label]) => (
              <div
                key={label}
                style={{
                  background: "#fff",
                  border: "1px solid #e5eaf0",
                  borderRadius: "12px",
                  padding: "22px",
                }}
              >
                <div
                  style={{
                    color: "#087ff5",
                    fontSize: "30px",
                    fontWeight: "800",
                  }}
                >
                  {number}
                </div>

                <div
                  style={{
                    color: "#64748b",
                    marginTop: "7px",
                    fontSize: "14px",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* OPERASYON TABLOSU */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e5eaf0",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "20px 22px",
                borderBottom: "1px solid #e5eaf0",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "18px" }}>
                Güncel Operasyonlar
              </h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {[
                      "Yük No",
                      "Yükleme",
                      "Teslimat",
                      "Araç",
                      "Durum",
                    ].map((title) => (
                      <th
                        key={title}
                        style={{
                          padding: "14px 20px",
                          fontSize: "12px",
                          color: "#64748b",
                          borderBottom: "1px solid #e5eaf0",
                        }}
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {[
                    [
                      "NV-2026-001",
                      "Konya Ereğli",
                      "Çorum + Tokat",
                      "13.60 Tır",
                      "Yolda",
                    ],
                    [
                      "NV-2026-002",
                      "Konya Ereğli",
                      "Elmadağ + Akyurt",
                      "13.60 Tır",
                      "Yüklemede",
                    ],
                    [
                      "NV-2026-003",
                      "Konya Ereğli",
                      "Tekkeköy",
                      "13.60 Tır",
                      "Araç Bekliyor",
                    ],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => (
                        <td
                          key={cell}
                          style={{
                            padding: "16px 20px",
                            borderBottom: "1px solid #eef2f6",
                            fontSize: "14px",
                            color: index === 4 ? "#087ff5" : "#334155",
                            fontWeight: index === 4 ? "700" : "500",
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
  const activeRole = roles.find((role) => role.id === selectedRole);
  const ActiveIcon = activeRole.icon;

  return (
    <main className="login-page">
      <section className="brand-side">
        <div className="brand-content">
          <div className="logo">
            <div className="logo-mark">N</div>
            <div>
              <div className="logo-name">
                NAVLOG<span>TMS</span>
              </div>
              <div className="logo-subtitle">
                TRANSPORTATION MANAGEMENT SYSTEM
              </div>
            </div>
          </div>

          <div className="hero">
            <h1>
              Lojistik operasyonlarınızı
              <span>tek merkezden yönetin.</span>
            </h1>

            <p>
              Yüklerden araçlara, fabrikalardan taşıyıcılara kadar tüm taşıma
              süreçlerinizi güvenli, hızlı ve gerçek zamanlı olarak yönetin.
            </p>
          </div>

          <div className="features">
            <div className="feature">
              <ShieldCheck />
              <strong>Güvenli</strong>
              <span>Kurumsal güvenlik standartları</span>
            </div>

            <div className="feature">
              <Clock3 />
              <strong>Gerçek Zamanlı</strong>
              <span>Anlık takip ve bildirimler</span>
            </div>

            <div className="feature">
              <BarChart3 />
              <strong>Verimli</strong>
              <span>Operasyonel süreçlerde maksimum verimlilik</span>
            </div>

            <div className="feature">
              <Network />
              <strong>Entegre</strong>
              <span>Tüm paydaşlarla tek merkezden yönetim</span>
            </div>
          </div>

          <div className="logistics-visual">
            <div className="warehouse">
              <div className="warehouse-logo">NAVLOG</div>
              <div className="doors">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
              </div>
            </div>

            <div className="truck">
              <div className="truck-cabin"></div>
              <div className="truck-trailer">
                <strong>NAVLOG</strong>
                <small>TRANSPORTATION MANAGEMENT SYSTEM</small>
              </div>
              <div className="wheel wheel-one"></div>
              <div className="wheel wheel-two"></div>
              <div className="wheel wheel-three"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="login-side">
        <div className="login-card">
          <div className="login-header">
            <h2>Hoş Geldiniz</h2>
            <p>Devam etmek için rolünüzü seçin ve giriş yapın.</p>
          </div>

          <div className="section-label">ROL SEÇİMİ</div>

          <div className="roles">
            {roles.map((role) => {
              const Icon = role.icon;

              return (
                <button
                  key={role.id}
                  type="button"
                  className={`role-button ${
                    selectedRole === role.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <Icon />
                  <span>{role.name}</span>
                </button>
              );
            })}
          </div>

          <div className="role-info">
            <div className="role-info-icon">
              <ActiveIcon />
            </div>
            <div>
              <strong>{activeRole.name} Girişi</strong>
              <p>{activeRole.description}</p>
            </div>
          </div>

          <form className="login-form">
            <label>
              E-posta veya Kullanıcı Adı
              <div className="input-wrap">
                <UserRound />
                <input
                  type="text"
                  placeholder="E-posta adresinizi veya kullanıcı adınızı girin"
                />
              </div>
            </label>

            <label>
              Şifre
              <div className="input-wrap">
                <LockKeyhole />
                <input type="password" placeholder="Şifrenizi girin" />
                <Eye className="eye" />
              </div>
            </label>

            <div className="form-options">
              <label className="remember">
                <input type="checkbox" />
                <span>Beni Hatırla</span>
              </label>

              <button type="button" className="forgot">
                Şifremi Unuttum?
              </button>
            </div>

            <button
  type="button"
  className="login-button"
  onClick={() => setLoggedIn(true)}
>
  Giriş Yap
  <ArrowRight />
</button>
 </form>            
          <div className="security-row">
            <div>
              <ShieldCheck />
              <span>
                <strong>256-bit SSL</strong>
                Güvenli Bağlantı
              </span>
            </div>

            <div>
              <CircleCheck />
              <span>
                <strong>Sistem Durumu</strong>
                Tüm Sistemler Aktif
              </span>
            </div>

            <div>
              <LockKeyhole />
              <span>
                <strong>KVKK Uyumlu</strong>
                Gizliliğiniz Korunur
              </span>
            </div>
          </div>

          <footer>
            <span>© 2026 NAVLOG TMS</span>
            <span>KVKK</span>
            <span>Kullanım Şartları</span>
            <span>Destek Merkezi</span>
            <span>v1.0.0</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
