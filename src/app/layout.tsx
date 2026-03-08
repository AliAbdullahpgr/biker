import "~/styles/globals.css";

import { type Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "sonner";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Avcıvip Kurye | 7/24 Motor Kurye Hizmeti",
  description:
    "İstanbul'un 39 ilçesine 7/24 motor kurye hizmeti. Hızlı, güvenilir ve uygun fiyatlı kurye çözümleri. Avcıvip Kurye - 0530 922 34 24",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontOutfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={fontOutfit.variable}>
      <body className="font-sans antialiased">
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
