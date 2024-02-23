import { ToastContextProvider } from "@/contexts/ToastContext";
import { ConfirmContextProvider } from "@/contexts/ConfirmContext";
import { PlacesContextProvider } from "@/contexts/PlacesContext";
import { WatchlistContextProvider } from "@/contexts/WatchlistContext";
import { LocateContextProvider } from "@/contexts/LocateContext";

import Provider from "@/components/Provider";
import Navigation from "@/components/Navigation/Navigation";
import ConfirmDialog from "@/components/ConfirmDialog";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import "./globals.css";

export const metadata = {
  title: "Tour",
  description: "Find unique places to visit.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-primary bg-white`}>
        {/* <body className={`${inter.className} bg-gray-100`}> */}
        {/* <body className={`${inter.className} m-auto min-h-screen flex flex-col`}> */}
        <Provider>
          <WatchlistContextProvider>
            <LocateContextProvider>
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
            </LocateContextProvider>
          </WatchlistContextProvider>
        </Provider>
        <div id="fslightbox"></div>
      </body>
    </html>
  );
}
