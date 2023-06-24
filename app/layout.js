import Provider from "@/components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import { ToastContextProvider } from "@/contexts/ToastContext";

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
          <ToastContextProvider>
            <div className="h-full flex flex-col">
              <Navigation />
              {children}
            </div>
          </ToastContextProvider>
        </Provider>
      </body>
    </html>
  );
}
