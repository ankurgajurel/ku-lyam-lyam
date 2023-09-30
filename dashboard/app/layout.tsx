import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ek Pahichan Dashboard UI",
  description: "Ek Pachichan - The future of KYC in Nepal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>{children}</body>
    </html>
  );
}
