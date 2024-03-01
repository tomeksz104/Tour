import Footer from "@/components/Footer";

export default async function RootLayout({ children }) {
  return (
    <div className="bg-gray-100">
      {children}
      <Footer />
    </div>
  );
}
