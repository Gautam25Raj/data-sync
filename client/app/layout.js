import { Inter } from "next/font/google";
import "./globals.css";

import ReduxProvider from "@/providers/ReduxProvider";
import AuthOProvider from "@/providers/AuthOProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthOProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </AuthOProvider>
      </body>
    </html>
  );
}
