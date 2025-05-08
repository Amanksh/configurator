import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PreviewProvider } from "../src/context/PreviewContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LED Display Configurator",
  description: "Configure your LED display",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PreviewProvider>{children}</PreviewProvider>
      </body>
    </html>
  );
}
