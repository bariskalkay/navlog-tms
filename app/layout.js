import "./globals.css";

export const metadata = {
  title: "NAVLOG TMS | Transportation Management System",
  description: "NAVLOG kurumsal lojistik ve taşıma yönetim sistemi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
