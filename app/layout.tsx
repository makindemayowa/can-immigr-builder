import type { Metadata } from "next";
import { Lato, Noto_Sans } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IRCC Pre-Check",
  description: "Know what will get you rejected before you apply.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.variable} ${notoSans.variable} font-noto antialiased`}>
        {children}
      </body>
    </html>
  );
}
