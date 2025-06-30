// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/app/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diamond's Academy",
  description: "Academia de Ballet Clásico",
  icons: {
    icon: "/diamond.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
