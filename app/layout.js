import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Offer from "@/components/Offer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Foody - Bring food to your table",
  description: "Best food delivery web app in Jaipur.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Offer />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
