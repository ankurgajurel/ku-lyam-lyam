import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import Image from "next/image";
import BgImage from "../public/Logo/bg.png";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ek Pahichan",
  description: "Ek Pahichan for Ek Nepal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@arco-design/web-react/dist/css/arco.css"
        />
      </head>
      <body className={dm_sans.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
