import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import "@arco-design/web-react/dist/css/arco.css";

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
      <body className={dm_sans.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
