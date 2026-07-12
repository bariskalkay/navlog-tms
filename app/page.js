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
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>NAVLOG TMS</h1>
      <h2>Yönetim Paneli</h2>
      <p>Sisteme başarıyla giriş yaptınız.</p>
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
