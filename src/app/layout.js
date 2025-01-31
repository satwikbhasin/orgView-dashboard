import { Analytics } from "@vercel/analytics/react";
import { Analytics as BeamAnalytics } from "@/components/analytics";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import Navbar from "@/components/common/navbar";
import Loader from "@/components/common/loader";
import Link from "next/link";
import { GeistSans } from 'geist/font/sans'
import "./globals.css";
import { ExternalLink } from "lucide-react";

const ThemeProvider = dynamic(() => import("@/styling/theming/themeProvider"), {
  ssr: false,
  loading: () => <Loader />,
});

export const metadata = {
  title: "Org View Modern Dashboard for your business",
  description:
    "Org View is a modern dashboard for your business. It is a powerful and feature-rich dashboard that will help you to monitor your business.",
  image: "/orgView_logo.png",
  url: "https://orgview.vercel.app",
  type: "website",
  siteName: "Org View",
  keywords: ["dashboard template", "business", "modern", "orgview", "ui/ux"],
  creator: "Satwik Bhasin",
};

export default function RootLayout({ children }) {
  const themeModeCookie = cookies().get("themeMode");
  const themeMode = themeModeCookie ? themeModeCookie.value : "light";
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} antialiased relative`}
        suppressHydrationWarning
      >
        <ThemeProvider initialTheme={themeMode}>
          <Navbar />
          {children}
          <div className="cursor-default text-xs justify-center items-center flex flex-col absolute top-3 left-1/2 transform -translate-x-1/2 font-bold text-white bg-zinc-950/50 backdrop-blur-lg px-10 py-1 rounded-full animate-presence z-1000000">
            Dashboard Template By
            <Link className="text-green-200 flex flex-row ml-1 gap-1" href="https://satwikbhasin.com">
              Satwik Bhasin
              <ExternalLink strokeWidth={3} size={14} />
            </Link>
          </div>
          <Analytics />
          <BeamAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}