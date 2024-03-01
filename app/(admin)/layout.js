import "./globals.css";

export default async function RootLayout({ children }) {
  return (
    <html class="h-full bg-gray-50">
      <body class="h-full">{children}</body>
    </html>
  );
}
