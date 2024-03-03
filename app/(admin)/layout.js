import Sidebar from "@/components/Admin/Sidebar";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ConfirmContextProvider } from "@/contexts/ConfirmContext";
import ConfirmDialog from "@/components/ConfirmDialog";
import Provider from "@/components/Provider";

export default async function RootLayout({ children }) {
  return (
    <html className="font-primary h-full bg-gray-50">
      <body className="h-full">
        <Provider>
          <ConfirmContextProvider>
            <Sidebar />
            <Toaster />
            {children}
            <ConfirmDialog />
          </ConfirmContextProvider>
        </Provider>
      </body>
    </html>
  );
}
