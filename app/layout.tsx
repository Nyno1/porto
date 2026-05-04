import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Nashat Akram | Backend Developer",
  description:
    "Portfolio Nashat Akram — Backend Developer Student di SMK Informatika Pesat. Spesialis web development dengan Next.js, Laravel, PHP, dan MySQL.",
  keywords: ["Nashat Akram", "Backend Developer", "Web Developer", "Next.js", "Laravel", "Portfolio"],
  authors: [{ name: "Nashat Akram" }],
  openGraph: {
    title: "Nashat Akram | Backend Developer",
    description: "Portfolio Nashat Akram — Backend & Web Developer.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nashat Akram | Backend Developer",
    description: "Portfolio Nashat Akram — Backend & Web Developer.",
    creator: "@nynxd19711",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0A0A]`}
      >
        {children}
      </body>
    </html>
  );
}