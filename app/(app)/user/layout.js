import Footer from "@/components/Footer";
import Navigation from "@/components/User/Navigation";

export default async function RootLayout({ children }) {
  return (
    <div className="bg-gray-100">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}
