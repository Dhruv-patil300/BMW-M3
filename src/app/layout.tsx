import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BMW M3 Competition | The Ultimate Driving Machine",
  description:
    "Interactive cinematic scrollytelling experience for the BMW M3 Competition. Powered by the 510 HP S58 M TwinPower Turbo inline-6, M xDrive with 2WD mode, and lightweight carbon architecture.",
  keywords: [
    "BMW M3 Competition",
    "BMW M3 G80",
    "M xDrive",
    "S58 TwinPower Turbo",
    "M Carbon Bucket Seats",
    "BMW India Configurator",
    "Luxury Sports Sedan",
  ],
  authors: [{ name: "BMW M Division" }],
  openGraph: {
    title: "BMW M3 Competition | Born on the track. Built for the road.",
    description:
      "A scroll-driven cinematic journey revealing the engineering, performance, and presence of the BMW M3 Competition.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#050608] text-[#f5f5f7]">
        {children}
      </body>
    </html>
  );
}
