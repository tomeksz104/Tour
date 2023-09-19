import { ToastContextProvider } from "@/contexts/ToastContext";
import { ConfirmContextProvider } from "@/contexts/ConfirmContext";
import { PlacesContextProvider } from "@/contexts/PlacesContext";

import Provider from "@/components/Provider";
import Navigation from "@/components/Navigation/Navigation";
import ConfirmDialog from "@/components/ConfirmDialog";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import "./globals.css";

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
          <PlacesContextProvider>
            <ConfirmContextProvider>
              <ToastContextProvider>
                <div className="flex h-screen flex-col">
                  <Navigation />
                  {children}
                </div>
                <ConfirmDialog />
              </ToastContextProvider>
            </ConfirmContextProvider>
          </PlacesContextProvider>
        </Provider>
      </body>
    </html>
  );
}
