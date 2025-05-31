import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "كراء المنازل - العثور على منزل أحلامك",
  description: "موقع كراء المنازل في المغرب - نظام حجز بالهاتف فقط. اعثر على منزل أحلامك بمكالمة واحدة.",
  keywords: "كراء المنازل, إيجار, المغرب, منازل للكراء, شقق للإيجار",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
