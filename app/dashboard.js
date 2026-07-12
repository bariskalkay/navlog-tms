"use client";

import { useEffect, useState } from "react";
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
  Clock3,
  CircleCheck,
  CircleAlert,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  X,
  Pencil,
  Trash2,
  Save,
} from "lucide-react";

const uid = (prefix = "NV") =>
  `${prefix}-${Date.now().toString().slice(-8)}`;

const money = (number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(Number(number || 0));

const initialData = {
  loads: [
    {
      id: "NV-260712-041",
      factory: "Oğuz Gıda",
      origin: "Konya Ereğli OSB",
      destination: "Çorum + Tokat",
      carrier: "Özdemir Nakliyat",
      vehicle: "13.60 Tır",
      plate: "42 ABC 123",
      price: 38500,
      cost: 35000,
      status: "Yolda",
      date: "2026-07-12",
    },
    {
      id: "NV-260712-042",
      factory: "Oğuz Gıda",
      origin: "Konya Ereğli OSB",
      destination: "Elmadağ + Akyurt",
      carrier: "Mert Trans",
      vehicle: "13.60 Tır",
      plate: "06 DFG 482",
      price: 27000,
      cost: 24500,
      status: "Yüklemede",
      date: "2026-07-12",
    },
    {
      id: "NV-260712-043",
      factory: "Oğuz Gıda",
      origin: "Konya Ereğli OSB",
      destination: "Tekkeköy",
      carrier: "Araç Bekleniyor",
      vehicle: "13.60 Tır",
      plate: "—",
      price: 31500,
      cost: 0,
      status: "Araç Bekliyor",
      date: "2026-07-12",
    },
  ],

  vehicles: [
    {
      id: "AR-001",
      plate: "42 ABC 123",
      type: "13.60 Tır",
      driver: "Mehmet Kaya",
      status: "Yolda",
    },
    {
      id: "AR-002",
      plate: "06 DFG 482",
      type: "13.60 Tır",
      driver: "Ahmet Yılmaz",
      status: "Yüklemede",
    },
  ],

  factories: [
    {
      id: "FB-001",
      name: "Oğuz Gıda",
      city: "Konya Ereğli",
      contact: "Operasyon",
      phone: "—",
    },
  ],

  carriers: [
    {
      id: "NK-001",
      name: "Özdemir Nakliyat",
      city: "Konya",
      phone: "—",
      vehicles: 3,
    },
    {
      id: "NK-002",
      name: "Mert Trans",
      city: "Ankara",
      phone: "—",
      vehicles: 2,
    },
  ],

  drivers: [
    {
      id: "SF-001",
      name: "Mehmet Kaya",
      phone: "—",
      plate: "42 ABC 123",
      status: "Yolda",
    },
    {
      id: "SF-002",
      name: "Ahmet Yılmaz",
      phone: "—",
      plate: "06 DFG 482",
      status: "Yüklemede",
    },
  ],
};

const menuGroups = [
  {
    title: "OPERASYON",
    items: [
      ["Kontrol Merkezi", LayoutDashboard],
      ["Yük Yönetimi", Package],
      ["Seferler", Route],
      ["Araçlar", Truck],
    ],
  },
  {
    title: "İŞ ORTAKLARI",
    items: [
      ["Fabrikalar", Factory],
      ["Nakliyeciler", Users],
      ["Şoförler", UserRound],
    ],
  },
  {
    title: "YÖNETİM",
    items: [
      ["Finans", WalletCards],
      ["Raporlar", BarChart3],
      ["Belgeler", FileText],
      ["Ayarlar", Settings],
    ],
  },
];

const sectionKeys = {
  "Yük Yönetimi": "loads",
  Seferler: "loads",
  Araçlar: "vehicles",
  Fabrikalar: "factories",
  Nakliyeciler: "carriers",
  Şoförler: "drivers",
};

const formFields = {
  "Yük Yönetimi": [
    ["factory", "Fabrika / Müşteri"],
    ["origin", "Yükleme Noktası"],
    ["destination", "Teslimat Noktası"],
    ["carrier", "Nakliyeci"],
    ["vehicle", "Araç Tipi"],
    ["plate", "Plaka"],
    ["price", "Satış Navlunu", "number"],
    ["cost", "Alış Navlunu", "number"],
    ["date", "Tarih", "date"],
    ["status", "Durum", "select"],
  ],

  Araçlar: [
    ["plate", "Plaka"],
    ["type", "Araç Tipi"],
    ["driver", "Şoför"],
    ["status", "Durum"],
  ],

  Fabrikalar: [
    ["name", "Fabrika Adı"],
    ["city", "Şehir"],
    ["contact", "Yetkili"],
    ["phone", "Telefon"],
  ],

  Nakliyeciler: [
    ["name", "Firma Adı"],
    ["city", "Şehir"],
    ["phone", "Telefon"],
    ["vehicles", "Araç Sayısı", "number"],
  ],

  Şoförler: [
    ["name", "Ad Soyad"],
    ["phone", "Telefon"],
    ["plate", "Plaka"],
    ["status", "Durum"],
  ],
};

function StatusBadge({ status }) {
  const colors = {
    Yolda: ["#edf6ff", "#0877e8"],
    Yüklemede: ["#f5f0ff", "#7140d7"],
    "Araç Bekliyor": ["#fff6e5", "#b96a00"],
    Planlandı: ["#ecfdf5", "#047857"],
    "Teslim Edildi": ["#ecfdf5", "#047857"],
    Müsait: ["#ecfdf5", "#047857"],
  };

  const [background, color] = colors[status] || ["#f1f5f9", "#526176"];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "7px 10px",
        borderRadius: 999,
        background,
        color,
        fontSize: 11,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: color,
        }}
      />
      {status || "—"}
    </span>
  );
}

export default function Dashboard({ onLogout }) {
  const [activeMenu, setActiveMenu] = useState("Kontrol Merkezi");
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState(initialData);
  const [query, setQuery] = useState("");
  const [modalSection, setModalSection] = useState(null);
  const [editing, setEditing] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("navlog-tms-v1");

      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (error) {
      console.error(error);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem("navlog-tms-v1", JSON.stringify(data));
    }
  }, [data, ready]);

  const loads = data.loads || [];

  const activeLoads = loads.filter(
    (item) => item.status !== "Teslim Edildi"
  ).length;

  const onRoad = loads.filter((item) => item.status === "Yolda").length;

  const waiting = loads.filter(
    (item) => item.status === "Araç Bekliyor"
  ).length;

  const revenue = loads.reduce(
    (total, item) => total + Number(item.price || 0),
    0
  );

  const cost = loads.reduce(
    (total, item) => total + Number(item.cost || 0),
    0
  );

  const profit = revenue - cost;

  const filtered = (rows) =>
    rows.filter((row) =>
      JSON.stringify(row)
        .toLocaleLowerCase("tr")
        .includes(query.toLocaleLowerCase("tr"))
    );

  const openNew = (section) => {
    setEditing(null);
    setModalSection(section);
  };

  const openEdit = (section, row) => {
    setEditing(row);
    setModalSection(section === "Seferler" ? "Yük Yönetimi" : section);
  };

  const deleteRecord = (section, id) => {
    const realSection = section === "Seferler" ? "Yük Yönetimi" : section;
    const key = sectionKeys[realSection];

    if (!key) return;

    if (!window.confirm("Bu kaydı silmek istediğinize emin misiniz?")) {
      return;
    }

    setData((current) => ({
      ...current,
      [key]: current[key].filter((item) => item.id !== id),
    }));
  };

  const saveRecord = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const record = Object.fromEntries(formData.entries());

    const key = sectionKeys[modalSection];

    if (!key) return;

    record.id =
      editing?.id ||
      uid(
        key === "loads"
          ? "NV"
          : key === "vehicles"
          ? "AR"
          : key === "factories"
          ? "FB"
          : key === "carriers"
          ? "NK"
          : "SF"
      );

    setData((current) => ({
      ...current,

      [key]: editing
        ? current[key].map((item) =>
            item.id === editing.id ? { ...item, ...record } : item
          )
        : [{ ...record }, ...current[key]],
    }));

    setModalSection(null);
    setEditing(null);
  };

  const renderDashboard = () => (
    <>
      <div className="hero">
        <div>
          <div className="eyebrow">
            <Sparkles size={14} />
            NAVLOG OPERASYON MERKEZİ
          </div>

          <h1>Günaydın, Barış</h1>

          <p>
            Tüm lojistik operasyonlarınızın güncel durumu ve öncelikli
            aksiyonları burada.
          </p>
        </div>

        <button
          className="primaryButton"
          onClick={() => openNew("Yük Yönetimi")}
        >
          <Plus size={17} />
          Yeni Yük Oluştur
        </button>
      </div>

      <div className="statsGrid">
        {[
          ["Aktif Yük", activeLoads, Package, "#0877e8", "#edf6ff"],
          ["Yoldaki Araç", onRoad, Truck, "#7140d7", "#f5f0ff"],
          ["Araç Bekleyen", waiting, Clock3, "#b96a00", "#fff6e5"],
          [
            "Operasyon Hacmi",
            money(revenue),
            BarChart3,
            "#047857",
            "#ecfdf5",
          ],
        ].map(([label, value, Icon, color, background]) => (
          <div className="statCard" key={label}>
            <div className="statTop">
              <span
                className="statIcon"
                style={{
                  color,
                  background,
                }}
              >
                <Icon size={19} />
              </span>

              <ArrowUpRight size={16} color="#059669" />
            </div>

            <strong>{value}</strong>
            <b>{label}</b>
            <small>Canlı operasyon verisi</small>
          </div>
        ))}
      </div>

      <div className="dashboardGrid">
        <section className="card">
          <div className="cardHeader">
            <div>
              <h3>Aktif Operasyonlar</h3>
              <p>Gerçek zamanlı taşıma ve teslimat takibi</p>
            </div>

            <button
              className="linkButton"
              onClick={() => setActiveMenu("Yük Yönetimi")}
            >
              Tümünü Gör →
            </button>
          </div>

          <DataTable
            section="Yük Yönetimi"
            rows={filtered(loads).slice(0, 6)}
            onEdit={openEdit}
            onDelete={deleteRecord}
          />
        </section>

        <section className="card">
          <div className="cardHeader">
            <div>
              <h3>Canlı Akış</h3>
              <p>Son operasyon hareketleri</p>
            </div>

            <span className="live">● CANLI</span>
          </div>

          <div className="activityFeed">
            {loads.slice(0, 5).map((item, index) => (
              <div className="activityItem" key={item.id}>
                <span className="activityIcon">
                  {item.status === "Araç Bekliyor" ? (
                    <CircleAlert size={16} />
                  ) : (
                    <CircleCheck size={16} />
                  )}
                </span>

                <div>
                  <b>
                    {item.id} · {item.status}
                  </b>

                  <p>
                    {item.origin} → {item.destination}
                  </p>

                  <small>{index * 7 + 4} dk önce</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="bottomGrid">
        <section className="card padded">
          <h3>Operasyon Performansı</h3>

          <div className="bars">
            {[52, 72, 58, 88, 76, 96, 68].map((height, index) => (
              <div key={index}>
                <i style={{ height }} />

                <small>
                  {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"][index]}
                </small>
              </div>
            ))}
          </div>
        </section>

        <section className="card padded">
          <h3>Finans Özeti</h3>

          <div className="financeRow">
            <span>Toplam Ciro</span>
            <b>{money(revenue)}</b>
          </div>

          <div className="financeRow">
            <span>Tahmini Brüt Kâr</span>
            <b style={{ color: "#059669" }}>{money(profit)}</b>
          </div>

          <div className="financeRow">
            <span>Kâr Marjı</span>
            <b>{revenue ? Math.round((profit / revenue) * 100) : 0}%</b>
          </div>
        </section>

        <section className="card padded">
          <h3>Hızlı İşlemler</h3>

          <button
            className="quickButton"
            onClick={() => openNew("Yük Yönetimi")}
          >
            <Package size={16} />
            Yeni yük oluştur
            <ArrowUpRight size={14} />
          </button>

          <button
            className="quickButton"
            onClick={() => openNew("Araçlar")}
          >
            <Truck size={16} />
            Araç ekle
            <ArrowUpRight size={14} />
          </button>

          <button
            className="quickButton"
            onClick={() => openNew("Nakliyeciler")}
          >
            <Users size={16} />
            Nakliyeci kaydet
            <ArrowUpRight size={14} />
          </button>
        </section>
      </div>
    </>
  );

  const renderList = (section) => {
    const key = sectionKeys[section];
    const rows = filtered(data[key] || []);

    return (
      <>
        <div className="hero">
          <div>
            <div className="eyebrow">NAVLOG TMS</div>

            <h1>{section}</h1>

            <p>
              {rows.length} kayıt görüntüleniyor. Arama, ekleme, düzenleme ve
              silme aktif.
            </p>
          </div>

          {formFields[section] && (
            <button
              className="primaryButton"
              onClick={() => openNew(section)}
            >
              <Plus size={17} />
              Yeni Kayıt
            </button>
          )}
        </div>

        <section className="card">
          <div className="cardHeader">
            <div>
              <h3>{section}</h3>
              <p>Operasyon kayıtlarınızı tek merkezden yönetin</p>
            </div>

            <span className="countBadge">{rows.length} kayıt</span>
          </div>

          <DataTable
            section={section}
            rows={rows}
            onEdit={openEdit}
            onDelete={deleteRecord}
          />
        </section>
      </>
    );
  };

  const renderFinance = () => (
    <>
      <div className="hero">
        <div>
          <div className="eyebrow">FİNANS MERKEZİ</div>

          <h1>Finans</h1>

          <p>Navlun, maliyet, kârlılık ve operasyon hacmi.</p>
        </div>
      </div>

      <div className="statsGrid">
        {[
          ["Toplam Ciro", money(revenue), WalletCards],
          ["Toplam Maliyet", money(cost), FileText],
          ["Brüt Kâr", money(profit), BarChart3],
          [
            "Kâr Marjı",
            `${revenue ? Math.round((profit / revenue) * 100) : 0}%`,
            ArrowUpRight,
          ],
        ].map(([label, value, Icon]) => (
          <div className="statCard" key={label}>
            <div className="statTop">
              <span className="statIcon blue">
                <Icon size={19} />
              </span>
            </div>

            <strong>{value}</strong>
            <b>{label}</b>
            <small>Gerçek kayıtlar üzerinden</small>
          </div>
        ))}
      </div>

      <section className="card">
        <div className="cardHeader">
          <div>
            <h3>Operasyon Kârlılığı</h3>
            <p>Yük bazında satış, maliyet ve brüt kâr</p>
          </div>
        </div>

        <DataTable
          section="Yük Yönetimi"
          rows={filtered(loads)}
          finance
          onEdit={openEdit}
          onDelete={deleteRecord}
        />
      </section>
    </>
  );

  const renderReports = () => (
    <>
      <div className="hero">
        <div>
          <div className="eyebrow">RAPORLAMA</div>

          <h1>Raporlar</h1>

          <p>Operasyon performansınızı anlık verilerle izleyin.</p>
        </div>
      </div>

      <div className="statsGrid">
        {[
          ["Toplam Yük", loads.length, Package],
          [
            "Teslim Edilen",
            loads.filter((item) => item.status === "Teslim Edildi").length,
            CircleCheck,
          ],
          ["Aktif Araç", data.vehicles.length, Truck],
          ["Nakliyeci", data.carriers.length, Users],
        ].map(([label, value, Icon]) => (
          <div className="statCard" key={label}>
            <div className="statTop">
              <span className="statIcon blue">
                <Icon size={19} />
              </span>
            </div>

            <strong>{value}</strong>
            <b>{label}</b>
            <small>Güncel sistem verisi</small>
          </div>
        ))}
      </div>

      <section className="card padded">
        <h3>Durum Dağılımı</h3>

        {[
          "Yolda",
          "Yüklemede",
          "Araç Bekliyor",
          "Planlandı",
          "Teslim Edildi",
        ].map((status) => {
          const count = loads.filter(
            (item) => item.status === status
          ).length;

          return (
            <div className="reportRow" key={status}>
              <StatusBadge status={status} />

              <div className="progress">
                <i
                  style={{
                    width: `${
                      loads.length ? (count / loads.length) * 100 : 0
                    }%`,
                  }}
                />
              </div>

              <b>{count}</b>
            </div>
          );
        })}
      </section>
    </>
  );

  const renderSimple = (title) => (
    <section className="emptyState card">
      <div className="emptyIcon">
        {title === "Belgeler" ? <FileText /> : <Settings />}
      </div>

      <h2>{title}</h2>

      <p>
        {title === "Belgeler"
          ? "Taşıma belgeleri ve operasyon evrakları için merkez alan."
          : "NAVLOG TMS sistem ve kullanıcı ayarları."}
      </p>

      <button
        className="primaryButton"
        onClick={() => setActiveMenu("Kontrol Merkezi")}
      >
        Kontrol Merkezine Dön
      </button>
    </section>
  );

  return (
    <div className="app">
      <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>
        <div className="brand">
          <div className="logo">N</div>

          {!collapsed && (
            <div>
              <strong>
                NAVLOG <sup>TMS</sup>
              </strong>

              <small>TRANSPORTATION MANAGEMENT</small>
            </div>
          )}
        </div>

        <nav>
          {menuGroups.map((group) => (
            <div className="navGroup" key={group.title}>
              {!collapsed && <label>{group.title}</label>}

              {group.items.map(([name, Icon]) => (
                <button
                  key={name}
                  className={activeMenu === name ? "active" : ""}
                  onClick={() => setActiveMenu(name)}
                  title={name}
                >
                  <Icon size={18} />

                  {!collapsed && <span>{name}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <button
          className="collapseButton"
          onClick={() => setCollapsed(!collapsed)}
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
      </aside>

      <div className={collapsed ? "shell wide" : "shell"}>
        <header>
          <div className="searchBox">
            <Search size={17} />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Yük, araç, sefer veya firma ara..."
            />
          </div>

          <div className="headerRight">
            <button className="iconButton">
              <Bell size={18} />
              <i />
            </button>

            <div className="profile">
              <span>BK</span>

              <div>
                <b>Barış Kalkay</b>
                <small>Yönetici</small>
              </div>

              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <main>
          {activeMenu === "Kontrol Merkezi" && renderDashboard()}

          {[
            "Yük Yönetimi",
            "Seferler",
            "Araçlar",
            "Fabrikalar",
            "Nakliyeciler",
            "Şoförler",
          ].includes(activeMenu) && renderList(activeMenu)}

          {activeMenu === "Finans" && renderFinance()}

          {activeMenu === "Raporlar" && renderReports()}

          {["Belgeler", "Ayarlar"].includes(activeMenu) &&
            renderSimple(activeMenu)}
        </main>
      </div>

      {modalSection && (
        <RecordModal
          section={modalSection}
          record={editing}
          onClose={() => {
            setModalSection(null);
            setEditing(null);
          }}
          onSave={saveRecord}
        />
      )}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f5f7fb;
          color: #10213a;
          font-family: Inter, ui-sans-serif, -apple-system,
            BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        button,
        input,
        select {
          font: inherit;
        }

        .app {
          min-height: 100vh;
        }

        .sidebar {
          position: fixed;
          inset: 0 auto 0 0;
          width: 254px;
          background: #ffffff;
          border-right: 1px solid #e7ebf2;
          z-index: 30;
          display: flex;
          flex-direction: column;
          transition: 0.2s;
        }

        .sidebar.collapsed {
          width: 82px;
        }

        .brand {
          height: 76px;
          border-bottom: 1px solid #edf0f5;
          display: flex;
          align-items: center;
          padding: 0 20px;
          gap: 12px;
        }

        .logo {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: linear-gradient(135deg, #0878f9, #43a3ff);
          display: grid;
          place-items: center;
          color: white;
          font-weight: 900;
          font-style: italic;
          font-size: 20px;
          box-shadow: 0 8px 20px rgba(8, 120, 249, 0.22);
          flex: none;
        }

        .brand strong {
          font-size: 21px;
          color: #09274b;
          white-space: nowrap;
        }

        .brand sup {
          font-size: 9px;
          color: #1683f8;
        }

        .brand small {
          display: block;
          font-size: 7px;
          letter-spacing: 0.9px;
          color: #8290a5;
          margin-top: 5px;
          font-weight: 700;
        }

        .sidebar nav {
          padding: 18px 13px;
          overflow: auto;
          flex: 1;
        }

        .navGroup {
          margin-bottom: 20px;
        }

        .navGroup label {
          font-size: 9px;
          color: #a0aabd;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 0 12px;
          display: block;
          margin-bottom: 7px;
        }

        .navGroup button {
          width: 100%;
          border: 0;
          background: transparent;
          color: #526176;
          border-radius: 10px;
          padding: 11px 12px;
          margin-bottom: 3px;
          display: flex;
          align-items: center;
          gap: 11px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
        }

        .navGroup button:hover {
          background: #f7f9fc;
        }

        .navGroup button.active {
          background: #edf6ff;
          color: #0877e8;
          font-weight: 750;
        }

        .collapsed .navGroup button {
          justify-content: center;
          padding: 12px 0;
        }

        .collapseButton {
          margin: 13px;
          height: 42px;
          border: 0;
          border-radius: 9px;
          background: #f7f9fc;
          color: #69778b;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          font-weight: 700;
          cursor: pointer;
        }

        .shell {
          margin-left: 254px;
          min-height: 100vh;
          transition: 0.2s;
        }

        .shell.wide {
          margin-left: 82px;
        }

        .shell header {
          height: 76px;
          background: rgba(255, 255, 255, 0.96);
          border-bottom: 1px solid #e7ebf2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .searchBox {
          width: 390px;
          height: 42px;
          border: 1px solid #e1e6ee;
          border-radius: 10px;
          display: flex;
          align-items: center;
          padding: 0 13px;
          gap: 10px;
          background: #f8fafc;
          color: #8b98aa;
        }

        .searchBox input {
          border: 0;
          outline: 0;
          background: transparent;
          width: 100%;
          font-size: 13px;
          color: #25364d;
        }

        .headerRight,
        .profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .iconButton {
          width: 42px;
          height: 42px;
          border: 1px solid #e1e6ee;
          border-radius: 10px;
          background: white;
          display: grid;
          place-items: center;
          color: #526176;
          position: relative;
        }

        .iconButton i {
          width: 7px;
          height: 7px;
          background: #ef4444;
          border-radius: 50%;
          position: absolute;
          right: 9px;
          top: 8px;
          border: 2px solid white;
        }

        .profile {
          padding-left: 10px;
          border-left: 1px solid #e7ebf2;
        }

        .profile > span {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #eaf4ff;
          color: #0877e8;
          display: grid;
          place-items: center;
          font-size: 13px;
          font-weight: 900;
        }

        .profile b,
        .profile small {
          display: block;
        }

        .profile b {
          font-size: 13px;
        }

        .profile small {
          font-size: 11px;
          color: #8995a6;
          margin-top: 2px;
        }

        .shell main {
          padding: 27px 30px 40px;
          max-width: 1700px;
          margin: auto;
        }

        .hero {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          gap: 20px;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #0877e8;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.7px;
          margin-bottom: 7px;
        }

        .hero h1 {
          margin: 0;
          font-size: 28px;
          letter-spacing: -0.6px;
          font-weight: 850;
        }

        .hero p {
          margin: 7px 0 0;
          color: #758297;
          font-size: 13px;
        }

        .primaryButton {
          height: 44px;
          border: 0;
          border-radius: 10px;
          padding: 0 17px;
          background: #087cf0;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 800;
          box-shadow: 0 7px 18px rgba(8, 124, 240, 0.2);
        }

        .statsGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
          margin-bottom: 18px;
        }

        .statCard {
          background: white;
          border: 1px solid #e5eaf1;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 3px 12px rgba(28, 45, 70, 0.035);
        }

        .statTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 17px;
        }

        .statIcon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          display: grid;
          place-items: center;
        }

        .statIcon.blue {
          background: #edf6ff;
          color: #0877e8;
        }

        .statCard > strong {
          display: block;
          font-size: 25px;
          font-weight: 900;
        }

        .statCard > b {
          display: block;
          font-size: 12px;
          color: #536176;
          margin-top: 5px;
        }

        .statCard > small {
          display: block;
          font-size: 10px;
          color: #9aa5b5;
          margin-top: 5px;
        }

        .dashboardGrid {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(300px, 0.72fr);
          gap: 18px;
          margin-bottom: 18px;
        }

        .bottomGrid {
          display: grid;
          grid-template-columns: 1.35fr 0.85fr 0.85fr;
          gap: 18px;
        }

        .card {
          background: white;
          border: 1px solid #e5eaf1;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 3px 12px rgba(28, 45, 70, 0.035);
        }

        .padded {
          padding: 19px;
        }

        .card h3 {
          margin: 0;
          font-size: 14px;
        }

        .cardHeader {
          min-height: 65px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #edf0f5;
        }

        .cardHeader h3 {
          font-size: 15px;
        }

        .cardHeader p {
          font-size: 11px;
          color: #8c98a9;
          margin: 4px 0 0;
        }

        .linkButton {
          border: 0;
          background: transparent;
          color: #0877e8;
          font-weight: 800;
          cursor: pointer;
          font-size: 12px;
        }

        .countBadge {
          font-size: 11px;
          background: #edf6ff;
          color: #0877e8;
          padding: 6px 10px;
          border-radius: 999px;
          font-weight: 800;
        }

        .live {
          color: #059669;
          font-size: 10px;
          font-weight: 800;
        }

        .tableWrap {
          overflow: auto;
        }

        .dataTable {
          width: 100%;
          border-collapse: collapse;
          min-width: 780px;
        }

        .dataTable th {
          padding: 12px 16px;
          background: #fafbfd;
          color: #8995a6;
          text-align: left;
          font-size: 9px;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #edf0f5;
        }

        .dataTable td {
          padding: 14px 16px;
          border-bottom: 1px solid #f0f2f6;
          font-size: 12px;
          color: #35465e;
        }

        .dataTable tr:hover td {
          background: #fbfdff;
        }

        .muted {
          display: block;
          color: #929dad;
          font-size: 10px;
          margin-top: 3px;
        }

        .actions {
          display: flex;
          gap: 5px;
        }

        .miniButton {
          width: 31px;
          height: 31px;
          border: 1px solid #e5eaf1;
          border-radius: 8px;
          background: white;
          color: #657287;
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .miniButton.danger {
          color: #dc3545;
        }

        .activityFeed {
          padding: 7px 17px;
        }

        .activityItem {
          display: flex;
          gap: 11px;
          padding: 14px 0;
          border-bottom: 1px solid #f0f2f6;
        }

        .activityItem:last-child {
          border: 0;
        }

        .activityIcon {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          background: #edf6ff;
          color: #0877e8;
          display: grid;
          place-items: center;
          flex: none;
        }

        .activityItem b {
          font-size: 11px;
        }

        .activityItem p {
          font-size: 10px;
          color: #8995a6;
          margin: 4px 0;
        }

        .activityItem small {
          font-size: 9px;
          color: #a7b0be;
        }

        .bars {
          height: 130px;
          display: flex;
          align-items: flex-end;
          gap: 12px;
          padding-top: 15px;
        }

        .bars > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
        }

        .bars i {
          width: 100%;
          max-width: 32px;
          border-radius: 6px 6px 3px 3px;
          background: linear-gradient(180deg, #087cf0, #b9dafe);
        }

        .bars small {
          font-size: 9px;
          color: #96a1b1;
        }

        .financeRow {
          display: flex;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid #f0f2f6;
          font-size: 12px;
        }

        .financeRow span {
          color: #657287;
        }

        .quickButton {
          width: 100%;
          height: 42px;
          margin-top: 8px;
          border: 1px solid #e6eaf0;
          border-radius: 9px;
          background: #fafbfd;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 11px;
          color: #46566c;
          cursor: pointer;
          font-size: 11px;
          font-weight: 750;
        }

        .quickButton svg:last-child {
          margin-left: auto;
        }

        .reportRow {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid #f0f2f6;
        }

        .progress {
          height: 7px;
          background: #edf1f5;
          border-radius: 999px;
          overflow: hidden;
          flex: 1;
        }

        .progress i {
          display: block;
          height: 100%;
          background: #087cf0;
          border-radius: 999px;
        }

        .emptyState {
          text-align: center;
          padding: 70px 20px;
        }

        .emptyIcon {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: #edf6ff;
          color: #0877e8;
          display: grid;
          place-items: center;
          margin: 0 auto 15px;
        }

        .emptyState h2 {
          margin: 0;
        }

        .emptyState p {
          color: #758297;
          margin: 8px 0 20px;
        }

        .modalBackdrop {
          position: fixed;
          inset: 0;
          background: rgba(8, 27, 53, 0.48);
          backdrop-filter: blur(5px);
          z-index: 100;
          display: grid;
          place-items: center;
          padding: 20px;
        }

        .modal {
          width: min(760px, 100%);
          max-height: 90vh;
          overflow: auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 30px 90px rgba(10, 35, 71, 0.25);
        }

        .modalHeader {
          padding: 22px 24px 18px;
          border-bottom: 1px solid #e5eaf1;
          display: flex;
          justify-content: space-between;
        }

        .modalHeader h2 {
          margin: 0;
          font-size: 20px;
        }

        .modalHeader p {
          margin: 5px 0 0;
          color: #758297;
          font-size: 11px;
        }

        .closeButton {
          width: 36px;
          height: 36px;
          border: 1px solid #e5eaf1;
          border-radius: 9px;
          background: white;
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .modal form {
          padding: 22px 24px;
        }

        .formGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .field label {
          display: block;
          font-size: 10px;
          font-weight: 750;
          color: #35465e;
          margin-bottom: 7px;
        }

        .field input,
        .field select {
          width: 100%;
          height: 44px;
          border: 1px solid #dbe4ee;
          border-radius: 8px;
          padding: 0 12px;
          outline: none;
          background: #fbfcfe;
          color: #10213a;
          font-size: 12px;
        }

        .field input:focus,
        .field select:focus {
          border-color: #087cf0;
          box-shadow: 0 0 0 3px rgba(8, 124, 240, 0.08);
        }

        .modalFooter {
          display: flex;
          justify-content: flex-end;
          gap: 9px;
          padding-top: 20px;
          margin-top: 20px;
          border-top: 1px solid #e5eaf1;
        }

        .secondaryButton {
          height: 42px;
          padding: 0 16px;
          border: 1px solid #e5eaf1;
          border-radius: 8px;
          background: white;
          color: #526176;
          font-weight: 700;
          cursor: pointer;
        }

        @media (max-width: 1200px) {
          .statsGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboardGrid,
          .bottomGrid {
            grid-template-columns: 1fr;
          }

          .profile div {
            display: none;
          }
        }

        @media (max-width: 800px) {
          .sidebar {
            width: 82px;
          }

          .sidebar .brand > div:not(.logo),
          .navGroup label,
          .navGroup button span {
            display: none;
          }

          .navGroup button {
            justify-content: center;
          }

          .shell,
          .shell.wide {
            margin-left: 82px;
          }

          .searchBox {
            width: 260px;
          }

          .shell main {
            padding: 20px 15px;
          }

          .hero {
            flex-direction: column;
          }

          .statsGrid {
            grid-template-columns: 1fr;
          }

          .formGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

function DataTable({
  section,
  rows,
  onEdit,
  onDelete,
  finance = false,
}) {
  if (!rows.length) {
    return (
      <div
        style={{
          padding: 35,
          textAlign: "center",
          color: "#8995a6",
        }}
      >
        Kayıt bulunamadı.
      </div>
    );
  }

  const isLoads =
    section === "Yük Yönetimi" || section === "Seferler";

  let headers;

  if (isLoads) {
    headers = finance
      ? [
          "YÜK NO",
          "ROTA",
          "SATIŞ",
          "MALİYET",
          "BRÜT KÂR",
          "DURUM",
          "",
        ]
      : [
          "YÜK NO",
          "FABRİKA / ROTA",
          "NAKLİYECİ / ARAÇ",
          "NAVLUN",
          "DURUM",
          "",
        ];
  } else {
    headers = Object.keys(rows[0])
      .filter((key) => key !== "id")
      .map((key) => key.toUpperCase())
      .concat([""]);
  }

  return (
    <div className="tableWrap">
      <table className="dataTable">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {isLoads ? (
                finance ? (
                  <>
                    <td>
                      <b>{row.id}</b>
                    </td>

                    <td>
                      {row.origin}

                      <span className="muted">
                        → {row.destination}
                      </span>
                    </td>

                    <td>
                      <b>{money(row.price)}</b>
                    </td>

                    <td>{money(row.cost)}</td>

                    <td>
                      <b style={{ color: "#059669" }}>
                        {money(
                          Number(row.price || 0) -
                            Number(row.cost || 0)
                        )}
                      </b>
                    </td>

                    <td>
                      <StatusBadge status={row.status} />
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <b>{row.id}</b>
                    </td>

                    <td>
                      <b>{row.factory}</b>

                      <span className="muted">
                        {row.origin} → {row.destination}
                      </span>
                    </td>

                    <td>
                      <b>{row.carrier || "—"}</b>

                      <span className="muted">
                        {row.plate || "—"} · {row.vehicle || "—"}
                      </span>
                    </td>

                    <td>
                      <b>{money(row.price)}</b>
                    </td>

                    <td>
                      <StatusBadge status={row.status} />
                    </td>
                  </>
                )
              ) : (
                Object.keys(row)
                  .filter((key) => key !== "id")
                  .map((key) => (
                    <td key={key}>
                      {key === "status" ? (
                        <StatusBadge status={row[key]} />
                      ) : (
                        row[key]
                      )}
                    </td>
                  ))
              )}

              <td>
                <div className="actions">
                  <button
                    className="miniButton"
                    onClick={() => onEdit(section, row)}
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    className="miniButton danger"
                    onClick={() => onDelete(section, row.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RecordModal({
  section,
  record,
  onClose,
  onSave,
}) {
  const fields = formFields[section] || [];

  return (
    <div
      className="modalBackdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal">
        <div className="modalHeader">
          <div>
            <h2>
              {record ? "Kaydı Düzenle" : "Yeni Kayıt"} · {section}
            </h2>

            <p>Bilgileri doldurun ve kaydedin.</p>
          </div>

          <button className="closeButton" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSave}>
          <div className="formGrid">
            {fields.map(([name, label, type = "text"]) => (
              <div className="field" key={name}>
                <label>{label}</label>

                {type === "select" ? (
                  <select
                    name={name}
                    defaultValue={record?.[name] || "Planlandı"}
                  >
                    {[
                      "Planlandı",
                      "Araç Bekliyor",
                      "Yüklemede",
                      "Yolda",
                      "Teslim Edildi",
                    ].map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={name}
                    type={type}
                    defaultValue={record?.[name] || ""}
                    required={[
                      "factory",
                      "origin",
                      "destination",
                      "plate",
                      "name",
                    ].includes(name)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="modalFooter">
            <button
              type="button"
              className="secondaryButton"
              onClick={onClose}
            >
              Vazgeç
            </button>

            <button className="primaryButton" type="submit">
              <Save size={16} />
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
