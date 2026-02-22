import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import QueryClientProviderWrapper from "src/providers/queryClientProvider";
import { ThemeProvider } from "next-themes";

const IranSans = localFont({
  src: [
    {
      path: "../../public/fonts/IranSansWeb/IRANSansWeb(FaNum)_UltraLight.woff",
      weight: "200",
    },
    {
      path: "../../public/fonts/IranSansWeb/IRANSansWeb(FaNum)_Light.woff",
      weight: "300",
    },
    {
      path: "../../public/fonts/IranSansWeb/IRANSansWeb(FaNum).woff", // Regular
      weight: "400",
    },
    {
      path: "../../public/fonts/IranSansWeb/IRANSansWeb(FaNum)_Medium.woff",
      weight: "500",
    },
    {
      path: "../../public/fonts/IranSansWeb/IRANSansWeb(FaNum)_Bold.woff",
      weight: "700",
    },
    {
      path: "../../public/fonts/IranSansWeb/IRANSansWeb(FaNum)_Black.woff",
      weight: "900",
    },
  ],
  variable: "--font-IranSans",
});

export const metadata: Metadata = {
  title: " تسک های بهمن سبز",
  description: "صفحه اصلی تسک ها",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="h-full " suppressHydrationWarning>
      <body
        className={`${IranSans.variable}  antialiased bg-white   dark:bg-gray-900  h-full transition-colors duration-300 `}
      >
        <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
      </body>
    </html>
  );
}
