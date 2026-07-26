import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.scss";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUMEA — авторские свечи",
  description:
    "Интернет-магазин авторских свечей из натурального воска, созданных вручную небольшими партиями.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
