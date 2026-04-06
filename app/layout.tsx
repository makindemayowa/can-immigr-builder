import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IRCC Pre-Check",
  description: "Know what will get you rejected — before you apply.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
