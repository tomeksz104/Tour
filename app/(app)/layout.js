import { Suspense, lazy } from "react";
import { ToastContextProvider } from "@/contexts/ToastContext";
import { ConfirmContextProvider } from "@/contexts/ConfirmContext";
import { PlacesContextProvider } from "@/contexts/PlacesContext";
import { WatchlistContextProvider } from "@/contexts/WatchlistContext";
import { LocateContextProvider } from "@/contexts/LocateContext";

const ConfirmDialog = lazy(() => import("@/components/ConfirmDialog"));

import Provider from "@/components/Provider";
import Navigation from "@/components/Navigation/Navigation";
import { Toaster } from "react-hot-toast";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import "./globals.css";

export const metadata = {
  title: "Tour",
  description: "Find unique places to visit.",
};

export default function RootLayout({ children }) {
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
                    <Suspense fallback={<></>}>
                      <Toaster />
                    </Suspense>

                    <div className="flex h-screen flex-col">
                      <Navigation />
                      {children}
                    </div>

                    <Suspense fallback={<></>}>
                      <ConfirmDialog />
                    </Suspense>
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
