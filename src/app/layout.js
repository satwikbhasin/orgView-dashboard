import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import Navbar from "@/components/common/navbar";
import Loader from "@/styling/loader";
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import "./globals.css";

const ThemeProvider = dynamic(() => import("@/styling/themeProvider"), {
  ssr: false,
  loading: () => <Loader />,
});

export const metadata = {
  title: "Syntra Demo",
};

export default function RootLayout({ children }) {
  const themeModeCookie = cookies().get("themeMode");
  const themeMode = themeModeCookie ? themeModeCookie.value : "light";
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider initialTheme={themeMode}>
          <Navbar />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}