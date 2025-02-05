import { Analytics } from "@vercel/analytics/react";
import { Analytics as BeamAnalytics } from "@/components/analytics";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import Navbar from "@/components/common/navbar";
import Loader from "@/components/common/loader";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const ThemeProvider = dynamic(() => import("@/styling/theming/themeProvider"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function RootLayout({ children }) {
  const themeModeCookie = cookies().get("themeMode");
  const themeMode = themeModeCookie ? themeModeCookie.value : "light";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:title" content="Org View - Modern Dashboard for Your Business" />
        <meta
          property="og:description"
          content="Org View is a modern dashboard to help you monitor and grow your business with powerful insights."
        />
        <meta property="og:image" content="https://orgview.vercel.app/orgView_logo.png" />
        <meta property="og:url" content="https://orgview.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Org View" />
        <meta name="description" content="Org View is a modern business dashboard with powerful insights." />
        <meta name="keywords" content="dashboard template, business, modern, orgview, UI/UX" />
        <meta name="author" content="Satwik Bhasin" />
        <title>Org View - Modern Dashboard for Your Business</title>
      </head>
      <body
        className={`${GeistSans.variable} antialiased relative`}
        suppressHydrationWarning
      >
        <ThemeProvider initialTheme={themeMode}>
          <Navbar />
          {children}
          <Analytics />
          <BeamAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
