import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import { NavBar } from "./components/NavBar";

const inter = Poppins({ subsets: ["latin"], weight: ["100", "200", "400", "700"], display: 'swap' });

export const metadata: Metadata = {
  title: "Palette Builder",
  description: "Inspired by masterpieces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar/>
          <main className="flex min-h-screen flex-col items-center justify-between p-10">
            {children}
          </main>
        </body>
      </html>
    </StoreProvider>
  );
}
