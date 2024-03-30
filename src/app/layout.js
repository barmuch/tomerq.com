import { Kalam } from "next/font/google";
import "./globals.css";


const kalam = Kalam({ 
  subsets: ["latin"],
  weight: "400", 
});

export const metadata = {
  title: "tomerQ.com",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kalam.className}>        
          {children}   
      </body>
    </html>
  );
}
  