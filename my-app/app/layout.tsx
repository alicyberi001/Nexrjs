import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { NavBar } from "@/components/navbar";
import { Footer1 } from "@/components/footer";
import ReactQueryProvider from "@/utils/ReactQueryProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="w-full min-h-screen bg-[#030712]">
            <NavBar />
            {children}
            <Footer1 />
          </div>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
