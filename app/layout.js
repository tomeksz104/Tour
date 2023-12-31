import { ToastContextProvider } from "@/contexts/ToastContext";
import { ConfirmContextProvider } from "@/contexts/ConfirmContext";
import { PlacesContextProvider } from "@/contexts/PlacesContext";
import { WatchlistContextProvider } from "@/contexts/WatchlistContext";

import Provider from "@/components/Provider";
import Navigation from "@/components/Navigation/Navigation";
import ConfirmDialog from "@/components/ConfirmDialog";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "Excursionists",
  description: "Find unique places to visit.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* <body className={`${inter.className} m-auto min-h-screen flex flex-col`}> */}
        <Provider>
          <WatchlistContextProvider>
            <PlacesContextProvider>
              <ConfirmContextProvider>
                <ToastContextProvider>
                  <div className="flex h-screen flex-col">
                    <Navigation session={session} />
                    {children}
                  </div>
                  <ConfirmDialog />
                </ToastContextProvider>
              </ConfirmContextProvider>
            </PlacesContextProvider>
          </WatchlistContextProvider>
        </Provider>
      </body>
    </html>
  );
}
