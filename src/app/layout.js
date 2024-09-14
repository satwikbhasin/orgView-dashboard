import localFont from "next/font/local";
import Head from "next/head";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Syntra Demo",
};

import Navbar from "@/components/common/navbar";
import { Box } from "@mui/joy";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Box sx={{display: "flex", flexDirection: "row"}}>
            <Navbar />
            {children}
          </Box>
        </Suspense>
      </body>
    </html>
  );
}
