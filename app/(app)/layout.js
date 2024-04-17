import { Suspense, lazy } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { PlacesContextProvider } from "@/contexts/PlacesContext";
import { ConfirmContextProvider } from "@/contexts/ConfirmContext";
import { WatchlistContextProvider } from "@/contexts/WatchlistContext";
import { LocateContextProvider } from "@/contexts/LocateContext";

const ConfirmDialog = lazy(() => import("@/components/ConfirmDialog"));

import Provider from "@/components/Provider";
import Navigation from "@/components/Navigation/Navigation";
import { Toaster } from "react-hot-toast";

import { Manrope } from "next/font/google";
const manrope = Manrope({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

import "./globals.css";
import ReduxProvider from "@/redux/Provider";

export const metadata = {
  title: "ZnajdźAtrakcje - Odkrywaj i planuj swoje podróże",
  description:
    "ZnajdźAtrakcje to aplikacja turystyczna, która pomoże Ci odkrywać nowe miejsca, planować podróże i dzielić się wrażeniami z innymi podróżnikami.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.className} bg-white`}>
        {/* <body className={`${inter.className} bg-gray-100`}> */}
        {/* <body className={`${inter.className} m-auto min-h-screen flex flex-col`}> */}
        <Provider>
          <ReduxProvider>
            <WatchlistContextProvider>
              <LocateContextProvider>
                <ConfirmContextProvider>
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
                </ConfirmContextProvider>
              </LocateContextProvider>
            </WatchlistContextProvider>
          </ReduxProvider>
        </Provider>
        <SpeedInsights />
        <div id="fslightbox"></div>
      </body>
    </html>
  );
}
