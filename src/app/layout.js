import { Analytics } from "@vercel/analytics/react";
import { Analytics as BeamAnalytics } from "@/components/analytics";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import Navbar from "@/components/common/navbar";
import Loader from "@/components/common/loader";
import { GeistSans } from 'geist/font/sans'
import "./globals.css";

const ThemeProvider = dynamic(() => import("@/styling/theming/themeProvider"), {
  ssr: false,
  loading: () => <Loader />,
});

export const metadata = {
  title: "Org View Modern Dashboard for your business",
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
          <BeamAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}