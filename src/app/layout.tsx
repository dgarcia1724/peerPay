import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";
import PageTransition from "./components/PageTransition";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peer Pay 🔁",
  description: "Send and receive payments with friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-white pb-20">
            {/* Top navigation bar */}
            <nav className="bg-[#1DA1F2] p-4 shadow-md">
              <h1 className="text-white text-xl font-bold font-sans">
                Peer Pay 🔁
              </h1>
            </nav>

            <PageTransition>{children}</PageTransition>

            <BottomNav />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 2000,
                style: {
                  background: "#363636",
                  color: "#fff",
                  fontSize: "14px",
                },
              }}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
