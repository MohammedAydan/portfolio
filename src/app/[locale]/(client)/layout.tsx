import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { PortfolioContextProvider } from "@/contexts/PortfolioContext";
import { ThemeProvider } from "@/components/theme-provider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import AuthProvider from "@/contexts/AuthContext";
import { hostname, networkInterfaces, release } from "os";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio App",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>

          <NextIntlClientProvider>

            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >

              <Header />


              <PortfolioContextProvider>
                {children}
              </PortfolioContextProvider>

            </ThemeProvider>
          </NextIntlClientProvider>

        </AuthProvider>
      </body>
    </html >
  );
}
