import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Offer from "@/components/Offer";
import StoreProvider from "@/store/StoreProvider";
import AuthProvider from "@/context/AuthProvider";
import ToastContainer from "@/components/ToastContainer";
import { ProfileProvider } from "@/context/ProfileProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Foody - Bringing food to your table",
  description: "Best food delivery web app in Jaipur.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProfileProvider>
            <StoreProvider>
              <ToastContainer />
              <Offer />
              <Navbar />
              {children}
              <div id="modal"></div>
              <Footer />
            </StoreProvider>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
