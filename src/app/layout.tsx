import type { Metadata } from "next";
import ThemeProvider from "@/providers/ThemeProvider";
import ScrollTop from "@/components/ScrollToTop";

import "./globals.css";

export const metadata: Metadata = {
  title: "SpectraScan",
  description: "Aplicación para ayudar a médicos a detectar el autismo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <ScrollTop>
          <ThemeProvider>{children}</ThemeProvider>
        </ScrollTop>
      </body>
    </html>
  );
}
