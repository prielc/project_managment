import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ניהול משימות",
  description: "מערכת ניהול משימות",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
        {children}
      </body>
    </html>
  );
}
