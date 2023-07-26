import Provider from "@/components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import { ToastContextProvider } from "@/contexts/ToastContext";
import { ConfirmContextProvider } from "@/contexts/ConfirmContext";
import ConfirmDialog from "@/components/ConfirmDialog";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Excursionists",
  description: "Find unique places to visit.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* <body className={`${inter.className} m-auto min-h-screen flex flex-col`}> */}
        <Provider>
          <ConfirmContextProvider>
            <ToastContextProvider>
              <div className="flex h-screen flex-col">
                <Navigation />
                {children}
              </div>
              <ConfirmDialog />
            </ToastContextProvider>
          </ConfirmContextProvider>
        </Provider>
      </body>
    </html>
  );
}
