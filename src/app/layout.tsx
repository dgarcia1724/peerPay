import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-white pb-20">
          {/* Top navigation bar */}
          <nav className="bg-[#1DA1F2] p-4 shadow-md">
            <h1 className="text-white text-xl font-bold font-sans">
              Peer Pay 🔁
            </h1>
          </nav>

          {children}

          <BottomNav />
        </div>
      </body>
    </html>
  );
}
