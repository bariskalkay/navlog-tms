"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Truck,
  Route,
  Factory,
  Users,
  UserRound,
  WalletCards,
  FileText,
  BarChart3,
  Settings,
  Search,
  Bell,
  Plus,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Clock3,
  CircleCheck,
  CircleAlert,
  Navigation,
  CalendarDays,
  MoreHorizontal,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Command,
} from "lucide-react";

const menuGroups = [
  {
    title: "OPERASYON",
    items: [
      { name: "Kontrol Merkezi", icon: LayoutDashboard },
      { name: "Yük Yönetimi", icon: Package, badge: "12" },
      { name: "Seferler", icon: Route, badge: "8" },
      { name: "Araçlar", icon: Truck },
    ],
  },
  {
    title: "İŞ ORTAKLARI",
    items: [
      { name: "Fabrikalar", icon: Factory },
      { name: "Nakliyeciler", icon: Users },
      { name: "Şoförler", icon: UserRound },
    ],
  },
  {
    title: "YÖNETİM",
    items: [
      { name: "Finans", icon: WalletCards },
      { name: "Raporlar", icon: BarChart3 },
      { name: "Belgeler", icon: FileText },
      { name: "Ayarlar", icon: Settings },
    ],
  },
];

const stats = [
  {
    label: "Aktif Yük",
    value: "24",
    change: "+12.5%",
    trend: "up",
    detail: "Geçen haftaya göre",
    icon: Package,
    accent: "#1677ff",
    soft: "#edf6ff",
  },
  {
    label: "Yoldaki Araç",
    value: "18",
    change: "+8.2%",
    trend: "up",
    detail: "3 teslimat bugün",
    icon: Truck,
    accent: "#7c3aed",
    soft: "#f5f0ff",
  },
  {
    label: "Bekleyen Teklif",
    value: "7",
    change: "2 kritik",
    trend: "neutral",
    detail: "Yanıt bekleniyor",
    icon: Clock3,
    accent: "#f59e0b",
    soft: "#fff8e8",
  },
  {
    label: "Aylık Ciro",
    value: "₺1.24M",
    change: "+18.4%",
    trend: "up",
    detail: "Bu ay gerçekleşen",
    icon: BarChart3,
    accent: "#059669",
    soft: "#ecfdf5",
  },
];

const shipments = [
  {
    id: "NV-260712-041",
    route: "Konya Ereğli",
    destination: "Çorum + Tokat",
    carrier: "Özdemir Nakliyat",
    vehicle: "42 ABC 123",
    time: "14:30",
    status: "Yolda",
    statusType: "blue",
  },
  {
    id: "NV-260712-042",
    route: "Konya Ereğli",
    destination: "Elmadağ + Akyurt",
    carrier: "Mert Trans",
    vehicle: "06 DFG 482",
    time: "16:00",
    status: "Yüklemede",
    statusType: "purple",
  },
  {
    id: "NV-260712-043",
    route: "Konya Ereğli",
    destination: "Tekkeköy",
    carrier: "Araç Bekleniyor",
    vehicle: "—",
    time: "17:45",
    status: "Araç Bekliyor",
    statusType: "orange",
  },
  {
    id: "NV-260712-044",
    route: "Konya Ereğli",
    destination: "Döşemealtı + Serik",
    carrier: "Atlas Lojistik",
    vehicle: "33 NVG 908",
    time: "19:15",
    status: "Planlandı",
    statusType: "green",
  },
];

const activity = [
  {
    title: "Araç yükleme noktasına ulaştı",
    text: "NV-260712-042 · Elmadağ + Akyurt",
    time: "4 dk önce",
    type: "success",
  },
  {
    title: "Yeni taşıma teklifi alındı",
    text: "NV-260712-043 · ₺28.500",
    time: "12 dk önce",
    type: "info",
  },
  {
    title: "Teslimat başarıyla tamamlandı",
    text: "NV-260711-038 · Samsun İlkadım",
    time: "38 dk önce",
    type: "success",
  },
  {
    title: "Operasyon için araç bekleniyor",
    text: "NV-260712-043 · Tekkeköy",
    time: "1 sa önce",
    type: "warning",
  },
];

function StatusBadge({ type, children }) {
  const colors = {
    blue: { background: "#edf6ff", color: "#0877e8", dot: "#1683f8" },
    purple: { background: "#f5f0ff", color: "#7140d7", dot: "#7c3aed" },
    orange: { background: "#fff6e5", color: "#b96a00", dot: "#f59e0b" },
    green: { background: "#ecfdf5", color: "#047857", dot: "#10b981" },
  };

  const style = colors[type] || colors.blue;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "7px 10px",
        borderRadius: 999,
        background: style.background,
        color: style.color,
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: style.dot,
        }}
      />
      {children}
    </span>
  );
}

export default function Dashboard({ onLogout }) {
  const [activeMenu, setActiveMenu] = useState("Kontrol Merkezi");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        color: "#10213a",
        fontFamily:
          'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: "flex",
      }}
    >
      <aside
        style={{
          width: collapsed ? 82 : 254,
          minHeight: "100vh",
          background: "#ffffff",
          borderRight: "1px solid #e7ebf2",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          inset: "0 auto 0 0",
          zIndex: 20,
          transition: "width .2s ease",
        }}
      >
        <div
          style={{
            height: 76,
            display: "flex",
            alignItems: "center",
            padding: collapsed ? "0 20px" : "0 22px",
            borderBottom: "1px solid #edf0f5",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              background: "linear-gradient(135deg, #0878f9, #43a3ff)",
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: 20,
              flexShrink: 0,
              boxShadow: "0 8px 20px rgba(8,120,249,.22)",
            }}
          >
            N
          </div>

          {!collapsed && (
            <div>
              <div
                style={{
                  fontSize: 21,
                  fontWeight: 900,
                  letterSpacing: ".4px",
                  color: "#09274b",
                  lineHeight: 1,
                }}
              >
                NAVLOG
                <span
                  style={{
                    color: "#1683f8",
                    fontSize: 10,
                    marginLeft: 5,
                    verticalAlign: "top",
                  }}
                >
                  TMS
                </span>
              </div>
              <div
                style={{
                  fontSize: 8,
                  letterSpacing: ".9px",
                  color: "#8290a5",
                  marginTop: 6,
                  fontWeight: 700,
                }}
              >
                TRANSPORTATION MANAGEMENT
              </div>
            </div>
          )}
        </div>

        <nav
          style={{
            padding: "18px 13px",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {menuGroups.map((group) => (
            <div key={group.title} style={{ marginBottom: 22 }}>
              {!collapsed && (
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#a0aabd",
                    letterSpacing: "1px",
                    padding: "0 12px",
                    marginBottom: 8,
                  }}
                >
                  {group.title}
                </div>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const active = activeMenu === item.name;

                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveMenu(item.name)}
                    style={{
                      width: "100%",
                      border: 0,
                      cursor: "pointer",
                      background: active ? "#edf6ff" : "transparent",
                      color: active ? "#0877e8" : "#526176",
                      borderRadius: 10,
                      padding: collapsed ? "12px 0" : "11px 12px",
                      marginBottom: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: collapsed ? "center" : "space-between",
                      fontSize: 13,
                      fontWeight: active ? 750 : 600,
                      fontFamily: "inherit",
                      transition: ".15s ease",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                      }}
                    >
                      <Icon size={18} strokeWidth={active ? 2.4 : 2} />
                      {!collapsed && item.name}
                    </span>

                    {!collapsed && item.badge && (
                      <span
                        style={{
                          minWidth: 24,
                          height: 21,
                          padding: "0 7px",
                          borderRadius: 999,
                          background: active ? "#d8ebff" : "#f0f3f7",
                          color: active ? "#0877e8" : "#7b8798",
                          display: "grid",
                          placeItems: "center",
                          fontSize: 10,
                          fontWeight: 800,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div
          style={{
            padding: 13,
            borderTop: "1px solid #edf0f5",
          }}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: "100%",
              height: 42,
              border: 0,
              background: "#f7f9fc",
              color: "#69778b",
              borderRadius: 9,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
              fontWeight: 700,
            }}
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <>
                <PanelLeftClose size={18} />
                Menüyü Daralt
              </>
            )}
          </button>
        </div>
      </aside>

      <div
        style={{
          marginLeft: collapsed ? 82 : 254,
          width: `calc(100% - ${collapsed ? 82 : 254}px)`,
          transition: "all .2s ease",
        }}
      >
        <header
          style={{
            height: 76,
            background: "rgba(255,255,255,.96)",
            borderBottom: "1px solid #e7ebf2",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            position: "sticky",
            top: 0,
            zIndex: 15,
          }}
        >
          <div
            style={{
              width: 390,
              height: 42,
              border: "1px solid #e1e6ee",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              padding: "0 13px",
              gap: 10,
              background: "#f8fafc",
              color: "#8b98aa",
            }}
          >
            <Search size={17} />
            <input
              placeholder="Yük, araç, sefer veya firma ara..."
              style={{
                border: 0,
                outline: 0,
                background: "transparent",
                width: "100%",
                fontSize: 13,
                color: "#25364d",
                fontFamily: "inherit",
              }}
            />
            <span
              style={{
                border: "1px solid #dce2eb",
                background: "#fff",
                borderRadius: 6,
                padding: "3px 7px",
                fontSize: 10,
                color: "#8591a2",
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Command size={10} /> K
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              style={{
                height: 42,
                padding: "0 15px",
                border: "1px solid #e1e6ee",
                borderRadius: 10,
                background: "#fff",
                color: "#44546a",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                fontWeight: 700,
                fontFamily: "inherit",
              }}
            >
              <CalendarDays size={17} />
              12 Temmuz 2026
            </button>

            <button
              style={{
                width: 42,
                height: 42,
                border: "1px solid #e1e6ee",
                borderRadius: 10,
                background: "#fff",
                display: "grid",
                placeItems: "center",
                color: "#526176",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <Bell size={18} />
              <span
                style={{
                  width: 7,
                  height: 7,
                  background: "#ef4444",
                  borderRadius: "50%",
                  position: "absolute",
                  right: 9,
                  top: 8,
                  border: "2px solid white",
                }}
              />
            </button>

            <div
              style={{
                width: 1,
                height: 30,
                background: "#e7ebf2",
                margin: "0 4px",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingLeft: 4,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "#eaf4ff",
                  color: "#0877e8",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 13,
                  fontWeight: 900,
                }}
              >
                BK
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#203149",
                  }}
                >
                  Barış Kalkay
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#8995a6",
                    marginTop: 2,
                  }}
                >
                  Yönetici
                </div>
              </div>
              <ChevronDown size={16} color="#8491a3" />
            </div>
          </div>
        </header>

        <main style={{ padding: "27px 30px 40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 24,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#0877e8",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: ".6px",
                  marginBottom: 7,
                }}
              >
                <Sparkles size={14} />
                NAVLOG OPERASYON MERKEZİ
              </div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 28,
                  letterSpacing: "-.6px",
                  color: "#10213a",
                  fontWeight: 850,
                }}
              >
                Günaydın, Barış
              </h1>
              <p
                style={{
                  margin: "7px 0 0",
                  color: "#758297",
                  fontSize: 13,
                }}
              >
                Tüm lojistik operasyonlarınızın güncel durumu ve öncelikli
                aksiyonları burada.
              </p>
            </div>

            <button
              style={{
                height: 44,
                border: 0,
                borderRadius: 10,
                padding: "0 17px",
                background: "#087cf0",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                fontWeight: 800,
                fontFamily: "inherit",
                boxShadow: "0 7px 18px rgba(8,124,240,.2)",
              }}
            >
              <Plus size={18} />
              Yeni Yük Oluştur
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 15,
              marginBottom: 18,
            }}
          >
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  style={{
                    background: "#fff",
                    border: "1px solid #e5eaf1",
                    borderRadius: 14,
                    padding: "18px 18px 16px",
                    boxShadow: "0 3px 12px rgba(28,45,70,.035)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 18,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 11,
                        display: "grid",
                        placeItems: "center",
                        background: stat.soft,
                        color: stat.accent,
                      }}
                    >
                      <Icon size={19} />
                    </div>

                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color:
                          stat.trend === "up"
                            ? "#059669"
                            : stat.trend === "neutral"
                            ? "#c27803"
                            : "#dc2626",
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      {stat.trend === "up" && <ArrowUpRight size={14} />}
                      {stat.trend === "down" && <ArrowDownRight size={14} />}
                      {stat.change}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: 25,
                      fontWeight: 900,
                      letterSpacing: "-.4px",
                      color: "#13243c",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 750,
                      color: "#536176",
                      marginTop: 5,
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#9aa5b5",
                      marginTop: 5,
                    }}
                  >
                    {stat.detail}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 2fr) minmax(300px, .72fr)",
              gap: 18,
              marginBottom: 18,
            }}
          >
            <section
              style={{
                background: "#fff",
                border: "1px solid #e5eaf1",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 3px 12px rgba(28,45,70,.035)",
              }}
            >
              <div
                style={{
                  height: 65,
                  padding: "0 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #edf0f5",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 850,
                      color: "#172840",
                    }}
                  >
                    Aktif Operasyonlar
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#8c98a9",
                      marginTop: 4,
                    }}
                  >
                    Gerçek zamanlı taşıma ve teslimat takibi
                  </div>
                </div>

                <button
                  style={{
                    border: 0,
                    background: "transparent",
                    color: "#0877e8",
                    fontWeight: 800,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 12,
                  }}
                >
                  Tümünü Gör →
                </button>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: 760,
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#fafbfd",
                        color: "#8995a6",
                        textAlign: "left",
                      }}
                    >
                      {[
                        "YÜK NO",
                        "GÜZERGAH",
                        "NAKLİYECİ / ARAÇ",
                        "PLAN",
                        "DURUM",
                        "",
                      ].map((head) => (
                        <th
                          key={head}
                          style={{
                            padding: "12px 16px",
                            fontSize: 9,
                            letterSpacing: ".6px",
                            fontWeight: 850,
                            borderBottom: "1px solid #edf0f5",
                          }}
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {shipments.map((shipment) => (
                      <tr key={shipment.id}>
                        <td
                          style={{
                            padding: "15px 16px",
                            borderBottom: "1px solid #f0f2f6",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 850,
                              color: "#1b2c44",
                            }}
                          >
                            {shipment.id}
                          </div>
                        </td>

                        <td
                          style={{
                            padding: "15px 16px",
                            borderBottom: "1px solid #f0f2f6",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <div
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 8,
                                background: "#f0f6ff",
                                color: "#0877e8",
                                display: "grid",
                                placeItems: "center",
                                flexShrink: 0,
                              }}
                            >
                              <Navigation size={14} />
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: 12,
                                  fontWeight: 750,
                                  color: "#263750",
                                }}
                              >
                                {shipment.route}
                              </div>
                              <div
                                style={{
                                  fontSize: 10,
                                  color: "#8c98a9",
                                  marginTop: 3,
                                }}
                              >
                                → {shipment.destination}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td
                          style={{
                            padding: "15px 16px",
                            borderBottom: "1px solid #f0f2f6",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#35465e",
                            }}
                          >
                            {shipment.carrier}
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: "#929dad",
                              marginTop: 3,
                            }}
                          >
                            {shipment.vehicle}
                          </div>
                        </td>

                        <td
                          style={{
                            padding: "15px 16px",
                            borderBottom: "1px solid #f0f2f6",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#526176",
                          }}
                        >
                          {shipment.time}
                        </td>

                        <td
                          style={{
                            padding: "15px 16px",
                            borderBottom: "1px solid #f0f2f6",
                          }}
                        >
                          <StatusBadge type={shipment.statusType}>
                            {shipment.status}
                          </StatusBadge>
                        </td>

                        <td
                          style={{
                            padding: "15px 16px",
                            borderBottom: "1px solid #f0f2f6",
                          }}
                        >
                          <MoreHorizontal size={18} color="#94a0b0" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section
              style={{
                background: "#fff",
                border: "1px solid #e5eaf1",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 3px 12px rgba(28,45,70,.035)",
              }}
            >
              <div
                style={{
                  height: 65,
                  padding: "0 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #edf0f5",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 850,
                      color: "#172840",
                    }}
                  >
                    Canlı Akış
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#8c98a9",
                      marginTop: 4,
                    }}
                  >
                    Son operasyon hareketleri
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    color: "#059669",
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#10b981",
                    }}
                  />
                  CANLI
                </div>
              </div>

              <div style={{ padding: "7px 17px" }}>
                {activity.map((item, index) => (
                  <div
                    key={item.title}
                    style={{
                      display: "flex",
                      gap: 11,
                      padding: "14px 0",
                      borderBottom:
                        index === activity.length - 1
                          ? "none"
                          : "1px solid #f0f2f6",
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 9,
                        background:
                          item.type === "success"
                            ? "#ecfdf5"
                            : item.type === "warning"
                            ? "#fff6e5"
                            : "#edf6ff",
                        color:
                          item.type === "success"
                            ? "#059669"
                            : item.type === "warning"
                            ? "#d17a00"
                            : "#0877e8",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.type === "success" ? (
                        <CircleCheck size={15} />
                      ) : item.type === "warning" ? (
                        <CircleAlert size={15} />
                      ) : (
                        <Navigation size={15} />
                      )}
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: "#2a3b53",
                          lineHeight: 1.35,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "#8995a6",
                          marginTop: 4,
                          lineHeight: 1.35,
                        }}
                      >
                        {item.text}
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          color: "#a7b0be",
                          marginTop: 5,
                        }}
                      >
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.35fr .85fr .85fr",
              gap: 18,
            }}
          >
            <section
              style={{
                background: "#fff",
                border: "1px solid #e5eaf1",
                borderRadius: 14,
                padding: 19,
                boxShadow: "0 3px 12px rgba(28,45,70,.035)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 850,
                      color: "#172840",
                    }}
                  >
                    Haftalık Operasyon Performansı
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#8c98a9",
                      marginTop: 4,
                    }}
                  >
                    Tamamlanan taşıma operasyonları
                  </div>
                </div>
                <BarChart3 size={18} color="#0877e8" />
              </div>

              <div
                style={{
                  height: 120,
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 12,
                  paddingTop: 10,
                }}
              >
                {[52, 72, 58, 88, 76, 96, 68].map((height, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height,
                        maxWidth: 32,
                        borderRadius: "6px 6px 3px 3px",
                        background:
                          index === 5
                            ? "#087cf0"
                            : "linear-gradient(180deg,#b9dafe,#e6f2ff)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 9,
                        color: "#96a1b1",
                        fontWeight: 700,
                      }}
                    >
                      {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section
              style={{
                background: "#fff",
                border: "1px solid #e5eaf1",
                borderRadius: 14,
                padding: 19,
                boxShadow: "0 3px 12px rgba(28,45,70,.035)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 850,
                  color: "#172840",
                  marginBottom: 18,
                }}
              >
                Operasyon Özeti
              </div>

              {[
                ["Zamanında teslimat", "96%", "#087cf0"],
                ["Araç doluluk oranı", "89%", "#7c3aed"],
                ["Teklif kabul oranı", "74%", "#059669"],
              ].map(([label, value, color]) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 10,
                      marginBottom: 7,
                    }}
                  >
                    <span style={{ color: "#657287", fontWeight: 700 }}>
                      {label}
                    </span>
                    <strong style={{ color: "#24354d" }}>{value}</strong>
                  </div>
                  <div
                    style={{
                      height: 6,
                      borderRadius: 999,
                      background: "#edf1f5",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: value,
                        height: "100%",
                        background: color,
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              ))}
            </section>

            <section
              style={{
                background: "#fff",
                border: "1px solid #e5eaf1",
                borderRadius: 14,
                padding: 19,
                boxShadow: "0 3px 12px rgba(28,45,70,.035)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 850,
                  color: "#172840",
                  marginBottom: 16,
                }}
              >
                Hızlı İşlemler
              </div>

              {[
                ["Yeni yük oluştur", Package],
                ["Araç ekle", Truck],
                ["Nakliyeci kaydet", Users],
              ].map(([label, Icon]) => (
                <button
                  key={label}
                  style={{
                    width: "100%",
                    height: 42,
                    marginBottom: 8,
                    border: "1px solid #e6eaf0",
                    borderRadius: 9,
                    background: "#fafbfd",
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "0 11px",
                    color: "#46566c",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 750,
                    fontFamily: "inherit",
                  }}
                >
                  <Icon size={16} color="#0877e8" />
                  {label}
                  <ArrowUpRight
                    size={14}
                    style={{ marginLeft: "auto" }}
                    color="#9ba5b3"
                  />
                </button>
              ))}

              <button
                onClick={onLogout}
                style={{
                  width: "100%",
                  height: 39,
                  marginTop: 3,
                  border: 0,
                  borderRadius: 9,
                  background: "#fff1f2",
                  color: "#dc3545",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  cursor: "pointer",
                  fontSize: 11,
                  fontWeight: 800,
                  fontFamily: "inherit",
                }}
              >
                <LogOut size={15} />
                Güvenli Çıkış
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
