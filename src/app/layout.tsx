import "~/styles/globals.css";

import { type Metadata } from "next";
import { Roboto } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Avcıvip Kurye | 7/24 Motor Kurye Hizmeti",
  description:
    "İstanbul'un 39 ilçesine 7/24 motor kurye hizmeti. Hızlı, güvenilir ve uygun fiyatlı kurye çözümleri. Avcıvip Kurye - 0530 922 34 24",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  variable: "--font-roboto",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={roboto.variable}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
